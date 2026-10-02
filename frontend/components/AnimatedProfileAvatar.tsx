"use client";

import React from "react";

interface AnimatedProfileAvatarProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  showStatus?: boolean;
  statusText?: string;
  withRadarScan?: boolean;
  className?: string;
  interactive?: boolean;
}

export default function AnimatedProfileAvatar({
  size = "lg",
  showStatus = true,
  statusText = "AI SYSTEMS ONLINE",
  withRadarScan = true,
  className = "",
  interactive = true,
}: AnimatedProfileAvatarProps) {
  // Dimensions mapping - enlarged for crystal-clear facial visibility
  const sizeConfig = {
    xs: { outer: "w-8 h-8", ring: "p-[1.5px]", dot: "w-2 h-2 -bottom-0.5 -right-0.5" },
    sm: { outer: "w-10 h-10", ring: "p-[2px]", dot: "w-2.5 h-2.5 bottom-0 right-0" },
    md: { outer: "w-24 h-24 sm:w-28 sm:h-28", ring: "p-[2.5px]", dot: "w-3.5 h-3.5 bottom-0.5 right-0.5" },
    lg: { outer: "w-44 h-44 sm:w-52 sm:h-52 md:w-56 md:h-56", ring: "p-[3.5px]", dot: "w-4.5 h-4.5 bottom-2 right-2" },
    xl: { outer: "w-56 h-56 sm:w-64 sm:h-64", ring: "p-[4px]", dot: "w-5 h-5 bottom-3 right-3" },
  };

  const cfg = sizeConfig[size] || sizeConfig.lg;

  return (
    <div className={`relative inline-block ${className} group`}>
      {/* Outer Multi-Layer Glow Halo */}
      {(size === "lg" || size === "xl" || size === "md") && (
        <>
          <div className="absolute -inset-3 rounded-full bg-gradient-to-tr from-cyan-500/30 via-emerald-500/25 to-indigo-500/30 blur-2xl group-hover:blur-3xl transition-all duration-500 opacity-90 group-hover:opacity-100 animate-pulse-slow pointer-events-none" />
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 opacity-70 blur-md group-hover:opacity-100 transition-opacity pointer-events-none" />
        </>
      )}

      {/* Rotating Conic Gradient Outer Orbital Ring */}
      <div
        className={`relative ${cfg.outer} rounded-full ${cfg.ring} bg-gradient-to-tr from-cyan-400 via-teal-400 to-indigo-500 shadow-2xl shadow-cyan-950/60 ${
          interactive ? "group-hover:scale-[1.03] transition-transform duration-300" : ""
        }`}
      >
        {/* Subtle Rotating Ring Effect for large avatars */}
        {(size === "lg" || size === "xl") && (
          <div
            className="absolute -inset-1 rounded-full border border-dashed border-cyan-400/50 animate-spin pointer-events-none"
            style={{ animationDuration: "20s" }}
          />
        )}

        {/* Inner Image Container - Clean, High-Contrast & Sharp */}
        <div className="relative w-full h-full rounded-full overflow-hidden bg-[#0a0e1a] border-2 border-black/80 shadow-inner">
          
          {/* User Photo - Centered & Bright */}
          <img
            src="/profile.jpg"
            alt="Muawiyah - AI / ML Engineer"
            className="w-full h-full object-cover object-center filter contrast-[1.06] brightness-[1.04] group-hover:scale-105 transition-transform duration-500"
          />

          {/* Delicate Top Gloss Reflection (Does NOT obscure face) */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/10 via-transparent to-black/20 pointer-events-none" />

          {/* Subtle Cyber Radar Sweep Reflection */}
          {withRadarScan && (size === "lg" || size === "xl") && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-full">
              <div 
                className="w-full h-12 bg-gradient-to-b from-transparent via-cyan-300/20 to-transparent -translate-y-full animate-[scan_5s_ease-in-out_infinite]"
              />
            </div>
          )}

          {/* Outer Rim Highlight */}
          <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/20 pointer-events-none" />
        </div>
      </div>

      {/* Online Status Beacon */}
      {showStatus && (
        <div className={`absolute ${cfg.dot} z-10 flex items-center justify-center`}>
          <span className="absolute w-full h-full rounded-full bg-emerald-400 animate-ping opacity-80" />
          <span className="relative w-full h-full rounded-full bg-emerald-400 border-[2.5px] border-[#07090e] shadow-lg shadow-emerald-400/80" />
        </div>
      )}
    </div>
  );
}
