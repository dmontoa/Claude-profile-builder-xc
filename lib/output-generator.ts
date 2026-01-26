import {
  type Archetype,
  type ArchetypeScores,
  archetypeInfo,
  getArchetypeResults,
  questions,
} from "./questions";

interface OutputData {
  answers: Record<string, string | boolean>;
  scores: ArchetypeScores;
  role?: string;
  userName?: string;
  teacherMode: boolean;
}

export function generateClaudeMd(data: OutputData): string {
  const { primary, secondary } = getArchetypeResults(data.scores);
  const primaryInfo = archetypeInfo[primary];
  const secondaryInfo = secondary ? archetypeInfo[secondary] : null;

  const communicationAnswer = data.answers["q4"] as string;
  const stuckAnswer = data.answers["q9"] as string;
  const energyAnswer = data.answers["q10"] as string;
  const techLevel = data.answers["q6"] as string;

  // Determine communication style
  let communicationStyle = "";
  if (communicationAnswer?.includes("Direct and concise")) {
    communicationStyle = "Be direct and concise. Respect my time—no unnecessary preamble or filler.";
  } else if (communicationAnswer?.includes("Thorough and detailed")) {
    communicationStyle = "Be thorough and detailed. I want the full picture, including context and nuance.";
  } else if (communicationAnswer?.includes("Conversational")) {
    communicationStyle = "Be conversational—like a knowledgeable friend explaining something interesting.";
  } else if (communicationAnswer?.includes("Minimal")) {
    communicationStyle = "Be minimal. Just give me the code or answer. I'll ask if I need more.";
  }

  // Determine stuck detection
  let stuckDetection = "";
  if (stuckAnswer?.includes("get quiet")) {
    stuckDetection = `If I suddenly go quiet or my responses become very short, I might be overwhelmed. Ask: "Would it help to take a step back and approach this differently?"`;
  } else if (stuckAnswer?.includes("follow-up questions")) {
    stuckDetection = `If I start asking many follow-up questions in rapid succession, the explanation might not be landing. Try a different angle or ask what specifically isn't clicking.`;
  } else if (stuckAnswer?.includes("doesn't make sense")) {
    stuckDetection = `When I say "this doesn't make sense," I mean it literally. Don't just rephrase—try a completely different approach or break it down further.`;
  } else if (stuckAnswer?.includes("rephrase it myself")) {
    stuckDetection = `If I try to rephrase what you said, I'm checking my understanding. Correct any misconceptions immediately before we build on shaky foundations.`;
  }

  // Determine energy/tiredness handling
  let tirednessHandling = "";
  if (energyAnswer?.includes("Plan when tired")) {
    tirednessHandling = `I plan when tired and code when fresh. If I'm asking about architecture or design late in a session, I might be winding down. Suggest we capture the plan and continue implementation when I'm fresh.`;
  } else if (energyAnswer?.includes("long focused blocks")) {
    tirednessHandling = `I work best in long focused blocks. Don't interrupt my flow with unnecessary check-ins. If I've been at it for hours and start making unusual mistakes, gently suggest a break.`;
  } else if (energyAnswer?.includes("Short bursts")) {
    tirednessHandling = `I work in short bursts with breaks. Help me find natural stopping points. After completing a feature or fixing a bug, it's a good time to suggest stepping away briefly.`;
  } else if (energyAnswer?.includes("Depends on the task")) {
    tirednessHandling = `My energy varies by task. Watch for signs of fatigue: repeated simple mistakes, questions I already asked, or losing track of what we were doing.`;
  }

  // Technical level context
  let techLevelContext = "";
  if (techLevel?.includes("Non-technical")) {
    techLevelContext = `I'm non-technical—I work with technical people but don't code myself. Avoid jargon, use analogies from everyday life, and focus on concepts over implementation details.`;
  } else if (techLevel?.includes("Code-curious")) {
    techLevelContext = `I can read code but don't write production code. I understand basic programming concepts but need explanations for anything intermediate or advanced.`;
  } else if (techLevel?.includes("Learning")) {
    techLevelContext = `I'm actively building my coding skills. Challenge me appropriately, but be ready to explain concepts I haven't encountered yet.`;
  } else if (techLevel?.includes("Developer")) {
    techLevelContext = `I'm a professional developer. You can use technical terminology freely and assume I understand common patterns and practices.`;
  }

  const roleContext = data.role ? `\n## My Role\n${data.role}\n` : "";
  const nameContext = data.userName ? `\n## My Name\nCall me ${data.userName}.\n` : "";

  const teacherModeSection = data.teacherMode
    ? `
## Teacher Mode: ON

When we complete a project or significant feature, offer to create a FOR_YOU.md that explains:
- What we built and why (architecture decisions)
- How the pieces fit together
- Interesting problems we solved and how
- What I learned and might want to explore further

Write it like a senior engineer debriefing a junior—educational, not condescending.
`
    : "";

  return `# My Learning Profile
${nameContext}
## Learning Archetype: ${primaryInfo.name}${secondary ? ` (with ${secondaryInfo?.name} tendencies)` : ""}

${primaryInfo.shortDescription}
${roleContext}
## How to Teach Me

### Do:
${primaryInfo.doItems.map((item) => `- ${item}`).join("\n")}

### Don't:
${primaryInfo.dontItems.map((item) => `- ${item}`).join("\n")}
${
  secondary
    ? `
### Secondary Style (${secondaryInfo?.name}):
${secondaryInfo?.doItems.slice(0, 2).map((item) => `- Also: ${item}`).join("\n")}
`
    : ""
}
## Communication Preferences

${communicationStyle}

${techLevelContext}

## When I'm Stuck

${stuckDetection}

## Energy & Pacing

${tirednessHandling}
${teacherModeSection}
---
*Generated by Learning Profile Builder - https://learning-profile-builder.vercel.app*
`;
}

export function generateUserExplanation(data: OutputData): string {
  const { primary, secondary, percentages } = getArchetypeResults(data.scores);
  const primaryInfo = archetypeInfo[primary];

  // Sort archetypes by percentage for display
  const sortedArchetypes = (Object.entries(percentages) as [Archetype, number][])
    .sort(([, a], [, b]) => b - a);

  // Generate question-by-question breakdown
  const questionBreakdown = questions
    .filter((q) => q.type === "choice")
    .map((q) => {
      const answer = data.answers[q.id] as string;
      const option = q.options?.find((opt) => opt.label === answer);
      if (!option) return null;

      const scoreContributions = Object.entries(option.scores)
        .map(([archetype, points]) => `+${points} ${archetypeInfo[archetype as Archetype].name}`)
        .join(", ");

      return `**${q.question}**
Your answer: "${answer}"
Points awarded: ${scoreContributions}`;
    })
    .filter(Boolean)
    .join("\n\n");

  return `# Your Learning Profile Breakdown

## Your Primary Archetype: ${primaryInfo.name}

${primaryInfo.deepDescription}

---

## Your Scoring Breakdown

| Archetype | Score | Percentage |
|-----------|-------|------------|
${sortedArchetypes.map(([archetype, pct]) => `| ${archetypeInfo[archetype].name} | ${data.scores[archetype]} pts | ${pct}% |`).join("\n")}

${secondary ? `\n**Secondary Archetype:** ${archetypeInfo[secondary].name} (${percentages[secondary]}%)\n\nYour secondary archetype influences how you learn but isn't your dominant style. Claude will incorporate elements of this style when appropriate.\n` : ""}

---

## How Each Answer Contributed

${questionBreakdown}

---

## What This Means for You

### Your Frustration Triggers
Claude will actively avoid these:
${primaryInfo.frustrationTriggers.map((t) => `- ${t}`).join("\n")}

### Signs You're Succeeding
Claude will look for these positive signals:
${primaryInfo.successSignals.map((s) => `- ${s}`).join("\n")}

---

## What's in Your CLAUDE.md

The "For Claude" tab contains the actual profile that Claude will read. It includes:

1. **Your archetype summary** - A quick reference for how you learn best
2. **Do/Don't lists** - Specific behaviors Claude should follow or avoid
3. **Communication preferences** - Based on your answers about tone and detail level
4. **Stuck detection** - How Claude should recognize when you need a different approach
5. **Energy management** - When and how Claude should suggest breaks
${data.teacherMode ? "6. **Teacher Mode** - Claude will offer to create learning documents for projects" : ""}

---

*Copy the CLAUDE.md content and paste it into ~/.claude/CLAUDE.md (for global settings) or your project root (for project-specific settings).*

*Generated by Learning Profile Builder - https://learning-profile-builder.vercel.app*
`;
}
