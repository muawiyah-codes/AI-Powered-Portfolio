"use client";

import React from "react";
import { GitBranch, Star, GitCommit, GitPullRequest, ExternalLink, Code2 } from "lucide-react";
import { Github } from "./Icons";
import { profileData } from "../data/profile";
import { projectsData } from "../data/projects";

export default function GitHubActivity() {
  // Mock contribution block grid (52 weeks x 7 days simplified representation)
  const weeks = 28;
  const days = 7;

  // Deterministic pattern of intensity for aesthetic visualization
  const getIntensity = (w: number, d: number) => {
    const val = (w * 17 + d * 31) % 100;
    if (val > 80) return "bg-cyan-400";
    if (val > 60) return "bg-cyan-600";
    if (val > 40) return "bg-cyan-800/80";
    if (val > 20) return "bg-cyan-950/60";
    return "bg-white/5";
  };

  const languages = [
    { name: "Python", percentage: "82%", color: "bg-cyan-400" },
    { name: "Jupyter Notebook", percentage: "10%", color: "bg-amber-400" },
    { name: "TypeScript / JS", percentage: "5%", color: "bg-emerald-400" },
    { name: "SQL", percentage: "3%", color: "bg-purple-400" }
  ];

  return (
    <section className="py-16 relative bg-[#07090e] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-300 text-xs font-mono mb-2">
              <Github className="w-3.5 h-3.5" />
              <span>Open Source Activity</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              GitHub Engineering Radar
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 font-light mt-0.5">
              Continuous delivery across deep learning, agent pipelines, and open-source machine learning.
            </p>
          </div>

          <a
            href={profileData.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-mono flex items-center gap-2 border border-white/10 transition-colors"
          >
            <span>muawiyah-codes</span>
            <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
          </a>
        </div>

        {/* Contribution Matrix Box */}
        <div className="p-6 rounded-2xl bg-[#090d16] border border-white/10 shadow-xl space-y-6">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div className="text-xs font-mono text-gray-300 flex items-center gap-2">
              <GitCommit className="w-4 h-4 text-cyan-400" />
              <span>Contribution Matrix (Recent Cycles)</span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-gray-500">
              <span>Less</span>
              <span className="w-2.5 h-2.5 rounded-sm bg-white/5" />
              <span className="w-2.5 h-2.5 rounded-sm bg-cyan-950" />
              <span className="w-2.5 h-2.5 rounded-sm bg-cyan-800" />
              <span className="w-2.5 h-2.5 rounded-sm bg-cyan-600" />
              <span className="w-2.5 h-2.5 rounded-sm bg-cyan-400" />
              <span>More</span>
            </div>
          </div>

          {/* Matrix Grid */}
          <div className="overflow-x-auto pb-2 no-scrollbar">
            <div className="flex gap-1 min-w-[620px]">
              {Array.from({ length: weeks }).map((_, w) => (
                <div key={w} className="flex flex-col gap-1">
                  {Array.from({ length: days }).map((_, d) => (
                    <div
                      key={d}
                      className={`w-3 h-3 rounded-[2px] ${getIntensity(w, d)} hover:ring-1 hover:ring-cyan-300 transition-all cursor-pointer`}
                      title={`Week ${w + 1}, Day ${d + 1}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Language Breakdown Bar */}
          <div className="space-y-2 pt-2 border-t border-white/5">
            <div className="flex justify-between text-[11px] font-mono text-gray-400">
              <span>Language Distribution</span>
              <span className="text-cyan-400">Primary: Python</span>
            </div>
            
            {/* Multi-segment Progress Bar */}
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden flex">
              <div className="w-[82%] bg-cyan-400" title="Python 82%" />
              <div className="w-[10%] bg-amber-400" title="Jupyter Notebook 10%" />
              <div className="w-[5%] bg-emerald-400" title="TypeScript/JS 5%" />
              <div className="w-[3%] bg-purple-400" title="SQL 3%" />
            </div>

            <div className="flex flex-wrap gap-4 pt-1">
              {languages.map((l, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-xs font-mono text-gray-300">
                  <span className={`w-2 h-2 rounded-full ${l.color}`} />
                  <span>{l.name}</span>
                  <span className="text-gray-500 font-normal">({l.percentage})</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
