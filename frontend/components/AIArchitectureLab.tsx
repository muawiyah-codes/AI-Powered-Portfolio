"use client";

import React, { useState } from "react";
import { 
  Layers, 
  Cpu, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Bot, 
  Brain, 
  Activity, 
  Database,
  ExternalLink
} from "lucide-react";
import { labSystems, LabSystem, ArchitectureNode } from "../data/architectureLab";

interface AIArchitectureLabProps {
  onOpenProjectCaseStudy?: (projectId: string) => void;
}

export default function AIArchitectureLab({ onOpenProjectCaseStudy }: AIArchitectureLabProps) {
  const [selectedSystem, setSelectedSystem] = useState<LabSystem>(labSystems[0]);
  const [selectedNode, setSelectedNode] = useState<ArchitectureNode>(labSystems[0].nodes[1]);

  return (
    <section id="ai-lab" className="py-20 relative bg-[#07090e] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-300 text-xs font-mono mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>Interactive Engineering Sandbox</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            AI Architecture Lab
          </h2>
          <p className="max-w-2xl text-gray-400 text-sm sm:text-base leading-relaxed">
            Click any system below to inspect its inner workings. Select individual nodes to understand the engineering rationale, technologies, and verified project implementations.
          </p>

          {/* System Selection Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-8">
            {labSystems.map((sys) => (
              <button
                key={sys.id}
                onClick={() => {
                  setSelectedSystem(sys);
                  setSelectedNode(sys.nodes[0]);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-mono transition-all border flex items-center gap-2 ${
                  selectedSystem.id === sys.id
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/60 shadow-lg shadow-cyan-950"
                    : "bg-white/5 text-gray-400 border-white/5 hover:border-white/10 hover:text-white"
                }`}
              >
                <span>{sys.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Lab Workspace */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#090d16] border border-cyan-500/30 shadow-2xl shadow-cyan-950/40 space-y-8">
          
          {/* Active System Subheader */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-white/10 gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
                <span>{selectedSystem.category}</span>
                <span className="text-gray-500">•</span>
                <span className="text-emerald-400 font-semibold">{selectedSystem.metricsHighlight}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {selectedSystem.name}
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 font-light mt-0.5">
                {selectedSystem.description}
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="hidden md:inline text-[11px] font-mono text-gray-400 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                Click any node in the flow below to inspect
              </span>
              {onOpenProjectCaseStudy && (
                <button
                  onClick={() => onOpenProjectCaseStudy(selectedSystem.id)}
                  className="px-3.5 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-mono border border-cyan-400/40 flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <span>Case Study</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Node Flow Diagram */}
          <div className="overflow-x-auto pb-4 pt-2 no-scrollbar">
            <div className="flex items-center gap-3 min-w-[700px]">
              {selectedSystem.nodes.map((node, index) => {
                const isSelected = selectedNode.id === node.id;
                return (
                  <React.Fragment key={node.id}>
                    <button
                      onClick={() => setSelectedNode(node)}
                      className={`relative flex-1 p-4 rounded-xl text-left transition-all border ${
                        isSelected
                          ? `bg-cyan-950/60 border-cyan-400 shadow-xl shadow-cyan-950/60 scale-[1.03] ring-1 ring-cyan-400/50`
                          : "bg-[#0f1526] border-white/10 hover:border-cyan-500/40 opacity-80 hover:opacity-100"
                      }`}
                    >
                      <div className="text-[10px] font-mono text-gray-400 mb-1 flex items-center justify-between">
                        <span>STAGE 0{index + 1}</span>
                        {isSelected && (
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                        )}
                      </div>
                      <div className="font-semibold text-xs sm:text-sm text-white mb-1">
                        {node.name}
                      </div>
                      <div className="text-[11px] text-cyan-300 font-mono truncate">
                        {node.shortRole}
                      </div>
                    </button>

                    {index < selectedSystem.nodes.length - 1 && (
                      <div className="flex-shrink-0 text-cyan-500/60 font-mono text-sm px-0.5">
                        <ArrowRight className="w-4 h-4 animate-pulse" />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Detailed Inspector for Selected Node */}
          <div className="p-6 rounded-xl bg-[#0c1220] border border-cyan-500/20 shadow-inner grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in duration-200">
            
            {/* Column 1: What it Does */}
            <div className="space-y-2">
              <div className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5" />
                <span>1. What It Does</span>
              </div>
              <p className="text-xs text-gray-200 leading-relaxed font-light">
                {selectedNode.whatItDoes}
              </p>
            </div>

            {/* Column 2: Why it is Needed */}
            <div className="space-y-2">
              <div className="text-[11px] font-mono text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>2. Why It Is Needed</span>
              </div>
              <p className="text-xs text-gray-200 leading-relaxed font-light">
                {selectedNode.whyNeeded}
              </p>
            </div>

            {/* Column 3: Which Tech Used */}
            <div className="space-y-2">
              <div className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>3. Technology Stack</span>
              </div>
              <div className="p-3 rounded-lg bg-black/40 border border-white/5 font-mono text-xs text-emerald-300">
                {selectedNode.technologyUsed}
              </div>
            </div>

            {/* Column 4: Which Project Uses It */}
            <div className="space-y-2">
              <div className="text-[11px] font-mono text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>4. Verified Implementation</span>
              </div>
              <button
                onClick={() => onOpenProjectCaseStudy?.(selectedSystem.id)}
                className="w-full p-3 rounded-lg bg-black/40 hover:bg-indigo-950/40 border border-white/5 hover:border-indigo-500/40 font-mono text-xs text-indigo-300 flex items-center justify-between transition-colors text-left group"
              >
                <span className="truncate">{selectedNode.usedInProject}</span>
                <ExternalLink className="w-3.5 h-3.5 text-indigo-400 group-hover:translate-x-0.5 transition-transform flex-shrink-0 ml-1.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
