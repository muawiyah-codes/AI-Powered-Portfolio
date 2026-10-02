"use client";

import React from "react";
import { 
  Briefcase, 
  GraduationCap, 
  Award, 
  Bot, 
  CheckCircle2, 
  Download, 
  ExternalLink, 
  FileText, 
  Mail, 
  Phone, 
  Sparkles,
  ArrowRight,
  ShieldCheck,
  X
} from "lucide-react";
import { Github, Linkedin } from "./Icons";
import AnimatedProfileAvatar from "./AnimatedProfileAvatar";
import { profileData } from "../data/profile";
import { projectsData, Project } from "../data/projects";

interface RecruiterDashboardProps {
  onClose: () => void;
  onOpenChatWithPrompt: (prompt: string) => void;
  onSelectProject: (project: Project) => void;
}

export default function RecruiterDashboard({
  onClose,
  onOpenChatWithPrompt,
  onSelectProject
}: RecruiterDashboardProps) {
  const recruiterPrompts = [
    "Summarize this candidate in 30 seconds.",
    "Which projects demonstrate ML skills?",
    "Show evidence of FastAPI experience.",
    "What technologies has he actually used in projects?",
    "Why might his background be relevant for an ML role?"
  ];

  const featuredProjects = projectsData.filter((p) => p.featured);

  return (
    <div className="relative my-8 p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0c1220] via-[#090d16] to-[#07090e] border border-emerald-500/30 shadow-2xl shadow-emerald-950/20">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Recruiter Executive Dashboard
              </h2>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-700/50">
                Verified Candidate Profile
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-400">
              High-impact overview prepared for engineering hiring managers and technical recruiters.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onOpenChatWithPrompt("Summarize this candidate in 30 seconds.")}
            className="px-3.5 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-mono flex items-center gap-1.5 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>30s Candidate AI Summary</span>
          </button>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
            title="Exit Recruiter Mode"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        
        {/* Left 2 Cols: Summary, Core Competencies, Featured Projects */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Executive Summary Card */}
          <div className="p-5 rounded-xl bg-white/5 border border-white/5 space-y-4">
            <h3 className="text-xs uppercase font-mono text-cyan-400 tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Candidate Value Proposition</span>
            </h3>
            
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <AnimatedProfileAvatar size="md" />
              <p className="text-sm text-gray-200 leading-relaxed font-light flex-1">
                <strong className="text-white font-semibold">{profileData.name}</strong> is a Data Science & AI Engineer with hands-on production experience in both **Convolutional Deep Learning** (90%+ test accuracy medical classifiers with dual-gate guardrails and Grad-CAM) and **Generative AI** (4-agent autonomous research systems and enterprise RAG engines). He pairs deep technical rigor with leadership as a Student Placement Coordinator.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
              <div className="p-2.5 rounded-lg bg-[#07090e] border border-white/5">
                <div className="text-[10px] text-gray-400 font-mono">CV Accuracy</div>
                <div className="text-lg font-bold font-mono text-cyan-400">90%+</div>
                <div className="text-[10px] text-gray-400">9 Clinical Classes</div>
              </div>
              <div className="p-2.5 rounded-lg bg-[#07090e] border border-white/5">
                <div className="text-[10px] text-gray-400 font-mono">GenAI Architecture</div>
                <div className="text-lg font-bold font-mono text-emerald-400">4 Agents</div>
                <div className="text-[10px] text-gray-400">LangChain + Groq</div>
              </div>
              <div className="p-2.5 rounded-lg bg-[#07090e] border border-white/5">
                <div className="text-[10px] text-gray-400 font-mono">Academic CGPA</div>
                <div className="text-lg font-bold font-mono text-indigo-400">8.0 / 10</div>
                <div className="text-[10px] text-gray-400">B.Tech Data Science</div>
              </div>
              <div className="p-2.5 rounded-lg bg-[#07090e] border border-white/5">
                <div className="text-[10px] text-gray-400 font-mono">ML Risk F1-Score</div>
                <div className="text-lg font-bold font-mono text-amber-400">87.08%</div>
                <div className="text-[10px] text-gray-400">Cardiovascular ML</div>
              </div>
            </div>
          </div>

          {/* Featured Projects for Quick Assessment */}
          <div>
            <h3 className="text-xs uppercase font-mono text-gray-400 tracking-wider mb-3">
              Verified Technical Deliverables (Click for Full Case Study)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {featuredProjects.map((p) => (
                <div
                  key={p.id}
                  onClick={() => onSelectProject(p)}
                  className="p-4 rounded-xl bg-white/5 hover:bg-white/[0.08] border border-white/10 hover:border-cyan-500/40 cursor-pointer transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-cyan-400 mb-1">
                      <span>{p.category}</span>
                      <span className="text-gray-400 group-hover:text-cyan-300 flex items-center gap-1">
                        View Study <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                    <h4 className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                      {p.title}
                    </h4>
                    <p className="text-xs text-gray-400 line-clamp-2 mt-1">
                      {p.summary}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-white/5 flex flex-wrap gap-1">
                    {p.technologies.slice(0, 4).map((tech, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 text-gray-300 border border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                    {p.technologies.length > 4 && (
                      <span className="text-[10px] font-mono text-gray-500 py-0.5">
                        +{p.technologies.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Recruiter Inquiry Shortcuts */}
          <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/30">
            <div className="text-xs font-mono text-cyan-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Bot className="w-3.5 h-3.5" />
              <span>Ask Portfolio AI Assistant Specific Recruiter Queries</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {recruiterPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => onOpenChatWithPrompt(prompt)}
                  className="text-xs font-mono px-3 py-1.5 rounded-lg bg-black/50 hover:bg-cyan-950 hover:text-cyan-200 border border-white/10 hover:border-cyan-500/50 text-gray-300 transition-colors text-left"
                >
                  &ldquo;{prompt}&rdquo;
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Col: Education, Experience, Contact & Resume */}
        <div className="space-y-5">
          
          {/* Contact & Resume Card */}
          <div className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-4">
            <h4 className="text-xs uppercase font-mono text-emerald-400 tracking-wider">
              Direct Contact & Materials
            </h4>
            <div className="space-y-2 text-xs">
              <a
                href={`mailto:${profileData.email}`}
                className="flex items-center gap-2.5 text-gray-300 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-colors font-mono truncate"
              >
                <Mail className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span className="truncate">{profileData.email}</span>
              </a>
              <div className="flex items-center gap-2.5 text-gray-300 p-2 font-mono">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>{profileData.phone}</span>
              </div>
              <a
                href={profileData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-cyan-400 hover:text-cyan-300 p-2 rounded-lg hover:bg-white/5 transition-colors font-mono"
              >
                <Linkedin className="w-4 h-4 flex-shrink-0" />
                <span>LinkedIn Profile</span>
                <ExternalLink className="w-3 h-3 ml-auto text-gray-500" />
              </a>
              <a
                href={profileData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-gray-300 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-colors font-mono"
              >
                <Github className="w-4 h-4 flex-shrink-0" />
                <span>github.com/muawiyah-codes</span>
                <ExternalLink className="w-3 h-3 ml-auto text-gray-500" />
              </a>
            </div>

            <a
              href="#resume"
              className="w-full py-2.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-95 text-white font-medium text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-950"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Inspect Full Interactive Resume</span>
            </a>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                href="/Muawiyah_Resume.pdf"
                download="Muawiyah_Resume.pdf"
                className="py-2 px-3 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-mono text-xs flex items-center justify-center gap-1.5 transition-all border border-emerald-500/40"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </a>
              <a
                href="/Muawiyah_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white font-mono text-xs flex items-center justify-center gap-1.5 transition-all border border-white/10"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Preview PDF</span>
              </a>
            </div>
          </div>

          {/* Education Card */}
          <div className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-3">
            <h4 className="text-xs uppercase font-mono text-indigo-400 tracking-wider flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4" />
              <span>Education</span>
            </h4>
            {profileData.education.map((edu, idx) => (
              <div key={idx} className="border-b border-white/5 pb-2.5 last:border-b-0 last:pb-0">
                <div className="text-xs font-semibold text-white">{edu.degree}</div>
                <div className="text-[11px] text-gray-400">{edu.institution}</div>
                <div className="flex items-center justify-between text-[11px] font-mono text-cyan-400 mt-0.5">
                  <span>{edu.period}</span>
                  <span className="font-bold text-emerald-400">{edu.grade}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Experience Card */}
          <div className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-3">
            <h4 className="text-xs uppercase font-mono text-amber-400 tracking-wider flex items-center gap-1.5">
              <Award className="w-4 h-4" />
              <span>Leadership Experience</span>
            </h4>
            {profileData.experience.map((exp, idx) => (
              <div key={idx}>
                <div className="text-xs font-semibold text-white">{exp.role}</div>
                <div className="text-[11px] text-gray-400">{exp.organization}</div>
                <div className="text-[10px] font-mono text-amber-400/90 mb-1.5">
                  {exp.period} • {exp.location}
                </div>
                <p className="text-[11px] text-gray-300 leading-relaxed font-light">
                  {exp.responsibilities[0]}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
}
