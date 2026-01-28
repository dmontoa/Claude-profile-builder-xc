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

// Archetype descriptions for CLAUDE.md (short versions)
const archetypeDescriptions: Record<Archetype, string[]> = {
  systemsThinker: [
    "Always explain WHY before HOW - I need the mental model before I can act",
    "Connect to what I know - Bridge new concepts to my existing understanding",
    "Big picture first - Show me where we are in the system before zooming in",
    "Architecture before code - I want to understand the structure, not just copy-paste",
  ],
  handsOnLearner: [
    "Get me to working code quickly, then explain as needed",
    "Minimize theory upfront - I learn by doing",
    "Give me something I can run and modify right away",
    "Let me experiment and fail - that's how I learn best",
  ],
  exampleFirstLearner: [
    "Lead with concrete, working examples",
    "Show me real code I can study and modify",
    "Demonstrate concepts through practical implementation, not abstract explanation",
    "Annotate examples so I understand what each part does",
  ],
  scaffoldedLearner: [
    "Break complex topics into small, digestible pieces",
    "Don't skip steps or assume prior knowledge",
    "Check my understanding before moving to the next concept",
    "Build up gradually from simple to complex",
  ],
  connector: [
    "Bridge new concepts to things I already understand",
    "Show how different parts of the system relate to each other",
    "Help me see patterns across different contexts",
    "Connect technical decisions to business outcomes",
  ],
};

// Learning pattern flows
const learningPatterns: Record<Archetype, string> = {
  systemsThinker: "Why → Big Picture → Zoom In → Apply → Iterate",
  handsOnLearner: "Try → Fail → Learn → Refine → Master",
  exampleFirstLearner: "See Example → Understand → Modify → Create → Extend",
  scaffoldedLearner: "Simple → Add Layer → Check Understanding → Build → Integrate",
  connector: "Context → Relate → Connect → Apply → Synthesize",
};

export function generateClaudeMd(data: OutputData): string {
  const { primary, secondary, percentages } = getArchetypeResults(data.scores);
  const primaryInfo = archetypeInfo[primary];
  const secondaryInfo = secondary ? archetypeInfo[secondary] : null;

  const q1Answer = data.answers["q1"] as string;
  const q3Answer = data.answers["q3"] as string;
  const q4Answer = data.answers["q4"] as string;
  const q5Answer = data.answers["q5"] as string;
  const q8Answer = data.answers["q8"] as string;
  const q9Answer = data.answers["q9"] as string;
  const q10Answer = data.answers["q10"] as string;
  const techLevel = data.answers["q6"] as string;

  // Build frustration triggers based on Q1 answer
  const frustrationTriggers: string[] = [];
  if (q1Answer?.includes("big picture")) {
    frustrationTriggers.push('"Just do this" without explaining why');
    frustrationTriggers.push('"Don\'t worry about this for now" - I always worry about it');
  } else if (q1Answer?.includes("Too much theory")) {
    frustrationTriggers.push("Long theoretical explanations before I can try anything");
    frustrationTriggers.push("Too much context when I just want to start");
  } else if (q1Answer?.includes("No concrete examples")) {
    frustrationTriggers.push("Abstract explanations without concrete examples");
    frustrationTriggers.push("Concepts explained in isolation (no working code)");
  } else if (q1Answer?.includes("assume I know")) {
    frustrationTriggers.push("Skipping steps or assuming prior knowledge");
    frustrationTriggers.push("Moving too fast through complex material");
  }

  // Add archetype-specific frustration triggers
  if (primary === "systemsThinker" || secondary === "systemsThinker") {
    frustrationTriggers.push("Information presented in isolation (no connections)");
    frustrationTriggers.push('Skipping the architecture for "simplicity"');
  }
  if (primary === "connector" || secondary === "connector") {
    frustrationTriggers.push("New concepts without relating to what I know");
  }

  // Build DO items based on Q4 answer
  const doItems: string[] = [];
  if (q4Answer?.includes("Direct and concise")) {
    doItems.push("Be direct and concise - no fluff, respect my time");
    doItems.push("Business context first - why does this matter?");
  } else if (q4Answer?.includes("Thorough and detailed")) {
    doItems.push("Be thorough and detailed");
    doItems.push("Provide the full context and reasoning");
  } else if (q4Answer?.includes("Conversational")) {
    doItems.push("Be conversational and approachable");
    doItems.push("Explain things like a knowledgeable friend would");
  } else if (q4Answer?.includes("Minimal")) {
    doItems.push("Be minimal - prioritize code and direct answers");
    doItems.push("Skip explanations unless I ask for them");
  }
  // Always include
  doItems.push("Start simple, add complexity when I signal readiness");
  doItems.push("Flag hidden issues - security, scalability, technical debt");
  doItems.push("Challenge my thinking - I'd rather be corrected than coddled");

  // Build DON'T items based on Q5 answer
  const dontItems: string[] = [];
  if (q5Answer?.includes("praise")) {
    dontItems.push("Use unnecessary praise or cheerleading");
    dontItems.push("Praise or validation - I'm here to learn, not feel good");
  } else if (q5Answer?.includes("Too technical")) {
    dontItems.push("Give technical explanations without business/practical context");
    dontItems.push("Technical jargon without business relevance");
  } else if (q5Answer?.includes("Oversimplified")) {
    dontItems.push("Oversimplify or dumb things down");
    dontItems.push("Assume I need hand-holding");
  } else if (q5Answer?.includes("Too many options")) {
    dontItems.push("Give me multiple options without a clear recommendation");
    dontItems.push("Be wishy-washy - have an opinion");
  }
  // Add if Q4 is direct or minimal
  if (q4Answer?.includes("Direct") || q4Answer?.includes("Minimal")) {
    dontItems.push("Long explanations without action items");
  }
  // Always include
  dontItems.push("Excessive theory before application");

  // Response length based on Q4
  let responseLength = "";
  if (q4Answer?.includes("Direct and concise")) {
    responseLength = "Medium (concise but complete)";
  } else if (q4Answer?.includes("Thorough and detailed")) {
    responseLength = "Detailed (comprehensive)";
  } else if (q4Answer?.includes("Conversational")) {
    responseLength = "Conversational (natural flow)";
  } else if (q4Answer?.includes("Minimal")) {
    responseLength = "Minimal (code-focused)";
  }

  // When stuck approach based on Q3
  let whenStuckApproach = "";
  if (q3Answer?.includes("hint")) {
    whenStuckApproach = `1. Ask what I've tried
2. Give a hint so I can figure it out myself
3. Explain my mistake, don't just fix it`;
  } else if (q3Answer?.includes("direct answer")) {
    whenStuckApproach = `1. Acknowledge the problem
2. Give the direct answer
3. Explain WHY that's the answer`;
  } else if (q3Answer?.includes("expert")) {
    whenStuckApproach = `1. Show how an expert would approach this
2. Walk through the thinking process
3. Highlight the key insight`;
  } else if (q3Answer?.includes("smaller")) {
    whenStuckApproach = `1. Break the problem into smaller pieces
2. Solve one piece at a time
3. Show how pieces connect`;
  }

  // Working patterns based on Q8
  let planningStyle = "";
  if (q8Answer?.includes("Plan everything")) {
    planningStyle = "Thorough PRDs before building (architecture, schemas, file structure)";
  } else if (q8Answer?.includes("Start building")) {
    planningStyle = "Iterative - start building, refine as I go";
  } else if (q8Answer?.includes("Research deeply")) {
    planningStyle = "Research-first - deep investigation before decisions";
  } else if (q8Answer?.includes("Jump in")) {
    planningStyle = "Exploratory - jump in and figure it out";
  }

  // Energy management based on Q10
  let energyStyle = "";
  let energyAddendum = "";
  if (q10Answer?.includes("Plan when tired")) {
    energyStyle = "Plan when tired, code when fresh";
    energyAddendum = `If I seem fatigued during implementation, suggest: "Want to switch to planning/architecture for now and code this when fresh?"`;
  } else if (q10Answer?.includes("long focused blocks")) {
    energyStyle = "Long focused blocks work best";
    energyAddendum = "Don't interrupt my flow. Only check in at natural completion points.";
  } else if (q10Answer?.includes("Short bursts")) {
    energyStyle = "Short bursts with breaks";
    energyAddendum = `After completing a chunk, naturally offer a pause point: "Good stopping point here. Continue or take a break?"`;
  } else if (q10Answer?.includes("Depends")) {
    energyStyle = "Varies by task";
    energyAddendum = "";
  }

  // Stuck detection table based on Q9
  let stuckDetectionTable = "";
  if (q9Answer?.includes("get quiet")) {
    stuckDetectionTable = `**My signal when stuck**: I go quiet (might be overwhelmed)

| Signal | What It Means | Response |
|--------|---------------|----------|
| No response after explanation | Processing or lost | "Let me try explaining this differently..." |
| Short replies ("ok", "sure") | Might be overwhelmed | "Want me to break this down further?" |
| Long pause before responding | Thinking or stuck | Wait, then offer: "Any part I should clarify?" |

**IMPORTANT**: Don't flood me with more info. Pause and offer a different angle.`;
  } else if (q9Answer?.includes("follow-up questions")) {
    stuckDetectionTable = `**My signal when stuck**: I ask lots of follow-up questions

| Signal | What It Means | Response |
|--------|---------------|----------|
| 3+ questions on the same topic | Missing foundational context | "Let me step back and cover the basics first" |
| Questions getting more specific | Drilling down, might need to zoom out | "Here's the bigger picture before we dive deeper" |
| Repeating similar questions | Explanation not landing | Try analogy or different example |

**IMPORTANT**: Rapid questions = I need more foundation, not more details.`;
  } else if (q9Answer?.includes("doesn't make sense")) {
    stuckDetectionTable = `**My signal when stuck**: I say "this doesn't make sense" directly

| Signal | What It Means | Response |
|--------|---------------|----------|
| "I don't get it" / "confused" | Explanation approach isn't working | Try different angle (visual, analogy, code) |
| "Wait, but..." | Something contradicts my mental model | Address the contradiction explicitly |
| Frustrated tone | Need a reset | "Let me try a completely different approach" |

**IMPORTANT**: I give direct feedback. Take it at face value and adapt.`;
  } else if (q9Answer?.includes("rephrase")) {
    stuckDetectionTable = `**My signal when stuck**: I try to rephrase it myself

| Signal | What It Means | Response |
|--------|---------------|----------|
| "So basically..." (incorrect) | Mental model needs correction | "Close, but [specific correction]" |
| "Let me see if I get this..." | Actively synthesizing | Confirm what's right, correct what's wrong |
| My restatement misses the point | Core concept not landing | "The key insight is actually..." |

**IMPORTANT**: I learn by restating. Correct me gently but directly.`;
  }

  // Technical level context
  let techLevelContext = "";
  let techLevelShort = "";
  if (techLevel?.includes("Non-technical")) {
    techLevelContext = "Non-technical - I work with technical people but don't code myself";
    techLevelShort = "Non-technical";
  } else if (techLevel?.includes("Code-curious")) {
    techLevelContext = "Code-curious - I can read code but don't write production code";
    techLevelShort = "Code-curious";
  } else if (techLevel?.includes("Learning")) {
    techLevelContext = "Learning - actively building my coding skills";
    techLevelShort = "Learning developer";
  } else if (techLevel?.includes("Developer")) {
    techLevelContext = "Developer - I write code professionally";
    techLevelShort = "Professional developer";
  }

  const roleContext = data.role || "[YOUR_ROLE]";
  const nameContext = data.userName ? `Call me ${data.userName}.` : "";

  // Teacher mode section
  const teacherModeSection = data.teacherMode
    ? `
---

## Claude Teacher Mode

When starting a new project, ask: "Would you like me to create a learning document for this project?"

If yes, create a FOR_YOU.md file in the project directory with:

1. **Project Overview** - What it does, business problem, why it matters
2. **Architecture Map** - ASCII diagram, 30k foot view, data flow
3. **Technology Choices** - WHY each tech, trade-offs, business implications
4. **Codebase Structure** - Folders explained, how parts connect
5. **Build Journey** - Decisions, bugs, aha moments (narrative style)
6. **Lessons Learned** - Security, scalability, best practices, pitfalls
7. **Business Context** - Applications to my work, skills gained
8. **Quick Reference** - Commands, file locations, common tasks

**Writing style**: Engaging, analogies welcome, WHY before WHAT, scannable, honest about flaws.
`
    : "";

  // Tiredness detection table (always included)
  const tirednessTable = `| Signal | Response |
|--------|----------|
| Multiple tasks completed in session | "We've tackled [X, Y, Z] so far. Want to pause here or continue?" |
| Complex implementation just finished | Offer to create \`RESUME_SESSION.md\` |
| User says "one more thing" or "last thing" | Recognize natural stopping point, confirm before continuing |
| Errors increasing after a streak of success | "Want to pick this up fresh later?" |
| User mentions being tired/late/rushed | Acknowledge, suggest planning vs. coding |

**IMPORTANT**: Confirm, don't assume. Always ask before suggesting breaks.${energyAddendum ? `\n\n**My energy style**: ${energyAddendum}` : ""}`;

  // Success signals based on archetype
  const successSignals: string[] = [];
  if (primary === "systemsThinker") {
    successSignals.push("I'm asking about edge cases and implications");
    successSignals.push("I'm connecting this to other things I know");
    successSignals.push('I say "that makes sense" or "now I see why"');
  } else if (primary === "handsOnLearner") {
    successSignals.push("I'm actively modifying and experimenting with code");
    successSignals.push('I\'m asking "what if I try this instead?"');
    successSignals.push("I'm making progress, even if messy");
  } else if (primary === "exampleFirstLearner") {
    successSignals.push("I'm studying the example and asking clarifying questions");
    successSignals.push("I'm modifying the example to test my understanding");
    successSignals.push("I can explain what the code does");
  } else if (primary === "scaffoldedLearner") {
    successSignals.push("I'm following along and completing each step");
    successSignals.push("I can answer check-in questions correctly");
    successSignals.push("I'm ready for the next piece");
  } else if (primary === "connector") {
    successSignals.push("I'm seeing patterns and making analogies");
    successSignals.push("I'm relating this to previous projects");
    successSignals.push("I understand the business implications");
  }

  // It's NOT working signals based on Q9
  let notWorkingSignal = "";
  if (q9Answer?.includes("get quiet")) {
    notWorkingSignal = "I go quiet or seem withdrawn → Pause, zoom out, check if I need a different angle";
  } else if (q9Answer?.includes("follow-up questions")) {
    notWorkingSignal = "I'm asking lots of rapid follow-up questions → Step back and provide more foundational context";
  } else if (q9Answer?.includes("doesn't make sense")) {
    notWorkingSignal = 'I say "this doesn\'t make sense" directly → Try a different explanation approach';
  } else if (q9Answer?.includes("rephrase")) {
    notWorkingSignal = "I keep trying to rephrase what you said → Confirm or correct my understanding";
  }

  // Build the header with optional name
  const headerName = data.userName ? `${data.userName}'s` : (data.role ? `${data.role}'s` : "My");

  return `# ${headerName} Learning Profile
${nameContext ? `\n${nameContext}\n` : ""}
## Quick Reference

| Attribute | Value |
|-----------|-------|
| **Primary Archetype** | ${primaryInfo.name} (${percentages[primary]}%) |
| **Secondary** | ${secondary ? `${secondaryInfo?.name} (${percentages[secondary]}%)` : "—"} |
| **Response Length** | ${responseLength} |
| **Technical Level** | ${techLevelShort} |
| **Role** | ${roleContext} |

---

## Learning Archetype: ${primaryInfo.name}${secondary ? ` + ${secondaryInfo?.name}` : ""}

### What This Means
${archetypeDescriptions[primary].map((item) => `- ${item}`).join("\n")}

### Learning Pattern
${learningPatterns[primary]}

### Frustration Triggers
${frustrationTriggers.map((item) => `- ${item}`).join("\n")}

---

## Communication Rules

### DO
${doItems.map((item) => `- ${item}`).join("\n")}

### DON'T
${dontItems.map((item) => `- ${item}`).join("\n")}

### Response Length
- **Default**: ${responseLength}
- **Expand**: When I ask "tell me more", "go deeper"
- **Compress**: When I say "too much", "just the code"

---

## Response Templates

### Technical Concepts
\`\`\`
## [Topic]
**Why This Matters**: [1-2 sentences]
**How It Works**: [Mental model]
**In Practice**: [Example/code]
**Go Deeper?**: [Offer more]
\`\`\`

### When I'm Stuck
${whenStuckApproach}

### Decisions
\`\`\`
## Options
| Option | Pros | Cons | Best When |
**Recommendation**: [Clear stance + reasoning]
\`\`\`

---

## Working Patterns

- **Planning style**: ${planningStyle}
- **Energy management**: ${energyStyle}
- **Session continuity**: Create \`RESUME_SESSION.md\` at end of longer sessions

---

## Detecting When I'm Stuck

${stuckDetectionTable}

### Success Signals - It's Working When:
${successSignals.map((item) => `- ${item}`).join("\n")}

### It's NOT Working When:
- ${notWorkingSignal}

---

## Tiredness Detection

${tirednessTable}
${teacherModeSection}
---
*Generated by [Learning Profile Builder](https://learning-profile-builder.vercel.app)*
`;
}

// Deep archetype descriptions for "For You" explanation
const deepDescriptions: Record<Archetype, {
  description: string;
  characteristics: string[];
  strengths: string[];
  blindSpots: string[];
  idealLearning: string[];
  frustrations: string[];
}> = {
  systemsThinker: {
    description: "You need to understand WHY before HOW. Surface-level knowledge creates anxiety—you need to know what's happening 'below the surface' to feel confident. You're the person who quits tutorials that say 'just do this' without explaining the mechanism.",
    characteristics: [
      "Need the mental model before taking action",
      "Uncomfortable with \"magic\" or unexplained abstraction",
      "Want to know cause-and-effect relationships",
      "Prefer understanding the system architecture first",
      "Ask \"but why?\" frequently",
    ],
    strengths: [
      "Deep understanding leads to better debugging",
      "Can reason about edge cases others miss",
      "Don't need to memorize—you understand",
      "Excel at architecture and system design",
      "Knowledge transfers across domains",
    ],
    blindSpots: [
      "Can get stuck in \"analysis paralysis\"",
      "Might over-engineer simple solutions",
      "Frustration with \"just try it\" approaches",
      "Slower initial progress (but deeper long-term mastery)",
      "May delay starting until you feel you \"fully understand\"",
    ],
    idealLearning: [
      "Explain the system architecture first",
      "Show cause-and-effect relationships",
      "Reveal what's happening \"under the hood\"",
      "Connect new concepts to existing mental models",
    ],
    frustrations: [
      "\"Just run this command\" without explanation",
      "\"We'll explain later\" (no! explain NOW)",
      "Tutorials that skip the WHY",
      "Magic that isn't demystified",
    ],
  },
  handsOnLearner: {
    description: "You learn by doing, not by reading. Theory without practice feels abstract and hard to retain. You want to build something NOW and understand it through experimentation.",
    characteristics: [
      "Want to build something immediately",
      "Learn by doing, not reading",
      "\"I'll understand it when I see it work\"",
      "Comfortable with abstraction initially",
      "Impatient with long explanations",
    ],
    strengths: [
      "Fast initial progress",
      "High motivation from tangible results",
      "Learn debugging through experience",
      "Good at prototyping and iteration",
      "Resilient—failure is just data",
    ],
    blindSpots: [
      "Gaps in fundamental knowledge",
      "Struggle when things break unexpectedly",
      "May copy-paste without understanding",
      "Hit walls when abstracting/scaling",
      "Can build habits that need unlearning later",
    ],
    idealLearning: [
      "Quick wins and visible results",
      "Projects before theory",
      "\"Build this, then we'll explain it\"",
      "Hands-on exercises immediately",
    ],
    frustrations: [
      "Long theoretical explanations upfront",
      "Reading documentation before trying",
      "\"First, let's understand the fundamentals\"",
      "Waiting to build",
    ],
  },
  exampleFirstLearner: {
    description: "You learn by seeing patterns across multiple examples. Show you 5 variations and you'll figure out the underlying principle. Abstract explanations without concrete code feel hollow.",
    characteristics: [
      "Learn by seeing multiple examples",
      "\"Show me 5 examples, I'll figure out the pattern\"",
      "Visual and pattern-oriented",
      "Need to see variations to understand",
      "Abstract theory feels disconnected",
    ],
    strengths: [
      "Great at recognizing solutions to similar problems",
      "Excel at design patterns",
      "Good code reviewers",
      "Natural at refactoring",
      "Build intuition through exposure",
    ],
    blindSpots: [
      "Struggle with truly novel problems",
      "May miss underlying principles",
      "Over-rely on analogies that can break",
      "Need exposure to enough examples first",
      "Can pattern-match incorrectly",
    ],
    idealLearning: [
      "Lots of examples with slight variations",
      "Side-by-side comparisons",
      "Visual diagrams and flowcharts",
      "\"Here's the pattern, now apply it\"",
    ],
    frustrations: [
      "Abstract explanations without examples",
      "Concepts explained in isolation",
      "One example expected to cover everything",
      "Theory-heavy approaches",
    ],
  },
  scaffoldedLearner: {
    description: "You learn best when complex topics are broken into digestible pieces with clear progression. Jumping ahead or skipping steps creates confusion. You need to solidify each layer before building on it.",
    characteristics: [
      "Need clear, linear progression",
      "\"What's the next step?\"",
      "Uncomfortable with ambiguity",
      "Like checklists and recipes",
      "Each step builds on the previous",
    ],
    strengths: [
      "Systematic and thorough",
      "Don't skip steps",
      "Good at following best practices",
      "Reliable execution",
      "Build solid foundations",
    ],
    blindSpots: [
      "Struggle when path is unclear",
      "Need structure (hard to self-direct)",
      "May not develop improvisation skills",
      "Dependent on good tutorials",
      "Can feel stuck without guidance",
    ],
    idealLearning: [
      "Clear sequential steps",
      "No surprises or jumps",
      "Validation at each stage",
      "Defined learning paths",
    ],
    frustrations: [
      "Skipping steps or assuming knowledge",
      "\"You should already know this\"",
      "Jumping around topics",
      "Unclear progression",
    ],
  },
  connector: {
    description: "You learn by relating new information to what you already know. Every new concept needs an anchor to existing knowledge. You see patterns across domains and think in analogies.",
    characteristics: [
      "Need to see how everything fits together",
      "\"How does this relate to what I know?\"",
      "Build analogies and mental maps",
      "Cross-disciplinary thinking",
      "See the bigger business/life context",
    ],
    strengths: [
      "Great at interdisciplinary work",
      "Can explain complex topics simply",
      "Transfer knowledge across domains",
      "Natural teachers/communicators",
      "See implications others miss",
    ],
    blindSpots: [
      "Struggle when starting totally new domains",
      "Over-rely on analogies (which can break)",
      "May miss domain-specific nuances",
      "Need existing knowledge to anchor to",
      "Can overgeneralize",
    ],
    idealLearning: [
      "Context and motivation first",
      "Connections to prior knowledge",
      "Big picture before details",
      "Analogies to familiar domains",
    ],
    frustrations: [
      "New concepts without relating to what you know",
      "Isolated facts without context",
      "\"Just memorize this\"",
      "Missing the business/real-world connection",
    ],
  },
};

// Special blend messages
function getBlendMessage(primary: Archetype, secondary: Archetype | null): string {
  if (!secondary) return "";

  if (primary === "systemsThinker" && secondary === "connector") {
    return "You need the WHY and the mental model, but you also need it connected to what you already know. Pure theory without relevance won't land.";
  }
  if (primary === "systemsThinker" && secondary === "handsOnLearner") {
    return "You need to understand the system deeply, but you also need to build/apply to cement that understanding. Theory + Practice integration.";
  }
  if (primary === "handsOnLearner" && secondary === "exampleFirstLearner") {
    return "You learn by doing, but you need to see working examples first. Show me, then let me try.";
  }
  if (primary === "connector" && secondary === "systemsThinker") {
    return "You connect new concepts to existing knowledge, and you also want the deep system understanding. Analogies + Architecture.";
  }

  return `Claude will prioritize ${archetypeInfo[primary].name} approaches while weaving in ${archetypeInfo[secondary].name} elements.`;
}

export function generateUserExplanation(data: OutputData): string {
  const { primary, secondary, percentages } = getArchetypeResults(data.scores);
  const primaryInfo = archetypeInfo[primary];
  const deepInfo = deepDescriptions[primary];
  const secondaryInfo = secondary ? archetypeInfo[secondary] : null;

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
→ ${scoreContributions}`;
    })
    .filter(Boolean)
    .join("\n\n");

  // Blend message
  const blendMessage = getBlendMessage(primary, secondary);

  return `# Understanding Your Learning Profile

## You're a ${primaryInfo.name}

${deepInfo.description}

---

## The Key Insight: You're a Blend

| Archetype | Score | Percentage |
|-----------|-------|------------|
${sortedArchetypes.map(([archetype, pct]) => `| ${pct === percentages[primary] ? "**" : ""}${archetypeInfo[archetype].name}${pct === percentages[primary] ? "**" : ""} | ${data.scores[archetype]} pts | ${pct}% |`).join("\n")}

${secondary ? `**Secondary Archetype:** ${secondaryInfo?.name} (${percentages[secondary]}%)

${blendMessage}` : "You have a dominant learning style without a strong secondary influence."}

---

## Your Characteristics

${deepInfo.characteristics.map((c) => `- ${c}`).join("\n")}

---

## Your Strengths

${deepInfo.strengths.map((s) => `✓ ${s}`).join("\n")}

---

## Potential Blind Spots

*These aren't weaknesses—just areas to be aware of:*

${deepInfo.blindSpots.map((b) => `⚠ ${b}`).join("\n")}

---

## What You Need From Claude

${deepInfo.idealLearning.map((l) => `→ ${l}`).join("\n")}

---

## What Frustrates You

${deepInfo.frustrations.map((f) => `✗ ${f}`).join("\n")}

---

## How We Calculated This

Each answer contributed points to different archetypes:

${questionBreakdown}

**Final Scores:**
${sortedArchetypes.map(([archetype, pct]) => `- ${archetypeInfo[archetype].name}: ${data.scores[archetype]} points (${pct}%)`).join("\n")}

---

## What Happens Now

1. **Copy the profile** from the "For Claude" tab
2. **Save it** to \`~/.claude/CLAUDE.md\` for global settings, or your project root for project-specific
3. **Claude will read it** and adapt its teaching style to match your profile

${data.teacherMode ? `
**Teacher Mode is ON**: When you start new projects, Claude will offer to create a FOR_YOU.md learning document.
` : ""}

---

## The 5 Learning Archetypes

| Archetype | Core Need | Learns Best When |
|-----------|-----------|------------------|
| **Systems Thinker** | WHY before HOW | Architecture and mental models first |
| **Hands-On Learner** | Build first, theory later | Given something to try immediately |
| **Example-First** | See it in action | Shown working code to study |
| **Scaffolded** | Step-by-step | Complex topics broken into pieces |
| **Connector** | Relate to known | Analogies bridge to new concepts |

---

*Generated by [Learning Profile Builder](https://learning-profile-builder.vercel.app)*
`;
}
