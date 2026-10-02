"use client";

import React, { useState } from "react";
import { 
  Zap, 
  Bot, 
  Brain, 
  Activity, 
  Server, 
  Cpu, 
  GitBranch, 
  Code, 
  Layers, 
  Search, 
  CheckCircle, 
  ArrowUpRight 
} from "lucide-react";
import { skillsData, SkillItem } from "../data/skills";

interface SkillsEcosystemProps {
  onSelectProjectByName?: (name: string) => void;
}

export default function SkillsEcosystem({ onSelectProjectByName }: SkillsEcosystemProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [hoveredSkill, setHoveredSkill] = useState<SkillItem | null>(null);

  const categories = ["All", ...skillsData.map((s) => s.category)];

  const displayedSkills = activeCategory === "All"
    ? skillsData.flatMap((cat) => cat.skills)
    : skillsData.find((cat) => cat.category === activeCategory)?.skills || [];

  return (
    <section id="skills" className="py-20 relative bg-[#07090e] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-300 text-xs font-mono mb-3">
            <Zap className="w-3.5 h-3.5" />
            <span>Applied Competency Graph</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            Interactive Technical Ecosystem
          </h2>
          <p className="max-w-2xl text-gray-400 text-sm sm:text-base leading-relaxed">
            Technologies are demonstrated through real implementations, not arbitrary progress percentages. Hover any skill to inspect where and how it was engineered.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all border ${
                  activeCategory === cat
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-md shadow-cyan-950"
                    : "bg-white/5 text-gray-400 border-white/5 hover:border-white/10 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Two-Column Display: Interactive Nodes Grid + Real-time Inspector Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left: Skills Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {displayedSkills.map((skill, idx) => {
              const isHovered = hoveredSkill?.name === skill.name;

              return (
                <div
                  key={idx}
                  onMouseEnter={() => setHoveredSkill(skill)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className={`p-4 rounded-xl transition-all cursor-pointer border ${
                    isHovered
                      ? "bg-gradient-to-br from-cyan-950/70 to-emerald-950/50 border-cyan-400 shadow-xl shadow-cyan-950/40 scale-[1.02]"
                      : "bg-[#0c101d] border-white/5 hover:border-cyan-500/30"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-sm text-white flex items-center gap-1.5">
                      {skill.name}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                        skill.level === "Advanced"
                          ? "bg-cyan-950 text-cyan-300 border-cyan-800/50"
                          : skill.level === "Certified"
                          ? "bg-purple-950 text-purple-300 border-purple-800/50"
                          : "bg-emerald-950 text-emerald-300 border-emerald-800/50"
                      }`}
                    >
                      {skill.level}
                    </span>
                  </div>

                  <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed mb-3 font-light">
                    {skill.description}
                  </p>

                  <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-cyan-400/90">
                    <span className="truncate max-w-[150px]">
                      {skill.usedIn.length} Linked Project{skill.usedIn.length > 1 ? "s" : ""}
                    </span>
                    <ArrowUpRight className="w-3 h-3 text-gray-500" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Sticky Inspector Detail Card */}
          <div className="lg:col-span-4 sticky top-28">
            <div className="p-6 rounded-2xl bg-[#0b101c] border border-cyan-500/30 shadow-2xl shadow-cyan-950/30 relative">
              <div className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>Skill Node Inspector</span>
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              </div>

              {hoveredSkill ? (
                <div className="space-y-4 animate-in fade-in">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      {hoveredSkill.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-gray-400">
                        {hoveredSkill.category}
                      </span>
                      <span className="text-gray-500">•</span>
                      <span className="text-xs font-mono text-emerald-400 font-semibold">
                        {hoveredSkill.level}
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-xs text-gray-200 leading-relaxed font-light">
                    {hoveredSkill.description}
                  </div>

                  <div>
                    <div className="text-xs font-mono text-gray-400 mb-2 uppercase tracking-wider">
                      Applied In Verified Projects:
                    </div>
                    <div className="space-y-2">
                      {hoveredSkill.usedIn.map((projName, i) => (
                        <button
                          key={i}
                          onClick={() => onSelectProjectByName?.(projName)}
                          className="w-full p-2.5 rounded-lg bg-[#07090e] hover:bg-cyan-950/40 border border-white/10 hover:border-cyan-500/50 flex items-center justify-between text-xs text-white transition-all text-left group"
                        >
                          <span className="font-medium text-cyan-300 group-hover:text-cyan-200">{projName}</span>
                          <span className="flex items-center gap-1 text-[10px] font-mono text-gray-400 group-hover:text-cyan-400">
                            <span>Inspect</span>
                            <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="text-[11px] font-mono text-gray-400 pt-2 border-t border-white/5">
                    Click any linked project to inspect the code & architecture.
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 mx-auto flex items-center justify-center text-gray-400">
                    <Activity className="w-5 h-5 text-cyan-400 animate-pulse" />
                  </div>
                  <h4 className="text-sm font-semibold text-white">
                    Hover Over Any Skill
                  </h4>
                  <p className="text-xs text-gray-400 max-w-xs mx-auto leading-relaxed font-light">
                    Move your cursor over skills like <strong className="text-cyan-400">LangChain</strong>, <strong className="text-cyan-400">EfficientNetV2</strong>, or <strong className="text-cyan-400">Grad-CAM</strong> to trace their exact project implementations.
                  </p>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
