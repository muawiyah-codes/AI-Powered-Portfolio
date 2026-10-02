"use client";

import React, { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, CornerDownLeft } from "lucide-react";
import { profileData } from "../data/profile";
import { projectsData } from "../data/projects";
import { skillsData } from "../data/skills";
import { askPortfolioAI } from "../lib/rag-client";

interface TerminalModeProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChatWithQuery: (query: string) => void;
}

interface CommandHistoryItem {
  id: string;
  command: string;
  output: React.ReactNode;
}

export default function TerminalMode({ isOpen, onClose, onOpenChatWithQuery }: TerminalModeProps) {
  const [history, setHistory] = useState<CommandHistoryItem[]>([
    {
      id: "init",
      command: "init",
      output: (
        <div className="text-gray-300 space-y-1">
          <p className="text-cyan-400 font-bold">
            Muawiyah AI Terminal Environment v2.4.0 [x86_64-antigravity]
          </p>
          <p className="text-gray-400 text-xs">
            Type <span className="text-emerald-400 font-semibold">help</span> to view available commands. Tab completion and Up/Down history are active.
          </p>
        </div>
      )
    }
  ]);
  const [input, setInput] = useState("");
  const [commandIndex, setCommandIndex] = useState(-1);
  const [enteredCommands, setEnteredCommands] = useState<string[]>([]);
  const [isMaximized, setIsMaximized] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isOpen, history]);

  if (!isOpen) return null;

  const handleCommand = async (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    setEnteredCommands((prev) => [...prev, trimmed]);
    setCommandIndex(-1);
    setInput("");

    const parts = trimmed.split(" ");
    const mainCmd = parts[0].toLowerCase();
    const args = parts.slice(1).join(" ");

    let output: React.ReactNode = null;

    switch (mainCmd) {
      case "help":
        output = (
          <div className="space-y-1 text-xs font-mono text-gray-300">
            <p className="text-cyan-300 font-semibold">Available Shell Commands:</p>
            <p><span className="text-emerald-400 w-28 inline-block">whoami</span> Display candidate biography & role</p>
            <p><span className="text-emerald-400 w-28 inline-block">skills</span> List technical competencies by category</p>
            <p><span className="text-emerald-400 w-28 inline-block">projects</span> List all verified projects</p>
            <p><span className="text-emerald-400 w-28 inline-block">projects --genai</span> Filter Generative AI & agent projects</p>
            <p><span className="text-emerald-400 w-28 inline-block">projects --cv</span> Filter Computer Vision & Deep Learning</p>
            <p><span className="text-emerald-400 w-28 inline-block">ask &quot;&lt;query&gt;&quot;</span> Query RAG engine directly via CLI</p>
            <p><span className="text-emerald-400 w-28 inline-block">resume</span> Download or preview official PDF resume</p>
            <p><span className="text-emerald-400 w-28 inline-block">contact</span> Output email, phone, and links</p>
            <p><span className="text-emerald-400 w-28 inline-block">clear</span> Clear terminal buffer</p>
            <p><span className="text-emerald-400 w-28 inline-block">exit</span> Close terminal session</p>
          </div>
        );
        break;

      case "whoami":
        output = (
          <div className="space-y-1 text-xs font-mono text-gray-300">
            <p className="text-cyan-400 font-bold">{profileData.name} — {profileData.role}</p>
            <p className="text-gray-400">{profileData.bio}</p>
            <p className="text-emerald-400 pt-1">B.Tech in Data Science (IKGPTU) • CGPA: 8.0</p>
            <p className="text-gray-400">Student Placement Coordinator @ Gulzar Group of Institution</p>
          </div>
        );
        break;

      case "skills":
        output = (
          <div className="space-y-2 text-xs font-mono text-gray-300">
            {skillsData.map((cat, i) => (
              <div key={i}>
                <span className="text-cyan-400 font-semibold">{cat.category}: </span>
                <span className="text-gray-300">{cat.skills.map((s) => s.name).join(", ")}</span>
              </div>
            ))}
          </div>
        );
        break;

      case "projects":
        const isGenAI = args.includes("--genai");
        const isCV = args.includes("--cv");
        let list = projectsData;
        if (isGenAI) list = projectsData.filter((p) => p.category === "Generative AI");
        if (isCV) list = projectsData.filter((p) => p.category === "Deep Learning" || p.tags.includes("Computer Vision"));

        output = (
          <div className="space-y-2 text-xs font-mono text-gray-300">
            <p className="text-cyan-300">Loaded {list.length} verified project deliverables:</p>
            {list.map((p, i) => (
              <div key={i} className="pl-2 border-l-2 border-cyan-500/40 py-0.5">
                <span className="text-emerald-400 font-bold">{p.title}</span>
                <span className="text-gray-500"> [{p.category}]</span>
                <p className="text-gray-400 text-[11px]">{p.summary}</p>
              </div>
            ))}
          </div>
        );
        break;

      case "ask":
        const queryClean = args.replace(/^["']|["']$/g, "").trim();
        if (!queryClean) {
          output = <p className="text-rose-400 text-xs font-mono">Usage: ask &quot;Your question here&quot;</p>;
        } else {
          const pendingId = "ask-" + Date.now();
          setHistory((prev) => [
            ...prev,
            {
              id: pendingId,
              command: trimmed,
              output: (
                <div className="space-y-1.5 text-xs font-mono text-gray-300">
                  <div className="text-cyan-400 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping inline-block" />
                    <span>Querying neural RAG engine for &ldquo;{queryClean}&rdquo;...</span>
                  </div>
                  <div className="p-2.5 rounded bg-black/50 border border-cyan-500/20 text-gray-400 animate-pulse">
                    Synthesizing grounded response with verified citations...
                  </div>
                </div>
              )
            }
          ]);

          try {
            const res = await askPortfolioAI(queryClean);
            setHistory((prev) =>
              prev.map((item) =>
                item.id === pendingId
                  ? {
                      ...item,
                      output: (
                        <div className="space-y-2 text-xs font-mono text-gray-300">
                          <div className="p-3 rounded-lg bg-black/60 border border-cyan-500/30 whitespace-pre-line text-gray-200 leading-relaxed">
                            {res.reply}
                          </div>
                          {res.sources.length > 0 && (
                            <p className="text-[10px] text-cyan-400/80 font-mono">
                              Citations: {res.sources.map((s) => s.title).join(" | ")}
                            </p>
                          )}
                        </div>
                      )
                    }
                  : item
              )
            );
          } catch {
            setHistory((prev) =>
              prev.map((item) =>
                item.id === pendingId
                  ? {
                      ...item,
                      output: (
                        <p className="text-rose-400 text-xs font-mono">
                          Error: Unable to query RAG engine. Ensure local agent or API is reachable.
                        </p>
                      )
                    }
                  : item
              )
            );
          }
          return;
        }
        break;

      case "resume":
      case "cv":
        output = (
          <div className="space-y-2 text-xs font-mono text-gray-300">
            <p className="text-cyan-400 font-semibold">Official Resume (ATS-Optimized PDF):</p>
            <p className="text-gray-400">Muawiyah — B.Tech Data Science (CGPA: 8.0) • AI / ML Engineer</p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href="/Muawiyah_Resume.pdf"
                download="Muawiyah_Resume.pdf"
                className="px-3 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30 transition-colors"
              >
                [ Download PDF ]
              </a>
              <a
                href="/Muawiyah_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 rounded bg-white/5 text-cyan-300 border border-white/10 hover:bg-white/10 transition-colors"
              >
                [ Preview in New Tab ]
              </a>
            </div>
          </div>
        );
        break;

      case "contact":
        output = (
          <div className="space-y-1 text-xs font-mono text-gray-300">
            <p className="text-cyan-400 font-semibold">Official Contact Channels:</p>
            <p>Email: <a href={`mailto:${profileData.email}`} className="text-emerald-400 underline">{profileData.email}</a></p>
            <p>Phone: <span className="text-emerald-400">{profileData.phone}</span></p>
            <p>LinkedIn: <a href={profileData.linkedin} target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline">{profileData.linkedin}</a></p>
            <p>GitHub: <a href={profileData.github} target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline">{profileData.github}</a></p>
          </div>
        );
        break;

      case "clear":
        setHistory([]);
        return;

      case "exit":
        onClose();
        return;

      default:
        output = (
          <p className="text-rose-400 text-xs font-mono">
            command not found: {mainCmd}. Type <span className="text-cyan-400">help</span> for a list of commands.
          </p>
        );
    }

    setHistory((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        command: trimmed,
        output
      }
    ]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-md" 
        onClick={onClose}
      />

      {/* Terminal Window */}
      <div
        className={`relative w-full ${
          isMaximized ? "h-[96vh] max-w-6xl" : "h-[540px] max-w-3xl"
        } bg-[#06080d] border border-cyan-500/40 rounded-xl shadow-2xl shadow-cyan-950/80 flex flex-col overflow-hidden transition-all duration-200 font-mono`}
      >
        {/* Terminal Title Bar */}
        <div className="px-4 py-3 bg-[#0d121f] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block cursor-pointer hover:opacity-100" onClick={onClose} />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <span className="text-xs text-gray-400 font-mono ml-2 flex items-center gap-1.5">
              <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
              <span>muawiyah@ai-system:~</span>
            </span>
          </div>

          <div className="flex items-center gap-2 text-gray-400">
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-1 hover:text-white rounded hover:bg-white/5 transition-colors"
            >
              {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={onClose}
              className="p-1 hover:text-white rounded hover:bg-white/5 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Console Log Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs leading-relaxed">
          {history.map((item) => (
            <div key={item.id} className="space-y-1">
              {item.command !== "init" && (
                <div className="flex items-center gap-2 text-gray-400">
                  <span className="text-cyan-400 font-bold">$</span>
                  <span className="text-white font-semibold">{item.command}</span>
                </div>
              )}
              <div>{item.output}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* CLI Input Prompt Bar */}
        <div className="p-3 bg-[#0a0e18] border-t border-white/10 flex items-center gap-2">
          <span className="text-cyan-400 font-bold text-xs">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleCommand(input);
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                if (enteredCommands.length > 0) {
                  const nextIdx = commandIndex + 1;
                  if (nextIdx < enteredCommands.length) {
                    setCommandIndex(nextIdx);
                    setInput(enteredCommands[enteredCommands.length - 1 - nextIdx]);
                  }
                }
              } else if (e.key === "ArrowDown") {
                e.preventDefault();
                if (commandIndex > 0) {
                  const prevIdx = commandIndex - 1;
                  setCommandIndex(prevIdx);
                  setInput(enteredCommands[enteredCommands.length - 1 - prevIdx]);
                } else if (commandIndex === 0) {
                  setCommandIndex(-1);
                  setInput("");
                }
              } else if (e.key === "Tab") {
                e.preventDefault();
                const candidates = ["help", "whoami", "skills", "projects", "projects --genai", "contact", "clear", "exit"];
                const matched = candidates.find((c) => c.startsWith(input.trim().toLowerCase()));
                if (matched) setInput(matched);
              }
            }}
            placeholder="Type 'help', 'whoami', 'skills', 'projects', or ask '...'"
            className="flex-1 bg-transparent text-xs text-white placeholder-gray-600 focus:outline-none font-mono"
          />
          <CornerDownLeft className="w-3.5 h-3.5 text-gray-600" />
        </div>

      </div>
    </div>
  );
}
