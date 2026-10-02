"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Command, 
  Search, 
  Bot, 
  Briefcase, 
  Code, 
  FileText,
  Mail, 
  ArrowRight, 
  Zap, 
  Sparkles,
  Layers,
  Terminal,
  Activity,
  Download
} from "lucide-react";
import { Github, Linkedin } from "./Icons";
import { semanticProjectSearch } from "../lib/rag-client";
import { profileData } from "../data/profile";
import { Project } from "../data/projects";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChat: (initialQuery?: string) => void;
  onSelectProject: (project: Project) => void;
  onNavigateSection: (sectionId: string) => void;
  onToggleRecruiterMode: () => void;
  onToggleTerminal: () => void;
}

export default function CommandPalette({
  isOpen,
  onClose,
  onOpenChat,
  onSelectProject,
  onNavigateSection,
  onToggleRecruiterMode,
  onToggleTerminal
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Base navigation commands
  const baseCommands = [
    {
      id: "ask-ai",
      title: "Ask AI Assistant",
      subtitle: "Ask a question about Muawiyah's projects or skills",
      icon: Bot,
      category: "AI Actions",
      action: () => {
        onClose();
        onOpenChat(query.startsWith(">") ? query.slice(1).trim() : query);
      }
    },
    {
      id: "projects",
      title: "View All Projects",
      subtitle: "Browse computer vision, GenAI, and ML projects",
      icon: Code,
      category: "Navigation",
      action: () => {
        onClose();
        onNavigateSection("projects");
      }
    },
    {
      id: "ai-lab",
      title: "Explore AI Lab",
      subtitle: "Interactive deep-dive architecture diagrams",
      icon: Layers,
      category: "Navigation",
      action: () => {
        onClose();
        onNavigateSection("ai-lab");
      }
    },
    {
      id: "skills",
      title: "View Skills Ecosystem",
      subtitle: "Explore interactive skills and their project mappings",
      icon: Zap,
      category: "Navigation",
      action: () => {
        onClose();
        onNavigateSection("skills");
      }
    },
    {
      id: "recruiter-mode",
      title: "Toggle Recruiter Mode",
      subtitle: "Switch to 30-sec executive overview dashboard",
      icon: Briefcase,
      category: "Modes",
      action: () => {
        onClose();
        onToggleRecruiterMode();
      }
    },
    {
      id: "terminal-mode",
      title: "Launch Developer Terminal",
      subtitle: "Interact via UNIX CLI emulator ($ whoami, $ skills)",
      icon: Terminal,
      category: "Modes",
      action: () => {
        onClose();
        onToggleTerminal();
      }
    },
    {
      id: "resume",
      title: "Open Resume Explorer",
      subtitle: "View education, experience, and certifications",
      icon: FileText,
      category: "Navigation",
      action: () => {
        onClose();
        onNavigateSection("resume");
      }
    },
    {
      id: "download-resume",
      title: "Download Resume (PDF)",
      subtitle: "Official verified ATS-optimized PDF resume",
      icon: Download,
      category: "Document",
      action: () => {
        onClose();
        const a = document.createElement("a");
        a.href = "/Muawiyah_Resume.pdf";
        a.download = "Muawiyah_Resume.pdf";
        a.click();
      }
    },
    {
      id: "contact",
      title: "Contact Me",
      subtitle: "Send a direct message or get contact details",
      icon: Mail,
      category: "Connect",
      action: () => {
        onClose();
        onNavigateSection("contact");
      }
    },
    {
      id: "github",
      title: "GitHub Profile",
      subtitle: profileData.github,
      icon: Github,
      category: "External",
      action: () => {
        window.open(profileData.github, "_blank");
        onClose();
      }
    },
    {
      id: "linkedin",
      title: "LinkedIn Profile",
      subtitle: profileData.linkedin,
      icon: Linkedin,
      category: "External",
      action: () => {
        window.open(profileData.linkedin, "_blank");
        onClose();
      }
    }
  ];

  // If query is typed, search semantically among projects
  const semanticResults = query.trim() ? semanticProjectSearch(query, 3) : [];

  // Filter commands
  const filteredCommands = query.trim()
    ? baseCommands.filter(
        (c) =>
          c.title.toLowerCase().includes(query.toLowerCase()) ||
          c.subtitle.toLowerCase().includes(query.toLowerCase())
      )
    : baseCommands;

  // Flattened items for unified arrow key navigation
  const allItems = [
    ...semanticResults.map((project) => ({
      id: `project-${project.id}`,
      action: () => {
        onSelectProject(project);
        onClose();
      }
    })),
    ...filteredCommands.map((cmd) => ({
      id: `cmd-${cmd.id}`,
      action: cmd.action
    }))
  ];

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, allItems.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + allItems.length) % Math.max(1, allItems.length));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (allItems[selectedIndex]) {
        allItems[selectedIndex].action();
      } else if (query.trim()) {
        onClose();
        onOpenChat(query);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Palette Container */}
      <div className="relative w-full max-w-2xl bg-[#090d16] border border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-950/60 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Search Input Box */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10 bg-[#0d1322]">
          <Search className="w-5 h-5 text-cyan-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleInputKeyDown}
            placeholder="Type a command or natural language search (e.g. 'show RAG projects', 'FastAPI', 'CNN')..."
            className="flex-1 bg-transparent text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none font-sans"
          />
          <kbd className="text-[11px] font-mono bg-white/10 text-gray-400 px-2 py-0.5 rounded border border-white/10">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2 space-y-4">
          
          {/* Semantic Project Matches (if user searched) */}
          {semanticResults.length > 0 && (
            <div>
              <div className="px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3" />
                <span>Semantic Project Matches</span>
              </div>
              <div className="mt-1 space-y-1">
                {semanticResults.map((project, sIdx) => {
                  const isSelected = selectedIndex === sIdx;
                  return (
                    <button
                      key={project.id}
                      onClick={() => {
                        onSelectProject(project);
                        onClose();
                      }}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-all text-left group border ${
                        isSelected
                          ? "bg-cyan-950/70 border-cyan-400/80 ring-1 ring-cyan-400/40 shadow-md"
                          : "hover:bg-white/5 border-transparent hover:border-cyan-500/30"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-colors ${
                          isSelected
                            ? "bg-cyan-500/20 border-cyan-400 text-cyan-300"
                            : "bg-cyan-950/80 border-cyan-800/40 text-cyan-300"
                        }`}>
                          <Code className="w-4 h-4" />
                        </div>
                        <div>
                          <div className={`text-xs sm:text-sm font-semibold transition-colors ${
                            isSelected ? "text-cyan-300" : "text-white group-hover:text-cyan-300"
                          }`}>
                            {project.title}
                          </div>
                          <div className="text-[11px] text-gray-400 line-clamp-1">
                            {project.summary}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-gray-300 border border-white/10">
                          {project.category}
                        </span>
                        <ArrowRight className={`w-3.5 h-3.5 transition-all ${
                          isSelected ? "text-cyan-400 translate-x-1" : "text-gray-500 group-hover:text-cyan-400 group-hover:translate-x-0.5"
                        }`} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Regular Commands */}
          <div>
            <div className="px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-gray-400">
              Actions & Navigation
            </div>
            <div className="mt-1 space-y-1">
              {filteredCommands.map((cmd, cIdx) => {
                const Icon = cmd.icon;
                const itemIndex = semanticResults.length + cIdx;
                const isSelected = selectedIndex === itemIndex;

                return (
                  <button
                    key={cmd.id}
                    onClick={cmd.action}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-all text-left group border ${
                      isSelected
                        ? "bg-cyan-950/70 border-cyan-400/80 ring-1 ring-cyan-400/40 shadow-md"
                        : "hover:bg-white/5 border-transparent hover:border-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-colors ${
                        isSelected
                          ? "bg-cyan-500/20 border-cyan-400 text-cyan-300"
                          : "bg-white/5 border-white/10 text-gray-300 group-hover:text-cyan-400 group-hover:border-cyan-500/30"
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className={`text-xs sm:text-sm font-medium transition-colors ${
                          isSelected ? "text-cyan-300 font-semibold" : "text-white group-hover:text-cyan-300"
                        }`}>
                          {cmd.title}
                        </div>
                        <div className="text-[11px] text-gray-400">
                          {cmd.subtitle}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-gray-500 group-hover:text-gray-300 transition-colors">
                      {cmd.category}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Ask AI Direct Query Fallback */}
          {query.trim() && (
            <div className="p-2 border-t border-white/5">
              <button
                onClick={() => {
                  onClose();
                  onOpenChat(query);
                }}
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-gradient-to-r from-cyan-950/60 to-emerald-950/60 border border-cyan-800/40 text-left hover:border-cyan-500 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Bot className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs text-white">
                    Ask AI Assistant: <span className="text-cyan-300 font-semibold">&ldquo;{query}&rdquo;</span>
                  </span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
              </button>
            </div>
          )}

        </div>

        {/* Footer Hint */}
        <div className="px-4 py-2.5 bg-[#07090e] border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-gray-500">
          <div className="flex items-center gap-3">
            <span>↑↓ to navigate</span>
            <span>↵ to select</span>
            <span>esc to close</span>
          </div>
          <span className="text-cyan-400/80">Semantic Matching Enabled</span>
        </div>

      </div>
    </div>
  );
}
