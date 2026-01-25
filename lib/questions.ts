export type Archetype = 
  | "systemsThinker" 
  | "handsOnLearner" 
  | "exampleFirstLearner" 
  | "scaffoldedLearner" 
  | "connector";

export type ArchetypeScores = Record<Archetype, number>;

export interface Option {
  label: string;
  scores: Partial<ArchetypeScores>;
}

export interface Question {
  id: string;
  section: string;
  question: string;
  hint: string;
  type: "choice" | "text" | "toggle";
  options?: Option[];
  placeholder?: string;
  defaultValue?: boolean;
  description?: string;
}

export const questions: Question[] = [
  // Section: How You Learn
  {
    id: "q1",
    section: "How You Learn",
    question: "When learning something technical, what frustrates you most?",
    hint: "Reveals your learning blockers so Claude knows what to avoid",
    type: "choice",
    options: [
      { 
        label: "Jumping into details without showing me the big picture first", 
        scores: { systemsThinker: 3, connector: 1 } 
      },
      { 
        label: "Too much theory before I can try anything", 
        scores: { handsOnLearner: 3 } 
      },
      { 
        label: "No concrete examples to learn from", 
        scores: { exampleFirstLearner: 3 } 
      },
      { 
        label: "Explanations that assume I know more than I do", 
        scores: { scaffoldedLearner: 3 } 
      },
    ],
  },
  {
    id: "q2",
    section: "How You Learn",
    question: "What's your ideal way to understand a new concept?",
    hint: "Tells Claude how to structure explanations for you",
    type: "choice",
    options: [
      { 
        label: "Explain WHY it exists and how it fits the bigger system, then show me", 
        scores: { systemsThinker: 3, connector: 1 } 
      },
      { 
        label: "Give me step-by-step instructions I can follow", 
        scores: { scaffoldedLearner: 3 } 
      },
      { 
        label: "Show me a working example I can modify and experiment with", 
        scores: { exampleFirstLearner: 2, handsOnLearner: 2 } 
      },
      { 
        label: "Break it into small pieces and build up gradually", 
        scores: { scaffoldedLearner: 2, systemsThinker: 1 } 
      },
    ],
  },
  {
    id: "q3",
    section: "How You Learn",
    question: "When you're stuck on a problem, what helps most?",
    hint: "Shapes how Claude helps when you hit a wall",
    type: "choice",
    options: [
      { 
        label: "A hint so I can figure it out myself", 
        scores: { handsOnLearner: 2, systemsThinker: 1 } 
      },
      { 
        label: "The direct answer with an explanation of why", 
        scores: { systemsThinker: 2, exampleFirstLearner: 1 } 
      },
      { 
        label: "Seeing how an expert would think through it", 
        scores: { connector: 2, systemsThinker: 2 } 
      },
      { 
        label: "Breaking it into smaller, manageable pieces", 
        scores: { scaffoldedLearner: 3 } 
      },
    ],
  },
  // Section: Communication Style
  {
    id: "q4",
    section: "Communication Style",
    question: "How should Claude communicate with you?",
    hint: "Sets Claude's tone and verbosity level",
    type: "choice",
    options: [
      { 
        label: "Direct and concise - no fluff, respect my time", 
        scores: { handsOnLearner: 2, systemsThinker: 1 } 
      },
      { 
        label: "Thorough and detailed - I want the full picture", 
        scores: { systemsThinker: 3 } 
      },
      { 
        label: "Conversational - like talking to a knowledgeable friend", 
        scores: { connector: 3 } 
      },
      { 
        label: "Minimal - just give me the code or answer", 
        scores: { handsOnLearner: 3, exampleFirstLearner: 1 } 
      },
    ],
  },
  {
    id: "q5",
    section: "Communication Style",
    question: "What annoys you most in explanations?",
    hint: "Helps Claude avoid your pet peeves",
    type: "choice",
    options: [
      { 
        label: "Unnecessary praise or cheerleading", 
        scores: { handsOnLearner: 2, systemsThinker: 1 } 
      },
      { 
        label: "Too technical without explaining why it matters", 
        scores: { connector: 2, systemsThinker: 1 } 
      },
      { 
        label: "Oversimplified, feels like it's dumbing things down", 
        scores: { systemsThinker: 2, exampleFirstLearner: 1 } 
      },
      { 
        label: "Too many options without a clear recommendation", 
        scores: { scaffoldedLearner: 2, handsOnLearner: 1 } 
      },
    ],
  },
  // Section: Your Context
  {
    id: "q6",
    section: "Your Context",
    question: "What's your technical level?",
    hint: "Calibrates the depth of technical explanations",
    type: "choice",
    options: [
      { 
        label: "Non-technical - I work with technical people but don't code", 
        scores: { scaffoldedLearner: 2, connector: 1 } 
      },
      { 
        label: "Code-curious - I can read code but don't write production code", 
        scores: { exampleFirstLearner: 2, scaffoldedLearner: 1 } 
      },
      { 
        label: "Learning - actively building my coding skills", 
        scores: { handsOnLearner: 2, scaffoldedLearner: 1 } 
      },
      { 
        label: "Developer - I write code professionally", 
        scores: { systemsThinker: 1, handsOnLearner: 1, exampleFirstLearner: 1 } 
      },
    ],
  },
  // Section: Working Patterns
  {
    id: "q8",
    section: "Working Patterns",
    question: "How do you prefer to work on projects?",
    hint: "Tells Claude whether to help you plan first or dive in",
    type: "choice",
    options: [
      { 
        label: "Plan everything upfront, then execute", 
        scores: { systemsThinker: 3 } 
      },
      { 
        label: "Start building, refine as I go", 
        scores: { handsOnLearner: 3 } 
      },
      { 
        label: "Research deeply first, then decide", 
        scores: { systemsThinker: 2, connector: 1 } 
      },
      { 
        label: "Jump in and figure it out", 
        scores: { handsOnLearner: 2, exampleFirstLearner: 1 } 
      },
    ],
  },
  {
    id: "q9",
    section: "Working Patterns",
    question: "What happens when an explanation isn't working for you?",
    hint: "Helps Claude detect when to change approach",
    type: "choice",
    options: [
      { 
        label: "I get quiet - might be overwhelmed", 
        scores: { scaffoldedLearner: 2, connector: 1 } 
      },
      { 
        label: "I ask lots of follow-up questions", 
        scores: { systemsThinker: 2, connector: 1 } 
      },
      { 
        label: "I say 'this doesn't make sense'", 
        scores: { handsOnLearner: 2 } 
      },
      { 
        label: "I try to rephrase it myself", 
        scores: { connector: 3 } 
      },
    ],
  },
  {
    id: "q10",
    section: "Working Patterns",
    question: "How do you manage energy for technical work?",
    hint: "Helps Claude suggest breaks at the right moments",
    type: "choice",
    options: [
      { 
        label: "Plan when tired, code when fresh", 
        scores: { systemsThinker: 2, scaffoldedLearner: 1 } 
      },
      { 
        label: "I work best in long focused blocks", 
        scores: { handsOnLearner: 2, systemsThinker: 1 } 
      },
      { 
        label: "Short bursts with breaks", 
        scores: { scaffoldedLearner: 2, exampleFirstLearner: 1 } 
      },
      { 
        label: "Depends on the task", 
        scores: { connector: 2, exampleFirstLearner: 1 } 
      },
    ],
  },
  // Section: Your Context (text input) - shown as 10th question
  {
    id: "q7",
    section: "Your Context",
    question: "What's your role?",
    hint: "Adds context about your professional background",
    type: "text",
    placeholder: "e.g., Product Manager, Founder, Student, Engineer",
  },
  // Section: Claude Teacher Mode
  {
    id: "teacherMode",
    section: "Claude Teacher Mode",
    question: "Want Claude to document your projects as a learning opportunity?",
    hint: "",
    type: "toggle",
    defaultValue: false,
    description: "When a new project is created, Claude will ask if you want a FOR_YOU.md file explaining the project in plain language—architecture, decisions, bugs fixed, lessons learned. Like having a senior engineer explain their work to you.",
  },
];

export const archetypeInfo: Record<Archetype, {
  name: string;
  shortDescription: string;
  deepDescription: string;
  frustrationTriggers: string[];
  doItems: string[];
  dontItems: string[];
  successSignals: string[];
}> = {
  systemsThinker: {
    name: "Systems Thinker",
    shortDescription: "Needs WHY before HOW. Craves mental models, architecture diagrams, and understanding how pieces connect.",
    deepDescription: `You're a **Systems Thinker**. You need to understand the WHY before the HOW. When someone shows you code without context, your brain rebels—you need to know where this fits in the bigger picture.

**How you learn best:**
- Start with the architecture, then zoom into details
- Mental models and diagrams help you organize information
- You want to understand trade-offs and design decisions
- "Why was it built this way?" is your favorite question

**What Claude should do for you:**
- Always start with context and the big picture
- Explain the reasoning behind recommendations
- Show how components relate to each other
- Provide architecture-level explanations before diving into code`,
    frustrationTriggers: [
      "Jumping into implementation without explaining the architecture",
      "Missing context about why something works this way",
      "Not explaining trade-offs between options",
    ],
    doItems: [
      "Start with WHY and context before HOW",
      "Explain architecture and how pieces connect",
      "Show trade-offs and reasoning behind decisions",
      "Use mental models and system diagrams",
    ],
    dontItems: [
      "Don't jump into code without explaining the bigger picture",
      "Don't skip the 'why' behind recommendations",
      "Don't assume I'll figure out how things connect",
    ],
    successSignals: [
      "Asks clarifying questions about how things connect",
      "Wants to understand the trade-offs",
      "Appreciates architecture explanations",
    ],
  },
  handsOnLearner: {
    name: "Hands-On Learner",
    shortDescription: "Learns by doing. Theory after practice. Gets frustrated with too much explanation before action.",
    deepDescription: `You're a **Hands-On Learner**. Theory puts you to sleep—you learn by doing. You want to get your hands dirty first, then understand the concepts once you've felt the problem.

**How you learn best:**
- Try things first, understand theory later
- Learn from mistakes and iteration
- Prefer minimal explanation, maximum action
- "Let me try it" is your default mode

**What Claude should do for you:**
- Give you something to try immediately
- Keep explanations short and action-oriented
- Let you make mistakes and learn from them
- Provide hints rather than full solutions when you're stuck`,
    frustrationTriggers: [
      "Too much theory before getting to try anything",
      "Overly long explanations",
      "Not getting to the actionable part quickly",
    ],
    doItems: [
      "Get to the actionable solution quickly",
      "Keep explanations concise and practical",
      "Provide hints when stuck, not full solutions",
      "Let me try things and learn from mistakes",
    ],
    dontItems: [
      "Don't front-load with theory before I can try anything",
      "Don't over-explain—let me discover through doing",
      "Don't be overly cautious about letting me experiment",
    ],
    successSignals: [
      "Immediately tries to implement suggestions",
      "Asks 'can I just try this?'",
      "Learns from errors rather than avoiding them",
    ],
  },
  exampleFirstLearner: {
    name: "Example-First Learner",
    shortDescription: "Learns from concrete examples. Sees the pattern, then extracts the principle.",
    deepDescription: `You're an **Example-First Learner**. Abstract explanations don't stick—but show you a working example and suddenly everything clicks. You learn by seeing patterns in concrete code.

**How you learn best:**
- See a working example first, then understand the concept
- Compare multiple examples to extract patterns
- Modify existing code rather than writing from scratch
- "Show me an example" is your learning superpower

**What Claude should do for you:**
- Lead with working code examples
- Show multiple variations to illustrate patterns
- Provide code you can copy and modify
- Explain concepts by annotating examples`,
    frustrationTriggers: [
      "Abstract explanations without concrete examples",
      "Concepts explained before seeing them in action",
      "Not enough code samples",
    ],
    doItems: [
      "Lead with working code examples",
      "Show patterns through multiple variations",
      "Provide code I can copy, modify, and experiment with",
      "Annotate examples to explain concepts",
    ],
    dontItems: [
      "Don't explain concepts without showing examples first",
      "Don't give me abstract theory when I need to see it in action",
      "Don't assume I'll understand without seeing code",
    ],
    successSignals: [
      "Asks 'can you show me an example?'",
      "Immediately tries to modify provided code",
      "Understands patterns faster than rules",
    ],
  },
  scaffoldedLearner: {
    name: "Scaffolded Learner",
    shortDescription: "Needs gradual building. No skipped steps. Builds confidence through incremental progress.",
    deepDescription: `You're a **Scaffolded Learner**. You build understanding step by step—skip a step and you lose the thread. Each new concept needs to build on what you already understand.

**How you learn best:**
- Small, incremental steps that build on each other
- Explicit connections to what you already know
- No assumptions about prior knowledge
- Clear checkpoints and validation along the way

**What Claude should do for you:**
- Break everything into small, manageable steps
- Check for understanding before moving on
- Never skip steps or assume knowledge
- Provide clear milestones and progress markers`,
    frustrationTriggers: [
      "Skipping steps or assuming knowledge",
      "Moving too fast without checking understanding",
      "Explanations that assume more than I know",
    ],
    doItems: [
      "Break things into small, manageable steps",
      "Check for understanding before moving on",
      "Never skip steps—each one should build on the last",
      "Provide clear milestones and checkpoints",
    ],
    dontItems: [
      "Don't skip steps or assume I know something",
      "Don't move on without checking I understood",
      "Don't overwhelm with too much at once",
    ],
    successSignals: [
      "Asks 'can we slow down?'",
      "Wants to make sure they understood each step",
      "Appreciates clear, sequential instructions",
    ],
  },
  connector: {
    name: "Connector",
    shortDescription: "Relates new info to existing knowledge. Loves analogies and connections to familiar concepts.",
    deepDescription: `You're a **Connector**. New concepts make sense when you can relate them to something you already know. Analogies are your secret weapon—they turn the unfamiliar into the familiar.

**How you learn best:**
- Connect new concepts to things you already know
- Analogies and metaphors make things click
- See relationships between different domains
- "It's like..." is how you understand

**What Claude should do for you:**
- Use analogies from familiar domains
- Connect new concepts to existing knowledge
- Show relationships between ideas
- Frame technical concepts in everyday terms`,
    frustrationTriggers: [
      "New concepts without connection to familiar ones",
      "Missing analogies or relatable comparisons",
      "Technical jargon without everyday context",
    ],
    doItems: [
      "Use analogies and metaphors from familiar domains",
      "Connect new concepts to things I already know",
      "Show how different ideas relate to each other",
      "Frame technical concepts in everyday terms",
    ],
    dontItems: [
      "Don't introduce concepts without relating to familiar ones",
      "Don't skip the analogies—they're how I understand",
      "Don't assume technical framing is enough",
    ],
    successSignals: [
      "Says 'oh, so it's like...'",
      "Makes their own analogies",
      "Connects ideas across different domains",
    ],
  },
};

export function calculateScores(answers: Record<string, string | boolean>): ArchetypeScores {
  const scores: ArchetypeScores = {
    systemsThinker: 0,
    handsOnLearner: 0,
    exampleFirstLearner: 0,
    scaffoldedLearner: 0,
    connector: 0,
  };

  for (const question of questions) {
    if (question.type !== "choice") continue;
    
    const answer = answers[question.id];
    if (typeof answer !== "string") continue;
    
    const selectedOption = question.options?.find(opt => opt.label === answer);
    if (!selectedOption) continue;
    
    for (const [archetype, points] of Object.entries(selectedOption.scores)) {
      scores[archetype as Archetype] += points;
    }
  }

  return scores;
}

export function getArchetypeResults(scores: ArchetypeScores): {
  primary: Archetype;
  secondary: Archetype | null;
  percentages: Record<Archetype, number>;
} {
  const total = Object.values(scores).reduce((sum, score) => sum + score, 0);
  
  const sortedArchetypes = (Object.entries(scores) as [Archetype, number][])
    .sort(([, a], [, b]) => b - a);

  const primary = sortedArchetypes[0][0];
  const secondary = sortedArchetypes[1][1] > 1 ? sortedArchetypes[1][0] : null;

  const percentages = Object.fromEntries(
    Object.entries(scores).map(([key, value]) => [
      key,
      total > 0 ? Math.round((value / total) * 100) : 0,
    ])
  ) as Record<Archetype, number>;

  return { primary, secondary, percentages };
}
