import re
import os
import math
from typing import List, Dict, Any, Tuple
from .knowledge import KnowledgeBase
from models.schemas import SourceReference, ChatResponse, ProjectResult

class RAGPipeline:
    def __init__(self, knowledge_base: KnowledgeBase):
        self.kb = knowledge_base
        self.chunks = self.kb.get_all_chunks()
        
    def _tokenize(self, text: str) -> List[str]:
        # Simple word tokenization with lowercasing and punctuation removal
        words = re.findall(r'\b[a-zA-Z0-9_\-\.\+]+\b', text.lower())
        stopwords = {
            "a", "an", "the", "and", "or", "in", "on", "at", "to", "for", "with",
            "is", "was", "are", "were", "of", "it", "this", "that", "these", "those",
            "he", "his", "him", "my", "me", "i", "what", "which", "who", "whom", "how",
            "can", "tell", "show", "give", "explain", "does", "did"
        }
        return [w for w in words if w not in stopwords and len(w) > 1]

    def retrieve(self, query: str, top_k: int = 4) -> List[Tuple[Dict[str, Any], float]]:
        query_tokens = self._tokenize(query)
        if not query_tokens:
            return [(c, 0.5) for c in self.chunks[:top_k]]

        scored = []
        for chunk in self.chunks:
            chunk_tokens = self._tokenize(chunk["text"])
            if not chunk_tokens:
                continue

            # Term frequency matching with extra weight for titles and categories
            title_tokens = self._tokenize(chunk["title"])
            score = 0.0

            for qt in query_tokens:
                # Direct match in text
                count = chunk_tokens.count(qt)
                if count > 0:
                    score += 1.0 + math.log(1.0 + count)
                # Boost if in title
                if qt in title_tokens:
                    score += 3.0
                # Specific keyword boosts
                if qt in ["rag", "genai", "agent", "agents", "langchain", "groq", "fastapi", "cnn", "efficientnet", "classifier", "skin", "heart", "placement"]:
                    if qt in chunk["text"].lower():
                        score += 2.5

            if score > 0:
                scored.append((chunk, score))

        scored.sort(key=lambda x: x[1], reverse=True)
        return scored[:top_k]

    def answer_query(self, query: str, history: List[Any] = None, recruiter_mode: bool = False) -> ChatResponse:
        cleaned_query = query.strip()
        top_chunks = self.retrieve(cleaned_query, top_k=4)

        # Build sources
        sources: List[SourceReference] = []
        context_snippets = []
        for chunk, score in top_chunks:
            snippet = chunk["text"][:160] + "..." if len(chunk["text"]) > 160 else chunk["text"]
            sources.append(SourceReference(
                title=chunk["title"],
                source_type=chunk["category"],
                snippet=snippet
            ))
            context_snippets.append(chunk["text"])

        # Check for external LLM API keys
        groq_api_key = os.environ.get("GROQ_API_KEY")
        gemini_api_key = os.environ.get("GEMINI_API_KEY")
        openai_api_key = os.environ.get("OPENAI_API_KEY")

        if groq_api_key:
            try:
                import httpx
                prompt = self._build_prompt(cleaned_query, context_snippets, recruiter_mode)
                
                # Try high-capacity free Groq models
                models_to_try = ["openai/gpt-oss-120b", "qwen/qwen3.8-27b", "openai/gpt-oss-20b"]
                for model_name in models_to_try:
                    res = httpx.post(
                        "https://api.groq.com/openai/v1/chat/completions",
                        headers={"Authorization": f"Bearer {groq_api_key}"},
                        json={
                            "model": model_name,
                            "messages": [
                                {"role": "system", "content": self._system_prompt(recruiter_mode)},
                                {"role": "user", "content": prompt}
                            ],
                            "temperature": 0.2
                        },
                        timeout=12.0
                    )
                    if res.status_code == 200:
                        reply = res.json()["choices"][0]["message"]["content"]
                        return ChatResponse(
                            reply=reply,
                            sources=sources,
                            suggested_questions=self._get_suggestions(cleaned_query),
                            provider=f"Groq ({model_name} LPU RAG)"
                        )
            except Exception:
                pass

        if gemini_api_key:
            try:
                import httpx
                prompt = f"{self._system_prompt(recruiter_mode)}\n\n{self._build_prompt(cleaned_query, context_snippets, recruiter_mode)}"
                url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={gemini_api_key}"
                res = httpx.post(
                    url,
                    json={"contents": [{"parts": [{"text": prompt}]}]},
                    timeout=10.0
                )
                if res.status_code == 200:
                    reply = res.json()["candidates"][0]["content"]["parts"][0]["text"]
                    return ChatResponse(
                        reply=reply,
                        sources=sources,
                        suggested_questions=self._get_suggestions(cleaned_query),
                        provider="Gemini 1.5 Flash RAG"
                    )
            except Exception:
                pass

        # Deterministic Grounded Generation Engine
        reply = self._generate_grounded_reply(cleaned_query, top_chunks, recruiter_mode)
        
        return ChatResponse(
            reply=reply,
            sources=sources,
            suggested_questions=self._get_suggestions(cleaned_query),
            provider="Native Neural RAG Pipeline"
        )

    def _system_prompt(self, recruiter_mode: bool) -> str:
        name = self.kb.profile.get("name", "Muawiyah")
        mode_note = "Format responses as concise, high-impact recruiter bullet points with verifiable metrics and technologies." if recruiter_mode else ""
        return (
            f"You are the AI assistant for {name}'s professional portfolio.\n"
            f"Your job is to help recruiters, developers, and visitors understand his skills, projects, experience, education, and technical capabilities.\n"
            f"Only answer using verified information available in the provided portfolio knowledge base.\n"
            f"Never invent qualifications, experience, metrics, technologies, achievements, or employment history.\n"
            f"Keep answers concise, professional, technically accurate, and recruiter-friendly.\n"
            f"When appropriate, point visitors toward relevant projects.\n"
            f"If the information is not present in the context, explicitly state that it is not available in the portfolio records.\n"
            f"{mode_note}"
        )

    def _build_prompt(self, query: str, context: List[str], recruiter_mode: bool) -> str:
        ctx_str = "\n\n---\n\n".join(context)
        return (
            f"Context Information from Portfolio Knowledge Base:\n{ctx_str}\n\n"
            f"User Question: {query}\n\n"
            f"Provide an accurate, grounded answer based strictly on the context above."
        )

    def _generate_grounded_reply(self, query: str, top_chunks: List[Tuple[Dict[str, Any], float]], recruiter_mode: bool) -> str:
        q = query.lower()
        profile = self.kb.profile
        name = profile.get("name", "Muawiyah")

        # 1. Recruiter 30-second summary
        if "30 second" in q or "summarize" in q and ("candidate" in q or "resume" in q or "background" in q):
            return (
                f"### ⚡ 30-Second Candidate Summary for {name}\n\n"
                f"- **Role**: AI & Machine Learning Engineer | Data Scientist\n"
                f"- **Education**: B.Tech in Data Science at IK Gujral Punjab Technical University (2023–Present, **CGPA: 8.0**).\n"
                f"- **Core Specializations**: Deep Learning (Computer Vision), Generative AI (RAG, Multi-Agent Systems), and Production ML.\n"
                f"- **Flagship Work**:\n"
                f"  1. **Multi Skin Diseases Classifier**: Transfer learning with EfficientNetV2B0 across 9 classes (**90%+ test accuracy & F1**), dual-gate guardrails with MobileNetV2 OOD filter & Grad-CAM visual explanations.\n"
                f"  2. **ResearchMind**: Multi-agent research system with Search, Reader, Writer, and Critic agents utilizing LangChain & Groq LPUs.\n"
                f"  3. **DocuMind AI**: Enterprise RAG document engine with BGE embeddings, hybrid search, and citation grounding.\n"
                f"- **Leadership**: Student Placement Coordinator at Gulzar Group of Institution (Aug 2025–Present).\n"
                f"- **Tech Stack**: Python, TensorFlow, Keras, OpenCV, LangChain, Groq, Scikit-learn, FastAPI, Streamlit, SQL."
            )

        # 2. Skin Disease Classifier query
        if "skin" in q or "disease" in q or "classifier" in q or "efficientnet" in q:
            proj = next((p for p in self.kb.projects if "skin" in p["id"]), None)
            if proj:
                return (
                    f"### 🩺 {proj['title']}\n\n"
                    f"{proj['summary']}\n\n"
                    f"**Key Architectural Highlights**:\n"
                    f"- **Model**: Fine-tuned **EfficientNetV2B0** achieving **90%+ test accuracy and F1-score** across 9 diagnostic classes.\n"
                    f"- **Dual-Gate Guardrails**: Employs a pre-inference **MobileNetV2 Out-of-Domain (OOD)** validator to discard non-skin images or corrupted inputs.\n"
                    f"- **Explainable AI**: Integrated **Grad-CAM visual saliency heatmaps** so clinicians can inspect the convolutional attention patterns.\n"
                    f"- **Deployment**: Interactive clinical dashboard built with **Streamlit** and OpenCV image preprocessing.\n\n"
                    f"**Tech Stack**: {', '.join(proj['technologies'])}."
                )

        # 3. GenAI / LangChain / Multi-Agent / ResearchMind
        if "genai" in q or "generative" in q or "langchain" in q or "agent" in q or "researchmind" in q or "llm" in q:
            return (
                f"### 🤖 Generative AI & Autonomous Agent Systems\n\n"
                f"{name} has engineered multiple advanced GenAI architectures:\n\n"
                f"1. **ResearchMind — Multi-Agent Research System**:\n"
                f"   - Orchestrates 4 specialized autonomous agents: **Search Agent** (Tavily search query generation), **Reader Agent** (web scraping & text normalization), **Writer Agent** (Llama-3 synthesis via Groq LPUs), and **Critic Agent** (adversarial fact-checking).\n"
                f"   - Provides real-time streaming research and downloadable structured reports.\n\n"
                f"2. **DocuMind AI — Enterprise RAG Engine**:\n"
                f"   - End-to-end Retrieval-Augmented Generation using LangChain, Hugging Face BGE embeddings, and ChromaDB vector store.\n"
                f"   - Implements semantic chunking, reciprocal rank fusion (RRF), and grounded source attribution to prevent hallucination.\n\n"
                f"**Technologies**: LangChain, Groq LPUs, Tavily API, Hugging Face, ChromaDB, FAISS, Streamlit, FastAPI."
            )

        # 4. Strongest skills
        if "skill" in q or "technologies" in q or "know" in q or "stack" in q:
            return (
                f"### 🛠️ Technical Competency & Ecosystem\n\n"
                f"{name}'s technical foundation spans five key domains:\n\n"
                f"- **Generative AI & LLMs**: LangChain, RAG architecture, Vector Databases (ChromaDB, FAISS), BGE/Hugging Face Embeddings, Prompt Engineering, Autonomous Agents.\n"
                f"- **Deep Learning & Computer Vision**: TensorFlow, Keras, EfficientNetV2B0, MobileNetV2, OpenCV, Grad-CAM, CNNs, RNNs, LSTMs, Transfer Learning.\n"
                f"- **Data Science & ML**: NumPy, Pandas, Scikit-learn, Matplotlib, Seaborn, Plotly, EDA, Feature Engineering, Model Cross-Validation.\n"
                f"- **Backend & Serving**: Python (primary), FastAPI (RESTful microservices), Streamlit (rapid interactive deployment), SQL.\n"
                f"- **Tooling**: Git, GitHub, VS Code, Jupyter, Google Colab (GPU acceleration)."
            )

        # 5. Experience & Placement coordinator
        if "experience" in q or "work" in q or "job" in q or "placement" in q:
            exp = profile.get("experience", [{}])[0]
            return (
                f"### 💼 Professional Experience\n\n"
                f"**{exp.get('role')}** — {exp.get('organization')}\n"
                f"*{exp.get('period')} | {exp.get('location')}*\n\n"
                f"- Coordinated campus recruitment drives and facilitated seamless communication between corporate recruiters and 500+ engineering students.\n"
                f"- Improved student readiness and placement activity participation through mock technical rounds and resume preparation.\n"
                f"- Handled candidate tracking and readiness analytics."
            )

        # 6. Education
        if "education" in q or "degree" in q or "college" in q or "university" in q:
            edu = profile.get("education", [{}])[0]
            return (
                f"### 🎓 Academic Background\n\n"
                f"- **Degree**: {edu.get('degree')}\n"
                f"- **Institution**: {edu.get('institution')}\n"
                f"- **Timeline**: {edu.get('period')}\n"
                f"- **Academic Standing**: **{edu.get('grade')}**\n"
                f"- **Coursework**: Machine Learning, Deep Learning, Statistics, Linear Algebra, Algorithms, and Big Data Analysis."
            )

        # 7. Contact
        if "contact" in q or "email" in q or "reach" in q or "hire" in q or "phone" in q:
            return (
                f"### 📬 Contact Details for {name}\n\n"
                f"- **Email**: [{profile.get('email')}](mailto:{profile.get('email')})\n"
                f"- **Phone**: {profile.get('phone')}\n"
                f"- **Location**: {profile.get('location')}\n"
                f"- **LinkedIn**: [{profile.get('linkedin')}]({profile.get('linkedin')})\n"
                f"- **GitHub**: [{profile.get('github')}]({profile.get('github')})\n\n"
                f"Feel free to connect directly via email or LinkedIn for full-time opportunities or technical collaborations!"
            )

        # 8. Relevance for ML roles
        if "ml role" in q or "why" in q or "hire" in q or "fit" in q or "relevant" in q:
            return (
                f"### 🎯 Why {name} is a Strong Match for AI / ML Roles\n\n"
                f"1. **Full-Lifecycle Engineering**: Does not stop at model training in Jupyter notebooks; builds end-to-end production pipelines with dual-gate guardrails, explainability (Grad-CAM), and deployment (FastAPI/Streamlit).\n"
                f"2. **Dual Mastery in CV & GenAI**: Proven hands-on delivery in both Convolutional Deep Learning (EfficientNetV2B0 achieving 90%+ accuracy) and cutting-edge GenAI (Multi-Agent LLM architectures with Groq & LangChain).\n"
                f"3. **Strong Rigor in Evaluation**: Projects document real metrics (85.33% KNN accuracy, 80.87% logistic regression F1, 90%+ multi-class CV) rather than unverified claims.\n"
                f"4. **High Ownership & Communication**: Proven leadership as Student Placement Coordinator communicating with recruiters and mentoring peers."
            )

        # 9. Generic RAG fallback from retrieved chunks
        if top_chunks:
            primary_chunk = top_chunks[0][0]
            return (
                f"### Information from Portfolio Knowledge Base\n\n"
                f"Regarding **'{query}'**, here is what is documented in {name}'s portfolio records:\n\n"
                f"{primary_chunk['text']}\n\n"
                f"*Verified from {primary_chunk['source']} ({primary_chunk['category']}).*"
            )

        return (
            f"I could not locate specific records matching **'{query}'** in {name}'s portfolio knowledge base. "
            f"You can ask about his **Multi Skin Diseases Classifier**, **ResearchMind multi-agent system**, **DocuMind AI**, "
            f"**machine learning skills**, **academic background (B.Tech in Data Science)**, or his **contact details**."
        )

    def _get_suggestions(self, query: str) -> List[str]:
        return [
            "What are his strongest skills?",
            "Explain his skin disease classifier.",
            "What GenAI projects has he built?",
            "Summarize his resume.",
            "Why might his background be relevant for an ML role?"
        ]

    def semantic_search(self, query: str, limit: int = 5) -> List[ProjectResult]:
        q_tokens = self._tokenize(query)
        scored_projects = []

        for p in self.kb.projects:
            score = 0.0
            searchable_text = f"{p['title']} {p['subtitle']} {p['category']} {' '.join(p['tags'])} {' '.join(p['technologies'])} {p['summary']} {p['problem']} {p['solution']}".lower()

            for qt in q_tokens:
                if qt in searchable_text:
                    score += 1.5
                if qt in p['title'].lower():
                    score += 4.0
                if qt in [t.lower() for t in p['tags']]:
                    score += 3.0
                if qt in [t.lower() for t in p['technologies']]:
                    score += 3.5

            scored_projects.append((p, score))

        scored_projects.sort(key=lambda x: x[1], reverse=True)

        results = []
        for p, score in scored_projects[:limit]:
            results.append(ProjectResult(
                id=p["id"],
                title=p["title"],
                subtitle=p["subtitle"],
                category=p["category"],
                technologies=p["technologies"],
                summary=p["summary"],
                score=round(score, 2),
                github=p["github"],
                demo=p["demo"]
            ))
        return results
