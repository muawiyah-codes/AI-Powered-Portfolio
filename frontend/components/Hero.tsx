"use client";

import React, { useState, useEffect } from "react";
import { 
  Bot, 
  ArrowRight, 
  FileText, 
  Sparkles, 
  Brain
} from "lucide-react";
import { Github, Linkedin } from "./Icons";
import AnimatedProfileAvatar from "./AnimatedProfileAvatar";
import { profileData } from "../data/profile";

interface HeroProps {
  onOpenChat: () => void;
  onExploreWork: () => void;
  onOpenResume: () => void;
}

export default function Hero({ onOpenChat, onExploreWork, onOpenResume }: HeroProps) {
  const [subIndex, setSubIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const phrases = profileData.subtitles;

  useEffect(() => {
    const currentPhrase = phrases[subIndex % phrases.length];
    const typingSpeed = isDeleting ? 30 : 65;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedText(currentPhrase.substring(0, displayedText.length + 1));
        if (displayedText.length + 1 === currentPhrase.length) {
          setTimeout(() => setIsDeleting(true), 2200);
        }
      } else {
        setDisplayedText(currentPhrase.substring(0, displayedText.length - 1));
        if (displayedText.length === 0) {
          setIsDeleting(false);
          setSubIndex((prev) => prev + 1);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, subIndex, phrases]);

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-grid-pattern">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-gradient-to-tr from-cyan-500/10 via-emerald-500/10 to-indigo-500/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute top-12 left-10 w-72 h-72 bg-cyan-600/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-12 right-10 w-96 h-96 bg-purple-600/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Status Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-800/40 text-cyan-300 text-xs font-mono mb-6 backdrop-blur-md shadow-lg shadow-cyan-950/30">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{profileData.status}</span>
          <span className="text-gray-500">•</span>
          <span className="text-gray-400">IKGPTU (CGPA: 8.0)</span>
        </div>

        {/* Animated Profile Avatar with Telemetry Chips */}
        <div className="relative mb-5 flex items-center justify-center">
          <AnimatedProfileAvatar size="lg" />

          {/* Left Floating Telemetry Chip */}
          <div className="hidden lg:flex absolute -left-44 xl:-left-52 top-12 items-center gap-2.5 px-3.5 py-2 rounded-xl bg-[#0b101c]/90 border border-cyan-500/30 backdrop-blur-md shadow-xl text-left animate-subtle-float">
            <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-800/50 flex items-center justify-center text-cyan-400">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] text-gray-400 font-mono">Generative AI</div>
              <div className="text-xs font-bold text-white font-mono">Multi-Agent Loops</div>
            </div>
          </div>

          {/* Right Floating Telemetry Chip */}
          <div 
            className="hidden lg:flex absolute -right-44 xl:-right-52 top-12 items-center gap-2.5 px-3.5 py-2 rounded-xl bg-[#0b101c]/90 border border-emerald-500/30 backdrop-blur-md shadow-xl text-left animate-subtle-float"
            style={{ animationDelay: "2.5s" }}
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-800/50 flex items-center justify-center text-emerald-400">
              <Brain className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] text-gray-400 font-mono">Computer Vision</div>
              <div className="text-xs font-bold text-white font-mono">90%+ CV Accuracy</div>
            </div>
          </div>
        </div>

        {/* Developer Name */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-3">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-gray-400">
            {profileData.name}
          </span>
        </h1>

        {/* Role & Core Domains */}
        <div className="text-lg sm:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 mb-4 tracking-tight">
          AI / ML Engineer & Data Scientist
        </div>

        <p className="text-xs sm:text-sm font-mono text-gray-400 tracking-wider uppercase mb-6 flex flex-wrap items-center justify-center gap-2 max-w-2xl">
          <span>Data Science</span>
          <span className="text-cyan-500">•</span>
          <span>Machine Learning</span>
          <span className="text-cyan-500">•</span>
          <span>Deep Learning</span>
          <span className="text-cyan-500">•</span>
          <span>Generative AI</span>
        </p>

        {/* Animated Changing Subtitle */}
        <div className="h-12 flex items-center justify-center mb-8">
          <div className="text-xl sm:text-2xl md:text-3xl font-mono text-gray-200 flex items-center">
            <span>&gt; {displayedText}</span>
            <span className="w-2.5 h-6 bg-cyan-400 ml-1.5 animate-pulse inline-block" />
          </div>
        </div>

        {/* Tagline / Value Proposition */}
        <p className="text-sm sm:text-base text-gray-300 max-w-2xl mb-10 leading-relaxed font-light">
          {profileData.tagline}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mb-14">
          <button
            onClick={onExploreWork}
            className="group px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-medium text-sm flex items-center gap-2 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] transition-all"
          >
            <span>Explore My Work</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onOpenChat}
            className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium text-sm flex items-center gap-2 border border-white/10 hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/10 transition-all"
          >
            <Bot className="w-4 h-4 text-cyan-400" />
            <span>Ask My AI</span>
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
          </button>

          <button
            onClick={onOpenResume}
            className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-sm font-medium flex items-center gap-2 border border-white/10 transition-all"
          >
            <FileText className="w-4 h-4 text-emerald-400" />
            <span>Resume Explorer</span>
          </button>

          <a
            href={profileData.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 hover:border-gray-500 transition-all"
            title="GitHub Profile"
            aria-label="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>

          <a
            href={profileData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-cyan-400 hover:text-cyan-300 border border-white/10 hover:border-cyan-500/40 transition-all"
            title="LinkedIn Profile"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>
        </div>

        {/* Live System Telemetry Banner */}
        <div className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-3 text-left">
          {profileData.stats.map((stat, idx) => (
            <div
              key={idx}
              className="glass-panel rounded-xl p-4 border border-white/5 hover:border-cyan-500/30 transition-all group"
            >
              <div className="text-[11px] font-mono text-gray-400 mb-1 flex items-center justify-between">
                <span>{stat.label}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 group-hover:scale-125 transition-transform" />
              </div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-white mb-0.5 tracking-tight">
                {stat.value}
              </div>
              <div className="text-[10px] text-cyan-300/80 font-mono truncate">
                {stat.sublabel}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
