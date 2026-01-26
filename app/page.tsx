"use client";

import { useState } from "react";
import { WelcomeScreen } from "@/components/welcome-screen";
import { Questionnaire } from "@/components/questionnaire";
import { ResultsScreen } from "@/components/results-screen";
import { calculateScores, type ArchetypeScores } from "@/lib/questions";

type Screen = "welcome" | "questionnaire" | "results";

// DEBUG: Set to true to skip directly to results page
const DEBUG_SKIP_TO_RESULTS = true;

const mockAnswers: Record<string, string | boolean> = {
  q1a: "Show me the big picture first, then zoom into details",
  q1b: "A working example I can run and modify",
  q2: "I prefer to understand the 'why' before the 'how'",
  q3: "Give me time and space to work through it",
  q4: "Explain the concept again with different examples",
  q5: "Briefly mention it and move on",
  q6a: "Morning (9am-12pm)",
  q6b: "At my computer, focused",
  userName: "Alex",
  q7: "Senior Developer",
  teacherMode: true,
};

const mockScores: ArchetypeScores = {
  systemsThinker: 8,
  handsOnLearner: 5,
  exampleFirstLearner: 6,
  scaffoldedLearner: 4,
  connector: 7,
};

export default function Home() {
  const [screen, setScreen] = useState<Screen>(DEBUG_SKIP_TO_RESULTS ? "results" : "welcome");
  const [answers, setAnswers] = useState<Record<string, string | boolean>>(DEBUG_SKIP_TO_RESULTS ? mockAnswers : {});
  const [scores, setScores] = useState<ArchetypeScores | null>(DEBUG_SKIP_TO_RESULTS ? mockScores : null);

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
