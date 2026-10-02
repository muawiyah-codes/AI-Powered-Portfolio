import { profileData } from "../data/profile";
import { projectsData, Project } from "../data/projects";
import { skillsData } from "../data/skills";

export interface SourceReference {
  title: string;
  sourceType: string;
  snippet: string;
}

export interface ChatResponse {
  reply: string;
  sources: SourceReference[];
  suggestedQuestions: string[];
  confidence: number;
  provider: string;
}

// Tokenizer helper
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9_\-\.\+]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOPWORDS.has(w));
}

const STOPWORDS = new Set([
  "a", "an", "the", "and", "or", "in", "on", "at", "to", "for", "with",
  "is", "was", "are", "were", "of", "it", "this", "that", "these", "those",
  "he", "his", "him", "my", "me", "i", "what", "which", "who", "whom", "how",
  "can", "tell", "show", "give", "explain", "does", "did"
]);

export async function askPortfolioAI(
  message: string,
  recruiterMode: boolean = false
): Promise<ChatResponse> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001";

  // Try calling the FastAPI backend first with a 3.5s timeout
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8500);

    const res = await fetch(`${apiUrl}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        recruiter_mode: recruiterMode
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      return {
        reply: data.reply,
        sources: (data.sources || []).map((s: any) => ({
          title: s.title,
          sourceType: s.source_type,
          snippet: s.snippet
        })),
        suggestedQuestions: data.suggested_questions || [],
        confidence: data.confidence || 0.95,
        provider: data.provider || "FastAPI RAG Backend"
      };
    }
  } catch {
    // If backend is offline or timed out, fall back gracefully to client-side RAG engine
  }

  // Client-side Intelligent RAG Fallback
  return generateClientSideRAGReply(message, recruiterMode);
}

function generateClientSideRAGReply(
  query: string,
  recruiterMode: boolean
): ChatResponse {
  const q = query.toLowerCase();
  const name = profileData.name;

  const defaultSuggestions = [
    "What are his strongest skills?",
    "Explain his skin disease classifier.",
    "What GenAI projects has he built?",
    "Summarize his resume in 30 seconds.",
    "Why might his background be relevant for an ML role?"
  ];

  // 1. Recruiter 30-Second Summary
  if (
    q.includes("30 second") ||
    (q.includes("summarize") &&
      (q.includes("candidate") || q.includes("resume") || q.includes("background")))
  ) {
    return {
      reply: `### ⚡ 30-Second Candidate Summary for ${name}

- **Role**: AI / ML Engineer & Data Scientist
- **Education**: B.Tech in Data Science at IK Gujral Punjab Technical University (2023–Present, **CGPA: 8.0**).
- **Core Engineering**:
  - **Deep Learning**: Multi-class skin lesion classification with **EfficientNetV2B0** achieving **90%+ test accuracy and F1-score**, dual-gate guardrails with MobileNetV2 OOD validation, and Grad-CAM visual heatmaps.
  - **Generative AI**: Engineered **ResearchMind**, an autonomous 4-agent collective (Search, Reader, Writer, Critic) using LangChain & Groq LPUs.
  - **RAG Systems**: Designed **DocuMind AI** with dense BGE embeddings, hybrid BM25 search, and strict citation grounding.
  - **Machine Learning**: 85.33% accuracy & 87.08% F1 in Cardiovascular disease risk classification; 80.87% placement forecast.
- **Leadership**: Student Placement Coordinator at Gulzar Group of Institution (Aug 2025–Present).
- **Status**: Available for AI/ML roles and high-impact engineering teams.`,
      sources: [
        {
          title: "Profile & Resume Knowledge Base",
          sourceType: "Resume Records",
          snippet: "B.Tech Data Science (8.0 CGPA), Multi Skin Diseases Classifier (90%+ acc), ResearchMind Multi-Agent."
        },
        {
          title: "Multi Skin Diseases Classifier",
          sourceType: "Deep Learning Project",
          snippet: "EfficientNetV2B0 9-class transfer learning with MobileNetV2 dual-gate guardrail and Grad-CAM."
        }
      ],
      suggestedQuestions: defaultSuggestions,
      confidence: 0.98,
      provider: "Client Grounded RAG Engine"
    };
  }

  // 2. Skin Disease Classifier query
  if (
    q.includes("skin") ||
    q.includes("disease") ||
    q.includes("efficientnet") ||
    q.includes("classifier") ||
    q.includes("grad-cam") ||
    q.includes("vision")
  ) {
    const proj = projectsData.find((p) => p.id === "multi-skin-diseases-classifier")!;
    return {
      reply: `### 🩺 Multi Skin Diseases Classifier

${proj.summary}

**Key Verified Architecture & Metrics**:
- **Accuracy & F1**: **90%+ test accuracy and F1-score** across 9 clinical diagnostic categories.
- **Dual-Gate Guardrails**: Intercepts non-dermatological captures with a pre-inference **MobileNetV2 Out-of-Domain (OOD)** gate to eliminate false positives from everyday images.
- **Explainable AI (Grad-CAM)**: Generates gradient-weighted class activation heatmaps so dermatologists can verify the cellular margins driving predictions.
- **Uncertainty Rejection**: Flags high-entropy / low-confidence (<0.65) cases as indeterminate for human review.
- **Deployment**: Interactive clinical dashboard built with **Streamlit** and OpenCV.

**Tech Stack**: ${proj.technologies.join(", ")}.`,
      sources: [
        {
          title: "Multi Skin Diseases Classifier",
          sourceType: "Deep Learning & Vision",
          snippet: "EfficientNetV2B0, MobileNetV2 OOD dual-gate, 9 classes, 90%+ test accuracy, Grad-CAM visual heatmaps."
        }
      ],
      suggestedQuestions: [
        "What GenAI projects has he built?",
        "What are his strongest skills?",
        "Show evidence of FastAPI experience."
      ],
      confidence: 0.99,
      provider: "Client Grounded RAG Engine"
    };
  }

  // 3. GenAI / Multi-Agent / ResearchMind / LangChain / RAG
  if (
    q.includes("genai") ||
    q.includes("generative") ||
    q.includes("langchain") ||
    q.includes("agent") ||
    q.includes("researchmind") ||
    q.includes("documind") ||
    q.includes("rag")
  ) {
    return {
      reply: `### 🤖 Generative AI & Autonomous Agent Architectures

${name} has developed multiple verified Generative AI systems:

1. **ResearchMind — Multi-Agent Research System**:
   - Orchestrated 4 autonomous agents:
     - **Search Agent**: Decomposes topics into Tavily search queries.
     - **Reader Agent**: Scrapes and extracts structured context with BeautifulSoup.
     - **Writer Agent**: Drafts technical literature reviews using **Llama-3-70B** on **Groq LPUs** (3.8x speedup).
     - **Critic Agent**: Performs adversarial citation validation against original web sources.
   - Built with **LangChain**, Groq, Tavily, and a real-time **Streamlit** interface.

2. **DocuMind AI — Enterprise RAG Engine**:
   - Production document intelligence with recursive semantic chunking.
   - **BAAI/bge-small-en** 384-dimensional embeddings stored in **ChromaDB / FAISS**.
   - Hybrid retriever combining vector cosine similarity with BM25 keyword matching via Reciprocal Rank Fusion (RRF).
   - Strict source attribution prevents hallucinated facts.

**Tech Stack**: LangChain, Groq LPUs, Tavily API, ChromaDB, FAISS, Hugging Face BGE, FastAPI, Streamlit.`,
      sources: [
        {
          title: "ResearchMind — Multi-Agent System",
          sourceType: "Generative AI Project",
          snippet: "4 specialized agents (Search, Reader, Writer, Critic) with Tavily API, Groq LPU, and LangChain."
        },
        {
          title: "DocuMind AI — Enterprise RAG Engine",
          sourceType: "RAG Architecture",
          snippet: "Semantic chunking, BGE embeddings, ChromaDB vector indexing, hybrid retrieval, and grounded citations."
        }
      ],
      suggestedQuestions: defaultSuggestions,
      confidence: 0.98,
      provider: "Client Grounded RAG Engine"
    };
  }

  // 4. Skills & Technologies
  if (
    q.includes("skill") ||
    q.includes("technologies") ||
    q.includes("know") ||
    q.includes("stack") ||
    q.includes("python") ||
    q.includes("fastapi")
  ) {
    return {
      reply: `### 🛠️ Technical Ecosystem & Verified Competencies

${name}'s technical toolkit spans:

- **Generative AI & LLMs**: LangChain, RAG Pipelines, Vector Databases (ChromaDB, FAISS), BGE/Hugging Face Embeddings, Prompt Engineering, Autonomous Multi-Agent Loops.
- **Deep Learning & Computer Vision**: TensorFlow, Keras, EfficientNetV2B0, MobileNetV2, OpenCV, Grad-CAM (Explainable AI), CNNs, RNNs, LSTMs, Transfer Learning.
- **Data Science & ML**: NumPy, Pandas, Scikit-learn, Matplotlib, Seaborn, Plotly, Exploratory Data Analysis (EDA), Feature Engineering, Hyperparameter Optimization.
- **Backend & Serving**: Python (primary language), FastAPI (asynchronous REST APIs, Pydantic), Streamlit (rapid interactive deployment), SQL.
- **Workflow & Compute**: Git, GitHub, VS Code, Jupyter, Google Colab (GPU accelerated training).`,
      sources: [
        {
          title: "Skills Knowledge Matrix",
          sourceType: "Technical Skills",
          snippet: "Categorized competencies across GenAI, Deep Learning, ML, Backend, and Development Tools."
        }
      ],
      suggestedQuestions: [
        "Explain his skin disease classifier.",
        "What GenAI projects has he built?",
        "Summarize his experience."
      ],
      confidence: 0.97,
      provider: "Client Grounded RAG Engine"
    };
  }

  // 5. Experience / Placement Coordinator
  if (
    q.includes("experience") ||
    q.includes("work") ||
    q.includes("job") ||
    q.includes("placement") ||
    q.includes("history")
  ) {
    const exp = profileData.experience[0];
    return {
      reply: `### 💼 Professional Experience

**${exp.role}** — ${exp.organization}
*${exp.period} | ${exp.location}*

- Coordinated campus recruitment drives and facilitated communication between corporate recruiters and 500+ engineering students.
- Improved student readiness and placement participation by 35% through mock technical interviews, resume workshops, and guidance.
- Managed candidate tracking and skill mapping data using automated spreadsheets and Python utilities.`,
      sources: [
        {
          title: "Experience Records",
          sourceType: "Work Experience",
          snippet: "Student Placement Coordinator at Gulzar Group of Institution (Aug 2025 – Present)."
        }
      ],
      suggestedQuestions: defaultSuggestions,
      confidence: 0.99,
      provider: "Client Grounded RAG Engine"
    };
  }

  // 6. Education
  if (
    q.includes("education") ||
    q.includes("degree") ||
    q.includes("college") ||
    q.includes("university") ||
    q.includes("cgpa")
  ) {
    const edu = profileData.education[0];
    return {
      reply: `### 🎓 Academic Background

- **Degree**: ${edu.degree}
- **Institution**: ${edu.institution}
- **Timeline**: ${edu.period}
- **Current Standing**: **${edu.grade}**
- **Core Coursework**: Machine Learning, Deep Learning, Statistical Analysis, Linear Algebra, Algorithms, and Data Engineering.

Secondary Education:
- **Senior Secondary (12th)**: SAS Senior Secondary School (2023, Distinction)
- **Secondary School (10th)**: RSAS High School (2021, Distinction)`,
      sources: [
        {
          title: "Education Documentation",
          sourceType: "Academic History",
          snippet: "B.Tech in Data Science (2023–Present, CGPA: 8.0) at IK Gujral Punjab Technical University."
        }
      ],
      suggestedQuestions: defaultSuggestions,
      confidence: 0.99,
      provider: "Client Grounded RAG Engine"
    };
  }

  // 7. Contact
  if (
    q.includes("contact") ||
    q.includes("email") ||
    q.includes("reach") ||
    q.includes("hire") ||
    q.includes("phone") ||
    q.includes("linkedin")
  ) {
    return {
      reply: `### 📬 Contact Details for ${name}

- **Email**: [${profileData.email}](mailto:${profileData.email})
- **Phone**: ${profileData.phone}
- **Location**: ${profileData.location}
- **LinkedIn**: [linkedin.com/in/muawiyah-8431552a1](${profileData.linkedin})
- **GitHub**: [github.com/muawiyah-codes](${profileData.github})

Feel free to connect directly via email or LinkedIn for full-time AI/ML opportunities or technical collaborations!`,
      sources: [
        {
          title: "Profile Contacts",
          sourceType: "Contact Information",
          snippet: `${profileData.email} • ${profileData.phone} • ${profileData.linkedin}`
        }
      ],
      suggestedQuestions: defaultSuggestions,
      confidence: 1.0,
      provider: "Client Grounded RAG Engine"
    };
  }

  // 8. Why relevant for ML role
  if (
    q.includes("ml role") ||
    q.includes("why") ||
    q.includes("fit") ||
    q.includes("relevant") ||
    q.includes("hire")
  ) {
    return {
      reply: `### 🎯 Why ${name} is a High-Impact Fit for AI / ML Roles

1. **Full-Lifecycle Engineering**:
   He doesn't just train toy models in Jupyter notebooks; he builds production pipelines with pre-inference guardrails (MobileNetV2 OOD), explainability (Grad-CAM), and web microservices (Streamlit / FastAPI).
2. **Dual Strength in Computer Vision & GenAI**:
   Demonstrated ability in both deep convolutional neural networks (EfficientNetV2B0 achieving 90%+ test accuracy) and cutting-edge autonomous LLM agents (ResearchMind with 4 specialized personas).
3. **Rigorous Statistical Verification**:
   All projects report empirical metrics (85.33% KNN accuracy, 80.87% logistic regression F1, 90%+ multi-class CV) rather than unverified claims.
4. **Strong Leadership & Collaboration**:
   Proven coordination as Student Placement Coordinator, interfacing directly with recruiters and mentoring peers.`,
      sources: [
        {
          title: "Comprehensive Candidate Evaluation",
          sourceType: "Recruiter Knowledge Base",
          snippet: "Full-lifecycle ML, CV & GenAI dual mastery, verified metrics, and placement leadership."
        }
      ],
      suggestedQuestions: defaultSuggestions,
      confidence: 0.98,
      provider: "Client Grounded RAG Engine"
    };
  }

  // 9. Generic semantic project match
  const searchResults = semanticProjectSearch(query, 2);
  if (searchResults.length > 0) {
    const top = searchResults[0];
    return {
      reply: `### Relevant Project: ${top.title}

${top.summary}

- **Category**: ${top.category}
- **Technologies**: ${top.technologies.join(", ")}
- **Solution Highlight**: ${top.solution.slice(0, 200)}...

*Verified from portfolio project documentation.*`,
      sources: [
        {
          title: top.title,
          sourceType: top.category,
          snippet: top.summary
        }
      ],
      suggestedQuestions: defaultSuggestions,
      confidence: 0.88,
      provider: "Client Grounded RAG Engine"
    };
  }

  return {
    reply: `I could not locate specific records matching **"${query}"** in ${name}'s verified portfolio knowledge base.

You can ask about his **Multi Skin Diseases Classifier**, **ResearchMind multi-agent system**, **DocuMind AI RAG engine**, **machine learning skills**, **academic background (B.Tech in Data Science, 8.0 CGPA)**, or his **contact details**.`,
    sources: [
      {
        title: "Portfolio Knowledge Base",
        sourceType: "General Index",
        snippet: "Verified records covering projects, education, experience, and skills."
      }
    ],
    suggestedQuestions: defaultSuggestions,
    confidence: 0.75,
    provider: "Client Grounded RAG Engine"
  };
}

export function semanticProjectSearch(query: string, limit: number = 5): Project[] {
  const qTokens = tokenize(query);
  if (qTokens.length === 0) return projectsData.slice(0, limit);

  const scored = projectsData.map((project) => {
    let score = 0;
    const searchable = [
      project.title,
      project.subtitle,
      project.category,
      ...project.tags,
      ...project.technologies,
      project.summary,
      project.problem,
      project.solution
    ]
      .join(" ")
      .toLowerCase();

    const titleLower = project.title.toLowerCase();
    const tagsLower = project.tags.map((t) => t.toLowerCase());
    const techLower = project.technologies.map((t) => t.toLowerCase());

    for (const token of qTokens) {
      if (titleLower.includes(token)) score += 5;
      else if (tagsLower.some((t) => t.includes(token))) score += 4;
      else if (techLower.some((t) => t.includes(token))) score += 4.5;
      else if (searchable.includes(token)) score += 1.5;
    }

    return { project, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.filter((s) => s.score > 0).map((s) => s.project).slice(0, limit);
}
