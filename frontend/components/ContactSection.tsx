"use client";

import React, { useState } from "react";
import { 
  Mail, 
  Send, 
  Check, 
  Copy, 
  Phone, 
  MapPin, 
  Sparkles, 
  MessageSquare,
  AlertCircle
} from "lucide-react";
import { Github, Linkedin } from "./Icons";
import { profileData } from "../data/profile";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    }, 900);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(profileData.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="py-20 relative bg-[#07090e] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-300 text-xs font-mono mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Connect & Collaborate</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Let&apos;s Build Something
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
              {" "}Intelligent.
            </span>
          </h2>
          <p className="max-w-xl text-gray-400 text-sm sm:text-base leading-relaxed">
            Whether you are recruiting for an AI/ML engineering role, exploring an applied computer vision project, or discussing agent pipelines, feel free to reach out.
          </p>
        </div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto">
          
          {/* Left Column: Direct Contact Info */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="p-6 rounded-2xl bg-[#090d16] border border-white/10 space-y-4">
              <h3 className="text-sm font-semibold text-white font-mono uppercase tracking-wider text-cyan-400">
                Direct Communication Channels
              </h3>
              
              {/* Email with Copy Action */}
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-cyan-950 border border-cyan-800/40 flex items-center justify-center text-cyan-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-gray-400">Email</div>
                    <a
                      href={`mailto:${profileData.email}`}
                      className="text-xs font-semibold text-white hover:text-cyan-300 font-mono transition-colors"
                    >
                      {profileData.email}
                    </a>
                  </div>
                </div>

                <button
                  onClick={copyEmail}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
                  title="Copy email address"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Phone */}
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-950 border border-emerald-800/40 flex items-center justify-center text-emerald-400">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-gray-400">Direct Phone</div>
                  <div className="text-xs font-semibold text-white font-mono">
                    {profileData.phone}
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-indigo-950 border border-indigo-800/40 flex items-center justify-center text-indigo-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-gray-400">Base Location</div>
                  <div className="text-xs font-semibold text-white font-mono">
                    {profileData.location}
                  </div>
                </div>
              </div>

              {/* Social Buttons */}
              <div className="grid grid-cols-2 gap-2.5 pt-2">
                <a
                  href={profileData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-cyan-500/40 flex items-center justify-center gap-2 text-xs font-mono text-cyan-300 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={profileData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-gray-500 flex items-center justify-center gap-2 text-xs font-mono text-gray-200 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              </div>

            </div>

          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="p-6 sm:p-8 rounded-2xl bg-[#090d16] border border-cyan-500/30 shadow-2xl shadow-cyan-950/20 space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-gray-400 mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full bg-[#0c111e] border border-white/10 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-cyan-400/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-gray-400 mb-1.5">
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. sarah@company.com"
                    className="w-full bg-[#0c111e] border border-white/10 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-cyan-400/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-400 mb-1.5">
                  Message / Project Scope
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about the role, project, or collaboration you have in mind..."
                  className="w-full bg-[#0c111e] border border-white/10 focus:border-cyan-400 rounded-xl p-4 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-cyan-400/50 resize-none font-sans"
                />
              </div>

              {status === "error" && (
                <div className="flex items-center gap-2 text-rose-400 text-xs font-mono bg-rose-950/40 p-3 rounded-lg border border-rose-800/40">
                  <AlertCircle className="w-4 h-4" />
                  <span>Please fill in all required fields.</span>
                </div>
              )}

              {status === "success" && (
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono bg-emerald-950/40 p-3 rounded-lg border border-emerald-800/40">
                  <Check className="w-4 h-4" />
                  <span>Message delivered successfully! Muawiyah will follow up shortly.</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 hover:opacity-95 text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/25 disabled:opacity-50"
              >
                {status === "submitting" ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message to Muawiyah</span>
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
