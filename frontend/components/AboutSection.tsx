"use client";

import React from "react";
import { 
  Brain, 
  Cpu, 
  Terminal, 
  Layers, 
  Bot, 
  ShieldCheck, 
  Activity, 
  Zap, 
  Code,
  Network
} from "lucide-react";
import { profileData } from "../data/profile";

export default function AboutSection() {
  const cards = [
    {
      title: "Current Focus",
      icon: Cpu,
      gradient: "from-cyan-500/20 to-blue-500/20 border-cyan-500/30",
      iconColor: "text-cyan-400",
      description: "Engineering resilient, multi-agent AI ecosystems using LangChain, Groq LPUs, and medical-grade computer vision with explainability."
    },
    {
      title: "Generative AI & Autonomous Agents",
      icon: Bot,
      gradient: "from-emerald-500/20 to-teal-500/20 border-emerald-500/30",
      iconColor: "text-emerald-400",
      description: "Constructing multi-agent research loops with specialized Search, Reader, Writer, and Critic agents, plus enterprise RAG engines with zero-hallucination guardrails."
    },
    {
      title: "Deep Learning & Vision",
      icon: Brain,
      gradient: "from-purple-500/20 to-indigo-500/20 border-purple-500/30",
      iconColor: "text-purple-400",
      description: "Designing convolutional backbones (EfficientNetV2, MobileNetV2) with pre-inference out-of-domain filters and Grad-CAM visual heatmaps for clinician validation."
    },
    {
      title: "Production ML & Backend Serving",
      icon: Terminal,
      gradient: "from-amber-500/20 to-orange-500/20 border-amber-500/30",
      iconColor: "text-amber-400",
      description: "Taking models beyond static notebooks into asynchronous FastAPI microservices and Streamlit dashboards with robust validation and sub-50ms latencies."
    }
  ];

  return (
    <section id="about" className="py-20 relative bg-[#07090e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-300 text-xs font-mono mb-3">
            <Activity className="w-3.5 h-3.5" />
            <span>Engineering Philosophy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
            Building Systems That Turn
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
              {" "}Raw Data Into Decisions
            </span>
          </h2>
          <p className="max-w-2xl text-gray-400 text-sm sm:text-base leading-relaxed">
            I specialize in the intersection of statistical data science, deep convolutional vision, and autonomous agent loops. Here is a blueprint of how I architect intelligent systems.
          </p>
        </div>

        {/* Two-Column Layout: Visual Cards + Realtime AI System Telemetry */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: 4 Visual Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cards.map((c, idx) => {
              const Icon = c.icon;
              return (
                <div
                  key={idx}
                  className={`p-5 rounded-2xl bg-gradient-to-br ${c.gradient} border backdrop-blur-md transition-all hover:scale-[1.02] flex flex-col justify-between`}
                >
                  <div>
                    <div className="w-9 h-9 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center mb-3">
                      <Icon className={`w-5 h-5 ${c.iconColor}`} />
                    </div>
                    <h3 className="text-base font-semibold text-white mb-2">
                      {c.title}
                    </h3>
                    <p className="text-xs text-gray-300 leading-relaxed font-light">
                      {c.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-gray-400">
                    <span>Verified Production</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Interactive AI Pipeline Telemetry Visual */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-[#0b101c] border border-cyan-500/20 shadow-xl shadow-cyan-950/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl pointer-events-none" />
            
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-mono text-white font-semibold">Active AI Telemetry</span>
              </div>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800/40">
                LIVE STATE
              </span>
            </div>

            <div className="mt-5 space-y-4 font-mono text-xs">
              
              {/* Telemetry Stage 1 */}
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <div className="flex justify-between text-gray-400 text-[11px] mb-1">
                  <span>Input & Feature Ingestion</span>
                  <span className="text-emerald-400">Validated</span>
                </div>
                <div className="text-white font-medium text-xs">
                  224x224 RGB • CLAHE Contrast • Robust Scaler
                </div>
                <div className="w-full bg-white/10 h-1 rounded-full mt-2 overflow-hidden">
                  <div className="bg-emerald-400 h-full w-[100%]" />
                </div>
              </div>

              {/* Telemetry Stage 2 */}
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <div className="flex justify-between text-gray-400 text-[11px] mb-1">
                  <span>Dual-Gate Guardrail</span>
                  <span className="text-cyan-400">OOD Filter Active</span>
                </div>
                <div className="text-white font-medium text-xs">
                  MobileNetV2 Interceptor • Entropy &lt; 1.2
                </div>
                <div className="w-full bg-white/10 h-1 rounded-full mt-2 overflow-hidden">
                  <div className="bg-cyan-400 h-full w-[95%]" />
                </div>
              </div>

              {/* Telemetry Stage 3 */}
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <div className="flex justify-between text-gray-400 text-[11px] mb-1">
                  <span>Multi-Agent Synthesis</span>
                  <span className="text-indigo-400">Groq LPU Llama 3</span>
                </div>
                <div className="text-white font-medium text-xs">
                  Search → Reader → Writer → Critic (100% Cited)
                </div>
                <div className="w-full bg-white/10 h-1 rounded-full mt-2 overflow-hidden">
                  <div className="bg-indigo-400 h-full w-[92%]" />
                </div>
              </div>

              {/* Telemetry Stage 4 */}
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <div className="flex justify-between text-gray-400 text-[11px] mb-1">
                  <span>Explainability & XAI</span>
                  <span className="text-purple-400">Grad-CAM Ready</span>
                </div>
                <div className="text-white font-medium text-xs">
                  Gradient Saliency Overlay • Streamlit / FastAPI
                </div>
                <div className="w-full bg-white/10 h-1 rounded-full mt-2 overflow-hidden">
                  <div className="bg-purple-400 h-full w-[88%]" />
                </div>
              </div>

            </div>

            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-gray-400">
              <span>Candidate: {profileData.name}</span>
              <span className="text-emerald-400">Zero Hallucinations</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
