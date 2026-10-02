"use client";

import React, { useState, useMemo } from "react";
import { 
  Code, 
  Search, 
  Sparkles, 
  ExternalLink, 
  Layers, 
  ArrowRight,
  ShieldCheck,
  Cpu,
  Bot,
  Brain,
  Activity,
  Filter
} from "lucide-react";
import { Github } from "./Icons";
import { projectsData, Project } from "../data/projects";
import { semanticProjectSearch } from "../lib/rag-client";

interface ProjectsShowcaseProps {
  onSelectProject: (project: Project) => void;
  onOpenChatWithQuery?: (query: string) => void;
}

export default function ProjectsShowcase({ onSelectProject, onOpenChatWithQuery }: ProjectsShowcaseProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = [
    "All",
    "Deep Learning",
    "Generative AI",
    "Machine Learning",
    "Computer Vision"
  ];

  // Filter projects by category and semantic search query
  const displayedProjects = useMemo(() => {
    let projects = projectsData;

    // Apply semantic query if user typed
    if (searchQuery.trim().length > 1) {
      projects = semanticProjectSearch(searchQuery, 10);
    }

    // Apply category filter
    if (selectedCategory !== "All") {
      projects = projects.filter((p) => {
        if (selectedCategory === "Computer Vision") {
          return p.tags.includes("Computer Vision") || p.category === "Deep Learning";
        }
        return p.category === selectedCategory;
      });
    }

    return projects;
  }, [selectedCategory, searchQuery]);

  return (
    <section id="projects" className="py-20 relative bg-[#07090e] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-300 text-xs font-mono mb-3">
            <Code className="w-3.5 h-3.5" />
            <span>Production Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            Engineered AI & Machine Learning Systems
          </h2>
          <p className="max-w-2xl text-gray-400 text-sm sm:text-base leading-relaxed">
            Every project below represents an end-to-end engineered system with verifiable metrics, defensive guardrails, and real-world deployment.
          </p>
        </div>

        {/* Semantic Search & Category Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          
          {/* Semantic Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search semantically (e.g. 'CNN with guardrails', 'RAG', 'agents')..."
              className="w-full bg-[#0c111e] border border-white/10 focus:border-cyan-500 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 font-sans transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-gray-500 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all border whitespace-nowrap ${
                  selectedCategory === cat
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-md shadow-cyan-950"
                    : "bg-white/5 text-gray-400 border-white/5 hover:border-white/10 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* Projects Grid */}
        {displayedProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedProjects.map((project) => (
              <div
                key={project.id}
                className="glass-panel glass-panel-hover rounded-2xl p-6 border border-white/10 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Accent Top Border */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent group-hover:via-cyan-400 transition-all" />

                <div>
                  {/* Category and Metrics Pill */}
                  <div className="flex items-center justify-between text-xs font-mono mb-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-800/40 text-[11px]">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="flex items-center gap-1 text-[11px] text-emerald-400">
                        <Sparkles className="w-3 h-3" />
                        <span>Featured</span>
                      </span>
                    )}
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mb-1.5 tracking-tight">
                    {project.title}
                  </h3>
                  <div className="text-xs text-cyan-400/90 font-mono mb-3 line-clamp-1">
                    {project.subtitle}
                  </div>

                  {/* Summary */}
                  <p className="text-xs text-gray-300 line-clamp-3 leading-relaxed font-light mb-4">
                    {project.summary}
                  </p>

                  {/* Key Metrics Badges */}
                  <div className="grid grid-cols-2 gap-2 mb-4 p-2.5 rounded-xl bg-black/40 border border-white/5 font-mono text-[11px]">
                    {Object.entries(project.metrics).slice(0, 2).map(([key, val], i) => (
                      <div key={i} className="truncate">
                        <span className="text-gray-500 block text-[10px] uppercase truncate">{key}</span>
                        <span className="text-cyan-300 font-semibold">{val}</span>
                      </div>
                    ))}
                  </div>

                  {/* Technologies Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.technologies.slice(0, 5).map((tech, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-gray-300 border border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 5 && (
                      <span className="text-[10px] font-mono text-gray-500 px-1 py-0.5">
                        +{project.technologies.length - 5}
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onSelectProject(project)}
                    className="flex-1 py-2 rounded-xl bg-white/5 hover:bg-cyan-950/50 hover:text-cyan-300 text-white text-xs font-mono flex items-center justify-center gap-1.5 border border-white/10 hover:border-cyan-500/40 transition-all"
                  >
                    <Layers className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Case Study & Architecture</span>
                  </button>

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 transition-colors"
                    title="GitHub Code"
                    aria-label="GitHub Code"
                  >
                    <Github className="w-4 h-4" />
                  </a>

                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 transition-colors"
                    title="Live Demo"
                    aria-label="Live Demo"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-2xl bg-white/5 border border-white/10 max-w-lg mx-auto">
            <Search className="w-8 h-8 text-gray-500 mx-auto mb-3" />
            <h4 className="text-base font-semibold text-white mb-1">
              No Projects Matched Your Search
            </h4>
            <p className="text-xs text-gray-400 mb-4">
              Try searching for &ldquo;CNN&rdquo;, &ldquo;RAG&rdquo;, &ldquo;LangChain&rdquo;, &ldquo;Heart Disease&rdquo;, or reset filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-mono hover:bg-cyan-500/30 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
