export interface ArchitectureStep {
  step: number;
  name: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: "Deep Learning" | "Generative AI" | "Machine Learning" | "Computer Vision";
  tags: string[];
  technologies: string[];
  featured: boolean;
  metrics: Record<string, string | number>;
  summary: string;
  problem: string;
  solution: string;
  architectureSteps: ArchitectureStep[];
  challenges: string[];
  solutionsImplemented: string[];
  results: string[];
  whatILearned: string[];
  github: string;
  demo: string;
  stars: number;
}

export const projectsData: Project[] = [
  {
    id: "multi-skin-diseases-classifier",
    title: "Multi Skin Diseases Classifier",
    subtitle: "Clinical-Grade Computer Vision with Dual-Gate Guardrails & Explainability",
    category: "Deep Learning",
    tags: ["Computer Vision", "Deep Learning", "Healthcare AI", "Explainable AI"],
    technologies: ["Python", "TensorFlow", "Keras", "EfficientNetV2B0", "MobileNetV2", "OpenCV", "Grad-CAM", "Streamlit"],
    featured: true,
    metrics: {
      "Test Accuracy": "90%+",
      "F1-Score": "90%+",
      "Clinical Classes": 9,
      "Inference Latency": "45ms",
      "Guardrail Engine": "Dual-Gate OOD"
    },
    summary: "Multi-class dermatological diagnostic system classifying 9 clinical skin conditions with 90%+ test accuracy, reinforced with MobileNetV2 Out-of-Domain validation and Grad-CAM visual heatmaps.",
    problem: "Dermatological misdiagnosis is common in frontline healthcare due to subtle visual nuances across lesion stages. Standard medical CNN models also hallucinate dangerously when users upload non-skin photos, backgrounds, or artifacts with unjustified high confidence.",
    solution: "Engineered a production-ready dual-gate pipeline: First gate employs a fine-tuned MobileNetV2 Out-of-Domain (OOD) validator that immediately rejects non-dermatological captures. Second gate uses an EfficientNetV2B0 model for 9-class classification with predictive entropy thresholding and Grad-CAM visual saliency maps for clinician verification.",
    architectureSteps: [
      {
        step: 1,
        name: "Image Input & Color Normalization",
        description: "Standardizes dermoscopic and clinical photos to 224x224 RGB, applying CLAHE contrast enhancement and color calibration."
      },
      {
        step: 2,
        name: "Dual-Gate Guardrail (MobileNetV2 OOD)",
        description: "Pre-inference binary classifier verifies if image contains genuine skin lesions. Rejects random objects, pets, or corrupted frames."
      },
      {
        step: 3,
        name: "EfficientNetV2B0 Feature Backbone",
        description: "Extracts multi-scale hierarchical feature maps using progressive learning and fused inverted bottleneck convolutions."
      },
      {
        step: 4,
        name: "9-Class Diagnostic Softmax Head",
        description: "Calculates probability distribution across Melanoma, Basal Cell Carcinoma, Nevus, Actinic Keratosis, Vascular Lesions, etc."
      },
      {
        step: 5,
        name: "Uncertainty & Entropy Guardrail",
        description: "Flags cases with max probability <0.65 or entropy >1.2 as indeterminate, routing them for human specialist examination."
      },
      {
        step: 6,
        name: "Grad-CAM Visual Explanations",
        description: "Computes gradients of predicted class score relative to the final convolutional feature maps, overlaying attention heatmaps."
      },
      {
        step: 7,
        name: "Streamlit Clinical Dashboard",
        description: "Provides medical staff with drag-and-drop diagnostic interface, confidence telemetry, and exportable case reports."
      }
    ],
    challenges: [
      "Significant class imbalance in rare malignant pathologies.",
      "Out-of-domain inputs (e.g., users uploading everyday objects) causing false-positive high-confidence classifications.",
      "Clinician hesitation to trust opaque black-box neural network predictions."
    ],
    solutionsImplemented: [
      "Integrated Weighted Focal Loss with extensive Albumentations augmentations (elastic distortions, hue shifts, cutouts).",
      "Pioneered a pre-inference MobileNetV2 dual-gate guardrail layer to intercept non-dermoscopic images.",
      "Implemented Grad-CAM visual heatmaps highlighting the exact pixel regions influencing the diagnosis."
    ],
    results: [
      "Achieved 90%+ test accuracy and 90%+ macro F1-score across 9 clinical diagnostic classes.",
      "Eliminated false out-of-domain classifications by 98% with the MobileNetV2 pre-filter.",
      "Reduced end-to-end inference latency to under 45ms per image."
    ],
    whatILearned: [
      "Medical AI requires strict failure boundaries and rejection thresholds rather than forced classifications.",
      "Explainability (Grad-CAM) is as critical as raw accuracy for clinical stakeholder adoption."
    ],
    github: "https://github.com/muawiyah-codes",
    demo: "https://github.com/muawiyah-codes",
    stars: 18
  },
  {
    "id": "researchmind-multi-agent",
    "title": "ResearchMind — Multi-Agent Research System",
    "subtitle": "Autonomous Web Deep-Research Engine with Orchestrated LLM Agents",
    "category": "Generative AI",
    "tags": ["Multi-Agent AI", "LangChain", "Groq LLM", "Autonomous Research", "Tool Calling"],
    "technologies": ["Python", "LangChain", "Groq", "Tavily API", "Streamlit", "BeautifulSoup", "Llama-3-70B"],
    "featured": true,
    "metrics": {
      "Specialized Agents": 4,
      "Groq LPU Acceleration": "3.8x Speedup",
      "Grounded Fact Check": "100% Sourced",
      "Output Formats": "Markdown & PDF"
    },
    "summary": "Autonomous AI multi-agent research collective featuring specialized Search, Reader, Writer, and Critic agents to automate web research, content extraction, report generation, and quality evaluation in real-time.",
    "problem": "Single LLM prompts produce hallucinated facts, outdated figures, and shallow overviews when queried on deep research topics requiring synthesis across multiple dynamic web sources.",
    "solution": "Architected a modular multi-agent workflow using LangChain and Groq LPUs. Four specialized agent personas collaborate in an orchestrated loop with real-time web scraping and adversarial fact-checking.",
    "architectureSteps": [
      {
        "step": 1,
        "name": "User Research Query Input",
        "description": "User submits high-level topic (e.g., 'State of Post-Quantum Cryptography in 2025')."
      },
      {
        "step": 2,
        "name": "Search Agent (Tavily Query Plan)",
        "description": "Decomposes topic into 4-6 targeted search queries and executes Tavily searches for verified domain sources."
      },
      {
        "step": 3,
        "name": "Reader Agent (Scraper & Chunker)",
        "description": "Parses live web HTML using BeautifulSoup, strips boilerplate, and structures factual claims into markdown snippets."
      },
      {
        "step": 4,
        "name": "Writer Agent (Groq Llama 3 70B)",
        "description": "Synthesizes literature review with structured sections and inline Markdown citation markers."
      },
      {
        "step": 5,
        "name": "Critic Agent (Adversarial Validator)",
        "description": "Verifies every statement against retrieved source documents. Flags unsupported claims and loops back to Writer."
      },
      {
        "step": 6,
        "name": "Streamlit Interactive Explorer",
        "description": "Displays real-time agent thought streams, live token generation, and one-click PDF/Markdown export."
      }
    ],
    "challenges": [
      "Exceeding LLM context windows when reading 10+ long-form articles.",
      "High latency in sequential multi-agent execution loops.",
      "Risk of hallucinated citations from the writing model."
    ],
    "solutionsImplemented": [
      "Engineered hierarchical Map-Reduce summarization in Reader agent before passing clean context to Writer.",
      "Switched inference backend to Groq LPUs running Llama-3-70B, reducing synthesis latency from 65s to under 14s.",
      "Implemented strict citation grounding rules in Critic agent that rejects any claim without an origin URL."
    ],
    results: [
      "Completed comprehensive multi-source technical reports in ~12 seconds.",
      "100% verifiable citations linked to original web sources.",
      "Interactive Streamlit app with live streaming token UI."
    ],
    whatILearned: [
      "Multi-agent decomposition produces significantly higher factuality than monolithic zero-shot prompts.",
      "Adversarial critic loops prevent model drift and hallucination."
    ],
    github: "https://github.com/muawiyah-codes",
    demo: "https://github.com/muawiyah-codes",
    stars: 26
  },
  {
    "id": "documind-ai-rag",
    "title": "DocuMind AI — Production RAG Engine",
    "subtitle": "Enterprise Semantic Document Intelligence with Source Attribution",
    "category": "Generative AI",
    "tags": ["RAG", "Vector Database", "FastAPI", "Embeddings", "LangChain"],
    "technologies": ["Python", "FastAPI", "LangChain", "ChromaDB / FAISS", "Hugging Face BGE", "Groq / Gemini", "Streamlit"],
    "featured": true,
    "metrics": {
      "Retrieval Latency": "<80ms",
      "Embedding Vector": "384-Dim BGE",
      "Index Engine": "HNSW Graph",
      "Hallucination Filter": "Context-Grounded"
    },
    "summary": "Enterprise-grade Retrieval-Augmented Generation (RAG) system capable of ingesting complex PDF/technical documentation with verifiable citation anchors, hybrid search, and hallucination guardrails.",
    "problem": "Generalist LLMs lack access to private manuals and generate confident hallucinations when queried about specific domain standards or enterprise policies.",
    "solution": "Built a modular RAG pipeline using LangChain, Hugging Face BGE embeddings, and ChromaDB/FAISS. Features recursive semantic chunking, reciprocal rank fusion (RRF), and grounded source attribution.",
    "architectureSteps": [
      {
        "step": 1,
        "name": "Document Ingestion",
        "description": "Accepts multi-format technical docs (PDF, Markdown, Docx) and extracts layout-aware text."
      },
      {
        "step": 2,
        "name": "Semantic Chunking & Overlap",
        "description": "Splits content into 500-token semantic chunks with 80-token overlap to maintain context across boundaries."
      },
      {
        "step": 3,
        "name": "Dense Embedding Generation",
        "description": "Encodes chunks into 384-dimensional vector embeddings using BAAI/bge-small-en model."
      },
      {
        "step": 4,
        "name": "HNSW Vector Indexing",
        "description": "Indexes vectors into ChromaDB/FAISS with Hierarchical Navigable Small World graphs for sub-millisecond similarity search."
      },
      {
        "step": 5,
        "name": "Hybrid Top-K Retriever",
        "description": "Fuses dense semantic similarity with BM25 lexical keyword matching using Reciprocal Rank Fusion."
      },
      {
        "step": 6,
        "name": "Grounded LLM Generation",
        "description": "Passes retrieved context into Groq/Gemini with strict system instructions to refuse answers not supported by context."
      },
      {
        "step": 7,
        "name": "Attributed Citations",
        "description": "Returns verified answer along with source document name, page number, and matched text passage."
      }
    ],
    "challenges": [
      "Loss of cross-paragraph context during aggressive chunking.",
      "Terminology mismatch between layperson queries and specialized technical documentation."
    ],
    "solutionsImplemented": [
      "Implemented Parent Document Retriever pattern linking small searchable child chunks to broader parent paragraphs.",
      "Employed query expansion and hypothetical document embedding (HyDE) prompting before vector search."
    ],
    "results": [
      "Sub-80ms vector retrieval across thousands of indexed document pages.",
      "Zero ungrounded hallucinations under standard adversarial test cases.",
      "Exportable conversation history with clickable citation badges."
    ],
    "whatILearned": [
      "Chunking strategy impacts retrieval quality far more than changing the LLM model.",
      "Hybrid search (Dense + BM25) significantly outperforms pure vector search on keyword-heavy technical manuals."
    ],
    "github": "https://github.com/muawiyah-codes",
    "demo": "https://github.com/muawiyah-codes",
    "stars": 21
  },
  {
    "id": "heart-disease-prediction",
    "title": "Heart Disease Predictive Analytics",
    "subtitle": "Cardiovascular Risk Stratification with Machine Learning & Model Benchmarking",
    "category": "Machine Learning",
    "tags": ["Machine Learning", "Healthcare Analytics", "Classification", "Feature Engineering"],
    "technologies": ["Python", "Pandas", "NumPy", "Scikit-learn", "Matplotlib", "Seaborn", "KNN", "Streamlit"],
    "featured": false,
    "metrics": {
      "Accuracy": "85.33%",
      "F1-Score": "87.08%",
      "ROC-AUC": "0.91",
      "Classifiers Compared": 5
    },
    "summary": "End-to-end cardiovascular risk prediction system analyzing clinical indicators (cholesterol, ECG, blood pressure, chest pain type). Benchmarked 5 ML algorithms, achieving 85.33% accuracy and 87.08% F1-score with optimized KNN.",
    "problem": "Early cardiovascular anomaly detection requires correlating non-linear clinical markers that are difficult to identify through standard manual checkups.",
    "solution": "Designed a full data science pipeline: systematic EDA to identify risk correlations, outlier mitigation using IQR, standard feature scaling, hyperparameter tuning via GridSearchCV across Random Forest, SVM, Logistic Regression, and KNN. Built a real-time Streamlit risk calculator.",
    "architectureSteps": [
      {
        "step": 1,
        "name": "Clinical Data Ingestion",
        "description": "Ingests patient clinical indicators including age, resting BP, serum cholesterol, fasting blood sugar, resting ECG, and max heart rate."
      },
      {
        "step": 2,
        "name": "EDA & Correlation Analysis",
        "description": "Computed Spearman correlation matrices, pair plots, and detected multivariate outliers using boxplots and IQR filters."
      },
      {
        "step": 3,
        "name": "Preprocessing & Feature Scaling",
        "description": "Applied RobustScaler to handle heavy-tailed biometric distributions and one-hot encoded categorical parameters."
      },
      {
        "step": 4,
        "name": "Multi-Model Benchmarking",
        "description": "Trained and cross-validated Logistic Regression, Decision Trees, Random Forest, SVM, and K-Nearest Neighbors."
      },
      {
        "step": 5,
        "name": "Model Optimization & Tuning",
        "description": "Optimized KNN with k=7, Manhattan distance metric, and distance-weighted voting, attaining 85.33% accuracy and 87.08% F1-score."
      },
      {
        "step": 6,
        "name": "Interactive Deployment",
        "description": "Streamlit web interface allowing clinicians to slide risk factors and observe immediate risk percentage."
      }
    ],
    "challenges": [
      "High covariance between blood pressure, age, and cholesterol.",
      "Minimizing false negatives (Type II error) which is safety-critical in cardiac screening."
    ],
    "solutionsImplemented": [
      "Tuned classification threshold to favor recall (91.2% sensitivity), reducing false negative risks.",
      "Used PCA for dimensionality visualization to verify decision boundaries."
    ],
    "results": [
      "85.33% test accuracy and 87.08% F1-score on benchmark cardiovascular clinical data.",
      "Real-time interactive Streamlit risk assessment tool with visual radar charts."
    ],
    "whatILearned": [
      "Feature scaling and outlier treatment have a dramatic impact on distance-based algorithms like KNN.",
      "In healthcare ML, optimizing for recall/sensitivity saves lives."
    ],
    "github": "https://github.com/muawiyah-codes",
    "demo": "https://github.com/muawiyah-codes",
    "stars": 12
  },
  {
    "id": "student-placement-prediction",
    "title": "Student Placement Prediction System",
    "subtitle": "Predictive Career Analytics & Early Intervention Decision Support",
    "category": "Machine Learning",
    "tags": ["Machine Learning", "Predictive Analytics", "Feature Selection", "EdTech"],
    "technologies": ["Python", "Pandas", "NumPy", "Scikit-learn", "Logistic Regression", "Streamlit"],
    "featured": false,
    "metrics": {
      "Accuracy": "80.87%",
      "F1-Score": "80.87%",
      "Selected Model": "Regularized Logistic Regression",
      "Inference Latency": "12ms"
    },
    "summary": "Predictive academic data science model evaluating multi-dimensional academic metrics, internship records, and coding proficiencies to forecast placement probabilities with 80.87% accuracy.",
    "problem": "Higher education institutions often identify at-risk students too late in the final year, resulting in lower campus recruitment conversion rates.",
    "solution": "Built an interpretable machine learning classification pipeline. Benchmarked ensemble methods against generalized linear models, selecting regularized Logistic Regression for its high generalization and explainable odds ratios. Deployed an interactive Streamlit advisory dashboard.",
    "architectureSteps": [
      {
        "step": 1,
        "name": "Academic & Skill Data Processing",
        "description": "Cleans academic records, CGPA, backlogs, technical assessments, internships, and communication test scores."
      },
      {
        "step": 2,
        "name": "Imputation & Encoding",
        "description": "Median imputation for missing values, frequency encoding for course specializations, and MinMax scaling."
      },
      {
        "step": 3,
        "name": "Statistical Feature Selection",
        "description": "Employed recursive feature elimination (RFE) and Chi-Square tests to extract top predictive coefficients."
      },
      {
        "step": 4,
        "name": "Model Training & Validation",
        "description": "Evaluated multiple classifiers with 5-fold cross validation. Logistic Regression achieved superior ROC-AUC and 80.87% test accuracy and F1."
      },
      {
        "step": 5,
        "name": "Odds-Ratio Explanations",
        "description": "Calculated odds ratios indicating which specific interventions (e.g., +1 internship or +5% assessment score) boost placement probability the most."
      },
      {
        "step": 6,
        "name": "Interactive Placement Dashboard",
        "description": "Streamlit application where career advisors input candidate profile and receive instant placement odds and personalized skill recommendations."
      }
    ],
    "challenges": [
      "Multicollinearity between high-school marks and university CGPA.",
      "High variation across different engineering branches."
    ],
    "solutionsImplemented": [
      "Variance Inflation Factor (VIF) filtering to eliminate redundant features.",
      "L2 (Ridge) penalty regularization to stabilize model coefficients."
    ],
    "results": [
      "80.87% test accuracy and 80.87% F1-score across held-out student validation sets.",
      "Clear odds-ratio insights utilized to guide student preparation programs."
    ],
    "whatILearned": [
      "Simpler regularized linear models often outperform complex tree ensembles when dataset sizes are moderate and interpretability is paramount."
    ],
    "github": "https://github.com/muawiyah-codes",
    "demo": "https://github.com/muawiyah-codes",
    "stars": 10
  }
];
