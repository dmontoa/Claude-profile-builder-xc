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

        <div className="mt-20 inline-flex flex-col items-start gap-3 rounded-lg border border-border/50 bg-muted/30 px-5 py-4">
          <div className="flex items-center gap-2.5 text-sm">
            <Shield className="h-4 w-4 text-foreground/50" />
            <span className="text-foreground/80">Private by design. Nothing stored.</span>
          </div>
          <div className="h-px w-full bg-border/50" />
          <a
            href="https://github.com/danielmontoyah/claude-learning-profile-builder"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 text-sm transition-colors group"
          >
            <Github className="h-4 w-4 text-foreground/50 transition-colors group-hover:text-foreground" />
            <span className="text-foreground/80 underline-offset-4 group-hover:text-foreground group-hover:underline">Open source on GitHub</span>
          </a>
        </div>
      </div>
    </div>
  );
}
