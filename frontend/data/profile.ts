export interface Education {
  degree: string;
  institution: string;
  period: string;
  grade: string;
  highlights: string[];
}

export interface Experience {
  role: string;
  organization: string;
  period: string;
  location: string;
  responsibilities: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  description: string;
}

export interface ProfileData {
  name: string;
  role: string;
  tagline: string;
  subtitles: string[];
  location: string;
  phone: string;
  email: string;
  linkedin: string;
  github: string;
  bio: string;
  status: string;
  stats: {
    label: string;
    value: string;
    sublabel: string;
  }[];
  education: Education[];
  experience: Experience[];
  certifications: Certification[];
}

export const profileData: ProfileData = {
  name: "Muawiyah",
  role: "AI / ML Engineer & Data Scientist",
  tagline: "Bridging the gap between raw statistical data, deep neural networks, and autonomous LLM architectures.",
  subtitles: [
    "I build intelligent systems.",
    "I turn data into decisions.",
    "I build LLM-powered applications.",
    "I create production-ready AI solutions."
  ],
  location: "Ludhiana, Punjab, India",
  phone: "+91 95703 04737",
  email: "160880030@ggi.ac.in",
  linkedin: "https://linkedin.com/in/muawiyah-8431552a1",
  github: "https://github.com/muawiyah-codes",
  bio: "Data Science & AI Engineer with expertise in building end-to-end Machine Learning pipelines, Deep Learning computer vision systems, and Generative AI applications with RAG and autonomous multi-agent workflows. Experienced with Python, TensorFlow, PyTorch, LangChain, Groq, and FastAPI.",
  status: "Available for AI/ML Roles & High-Impact Engineering",
  stats: [
    { label: "CV Test Accuracy", value: "90%+", sublabel: "EfficientNetV2 9-Class" },
    { label: "ML Classification", value: "87.08%", sublabel: "Cardiovascular F1-Score" },
    { label: "Agents Orchestrated", value: "4 Agents", sublabel: "Autonomous Search Loop" },
    { label: "Academic Standing", value: "8.0 CGPA", sublabel: "B.Tech in Data Science" }
  ],
  education: [
    {
      degree: "B.Tech in Data Science",
      institution: "IK Gujral Punjab Technical University, Punjab",
      period: "2023 – Present",
      grade: "CGPA: 8.0",
      highlights: [
        "Specialized coursework in Machine Learning, Deep Learning, Statistical Inference, and Big Data Analytics.",
        "Active member of tech councils; mentoring junior peers in Python data structures and ML pipelines."
      ]
    },
    {
      degree: "Senior Secondary (12th)",
      institution: "SAS Senior Secondary School",
      period: "2023",
      grade: "Distinction",
      highlights: ["Focus on Advanced Mathematics, Physics, and Computer Science."]
    },
    {
      degree: "Secondary School (10th)",
      institution: "RSAS High School",
      period: "2021",
      grade: "Distinction",
      highlights: ["Foundational STEM coursework with top academic honors."]
    }
  ],
  experience: [
    {
      role: "Student Placement Coordinator",
      organization: "Gulzar Group of Institution",
      period: "Aug 2025 – Present",
      location: "Punjab, India",
      responsibilities: [
        "Coordinated campus recruitment drives and facilitated seamless communication between tier-1 tech recruiters and over 500+ engineering students.",
        "Improved student participation and readiness in placement activities by 35% through mock technical interviews, resume workshops, and coordination.",
        "Engineered candidate tracking and skill mapping data using automated spreadsheets and Python utilities."
      ]
    }
  ],
  certifications: [
    {
      title: "Prompt Engineering",
      issuer: "LinkedIn",
      date: "2024",
      description: "Techniques to design clear and effective prompts for AI/LLMs, few-shot conditioning, and guardrail constraints."
    },
    {
      title: "Introduction to Data Science",
      issuer: "LinkedIn",
      date: "2024",
      description: "Covered fundamentals of data analysis, exploratory data analysis, visualization, and machine learning."
    },
    {
      title: "Deloitte Data Analytics Job Simulation",
      issuer: "Forage",
      date: "2024",
      description: "Completed hands-on data analysis, forensic technology tasks, and executive data presentation."
    }
  ]
};
