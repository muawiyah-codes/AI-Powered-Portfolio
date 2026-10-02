export interface SkillItem {
  name: string;
  level: "Advanced" | "Proficient" | "Certified";
  category: string;
  description: string;
  usedIn: string[];
  icon: string;
}

export interface SkillCategory {
  category: string;
  tagline: string;
  skills: SkillItem[];
}

export const skillsData: SkillCategory[] = [
  {
    category: "Generative AI & LLMs",
    tagline: "Autonomous Agent Loops, RAG Pipelines & Semantic Embeddings",
    skills: [
      {
        name: "LangChain",
        level: "Advanced",
        category: "Generative AI & LLMs",
        description: "Multi-agent loop orchestration, parent document retrievers, tool calling, and prompt templates.",
        usedIn: ["ResearchMind — Multi-Agent System", "DocuMind AI — RAG Engine"],
        icon: "Bot"
      },
      {
        name: "RAG Architecture",
        level: "Advanced",
        category: "Generative AI & LLMs",
        description: "Semantic chunking, reciprocal rank fusion (RRF), BM25 hybrid search, and hallucination guardrails.",
        usedIn: ["DocuMind AI — RAG Engine", "Portfolio RAG Assistant"],
        icon: "Layers"
      },
      {
        name: "Vector Databases",
        level: "Proficient",
        category: "Generative AI & LLMs",
        description: "High-dimensional vector indexing, HNSW cosine graphs, ChromaDB, and FAISS.",
        usedIn: ["DocuMind AI — RAG Engine"],
        icon: "Database"
      },
      {
        name: "Hugging Face Embeddings",
        level: "Advanced",
        category: "Generative AI & LLMs",
        description: "Open-source embedding models (BAAI/bge-small-en, sentence-transformers) for dense semantic retrieval.",
        usedIn: ["DocuMind AI — RAG Engine"],
        icon: "Cpu"
      },
      {
        name: "LLM APIs & Groq LPUs",
        level: "Advanced",
        category: "Generative AI & LLMs",
        description: "Ultra-low-latency inference with Groq LPUs, Gemini Flash, and Llama 3 models.",
        usedIn: ["ResearchMind — Multi-Agent System", "DocuMind AI"],
        icon: "Zap"
      },
      {
        name: "Autonomous AI Agents",
        level: "Advanced",
        category: "Generative AI & LLMs",
        description: "Multi-agent systems with specialized personas (Search, Reader, Writer, Critic) and tool binding.",
        usedIn: ["ResearchMind — Multi-Agent System"],
        icon: "Network"
      },
      {
        name: "Prompt Engineering",
        level: "Certified",
        category: "Generative AI & LLMs",
        description: "Few-shot conditioning, chain-of-thought elicitation, structured output schemas, and guardrailing.",
        usedIn: ["ResearchMind — Multi-Agent System", "DocuMind AI"],
        icon: "Terminal"
      }
    ]
  },
  {
    category: "Deep Learning & Vision",
    tagline: "Convolutional Architectures, Transfer Learning & Explainable AI",
    skills: [
      {
        name: "TensorFlow & Keras",
        level: "Advanced",
        category: "Deep Learning & Vision",
        description: "Custom deep neural network training, transfer learning backbones, custom loss functions, and metrics.",
        usedIn: ["Multi Skin Diseases Classifier"],
        icon: "Brain"
      },
      {
        name: "Transfer Learning",
        level: "Advanced",
        category: "Deep Learning & Vision",
        description: "Fine-tuning EfficientNetV2B0 and MobileNetV2 with progressive unfreezing and layer calibration.",
        usedIn: ["Multi Skin Diseases Classifier"],
        icon: "GitBranch"
      },
      {
        name: "Grad-CAM (Explainable AI)",
        level: "Proficient",
        category: "Deep Learning & Vision",
        description: "Gradient-weighted Class Activation Mapping for visual saliency inspection in clinical diagnostics.",
        usedIn: ["Multi Skin Diseases Classifier"],
        icon: "Eye"
      },
      {
        name: "OpenCV & Image Processing",
        level: "Proficient",
        category: "Deep Learning & Vision",
        description: "CLAHE contrast normalization, color space transformations, morphological filtering, and augmentations.",
        usedIn: ["Multi Skin Diseases Classifier"],
        icon: "Image"
      },
      {
        name: "CNN, RNN, LSTM",
        level: "Proficient",
        category: "Deep Learning & Vision",
        description: "Architecting spatial and temporal deep models for computer vision and sequence predictions.",
        usedIn: ["Multi Skin Diseases Classifier"],
        icon: "Activity"
      }
    ]
  },
  {
    category: "Data Science & ML",
    tagline: "Statistical Modeling, Exploratory Analysis & Benchmarking",
    skills: [
      {
        name: "Scikit-learn",
        level: "Advanced",
        category: "Data Science & ML",
        description: "Model benchmarking, preprocessing pipelines, hyperparameter grid search, and ensemble methods.",
        usedIn: ["Heart Disease Prediction", "Student Placement Prediction"],
        icon: "Activity"
      },
      {
        name: "Pandas & NumPy",
        level: "Advanced",
        category: "Data Science & ML",
        description: "High-performance vector operations, tabular data wrangling, matrix manipulation, and aggregations.",
        usedIn: ["Heart Disease Prediction", "Student Placement Prediction", "DocuMind AI"],
        icon: "Table"
      },
      {
        name: "EDA & Feature Engineering",
        level: "Advanced",
        category: "Data Science & ML",
        description: "Outlier filtering via IQR, VIF multicollinearity mitigation, and recursive feature elimination (RFE).",
        usedIn: ["Heart Disease Prediction", "Student Placement Prediction"],
        icon: "Search"
      },
      {
        name: "Data Visualization",
        level: "Advanced",
        category: "Data Science & ML",
        description: "Seaborn distributions, Matplotlib correlation matrices, and Plotly interactive dashboards.",
        usedIn: ["Heart Disease Prediction", "Deloitte Job Simulation"],
        icon: "BarChart3"
      },
      {
        name: "Model Evaluation & Metrics",
        level: "Advanced",
        category: "Data Science & ML",
        description: "ROC-AUC curves, confusion matrices, precision-recall optimization, and F1-score maximization.",
        usedIn: ["Multi Skin Diseases Classifier", "Heart Disease Prediction", "Student Placement Prediction"],
        icon: "CheckCircle"
      }
    ]
  },
  {
    category: "Backend & Systems",
    tagline: "High-Performance APIs, Deployment & Pipeline Serving",
    skills: [
      {
        name: "Python",
        level: "Advanced",
        category: "Backend & Systems",
        description: "Core language for end-to-end ML training, asynchronous FastAPI microservices, and agent orchestration.",
        usedIn: ["Multi Skin Diseases Classifier", "ResearchMind", "DocuMind AI", "Heart Disease Prediction", "Student Placement Prediction"],
        icon: "Code"
      },
      {
        name: "FastAPI",
        level: "Proficient",
        category: "Backend & Systems",
        description: "High-throughput asynchronous RESTful API development, Pydantic data schemas, and model serving.",
        usedIn: ["DocuMind AI", "Portfolio AI Backend"],
        icon: "Server"
      },
      {
        name: "Streamlit",
        level: "Advanced",
        category: "Backend & Systems",
        description: "Interactive production dashboards for clinical diagnosis, research agents, and risk calculators.",
        usedIn: ["Multi Skin Diseases Classifier", "ResearchMind", "Heart Disease Prediction", "Student Placement Prediction"],
        icon: "Monitor"
      },
      {
        name: "SQL",
        level: "Proficient",
        category: "Backend & Systems",
        description: "Relational querying, schema design, complex joins, indexing, and aggregations for candidate tracking.",
        usedIn: ["Student Placement Analytics", "Deloitte Simulation"],
        icon: "Database"
      }
    ]
  },
  {
    category: "Tools & Workflow",
    tagline: "Development Ecosystem, Version Control & Cloud Compute",
    skills: [
      {
        name: "Git & GitHub",
        level: "Proficient",
        category: "Tools & Workflow",
        description: "Version control, collaborative pull requests, release tagging, and repository architecture.",
        usedIn: ["All Projects"],
        icon: "GitBranch"
      },
      {
        name: "VS Code & Jupyter",
        level: "Advanced",
        category: "Tools & Workflow",
        description: "Primary engineering IDE and interactive exploratory research environments.",
        usedIn: ["All Projects"],
        icon: "Terminal"
      },
      {
        name: "Google Colab & Cloud GPUs",
        level: "Advanced",
        category: "Tools & Workflow",
        description: "Accelerated model training on NVIDIA T4/A100 GPUs with mixed-precision compute.",
        usedIn: ["Multi Skin Diseases Classifier"],
        icon: "Cloud"
      }
    ]
  }
];
