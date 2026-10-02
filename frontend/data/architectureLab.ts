export interface ArchitectureNode {
  id: string;
  name: string;
  shortRole: string;
  whatItDoes: string;
  whyNeeded: string;
  technologyUsed: string;
  usedInProject: string;
  color: string;
}

export interface LabSystem {
  id: string;
  name: string;
  category: string;
  description: string;
  metricsHighlight: string;
  nodes: ArchitectureNode[];
}

export const labSystems: LabSystem[] = [
  {
    id: "multi-agent-system",
    name: "ResearchMind — Multi-Agent System",
    category: "Generative AI",
    description: "Orchestrated 4-agent collective for autonomous web research, content normalization, synthesis, and adversarial fact-checking.",
    metricsHighlight: "3.8x Speedup via Groq LPUs • 100% Grounded Citations",
    nodes: [
      {
        id: "ma-input",
        name: "User Research Topic",
        shortRole: "Query Decomposition",
        whatItDoes: "Receives raw user prompt and initializes the orchestration state graph with structured goals and constraints.",
        whyNeeded: "Complex multi-facet topics need structured planning rather than a single prompt attempt.",
        technologyUsed: "Pydantic & Python",
        usedInProject: "ResearchMind — Multi-Agent System",
        color: "from-blue-500/20 to-cyan-500/20 border-cyan-500/50"
      },
      {
        id: "ma-search",
        name: "Search Agent",
        shortRole: "Targeted Web Retrieval",
        whatItDoes: "Translates the topic into 4-6 distinct search queries and interfaces with Tavily Search API to fetch authoritative sources.",
        whyNeeded: "Pre-trained LLMs do not have access to recent web publications or dynamic data.",
        technologyUsed: "Tavily API & LangChain Tool Calling",
        usedInProject: "ResearchMind — Multi-Agent System",
        color: "from-cyan-500/20 to-teal-500/20 border-teal-500/50"
      },
      {
        id: "ma-reader",
        name: "Reader Agent",
        shortRole: "HTML Scraping & Filtering",
        whatItDoes: "Fetches live webpage HTML, scrubs boilerplate, ads, and navigation, extracting key statistics, claims, and code blocks.",
        whyNeeded: "Raw web pages contain noise that would flood context windows and degrade LLM reasoning.",
        technologyUsed: "BeautifulSoup & Regex Chunker",
        usedInProject: "ResearchMind — Multi-Agent System",
        color: "from-teal-500/20 to-emerald-500/20 border-emerald-500/50"
      },
      {
        id: "ma-writer",
        name: "Writer Agent",
        shortRole: "Synthesis & Footnote Drafting",
        whatItDoes: "Synthesizes extracted data into a cohesive, publication-quality report with strict inline markdown citations.",
        whyNeeded: "Translates disconnected web notes into structured technical analysis with clear arguments.",
        technologyUsed: "Groq LPU (Llama-3-70B)",
        usedInProject: "ResearchMind — Multi-Agent System",
        color: "from-emerald-500/20 to-green-500/20 border-green-500/50"
      },
      {
        id: "ma-critic",
        name: "Critic Agent",
        shortRole: "Adversarial Fact-Check Loop",
        whatItDoes: "Cross-checks every claim in the draft against the retrieved source texts. If a claim lacks proof, it rejects the draft back to the Writer.",
        whyNeeded: "Prevents LLM hallucination and guarantees all citations resolve to legitimate web links.",
        technologyUsed: "LangChain Self-Correction Loop",
        usedInProject: "ResearchMind — Multi-Agent System",
        color: "from-amber-500/20 to-orange-500/20 border-orange-500/50"
      },
      {
        id: "ma-output",
        name: "Final Verified Report",
        shortRole: "Structured Delivery",
        whatItDoes: "Streams the approved research paper with executive summaries, source footnotes, and download triggers for Markdown and PDF.",
        whyNeeded: "Provides recruiters, researchers, and engineers with an immediately actionable document.",
        technologyUsed: "Streamlit UI & PDFKit",
        usedInProject: "ResearchMind — Multi-Agent System",
        color: "from-purple-500/20 to-indigo-500/20 border-indigo-500/50"
      }
    ]
  },
  {
    id: "cnn-pipeline",
    name: "Dual-Gate CNN & Grad-CAM Vision Pipeline",
    category: "Deep Learning & Computer Vision",
    description: "Multi-class dermatological diagnostic system with MobileNetV2 Out-of-Domain guardrails and Grad-CAM visual explainability.",
    metricsHighlight: "90%+ Test Accuracy & F1 • 9 Clinical Classes • 45ms Latency",
    nodes: [
      {
        id: "cv-input",
        name: "Clinical Image Capture",
        shortRole: "Standardized Normalization",
        whatItDoes: "Loads raw dermoscopic or clinical photos, resizes to 224x224 RGB, applies CLAHE contrast enhancement and channel normalization.",
        whyNeeded: "Medical images vary drastically in lighting, resolution, and sensor hue; normalization prevents false feature activation.",
        technologyUsed: "OpenCV & Albumentations",
        usedInProject: "Multi Skin Diseases Classifier",
        color: "from-blue-500/20 to-cyan-500/20 border-cyan-500/50"
      },
      {
        id: "cv-ood",
        name: "Gate 1: MobileNetV2 OOD Validator",
        shortRole: "Pre-Inference Guardrail",
        whatItDoes: "Lightweight binary classifier verifying whether the input is a genuine skin lesion or an out-of-domain object (e.g. coffee mug, pet, screenshot).",
        whyNeeded: "Prevents severe healthcare hazard where deep models assign confident medical diagnoses to irrelevant objects.",
        technologyUsed: "MobileNetV2 Fine-Tuned Gate",
        usedInProject: "Multi Skin Diseases Classifier",
        color: "from-rose-500/20 to-pink-500/20 border-pink-500/50"
      },
      {
        id: "cv-backbone",
        name: "Gate 2: EfficientNetV2B0 Backbone",
        shortRole: "Hierarchical Feature Extraction",
        whatItDoes: "Extracts multi-scale spatial features across progressive stages with fused inverted residual convolutions.",
        whyNeeded: "EfficientNetV2 delivers state-of-the-art parameter efficiency and high sensitivity on complex morphological patterns.",
        technologyUsed: "TensorFlow & Keras",
        usedInProject: "Multi Skin Diseases Classifier",
        color: "from-cyan-500/20 to-blue-500/20 border-blue-500/50"
      },
      {
        id: "cv-head",
        name: "9-Class Softmax Head",
        shortRole: "Probabilistic Classification",
        whatItDoes: "Outputs calibrated probability distribution over 9 diagnostic categories (Melanoma, Basal Cell Carcinoma, Nevus, etc.).",
        whyNeeded: "Maps high-dimensional convolutional features into discrete clinical diagnostic probabilities.",
        technologyUsed: "Dense Layer + Dropout + Softmax",
        usedInProject: "Multi Skin Diseases Classifier",
        color: "from-violet-500/20 to-purple-500/20 border-purple-500/50"
      },
      {
        id: "cv-uncertainty",
        name: "Entropy & Uncertainty Thresholding",
        shortRole: "Safety Flagging",
        whatItDoes: "Computes Shannon entropy across softmax scores. If max confidence is <0.65 or entropy >1.2, flags as ambiguous for specialist review.",
        whyNeeded: "In clinical healthcare, knowing when NOT to guess is just as crucial as the diagnosis itself.",
        technologyUsed: "Predictive Entropy Rejection",
        usedInProject: "Multi Skin Diseases Classifier",
        color: "from-amber-500/20 to-yellow-500/20 border-yellow-500/50"
      },
      {
        id: "cv-gradcam",
        name: "Grad-CAM Saliency Heatmap",
        shortRole: "Explainable AI (XAI)",
        whatItDoes: "Calculates the gradient of the predicted class score with respect to the final convolutional feature maps, creating an overlay heatmap.",
        whyNeeded: "Allows doctors to visually verify that the model focused on real lesion pathology rather than surgical marks or background artifacts.",
        technologyUsed: "Grad-CAM & OpenCV Colormap",
        usedInProject: "Multi Skin Diseases Classifier",
        color: "from-emerald-500/20 to-teal-500/20 border-teal-500/50"
      }
    ]
  },
  {
    id: "rag-pipeline",
    name: "DocuMind AI — Enterprise RAG Pipeline",
    category: "Generative AI & LLMs",
    description: "Production Retrieval-Augmented Generation with hybrid vector + lexical search and grounded source attribution.",
    metricsHighlight: "<80ms Retrieval • 384-Dim BGE • Grounded Hallucination Guard",
    nodes: [
      {
        id: "rag-doc",
        name: "Multi-Format Document Ingestion",
        shortRole: "Document Parsing",
        whatItDoes: "Extracts structured text, tables, and section hierarchies from raw PDFs, Markdown documents, and DOCX files.",
        whyNeeded: "Raw enterprise documentation is messy; clean structural extraction preserves reading comprehension.",
        technologyUsed: "PyPDF & LangChain Document Loaders",
        usedInProject: "DocuMind AI — RAG Engine",
        color: "from-blue-500/20 to-cyan-500/20 border-cyan-500/50"
      },
      {
        id: "rag-chunk",
        name: "Semantic & Recursive Chunking",
        shortRole: "Context-Preserving Slicing",
        whatItDoes: "Segments text into 500-token chunks with 80-token overlap, preserving paragraph boundaries and table structures.",
        whyNeeded: "Too large chunks dilute semantic focus; too small chunks lose context.",
        technologyUsed: "RecursiveCharacterTextSplitter",
        usedInProject: "DocuMind AI — RAG Engine",
        color: "from-cyan-500/20 to-teal-500/20 border-teal-500/50"
      },
      {
        id: "rag-embed",
        name: "Dense Vector Embedding",
        shortRole: "Semantic Representation",
        whatItDoes: "Converts text chunks into dense 384-dimensional vector embeddings capturing conceptual meaning.",
        whyNeeded: "Enables semantic search that understands synonyms and intent rather than just exact keyword matches.",
        technologyUsed: "BAAI/bge-small-en (Hugging Face)",
        usedInProject: "DocuMind AI — RAG Engine",
        color: "from-teal-500/20 to-emerald-500/20 border-emerald-500/50"
      },
      {
        id: "rag-vectorstore",
        name: "HNSW Vector Indexing",
        shortRole: "Vector Store Storage",
        whatItDoes: "Builds a Hierarchical Navigable Small World index for sub-millisecond approximate nearest neighbor lookup.",
        whyNeeded: "Allows ultra-fast cosine similarity lookups across tens of thousands of chunks in under 10ms.",
        technologyUsed: "ChromaDB & FAISS",
        usedInProject: "DocuMind AI — RAG Engine",
        color: "from-purple-500/20 to-indigo-500/20 border-indigo-500/50"
      },
      {
        id: "rag-hybrid",
        name: "Hybrid Retriever & RRF",
        shortRole: "Reciprocal Rank Fusion",
        whatItDoes: "Merges top results from dense vector cosine similarity with BM25 keyword matching to handle specialized acronyms.",
        whyNeeded: "Dense search excels at concepts, while BM25 excels at exact serial numbers, error codes, and legal terms.",
        technologyUsed: "Hybrid Ensemble Retriever",
        usedInProject: "DocuMind AI — RAG Engine",
        color: "from-violet-500/20 to-fuchsia-500/20 border-fuchsia-500/50"
      },
      {
        id: "rag-llm",
        name: "Grounded LLM & Attribution",
        shortRole: "Cited Answer Generation",
        whatItDoes: "Generates user response conditioned solely on retrieved excerpts, appending exact page citations and refusal flags if uncertain.",
        whyNeeded: "Completely eliminates hallucinations and provides auditable trust for enterprise compliance.",
        technologyUsed: "Groq LPU / Gemini API + Guardrails",
        usedInProject: "DocuMind AI — RAG Engine",
        color: "from-emerald-500/20 to-teal-500/20 border-teal-500/50"
      }
    ]
  },
  {
    id: "ml-pipeline",
    name: "Machine Learning Placement & Risk Analytics",
    category: "Machine Learning & Data Science",
    description: "Predictive classification pipelines with statistical EDA, outlier filtering, and regularized modeling.",
    metricsHighlight: "85.33% Heart Risk Accuracy • 80.87% Placement F1 • Odds-Ratio Explainability",
    nodes: [
      {
        id: "ml-ingest",
        name: "Tabular Clinical / Academic Ingestion",
        shortRole: "Feature Intake",
        whatItDoes: "Loads multi-attribute tabular records (biometrics, cholesterol, BP, ECG / student CGPA, internships, coding test scores).",
        whyNeeded: "Raw institutional datasets contain messy formatting, categorical codes, and missing entries.",
        technologyUsed: "Pandas & NumPy",
        usedInProject: "Heart Disease & Placement Predictor",
        color: "from-blue-500/20 to-cyan-500/20 border-cyan-500/50"
      },
      {
        id: "ml-eda",
        name: "EDA & Outlier Mitigation (IQR)",
        shortRole: "Statistical Inspection",
        whatItDoes: "Computes Spearman correlations, analyzes distribution skewness, and uses Interquartile Range (IQR) to trim biometric anomalies.",
        whyNeeded: "Extreme outliers distort distance-based classifiers like KNN and bias regression coefficients.",
        technologyUsed: "Matplotlib, Seaborn & SciPy",
        usedInProject: "Heart Disease Prediction",
        color: "from-amber-500/20 to-orange-500/20 border-orange-500/50"
      },
      {
        id: "ml-scaling",
        name: "Robust Preprocessing & Encoding",
        shortRole: "Feature Normalization",
        whatItDoes: "Applies RobustScaler to heavy-tailed continuous variables and one-hot / frequency encodings to categorical features.",
        whyNeeded: "Ensures no single large-scale numeric feature (e.g. cholesterol mg/dL) dominates smaller range features (e.g. ECG status).",
        technologyUsed: "Scikit-learn RobustScaler",
        usedInProject: "Heart Disease & Placement Predictor",
        color: "from-teal-500/20 to-emerald-500/20 border-emerald-500/50"
      },
      {
        id: "ml-eval",
        name: "Multi-Model Cross Validation",
        shortRole: "Algorithm Benchmarking",
        whatItDoes: "Systematically benchmarks Logistic Regression, Decision Trees, Random Forest, SVM, and KNN with 5-fold stratified CV.",
        whyNeeded: "Avoids premature model bias; guarantees empirical selection of the highest generalizing algorithm.",
        technologyUsed: "GridSearchCV & Scikit-learn",
        usedInProject: "Heart Disease & Placement Predictor",
        color: "from-violet-500/20 to-purple-500/20 border-purple-500/50"
      },
      {
        id: "ml-decision",
        name: "Odds-Ratio & Risk Meter Dashboard",
        shortRole: "Clinical / Career Delivery",
        whatItDoes: "Deploys chosen model (KNN for Heart Risk @ 85.33% Acc, Regularized Logistic Regression for Placement @ 80.87% F1) with interactive sliders.",
        whyNeeded: "Gives non-technical clinicians and academic counselors actionable, explainable intervention metrics.",
        technologyUsed: "Streamlit & Plotly Gauges",
        usedInProject: "Heart Disease & Placement Predictor",
        color: "from-rose-500/20 to-pink-500/20 border-pink-500/50"
      }
    ]
  }
];
