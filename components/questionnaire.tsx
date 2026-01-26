"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { questions, type Question } from "@/lib/questions";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuestionnaireProps {
  onComplete: (answers: Record<string, string | boolean>) => void;
  onBack: () => void;
}

export function Questionnaire({ onComplete, onBack }: QuestionnaireProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | boolean>>({
    teacherMode: true, // Default to true
  });
  const [direction, setDirection] = useState<"forward" | "backward">("forward");

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  const canContinue = () => {
    const answer = answers[currentQuestion.id];
    if (currentQuestion.type === "text") return true; // Optional
    if (currentQuestion.type === "toggle") return true; // Has default
    return answer !== undefined && answer !== "";
  };

  const handleNext = () => {
    if (currentIndex === totalQuestions - 1) {
      // Ensure toggle has a value (defaults to true)
      const finalAnswers = {
        ...answers,
        teacherMode: answers.teacherMode ?? true,
      };
      onComplete(finalAnswers);
    } else {
      setDirection("forward");
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex === 0) {
      onBack();
    } else {
      setDirection("backward");
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleSelectOption = (option: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: option }));
  };

  const handleTextChange = (value: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
  };

  const handleToggleChange = (checked: boolean) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: checked }));
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Progress Header */}
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-2xl px-4 py-4">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-muted-foreground">
              {currentQuestion.section}
            </span>
            <span className="text-muted-foreground">
              {currentIndex + 1} of {totalQuestions}
            </span>
          </div>
          <Progress value={progress} className="mt-3 h-1" />
        </div>
      </header>

      {/* Question Content */}
      <main className="flex flex-1 items-center justify-center px-4 py-8">
        <div
          key={currentQuestion.id}
          className={cn(
            "w-full max-w-2xl",
            "animate-in fade-in-0 duration-300",
            direction === "forward" ? "slide-in-from-right-4" : "slide-in-from-left-4"
          )}
        >
          <QuestionContent
            question={currentQuestion}
            answer={answers[currentQuestion.id]}
            onSelectOption={handleSelectOption}
            onTextChange={handleTextChange}
            onToggleChange={handleToggleChange}
          />
        </div>
      </main>

      {/* Navigation Footer */}
      <footer className="sticky bottom-0 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-4">
          <Button variant="ghost" onClick={handlePrevious}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button onClick={handleNext} disabled={!canContinue()}>
            {currentIndex === totalQuestions - 1 ? "See Results" : "Continue"}
            {currentIndex < totalQuestions - 1 && (
              <ChevronRight className="ml-2 h-4 w-4" />
            )}
          </Button>
        </div>
      </footer>
    </div>
  );
}

interface QuestionContentProps {
  question: Question;
  answer: string | boolean | undefined;
  onSelectOption: (option: string) => void;
  onTextChange: (value: string) => void;
  onToggleChange: (checked: boolean) => void;
}

function QuestionContent({
  question,
  answer,
  onSelectOption,
  onTextChange,
  onToggleChange,
}: QuestionContentProps) {
  if (question.type === "toggle") {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {question.question}
          </h2>
        </div>
        <div className="flex items-center gap-4 rounded-lg border p-6">
          <Switch
            id="teacher-mode"
            checked={(answer as boolean) ?? question.defaultValue ?? false}
            onCheckedChange={onToggleChange}
          />
          <Label htmlFor="teacher-mode" className="flex-1 cursor-pointer">
            <span className="font-medium">Enable Teacher Mode</span>
            {question.description && (
              <p className="mt-1 text-sm text-muted-foreground">
                {question.description}
              </p>
            )}
          </Label>
        </div>
      </div>
    );
  }

  if (question.type === "text") {
    const isContextSection = question.section === "Your Context";
    return (
      <div className="space-y-6">
        {isContextSection && (
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-foreground/50">
            <span className="h-px flex-1 bg-border" />
            <span>{question.section}</span>
            <span className="h-px flex-1 bg-border" />
          </div>
        )}
        <div>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {question.question}
          </h2>
        </div>
        <Input
          type="text"
          placeholder={question.placeholder}
          value={(answer as string) ?? ""}
          onChange={(e) => onTextChange(e.target.value)}
          className="h-12 text-base"
        />
        <p className="text-sm text-muted-foreground">VERY Optional - press Continue to skip</p>
        {question.hint && (
          <p className="text-xs text-foreground/40 italic">{question.hint}</p>
        )}
      </div>
    );
  }

  const isContextSection = question.section === "Your Context";
  
  return (
    <div className="space-y-6">
      {isContextSection && (
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-foreground/50">
          <span className="h-px flex-1 bg-border" />
          <span>{question.section}</span>
          <span className="h-px flex-1 bg-border" />
        </div>
      )}
      <div>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {question.question}
        </h2>
      </div>
      <div className="space-y-3">
        {question.options?.map((option) => {
          const isSelected = answer === option.label;
          return (
            <button
              key={option.label}
              onClick={() => onSelectOption(option.label)}
              className={cn(
                "flex w-full items-start gap-4 rounded-lg border p-4 text-left transition-colors",
                isSelected
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50 hover:bg-muted/50"
              )}
            >
              <div
                className={cn(
                  "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                  isSelected
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-muted-foreground/30"
                )}
              >
                {isSelected && <Check className="h-3 w-3" />}
              </div>
              <span className="text-base">{option.label}</span>
            </button>
          );
        })}
      </div>
      {question.hint && (
        <p className="text-xs text-foreground/40 italic">{question.hint}</p>
      )}
    </div>
  );
}
