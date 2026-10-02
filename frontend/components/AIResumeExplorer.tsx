"use client";

import React, { useState } from "react";
import { 
  FileText, 
  Download, 
  GraduationCap, 
  Briefcase, 
  Award, 
  Code, 
  Bot, 
  ExternalLink, 
  CheckCircle2, 
  Mail, 
  Phone, 
  Sparkles,
  ArrowRight
} from "lucide-react";
import AnimatedProfileAvatar from "./AnimatedProfileAvatar";
import { profileData } from "../data/profile";
import { projectsData } from "../data/projects";

interface AIResumeExplorerProps {
  onOpenChatWithQuery: (query: string) => void;
}

export default function AIResumeExplorer({ onOpenChatWithQuery }: AIResumeExplorerProps) {
  const [activeTab, setActiveTab] = useState<"summary" | "experience" | "education" | "certifications">("summary");

  const sampleResumeQuestions = [
    "Summarize his resume in 30 seconds.",
    "Show his Deep Learning experience.",
    "Which projects involve Python?",
    "What GenAI technologies has he used?"
  ];

  return (
    <section id="resume" className="py-20 relative bg-[#07090e] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-300 text-xs font-mono mb-3">
            <FileText className="w-3.5 h-3.5" />
            <span>Interactive Credentials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            AI Resume Explorer
          </h2>
          <p className="max-w-2xl text-gray-400 text-sm sm:text-base leading-relaxed">
            Explore verified academic records, leadership experience, certifications, and technical credentials, or interrogate the resume with the AI assistant.
          </p>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <button
              onClick={() => onOpenChatWithQuery("Summarize his resume in 30 seconds.")}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-white text-xs font-mono flex items-center gap-2 shadow-lg shadow-cyan-950 hover:opacity-95 transition-all"
            >
              <Bot className="w-3.5 h-3.5" />
              <span>Ask AI About Resume</span>
            </button>

            <a
              href="/Muawiyah_Resume.pdf"
              download="Muawiyah_Resume.pdf"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-95 text-white text-xs font-mono flex items-center gap-2 shadow-lg shadow-emerald-950 transition-all font-semibold"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Official Resume (PDF)</span>
            </a>

            <a
              href="/Muawiyah_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-mono flex items-center gap-1.5 border border-white/10 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
              <span>Preview</span>
            </a>
          </div>
        </div>

        {/* Tabbed Interactive Resume Sheet */}
        <div className="max-w-4xl mx-auto bg-[#090d16] border border-white/10 rounded-2xl shadow-2xl shadow-cyan-950/20 overflow-hidden">
          
          {/* Header Card */}
          <div className="p-6 sm:p-8 bg-[#0c1220] border-b border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <AnimatedProfileAvatar size="md" />
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">
                  {profileData.name}
                </h3>
                <p className="text-xs sm:text-sm text-cyan-400 font-mono">
                  {profileData.role}
                </p>
                <div className="text-xs text-gray-400 mt-2 font-mono flex flex-wrap gap-x-4 gap-y-1">
                  <span>{profileData.location}</span>
                  <span>•</span>
                  <span>{profileData.email}</span>
                  <span>•</span>
                  <span>{profileData.phone}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 font-semibold">{profileData.status}</span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center border-b border-white/10 bg-[#07090e] px-4 overflow-x-auto no-scrollbar">
            {[
              { id: "summary", label: "Summary & Highlights", icon: Sparkles },
              { id: "experience", label: "Experience", icon: Briefcase },
              { id: "education", label: "Education & CGPA", icon: GraduationCap },
              { id: "certifications", label: "Certifications", icon: Award }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-3.5 text-xs font-mono border-b-2 flex items-center gap-2 whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? "border-cyan-400 text-cyan-300 font-semibold bg-white/5"
                      : "border-transparent text-gray-400 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content Display */}
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* 1. Summary Tab */}
            {activeTab === "summary" && (
              <div className="space-y-6 animate-in fade-in">
                <div>
                  <h4 className="text-xs font-mono uppercase text-cyan-400 tracking-wider mb-2">
                    Professional Profile
                  </h4>
                  <p className="text-sm text-gray-200 leading-relaxed font-light">
                    {profileData.bio}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="text-xs font-mono text-emerald-400 mb-1 font-semibold">
                      Key Quantitative Metrics
                    </div>
                    <ul className="text-xs text-gray-300 space-y-1.5 font-light">
                      <li>• <strong>90%+ test accuracy & F1</strong> in 9-class dermatological CV</li>
                      <li>• <strong>87.08% F1-score</strong> in Cardiovascular disease risk classification</li>
                      <li>• <strong>80.87% F1-score</strong> in Student placement prediction</li>
                      <li>• <strong>4-Agent</strong> autonomous research pipeline with Groq LPUs</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="text-xs font-mono text-cyan-400 mb-1 font-semibold">
                      Primary Engineering Stack
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed font-light">
                      Python, TensorFlow, Keras, EfficientNetV2B0, OpenCV, Grad-CAM, LangChain, Groq, ChromaDB, Scikit-learn, Pandas, FastAPI, Streamlit, SQL.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 2. Experience Tab */}
            {activeTab === "experience" && (
              <div className="relative pl-6 sm:pl-8 space-y-6 animate-in fade-in before:absolute before:left-2 sm:before:left-3 before:top-4 before:bottom-4 before:w-[2px] before:bg-gradient-to-b before:from-cyan-400 before:via-emerald-400 before:to-transparent">
                {profileData.experience.map((exp, idx) => (
                  <div key={idx} className="relative p-5 rounded-xl bg-white/5 border border-white/5 space-y-3">
                    {/* Glowing Timeline Node */}
                    <span className="absolute -left-[27px] sm:-left-[35px] top-6 w-3.5 h-3.5 rounded-full bg-cyan-400 border-[3px] border-[#090d16] shadow-md shadow-cyan-400/80" />
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div>
                        <h4 className="text-base font-bold text-white">
                          {exp.role}
                        </h4>
                        <div className="text-xs text-cyan-400 font-mono">
                          {exp.organization} • {exp.location}
                        </div>
                      </div>
                      <span className="text-xs font-mono text-gray-400 bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
                        {exp.period}
                      </span>
                    </div>

                    <ul className="space-y-2 text-xs text-gray-300 font-light leading-relaxed">
                      {exp.responsibilities.map((resp, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-emerald-400 font-bold">•</span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* 3. Education Tab */}
            {activeTab === "education" && (
              <div className="relative pl-6 sm:pl-8 space-y-4 animate-in fade-in before:absolute before:left-2 sm:before:left-3 before:top-4 before:bottom-4 before:w-[2px] before:bg-gradient-to-b before:from-indigo-400 before:via-cyan-400 before:to-transparent">
                {profileData.education.map((edu, idx) => (
                  <div key={idx} className="relative p-5 rounded-xl bg-white/5 border border-white/5 space-y-2">
                    {/* Glowing Timeline Node */}
                    <span className="absolute -left-[27px] sm:-left-[35px] top-6 w-3.5 h-3.5 rounded-full bg-indigo-400 border-[3px] border-[#090d16] shadow-md shadow-indigo-400/80" />

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div>
                        <h4 className="text-base font-bold text-white">
                          {edu.degree}
                        </h4>
                        <div className="text-xs text-indigo-400 font-mono">
                          {edu.institution}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-gray-400">
                          {edu.period}
                        </span>
                        <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                          {edu.grade}
                        </span>
                      </div>
                    </div>

                    {edu.highlights && (
                      <ul className="text-xs text-gray-300 space-y-1 font-light pt-1">
                        {edu.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-cyan-400">•</span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* 4. Certifications Tab */}
            {activeTab === "certifications" && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-in fade-in">
                {profileData.certifications.map((cert, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] font-mono text-purple-400 mb-1">
                        {cert.issuer} • {cert.date}
                      </div>
                      <h4 className="text-sm font-semibold text-white mb-2">
                        {cert.title}
                      </h4>
                      <p className="text-xs text-gray-400 leading-relaxed font-light">
                        {cert.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-2 border-t border-white/5 text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Verified Completion</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>

          {/* Quick AI Resume Question Buttons */}
          <div className="p-4 sm:p-6 bg-[#0c1220] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs font-mono text-gray-400 flex items-center gap-1.5">
              <Bot className="w-3.5 h-3.5 text-cyan-400" />
              <span>Prompt AI directly:</span>
            </span>
            <div className="flex flex-wrap gap-2">
              {sampleResumeQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => onOpenChatWithQuery(q)}
                  className="text-xs font-mono px-3 py-1.5 rounded-lg bg-white/5 hover:bg-cyan-950 hover:text-cyan-300 text-gray-300 border border-white/10 hover:border-cyan-500/50 transition-colors"
                >
                  &ldquo;{q}&rdquo;
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
