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
        <p className="mt-6 text-pretty text-lg text-muted-foreground">
          Answer a few questions. Get a personalized CLAUDE.md that makes Claude
          Code teach the way YOU learn best.
        </p>

        <Button onClick={onStart} size="lg" className="mt-10">
          Get Started
        </Button>

        <div className="mt-12 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="h-4 w-4" />
            <span>Your answers never leave your browser. Nothing is stored.</span>
          </div>
          <a
            href="https://github.com/danielmontoyah/claude-learning-profile-builder"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-muted-foreground underline-offset-4 hover:underline"
          >
            <Github className="h-4 w-4" />
            <span>Open source - verify on GitHub</span>
          </a>
        </div>
      </div>
    </div>
  );
}
