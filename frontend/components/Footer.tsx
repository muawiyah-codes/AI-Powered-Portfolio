"use client";

import React from "react";
import { Bot, Terminal, Mail, Heart, Sparkles } from "lucide-react";
import { Github, Linkedin } from "./Icons";
import { profileData } from "../data/profile";

interface FooterProps {
  onOpenChat: () => void;
  onOpenTerminal: () => void;
}

export default function Footer({ onOpenChat, onOpenTerminal }: FooterProps) {
  return (
    <footer className="bg-[#05070a] border-t border-white/5 py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/5">
          
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-bold text-white tracking-tight text-lg">
                {profileData.name}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/40">
                AI / ML Systems
              </span>
            </div>
            <p className="text-xs text-gray-500 max-w-sm">
              Architecting production Deep Learning, Generative AI multi-agents, and high-performance Machine Learning.
            </p>
          </div>

          {/* Quick Shortcuts & AI Link */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-gray-400">
            <button
              onClick={onOpenChat}
              className="hover:text-cyan-400 flex items-center gap-1.5 transition-colors"
            >
              <Bot className="w-3.5 h-3.5 text-cyan-400" />
              <span>Ask AI</span>
            </button>
            <span>•</span>
            <button
              onClick={onOpenTerminal}
              className="hover:text-cyan-400 flex items-center gap-1.5 transition-colors"
            >
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>CLI Terminal</span>
            </button>
            <span>•</span>
            <a
              href={profileData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <span>•</span>
            <a
              href={profileData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-300 flex items-center gap-1.5 transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5 text-cyan-400" />
              <span>LinkedIn</span>
            </a>
          </div>

        </div>

        {/* Bottom row with system telemetry status */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-gray-500 gap-3 text-center sm:text-left">
          
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-gray-400">RAG Engine & Portfolio Systems Operational</span>
          </div>

          <div>
            Built with Next.js, FastAPI, LangChain, Groq & Tailwind CSS
          </div>

          <div>
            © {new Date().getFullYear()} {profileData.name}. All verified rights reserved.
          </div>

        </div>

      </div>
    </footer>
  );
}
