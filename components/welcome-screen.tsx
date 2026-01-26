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
        <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
          Build Your Claude Learning Profile
        </h1>
        <p className="mt-8 text-pretty text-base leading-relaxed text-foreground/70">
          Answer a few questions. Get a personalized CLAUDE.md that makes Claude
          Code teach the way YOU learn best.
        </p>

        <Button onClick={onStart} size="lg" className="mt-12">
          Get Started
        </Button>

        <div className="mt-16 flex flex-col items-center gap-4">
          <div className="flex items-center gap-3 text-sm text-foreground/70">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-foreground/10 bg-foreground/5">
              <Shield className="h-4 w-4" />
            </div>
            <span>Your answers never leave your browser. Nothing is stored.</span>
          </div>
          <a
            href="https://github.com/danielmontoyah/claude-learning-profile-builder"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-sm text-foreground/70 transition-colors hover:text-foreground group"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-foreground/10 bg-foreground/5 transition-colors group-hover:border-foreground/20 group-hover:bg-foreground/10">
              <Github className="h-4 w-4" />
            </div>
            <span className="underline-offset-4 group-hover:underline">Open source - verify on GitHub</span>
          </a>
        </div>
      </div>
    </div>
  );
}
