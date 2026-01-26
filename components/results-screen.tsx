"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { type ArchetypeScores, archetypeInfo, getArchetypeResults } from "@/lib/questions";
import { generateClaudeMd, generateUserExplanation } from "@/lib/output-generator";
import {
  FileCode,
  Calculator,
  Copy,
  Check,
  Download,
  RefreshCw,
  Share2,
  Mail,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ResultsScreenProps {
  answers: Record<string, string | boolean>;
  scores: ArchetypeScores;
  onStartOver: () => void;
}

export function ResultsScreen({ answers, scores, onStartOver }: ResultsScreenProps) {
  const [copiedTab, setCopiedTab] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const role = typeof answers.q7 === "string" ? answers.q7 : undefined;
  const teacherMode = answers.teacherMode === true;

  // Get archetype info for Loops
  const { primary, secondary } = getArchetypeResults(scores);
  const primaryName = archetypeInfo[primary].name;
  const secondaryName = secondary ? archetypeInfo[secondary].name : null;

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || subscribeStatus === "loading") return;

    setSubscribeStatus("loading");
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          archetype: primaryName,
          secondaryArchetype: secondaryName,
        }),
      });

      if (response.ok) {
        setSubscribeStatus("success");
      } else {
        setSubscribeStatus("error");
      }
    } catch {
      setSubscribeStatus("error");
    }
  };

  const claudeMd = generateClaudeMd({
    answers,
    scores,
    role,
    teacherMode,
  });

  const userExplanation = generateUserExplanation({
    answers,
    scores,
    role,
    teacherMode,
  });

  const handleCopy = async (content: string, tabId: string) => {
    await navigator.clipboard.writeText(content);
    setCopiedTab(tabId);
    setTimeout(() => setCopiedTab(null), 3000);
  };

  const handleDownload = (content: string, filename: string) => {
    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const shareUrl = "https://learning-profile-builder.vercel.app";
  const shareText = "I just built my Claude Learning Profile! Answer 10 questions to get a personalized CLAUDE.md that makes Claude Code teach the way YOU learn best.";

  const handleShare = (platform: "twitter" | "linkedin" | "whatsapp") => {
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`,
    };
    window.open(urls[platform], "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Your Learning Profile
          </h1>
          <p className="mt-2 text-muted-foreground">
            Two views: the profile for Claude, and the breakdown for you
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="claude" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="claude" className="gap-2">
              <FileCode className="h-4 w-4" />
              For Claude
            </TabsTrigger>
            <TabsTrigger value="user" className="gap-2">
              <Calculator className="h-4 w-4" />
              For You
            </TabsTrigger>
          </TabsList>

          <TabsContent value="claude" className="mt-6">
            <CodeBlock 
              content={claudeMd} 
              filename="CLAUDE.md"
              copied={copiedTab === "claude"}
              onCopy={() => handleCopy(claudeMd, "claude")}
              onDownload={() => handleDownload(claudeMd, "CLAUDE.md")}
            />
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Paste into ~/.claude/CLAUDE.md for global settings, or your project root for project-specific
            </p>
          </TabsContent>

          <TabsContent value="user" className="mt-6">
            <CodeBlock 
              content={userExplanation} 
              filename="Your Scoring Breakdown"
              copied={copiedTab === "user"}
              onCopy={() => handleCopy(userExplanation, "user")}
              onDownload={() => handleDownload(userExplanation, "MY_LEARNING_PROFILE.md")}
            />
            <p className="mt-4 text-center text-sm text-muted-foreground">
              {"This breakdown shows how your answers determined your learning archetype. The profile on the 'For Claude' tab is what you give to Claude."}
            </p>
          </TabsContent>
        </Tabs>

        {/* Weekly Check-in Section */}
        <div className="mt-12 rounded-lg border bg-muted/30 p-6">
          <div className="flex items-center justify-center gap-2 text-sm font-medium">
            <Mail className="h-4 w-4" />
            Weekly Learning Check-in
          </div>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Get a weekly email to reflect on how Claude is adapting to your learning style.
          </p>

          {subscribeStatus === "success" ? (
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-green-600 dark:text-green-400">
              <Check className="h-4 w-4" />
              You're subscribed! Check your inbox.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="mt-4 flex gap-2 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
                disabled={subscribeStatus === "loading"}
              />
              <Button type="submit" disabled={subscribeStatus === "loading" || !email}>
                {subscribeStatus === "loading" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Subscribe"
                )}
              </Button>
            </form>
          )}

          {subscribeStatus === "error" && (
            <p className="mt-2 text-center text-sm text-red-600 dark:text-red-400">
              Something went wrong. Please try again.
            </p>
          )}

          <p className="mt-3 text-center text-xs text-muted-foreground">
            Wildly optional. Unsubscribe anytime.
          </p>
        </div>

        {/* Share Section */}
        <div className="mt-6 rounded-lg border bg-muted/30 p-6 text-center">
          <div className="flex items-center justify-center gap-2 text-sm font-medium">
            <Share2 className="h-4 w-4" />
            Share this tool with others
          </div>
          <div className="mt-4 flex justify-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleShare("twitter")}
            >
              <XIcon className="mr-2 h-4 w-4" />
              X
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleShare("linkedin")}
            >
              <LinkedInIcon className="mr-2 h-4 w-4" />
              LinkedIn
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleShare("whatsapp")}
            >
              <WhatsAppIcon className="mr-2 h-4 w-4" />
              WhatsApp
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <Button variant="ghost" onClick={onStartOver}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Start Over
          </Button>
        </div>
      </div>
    </div>
  );
}

interface CodeBlockProps {
  content: string;
  filename: string;
  copied: boolean;
  onCopy: () => void;
  onDownload: () => void;
}

function CodeBlock({ content, filename, copied, onCopy, onDownload }: CodeBlockProps) {
  return (
    <div className="overflow-hidden rounded-lg border bg-zinc-950 dark:bg-zinc-900">
      {/* Window Chrome */}
      <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900 px-4 py-3 dark:bg-zinc-800">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-zinc-700" />
            <div className="h-3 w-3 rounded-full bg-zinc-700" />
            <div className="h-3 w-3 rounded-full bg-zinc-700" />
          </div>
          <span className="ml-2 text-sm text-zinc-400">{filename}</span>
        </div>
      </div>
      
      {/* Content */}
      <div className="max-h-[400px] overflow-auto p-4">
        <pre className="font-mono text-sm text-zinc-300 whitespace-pre-wrap break-words">
          {content}
        </pre>
      </div>

      {/* Actions */}
      <div className="flex gap-2 border-t border-zinc-800 bg-zinc-900 px-4 py-3 dark:bg-zinc-800">
        <Button
          onClick={onCopy}
          size="sm"
          className={cn(
            "transition-all",
            copied && "bg-green-600 hover:bg-green-600"
          )}
        >
          {copied ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="mr-2 h-4 w-4" />
              Copy to Clipboard
            </>
          )}
        </Button>
        <Button variant="secondary" size="sm" onClick={onDownload}>
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
      </div>
    </div>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
