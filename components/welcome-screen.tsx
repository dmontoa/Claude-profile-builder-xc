"use client";

import { Button } from "@/components/ui/button";
import { Shield, Github } from "lucide-react";

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="mx-auto max-w-xl text-center">
        <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
          Build Your Claude Learning Profile
        </h1>
        <p className="mt-8 text-pretty text-base leading-relaxed text-foreground/70">
          Answer a few questions. Get a personalized CLAUDE.md that makes Claude
          Code teach the way YOU learn best.
        </p>

        <Button onClick={onStart} size="lg" className="mt-12">
          Get Started
        </Button>

        <div className="mt-16 flex flex-col items-center gap-4 px-2">
          <div className="flex items-center gap-3 text-sm text-foreground/70">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10">
              <Shield className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <span className="text-left">Your answers never leave your browser. Nothing is stored.</span>
          </div>
          <a
            href="https://github.com/danielmontoyah/claude-learning-profile-builder"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-sm text-foreground/70 transition-colors hover:text-foreground group"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-violet-500/20 bg-violet-500/10 transition-colors group-hover:border-violet-500/30 group-hover:bg-violet-500/15">
              <Github className="h-4 w-4 text-violet-600 dark:text-violet-400" />
            </div>
            <span className="text-left underline-offset-4 group-hover:underline">Open source - verify on GitHub</span>
          </a>
        </div>
      </div>
    </div>
  );
}
