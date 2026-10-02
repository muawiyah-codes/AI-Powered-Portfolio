"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import RecruiterDashboard from "../components/RecruiterDashboard";
import AboutSection from "../components/AboutSection";
import SkillsEcosystem from "../components/SkillsEcosystem";
import ProjectsShowcase from "../components/ProjectsShowcase";
import ProjectModal from "../components/ProjectModal";
import AIArchitectureLab from "../components/AIArchitectureLab";
import AIResumeExplorer from "../components/AIResumeExplorer";
import TerminalMode from "../components/TerminalMode";
import GitHubActivity from "../components/GitHubActivity";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import CommandPalette from "../components/CommandPalette";
import AIChatAssistant from "../components/AIChatAssistant";
import { Project, projectsData } from "../data/projects";
import { Bot, Sparkles, Terminal, Command } from "lucide-react";

export default function Home() {
  const [chatOpen, setChatOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [recruiterMode, setRecruiterMode] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [chatInitialPrompt, setChatInitialPrompt] = useState<string | undefined>(undefined);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Keyboard shortcut listener for Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
      if (e.key === "`" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleOpenChatWithQuery = (query?: string) => {
    setChatInitialPrompt(query);
    setChatOpen(true);
  };

  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#07090e] text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-black">
      
      {/* Top Fixed Navbar */}
      <Navbar
        onOpenChat={() => setChatOpen(true)}
        onOpenCommand={() => setCommandPaletteOpen(true)}
        recruiterMode={recruiterMode}
        onToggleRecruiterMode={() => setRecruiterMode(!recruiterMode)}
        terminalOpen={terminalOpen}
        onToggleTerminal={() => setTerminalOpen(!terminalOpen)}
      />

      <main className="flex-1">
        {/* Full-screen Futuristic Hero */}
        <Hero
          onOpenChat={() => setChatOpen(true)}
          onExploreWork={() => handleNavigateSection("projects")}
          onOpenResume={() => handleNavigateSection("resume")}
        />

        {/* Recruiter Mode Dashboard Banner (conditionally displayed when active) */}
        {recruiterMode && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <RecruiterDashboard
              onClose={() => setRecruiterMode(false)}
              onOpenChatWithPrompt={(prompt) => handleOpenChatWithQuery(prompt)}
              onSelectProject={(project) => setSelectedProject(project)}
            />
          </div>
        )}

        {/* About Section with Visual Cards & Telemetry */}
        <AboutSection />

        {/* Skills Ecosystem with Real Project Linkages */}
        <SkillsEcosystem
          onSelectProjectByName={(name) => {
            const found = projectsData.find((p) => p.title.toLowerCase().includes(name.toLowerCase()));
            if (found) setSelectedProject(found);
          }}
        />

        {/* Verified Projects Showcase with Semantic Search */}
        <ProjectsShowcase
          onSelectProject={(project) => setSelectedProject(project)}
          onOpenChatWithQuery={(query) => handleOpenChatWithQuery(query)}
        />

        {/* Interactive AI Architecture Lab */}
        <AIArchitectureLab
          onOpenProjectCaseStudy={(projId) => {
            const found = projectsData.find((p) => p.id === projId);
            if (found) setSelectedProject(found);
          }}
        />

        {/* Interactive AI Resume Explorer */}
        <AIResumeExplorer
          onOpenChatWithQuery={(query) => handleOpenChatWithQuery(query)}
        />

        {/* GitHub Activity & Language Distribution */}
        <GitHubActivity />

        {/* Minimal Cyber Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenChat={() => setChatOpen(true)}
        onOpenTerminal={() => setTerminalOpen(true)}
      />

      {/* Floating Action Trigger for AI Assistant */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5">
        <button
          onClick={() => setChatOpen(true)}
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 text-white font-medium text-xs sm:text-sm shadow-2xl shadow-cyan-500/40 hover:scale-105 transition-all duration-300 border border-cyan-300/40"
          aria-label="Open AI Assistant"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
          <Bot className="w-4 h-4 text-white" />
          <span className="font-semibold tracking-wide">Ask My AI</span>
          <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
        </button>
      </div>

      {/* Global Command Palette (Ctrl+K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onOpenChat={(query) => handleOpenChatWithQuery(query)}
        onSelectProject={(project) => setSelectedProject(project)}
        onNavigateSection={(sectionId) => handleNavigateSection(sectionId)}
        onToggleRecruiterMode={() => setRecruiterMode(!recruiterMode)}
        onToggleTerminal={() => setTerminalOpen(!terminalOpen)}
      />

      {/* Global AI Chat Assistant Modal / Drawer */}
      <AIChatAssistant
        isOpen={chatOpen}
        onClose={() => {
          setChatOpen(false);
          setChatInitialPrompt(undefined);
        }}
        recruiterMode={recruiterMode}
        initialPrompt={chatInitialPrompt}
      />

      {/* Project Case Study & Architecture Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Developer Terminal Mode */}
      <TerminalMode
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        onOpenChatWithQuery={(query) => handleOpenChatWithQuery(query)}
      />

    </div>
  );
}
