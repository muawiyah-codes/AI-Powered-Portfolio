# Muawiyah — Advanced AI-Powered Developer Portfolio & RAG Systems

A personal portfolio for **Muawiyah**, specializing in **Data Science, Machine Learning, Deep Learning, Generative AI, and Python**.

Built to demonstrate actual AI systems engineering through:
- **Floating AI Portfolio Assistant (RAG Pipeline)** with grounded citations and zero hallucination guardrails.
- **AI Architecture Lab**: Interactive deep-dive into multi-agent systems, dual-gate CNN vision pipelines, and RAG architectures.
- **Recruiter Mode**: One-click executive dashboard featuring 30-second candidate summaries, verified metrics, and recruiter inquiry shortcuts.
- **Developer CLI Terminal**: Interactive shell emulator supporting `$ whoami`, `$ skills`, `$ projects --genai`, `$ ask "<query>"`, command history, and autocomplete.
- **Global Command Palette (Ctrl+K)**: Instant keyboard-driven navigation with semantic search matching.
- **Interactive Skills Ecosystem**: Node-based competencies mapped directly to verified project implementations.
- **Production Case Studies**: In-depth architecture flow, clinical guardrails, engineering challenges, and quantitative benchmarks.

---

## 🏛️ System Architecture

```
                    ┌───────────────────────────────┐
                    │    Next.js 16 + React 19      │
                    │  TypeScript + Tailwind CSS v4 │
                    │     Framer Motion + UI        │
                    └──────────────┬────────────────┘
                                   │
                 ┌─────────────────┴─────────────────┐
                 │                                   │
                 ▼ (If backend online)               ▼ (Standalone / Vercel Fallback)
    ┌─────────────────────────┐          ┌─────────────────────────┐
    │     FastAPI Backend     │          │    Client-Side RAG      │
    │  Python 3.13 + Uvicorn  │          │   Cosine Vector Search  │
    │     RESTful /api/*      │          │   Zero-Downtime Engine  │
    └────────────┬────────────┘          └───────────┬─────────────┘
                 │                                   │
                 ▼                                   ▼
    ┌──────────────────────────────────────────────────────────────┐
    │                 Grounded Knowledge Store                     │
    │   • Profile Records (B.Tech Data Science, CGPA 8.0)          │
    │   • Multi Skin Diseases Classifier (90%+ Acc, Grad-CAM)      │
    │   • ResearchMind Multi-Agent System (Groq + LangChain)       │
    │   • DocuMind AI RAG Engine (BGE Embeddings, ChromaDB/FAISS)  │
    │   • Heart Disease & Placement ML Predictors (87.08%, 80.87%) │
    └──────────────────────────────────────────────────────────────┘
```

---

## 🚀 Quick Start (Local Development)

### 1. Run the FastAPI Backend (Port 8001)

```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --host 127.0.0.1 --port 8001 --reload
```
API docs available at: `http://127.0.0.1:8001/docs`

*(Optional)* Set external LLM API keys in a `.env` file in `backend/`:
```env
GROQ_API_KEY=your_groq_key_here
GEMINI_API_KEY=your_gemini_key_here
OPENAI_API_KEY=your_openai_key_here
```
> **Note**: If no external API keys are configured, the native neural RAG pipeline synthesizes grounded answers directly from the indexed portfolio knowledge chunks with verified metrics and citations.

### 2. Run the Next.js Frontend (Port 3000)

```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔬 Featured Projects & Verified Quantitative Benchmarks

| Project | Domain | Key Technologies | Verified Quantitative Metrics |
| :--- | :--- | :--- | :--- |
| **Multi Skin Diseases Classifier** | Deep Learning & Vision | Python, TensorFlow, Keras, EfficientNetV2B0, MobileNetV2, Grad-CAM, Streamlit | **90%+ Test Accuracy & F1**, 9 Diagnostic Classes, Dual-Gate OOD Interceptor, 45ms Latency |
| **ResearchMind** | Generative AI & Agents | Python, LangChain, Groq LPUs, Tavily API, Streamlit, BeautifulSoup, Llama 3 70B | **4 Autonomous Agents** (Search, Reader, Writer, Critic), **3.8x Speedup**, 100% Grounded Citations |
| **DocuMind AI** | Enterprise RAG | Python, FastAPI, LangChain, ChromaDB / FAISS, Hugging Face BGE, Groq/Gemini | **&lt;80ms Retrieval Latency**, 384-Dim BGE Dense Vectors, Hybrid Search (Dense + BM25) |
| **Heart Disease Prediction** | Machine Learning | Python, Pandas, NumPy, Scikit-learn, KNN, Matplotlib, Seaborn, Streamlit | **85.33% Accuracy**, **87.08% F1-Score**, ROC-AUC 0.91, 5 Cross-Validated Algorithms |
| **Student Placement Prediction** | Predictive Analytics | Python, Pandas, NumPy, Scikit-learn, Regularized Logistic Regression, Streamlit | **80.87% Test Accuracy & F1**, Odds-Ratio Factor Analysis, 12ms Inference |

---

## 📂 Repository Layout

```
Porfolio/
├── backend/
│   ├── main.py                  # FastAPI application entrypoint & REST routing
│   ├── requirements.txt         # Backend Python dependencies
│   ├── models/
│   │   └── schemas.py           # Pydantic models for chat, search, and sources
│   └── rag/
│       ├── knowledge.py         # Knowledge chunking, ingestion & indexing
│       └── pipeline.py          # Grounded retrieval, LLM integration & prompt defense
├── frontend/
│   ├── app/
│   │   ├── globals.css          # Dark aesthetics, glassmorphism & cyber styling
│   │   ├── layout.tsx           # SEO metadata, OpenGraph, Twitter cards
│   │   └── page.tsx             # Interactive dashboard & modal state orchestration
│   ├── components/
│   │   ├── Navbar.tsx           # Fixed glassmorphic navigation with mode triggers
│   │   ├── Hero.tsx             # Typewriter subtitles, CTAs & live telemetry
│   │   ├── AIChatAssistant.tsx  # Floating RAG assistant with grounded citations
│   │   ├── RecruiterDashboard.tsx # 30-sec executive overview for recruiters
│   │   ├── CommandPalette.tsx   # Ctrl+K Spotlight-style palette with semantic search
│   │   ├── AboutSection.tsx     # Modern visual cards & active AI telemetry
│   │   ├── SkillsEcosystem.tsx  # Interactive competency nodes with project hover
│   │   ├── ProjectsShowcase.tsx # Project cards with semantic query bar & filters
│   │   ├── ProjectModal.tsx     # In-depth case study & interactive architecture flow
│   │   ├── AIArchitectureLab.tsx# "AI Lab" interactive architecture explorer
│   │   ├── AIResumeExplorer.tsx # Tabbed resume credentials & AI prompt shortcuts
│   │   ├── TerminalMode.tsx     # Developer CLI emulator ($ whoami, $ skills, $ ask)
│   │   ├── GitHubActivity.tsx   # GitHub radar, contribution matrix & languages
│   │   ├── ContactSection.tsx   # Validated cyber contact form & direct channels
│   │   ├── Footer.tsx           # Operational status indicators & credits
│   │   └── Icons.tsx            # Custom SVG brand icons (GitHub, LinkedIn)
│   ├── data/
│   │   ├── profile.ts           # Centralized verified profile & education data
│   │   ├── projects.ts          # Centralized project case studies & architecture steps
│   │   ├── skills.ts            # Skills taxonomy & project implementation links
│   │   └── architectureLab.ts   # System diagrams for AI Architecture Lab
│   └── lib/
│       └── rag-client.ts        # Client-side RAG client with zero-downtime fallback
└── knowledge/
    ├── profile.json             # Raw profile data
    ├── projects.json            # Raw verified project metrics
    ├── skills.json              # Raw skill matrices
    └── resume.md                # Markdown resume document for vector ingestion
```

---

## 🛡️ Security, Reliability & Vercel Deployment

- **Zero-Downtime Reliability**: If the Python backend is offline or deploying, the frontend automatically falls back to the embedded client-side RAG engine, ensuring full interactivity on static hosts like Vercel.
- **Server-Side API Security**: API keys remain securely on the server side via environment variables; never exposed to the client bundle.
- **Strict Grounding Guardrails**: The RAG prompt prevents hallucination and enforces refusal when queries fall outside verified records.
