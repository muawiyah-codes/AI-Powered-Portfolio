"use client";

import React, { useState, useEffect } from "react";
import { 
  X, 
  ExternalLink, 
  Layers, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Cpu,
  BarChart2,
  BookOpen
} from "lucide-react";
import { Github } from "./Icons";
import { Project } from "../data/projects";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeStep, setActiveStep] = useState<number>(1);

  useEffect(() => {
    setActiveStep(1);
  }, [project?.id]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-[#090d16] border border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-950/60 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-5 bg-[#0c1220] border-b border-white/10 flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800/40">
                {project.category}
              </span>
              <span className="text-[11px] font-mono text-gray-400">
                Case Study & Architecture
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {project.title}
            </h2>
            <p className="text-xs sm:text-sm text-cyan-300 font-light">
              {project.subtitle}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 font-sans text-sm">
          
          {/* Verified Metrics Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {Object.entries(project.metrics).map(([key, value], idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-white/5 border border-white/5 font-mono"
              >
                <div className="text-[11px] text-gray-400 truncate">{key}</div>
                <div className="text-lg font-bold text-cyan-400 tracking-tight">
                  {value}
                </div>
              </div>
            ))}
          </div>

          {/* Problem & Solution Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-rose-950/20 border border-rose-900/30 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-rose-400 uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4" />
                <span>The Problem & Need</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
                {project.problem}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-emerald-950/20 border border-emerald-900/30 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Engineered Solution</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Interactive Architecture Flow Diagram */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider">
                <Layers className="w-4 h-4" />
                <span>Interactive System Architecture Flow</span>
              </div>
              <span className="text-[11px] font-mono text-gray-500">
                Click steps to inspect
              </span>
            </div>

            {/* Stepper Buttons */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
              {project.architectureSteps.map((step) => (
                <button
                  key={step.step}
                  onClick={() => setActiveStep(step.step)}
                  className={`px-3 py-2 rounded-xl text-xs font-mono whitespace-nowrap transition-all border flex items-center gap-1.5 ${
                    activeStep === step.step
                      ? "bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-md shadow-cyan-950"
                      : "bg-[#0d1322] text-gray-400 border-white/5 hover:border-white/10"
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-black/40 flex items-center justify-center text-[10px]">
                    {step.step}
                  </span>
                  <span>{step.name}</span>
                </button>
              ))}
            </div>

            {/* Selected Step Detail Panel */}
            {project.architectureSteps.find((s) => s.step === activeStep) && (
              <div className="p-4 rounded-xl bg-[#0c111e] border border-cyan-500/30 text-xs sm:text-sm text-gray-200 leading-relaxed font-light animate-in fade-in">
                <div className="font-semibold text-cyan-300 mb-1 font-mono">
                  Step {activeStep}: {project.architectureSteps.find((s) => s.step === activeStep)?.name}
                </div>
                <p className="text-gray-300">
                  {project.architectureSteps.find((s) => s.step === activeStep)?.description}
                </p>
              </div>
            )}
          </div>

          {/* Challenges & Technical Solutions */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono text-gray-400 uppercase tracking-wider">
              Engineering Challenges & Countermeasures
            </h3>
            <div className="space-y-2.5">
              {project.challenges.map((ch, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex flex-col sm:flex-row sm:items-start justify-between gap-3 text-xs"
                >
                  <div className="sm:w-1/2 text-rose-300/90 font-light flex items-start gap-2">
                    <span className="text-rose-400 font-bold">•</span>
                    <span><strong>Challenge:</strong> {ch}</span>
                  </div>
                  <div className="sm:w-1/2 text-emerald-300/90 font-light flex items-start gap-2 sm:border-l sm:border-white/5 sm:pl-3">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span><strong>Solution:</strong> {project.solutionsImplemented[idx] || "Optimized pipeline architecture."}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Results & Lessons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h4 className="text-xs font-mono text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Verified Quantitative Results</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-gray-300 font-light">
                {project.results.map((res, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{res}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" />
                <span>What I Learned</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-gray-300 font-light">
                {project.whatILearned.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-cyan-400 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Modal Footer with Actions */}
        <div className="px-6 py-4 bg-[#0c1220] border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((t, idx) => (
              <span
                key={idx}
                className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-[#07090e] text-gray-300 border border-white/5"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-mono flex items-center gap-1.5 border border-white/10 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>GitHub Repository</span>
            </a>
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:opacity-95 text-white text-xs font-mono flex items-center gap-1.5 transition-all shadow-md shadow-cyan-950"
            >
              <span>Live System</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
