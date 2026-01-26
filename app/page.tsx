"use client";

import { useState } from "react";
import { WelcomeScreen } from "@/components/welcome-screen";
import { Questionnaire } from "@/components/questionnaire";
import { ResultsScreen } from "@/components/results-screen";
import { calculateScores, type ArchetypeScores } from "@/lib/questions";

type Screen = "welcome" | "questionnaire" | "results";

export default function Home() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [answers, setAnswers] = useState<Record<string, string | boolean>>({});
  const [scores, setScores] = useState<ArchetypeScores | null>(null);

  const handleStart = () => {
    setScreen("questionnaire");
  };

  const handleComplete = (completedAnswers: Record<string, string | boolean>) => {
    setAnswers(completedAnswers);
    const calculatedScores = calculateScores(completedAnswers);
    setScores(calculatedScores);
    setScreen("results");
  };

  const handleBackToWelcome = () => {
    setScreen("welcome");
  };

  const handleStartOver = () => {
    setAnswers({});
    setScores(null);
    setScreen("welcome");
  };

  return (
    <main className="min-h-screen">
      {screen === "welcome" && <WelcomeScreen onStart={handleStart} />}
      {screen === "questionnaire" && (
        <Questionnaire onComplete={handleComplete} onBack={handleBackToWelcome} />
      )}
      {screen === "results" && scores && (
        <ResultsScreen
          answers={answers}
          scores={scores}
          onStartOver={handleStartOver}
        />
      )}
    </main>
  );
}
