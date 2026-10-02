"use client";

import React, { useState } from "react";
import { Check, Copy } from "lucide-react";

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // Parse tables, code blocks, lists, headers, and text
  const renderFormattedContent = (rawText: string) => {
    // Check if content has code blocks
    const parts = rawText.split(/(```[\s\S]*?```)/g);

    return parts.map((part, partIdx) => {
      // Code block
      if (part.startsWith("```") && part.endsWith("```")) {
        const lines = part.slice(3, -3).trim().split("\n");
        const language = lines[0].trim();
        const code = (lines.length > 1 ? lines.slice(1).join("\n") : lines[0]).trim();

        return <CodeBlock key={partIdx} language={language} code={code} />;
      }

      // Check for markdown tables
      if (part.includes("|") && part.includes("\n|")) {
        return <TableAndTextSection key={partIdx} text={part} />;
      }

      // Standard text with headers and bullets
      return <TextSection key={partIdx} text={part} />;
    });
  };

  return <div className="space-y-3 font-sans text-xs leading-relaxed">{renderFormattedContent(content)}</div>;
}

function CodeBlock({ language, code }: { language: string; code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-2 rounded-xl bg-[#06080e] border border-cyan-500/20 overflow-hidden font-mono text-[11px]">
      <div className="px-3 py-1.5 bg-[#0b101c] border-b border-white/5 flex items-center justify-between text-gray-400">
        <span className="text-[10px] uppercase text-cyan-400">{language || "code"}</span>
        <button
          onClick={handleCopy}
          className="hover:text-cyan-300 flex items-center gap-1 transition-colors text-[10px]"
        >
          {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>
      <pre className="p-3 text-emerald-300 overflow-x-auto whitespace-pre leading-relaxed">{code}</pre>
    </div>
  );
}

function TableAndTextSection({ text }: { text: string }) {
  const lines = text.split("\n");
  const tableLines: string[] = [];
  const textBefore: string[] = [];
  const textAfter: string[] = [];
  let inTable = false;
  let finishedTable = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
      inTable = true;
      tableLines.push(trimmed);
    } else if (inTable && !finishedTable) {
      finishedTable = true;
      textAfter.push(line);
    } else if (!inTable) {
      textBefore.push(line);
    } else {
      textAfter.push(line);
    }
  }

  // Parse table rows
  const parsedRows = tableLines
    .filter((l) => !l.includes("---")) // skip separator row
    .map((l) =>
      l
        .slice(1, -1)
        .split("|")
        .map((cell) => cell.trim())
    );

  const headerRow = parsedRows[0];
  const bodyRows = parsedRows.slice(1);

  return (
    <div className="space-y-2">
      {textBefore.length > 0 && <TextSection text={textBefore.join("\n")} />}

      {parsedRows.length > 0 && (
        <div className="overflow-x-auto my-2 rounded-xl border border-white/10 bg-[#07090e]">
          <table className="w-full text-left text-[11px] font-sans">
            {headerRow && (
              <thead className="bg-[#0e1424] text-cyan-300 border-b border-white/10 font-mono">
                <tr>
                  {headerRow.map((h, i) => (
                    <th key={i} className="px-3 py-2 font-semibold">
                      {formatInline(h)}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody className="divide-y divide-white/5">
              {bodyRows.map((row, rowIdx) => (
                <tr key={rowIdx} className="hover:bg-white/5 transition-colors">
                  {row.map((cell, cellIdx) => (
                    <td key={cellIdx} className="px-3 py-2 text-gray-200">
                      {formatInline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {textAfter.length > 0 && <TextSection text={textAfter.join("\n")} />}
    </div>
  );
}

function TextSection({ text }: { text: string }) {
  const lines = text.split("\n");

  return (
    <div className="space-y-1.5">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={idx} className="h-1" />;

        // Header 3 or 4
        if (trimmed.startsWith("###")) {
          return (
            <h3 key={idx} className="text-sm font-bold text-white font-mono mt-3 mb-1.5 flex items-center gap-1.5">
              {formatInline(trimmed.replace(/^###+\s*/, ""))}
            </h3>
          );
        }

        // Bullet point
        if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
          return (
            <div key={idx} className="flex items-start gap-2 pl-1 my-0.5 text-gray-200">
              <span className="text-emerald-400 font-bold">•</span>
              <span className="flex-1">{formatInline(trimmed.replace(/^[-*]\s*/, ""))}</span>
            </div>
          );
        }

        // Numbered list
        if (/^\d+\.\s/.test(trimmed)) {
          const match = trimmed.match(/^(\d+\.)\s*(.*)$/);
          return (
            <div key={idx} className="flex items-start gap-2 pl-1 my-0.5 text-gray-200">
              <span className="text-cyan-400 font-mono font-semibold">{match ? match[1] : "•"}</span>
              <span className="flex-1">{formatInline(match ? match[2] : trimmed)}</span>
            </div>
          );
        }

        return (
          <p key={idx} className="text-gray-300 leading-relaxed">
            {formatInline(trimmed)}
          </p>
        );
      })}
    </div>
  );
}

// Inline formatting for **bold**, `code`, and [links](url)
function formatInline(str: string): React.ReactNode {
  // Regex to split bold **...** and inline `...`
  const tokens = str.split(/(\*\*.*?\*\*|`.*?`|\[.*?\]\(.*?\))/g);

  return tokens.map((token, i) => {
    if (token.startsWith("**") && token.endsWith("**")) {
      return (
        <strong key={i} className="text-white font-semibold">
          {token.slice(2, -2)}
        </strong>
      );
    }
    if (token.startsWith("`") && token.endsWith("`")) {
      return (
        <code key={i} className="px-1.5 py-0.5 rounded bg-black/40 text-cyan-300 font-mono text-[10px] border border-white/5">
          {token.slice(1, -1)}
        </code>
      );
    }
    if (token.startsWith("[") && token.includes("](") && token.endsWith(")")) {
      const match = token.match(/\[(.*?)\]\((.*?)\)/);
      if (match) {
        return (
          <a
            key={i}
            href={match[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2"
          >
            {match[1]}
          </a>
        );
      }
    }
    return token;
  });
}
