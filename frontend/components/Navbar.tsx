"use client";

import React, { useState, useEffect } from "react";
import { 
  Bot, 
  Terminal, 
  Briefcase, 
  Command, 
  Menu, 
  X, 
  Sparkles,
  ExternalLink
} from "lucide-react";
import { Github, Linkedin } from "./Icons";
import AnimatedProfileAvatar from "./AnimatedProfileAvatar";
import { profileData } from "../data/profile";

interface NavbarProps {
  onOpenChat: () => void;
  onOpenCommand: () => void;
  recruiterMode: boolean;
  onToggleRecruiterMode: () => void;
  terminalOpen: boolean;
  onToggleTerminal: () => void;
}

export default function Navbar({
  onOpenChat,
  onOpenCommand,
  recruiterMode,
  onToggleRecruiterMode,
  terminalOpen,
  onToggleTerminal
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sectionIds = ["about", "skills", "projects", "ai-lab", "resume", "contact"];
      const scrollPos = window.scrollY + 140;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "AI Lab", href: "#ai-lab" },
    { name: "Resume", href: "#resume" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#07090e]/85 backdrop-blur-md border-b border-white/10 shadow-2xl shadow-cyan-950/20 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <AnimatedProfileAvatar size="xs" showStatus={true} withRadarScan={false} />
          <div className="flex flex-col">
            <span className="font-semibold tracking-tight text-white flex items-center gap-1.5 text-base">
              {profileData.name}
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-800/40">
                AI / ML
              </span>
            </span>
            <span className="text-[11px] text-gray-400 font-mono -mt-0.5">
              Production AI Systems
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links with Active Indicator */}
        <nav className="hidden lg:flex items-center gap-2">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <a
                key={link.name}
                href={link.href}
                className={`relative px-3 py-1.5 text-xs uppercase tracking-wider font-mono transition-all rounded-lg ${
                  isActive
                    ? "text-cyan-300 font-semibold bg-cyan-950/50 border border-cyan-800/40 shadow-sm shadow-cyan-950"
                    : "text-gray-300 hover:text-cyan-400 hover:bg-white/5 border border-transparent"
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-2.5 right-2.5 h-[2px] bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Recruiter Mode Toggle */}
          <button
            onClick={onToggleRecruiterMode}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-all border ${
              recruiterMode
                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-lg shadow-emerald-500/20"
                : "bg-white/5 text-gray-300 border-white/10 hover:border-emerald-500/40 hover:text-emerald-300"
            }`}
            title="Toggle Recruiter Executive Summary View"
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Recruiter Mode</span>
            {recruiterMode && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            )}
          </button>

          {/* Terminal Toggle */}
          <button
            onClick={onToggleTerminal}
            className={`p-2 rounded-lg text-xs font-mono transition-all border ${
              terminalOpen
                ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50"
                : "bg-white/5 text-gray-300 border-white/10 hover:border-cyan-500/40 hover:text-cyan-300"
            }`}
            title="Developer CLI Terminal"
            aria-label="Developer Terminal"
          >
            <Terminal className="w-4 h-4" />
          </button>

          {/* Command Bar Trigger */}
          <button
            onClick={onOpenCommand}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:border-cyan-500/40 hover:text-white transition-all text-xs font-mono"
            title="Global Command Palette (Ctrl+K)"
          >
            <Command className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden md:inline text-gray-400">Search</span>
            <kbd className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-gray-400">
              Ctrl K
            </kbd>
          </button>

          {/* Ask My AI Action Button */}
          <button
            onClick={onOpenChat}
            className="relative group flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-medium text-white overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 transition-all duration-300 group-hover:scale-105" />
            <div className="relative flex items-center gap-1.5">
              <Bot className="w-3.5 h-3.5" />
              <span>Ask My AI</span>
              <Sparkles className="w-3 h-3 text-cyan-200 animate-pulse" />
            </div>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onOpenChat}
            className="p-2 rounded-lg bg-gradient-to-r from-cyan-500 to-emerald-500 text-white"
            aria-label="Ask AI"
          >
            <Bot className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-300"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#0a0d15]/95 backdrop-blur-xl border-b border-white/10 px-6 py-6 space-y-4 animate-in fade-in">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-mono uppercase tracking-wider text-gray-300 hover:text-cyan-400 py-1"
              >
                {link.name}
              </a>
            ))}
          </nav>
          <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
            <button
              onClick={() => {
                onToggleRecruiterMode();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-between w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-emerald-300"
            >
              <span className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                Recruiter Mode
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20">
                {recruiterMode ? "Active" : "Standard"}
              </span>
            </button>

            <button
              onClick={() => {
                onToggleTerminal();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-cyan-300"
            >
              <Terminal className="w-4 h-4" />
              Developer CLI Terminal
            </button>

            <button
              onClick={() => {
                onOpenCommand();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-between w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-gray-300"
            >
              <span className="flex items-center gap-2">
                <Command className="w-4 h-4 text-cyan-400" />
                Command Palette
              </span>
              <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded">Ctrl K</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
