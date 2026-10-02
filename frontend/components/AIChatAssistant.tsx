"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  ExternalLink, 
  RefreshCw, 
  Copy, 
  Check, 
  ShieldCheck, 
  Database,
  ChevronDown,
  Info
} from "lucide-react";
import { askPortfolioAI, SourceReference } from "../lib/rag-client";
import AnimatedProfileAvatar from "./AnimatedProfileAvatar";
import MarkdownRenderer from "./MarkdownRenderer";
import { profileData } from "../data/profile";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: SourceReference[];
  provider?: string;
  timestamp: string;
}

interface AIChatAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  recruiterMode: boolean;
  initialPrompt?: string;
}

export default function AIChatAssistant({ 
  isOpen, 
  onClose, 
  recruiterMode,
  initialPrompt 
}: AIChatAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `Hello! I am **${profileData.name}'s AI Representative**.\n\nI can answer questions regarding his **Deep Learning** models (such as the 90%+ accurate Multi Skin Disease Classifier), **Generative AI** pipelines (ResearchMind multi-agent system and DocuMind RAG), **Machine Learning** benchmarks, experience, education, and technical stack.\n\nAll answers are strictly grounded in verified portfolio documentation. How can I assist you today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      provider: "Knowledge RAG Engine"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const lastExecutedPromptRef = useRef<string | null>(null);

  const suggestedQueries = [
    "What are his strongest skills?",
    "Explain his skin disease classifier.",
    "What GenAI projects has he built?",
    "Summarize his resume in 30 seconds.",
    "Why might his background be relevant for an ML role?",
    "How can I contact him?"
  ];

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    } else {
      lastExecutedPromptRef.current = null;
    }
  }, [isOpen, messages]);

  // If opened with an initial prompt, execute it automatically once
  useEffect(() => {
    if (isOpen && initialPrompt && lastExecutedPromptRef.current !== initialPrompt) {
      lastExecutedPromptRef.current = initialPrompt;
      handleSend(initialPrompt);
    }
  }, [isOpen, initialPrompt]);

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || inputValue;
    if (!textToSend.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setLoading(true);

    try {
      const response = await askPortfolioAI(textToSend, recruiterMode);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response.reply,
        sources: response.sources,
        provider: response.provider,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I encountered an error connecting to the retrieval pipeline. Please try asking again or explore the portfolio sections directly.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end sm:p-6 pointer-events-none">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto transition-opacity" 
        onClick={onClose}
      />

      {/* Chat Window Panel */}
      <div className="relative w-full sm:max-w-xl h-[88vh] sm:h-[650px] bg-[#090d16] border border-cyan-500/30 rounded-t-2xl sm:rounded-2xl shadow-2xl shadow-cyan-950/50 flex flex-col pointer-events-auto overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
        
        {/* Header */}
        <div className="px-5 py-3.5 bg-[#0d1322] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AnimatedProfileAvatar size="xs" showStatus={true} withRadarScan={false} />
            <div>
              <div className="text-sm font-semibold text-white flex items-center gap-2">
                <span>{profileData.name}&apos;s AI Assistant</span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/50">
                  RAG Grounded
                </span>
              </div>
              <div className="text-[11px] text-gray-400 flex items-center gap-1.5 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Zero Hallucination Guardrails</span>
                {recruiterMode && (
                  <span className="text-emerald-400 font-semibold">• Recruiter Filter Active</span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                setMessages([
                  {
                    id: "welcome-reset",
                    role: "assistant",
                    content: `Chat session refreshed. Ask anything about **${profileData.name}'s** machine learning, deep learning, or GenAI projects.`,
                    timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                    provider: "Knowledge RAG Engine"
                  }
                ]);
              }}
              className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
              title="Reset Chat Session"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
              aria-label="Close Assistant"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Message History */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans text-sm">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
            >
              <div
                className={`max-w-[88%] rounded-2xl px-4 py-3 leading-relaxed ${
                  msg.role === "user"
                    ? "bg-gradient-to-r from-cyan-600 to-teal-600 text-white rounded-tr-sm"
                    : "bg-[#111728] border border-white/10 text-gray-200 rounded-tl-sm shadow-md"
                }`}
              >
                {/* Content formatted with rich markdown rendering */}
                {msg.role === "assistant" ? (
                  <MarkdownRenderer content={msg.content} />
                ) : (
                  <div className="whitespace-pre-line text-[13px] leading-relaxed">
                    {msg.content}
                  </div>
                )}

                {/* Grounding Source Attribution Pills */}
                {msg.sources && msg.sources.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-white/10 text-[11px] font-mono">
                    <div className="text-gray-400 flex items-center gap-1 mb-1.5">
                      <Database className="w-3 h-3 text-cyan-400" />
                      <span>Retrieved Knowledge Sources:</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.sources.map((s, idx) => (
                        <div
                          key={idx}
                          className="px-2 py-0.5 rounded bg-black/40 border border-white/10 text-cyan-300 text-[10px] flex items-center gap-1"
                          title={s.snippet}
                        >
                          <span className="text-gray-500 font-semibold">•</span>
                          <span className="truncate max-w-[200px]">{s.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Footer bar for assistant response */}
                {msg.role === "assistant" && (
                  <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-gray-500 pt-1">
                    <span>{msg.provider || "RAG Pipeline"}</span>
                    <button
                      onClick={() => copyToClipboard(msg.content, msg.id)}
                      className="hover:text-cyan-400 flex items-center gap-1 transition-colors"
                      title="Copy response"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
              <span className="text-[10px] font-mono text-gray-500 mt-1 px-1">
                {msg.timestamp}
              </span>
            </div>
          ))}

          {loading && (
            <div className="flex items-start gap-2">
              <div className="bg-[#111728] border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-2 text-cyan-300 text-xs font-mono">
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
                <span>Searching vector index & synthesizing grounded answer...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-4 py-2 bg-[#090d16] border-t border-white/5 overflow-x-auto flex gap-2 no-scrollbar">
          {suggestedQueries.map((query, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(query)}
              disabled={loading}
              className="text-[11px] font-mono whitespace-nowrap px-2.5 py-1 rounded-full bg-white/5 hover:bg-cyan-950 hover:text-cyan-300 border border-white/10 hover:border-cyan-700/50 text-gray-300 transition-colors flex-shrink-0"
            >
              {query}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-[#0d1322] border-t border-white/10 flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder={`Ask about ${profileData.name}'s AI models, RAG, experience...`}
            className="flex-1 bg-[#07090e] border border-white/10 focus:border-cyan-500 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/50"
            disabled={loading}
          />
          <button
            onClick={() => handleSend()}
            disabled={!inputValue.trim() || loading}
            className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:opacity-95 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md shadow-cyan-500/20"
            aria-label="Send query"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
