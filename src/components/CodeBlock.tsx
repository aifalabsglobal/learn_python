"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Button } from "@/components/ui/button";
import { Check, Copy, Terminal } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  filename?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({
  code,
  language = "python",
  title,
  filename,
  showLineNumbers = true,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-block my-4 shadow-xl border border-[#313244] rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#181825] border-b border-[#313244]">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#f38ba8]" />
            <div className="w-3 h-3 rounded-full bg-[#f9e2af]" />
            <div className="w-3 h-3 rounded-full bg-[#a6e3a1]" />
          </div>
          {filename ? (
            <span className="text-[#cdd6f4] text-sm font-mono flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#89b4fa]" />
              {filename}
            </span>
          ) : title ? (
            <span className="text-[#cdd6f4] text-sm font-medium">{title}</span>
          ) : (
            <span className="text-[#6c7086] text-sm font-mono">Python</span>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-8 px-3 text-[#6c7086] hover:text-[#cdd6f4] hover:bg-[#313244]"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-1.5 text-[#a6e3a1]" />
              <span className="text-xs">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-1.5" />
              <span className="text-xs">Copy</span>
            </>
          )}
        </Button>
      </div>
      
      {/* Code content */}
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        showLineNumbers={showLineNumbers}
        customStyle={{
          margin: 0,
          padding: "1.25rem 1rem",
          background: "#1e1e2e",
          fontSize: "0.875rem",
          lineHeight: "1.7",
        }}
        lineNumberStyle={{
          minWidth: "2.5em",
          paddingRight: "1em",
          color: "#6c7086",
          userSelect: "none",
        }}
        codeTagProps={{
          style: {
            fontFamily: "'Geist Mono', 'Fira Code', 'Consolas', monospace",
          },
        }}
      >
        {code.trim()}
      </SyntaxHighlighter>
    </div>
  );
}
