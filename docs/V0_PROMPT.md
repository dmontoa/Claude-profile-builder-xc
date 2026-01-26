# v0 Prompt: Learning Profile Builder for Claude Code

Copy everything below the line into v0.dev

---

Build a "Learning Profile Builder" single-page app for Claude Code users.

## What It Does
Users answer 10 questions about how they learn → app calculates their "learning archetype" (like a personality test) → generates TWO outputs: a CLAUDE.md file for Claude, and an explanation document for the user showing their scoring breakdown. Zero data storage, fully client-side.

## Page Structure

### Screen 1: Welcome
- Headline: "Build Your Claude Learning Profile"
- Subhead: "Answer a few questions. Get a personalized CLAUDE.md that makes Claude Code teach the way YOU learn best."
- "Get Started" button
- Privacy badge with shield icon: "Your answers never leave your browser. Nothing is stored."
- Link: "Open source - verify on GitHub" (link to: github.com/danielmontoyah/claude-learning-profile-builder)

### Screen 2: Questionnaire
11 items total (10 questions + 1 toggle). One question per screen with smooth slide transitions.

**Progress Header (sticky)**:
- Left: Section name (e.g., "How You Learn")
- Right: "X of 11"
- Below: thin progress bar

**Question Layout**:
- Large question text
- Below question: hint text in muted color explaining WHY we ask this (important for user trust)
- Options as cards with radio-style selection (circle that fills with checkmark when selected)
- Back/Continue buttons in sticky footer

**IMPORTANT**: Each question has a `hint` shown below it. These hints explain to the user why we're asking, which builds trust and helps them answer honestly.

---

## Questions (exact wording required)

### Section: "How You Learn"

**Q1**
Question: "When learning something technical, what frustrates you most?"
Hint: "Reveals your learning blockers so Claude knows what to avoid"
Options:
- "Jumping into details without showing me the big picture first"
- "Too much theory before I can try anything"
- "No concrete examples to learn from"
- "Explanations that assume I know more than I do"

**Q2**
Question: "What's your ideal way to understand a new concept?"
Hint: "Tells Claude how to structure explanations for you"
Options:
- "Explain WHY it exists and how it fits the bigger system, then show me"
- "Give me step-by-step instructions I can follow"
- "Show me a working example I can modify and experiment with"
- "Break it into small pieces and build up gradually"

**Q3**
Question: "When you're stuck on a problem, what helps most?"
Hint: "Shapes how Claude helps when you hit a wall"
Options:
- "A hint so I can figure it out myself"
- "The direct answer with an explanation of why"
- "Seeing how an expert would think through it"
- "Breaking it into smaller, manageable pieces"

### Section: "Communication Style"

**Q4**
Question: "How should Claude communicate with you?"
Hint: "Sets Claude's tone and verbosity level"
Options:
- "Direct and concise - no fluff, respect my time"
- "Thorough and detailed - I want the full picture"
- "Conversational - like talking to a knowledgeable friend"
- "Minimal - just give me the code or answer"

**Q5**
Question: "What annoys you most in explanations?"
Hint: "Helps Claude avoid your pet peeves"
Options:
- "Unnecessary praise or cheerleading"
- "Too technical without explaining why it matters"
- "Oversimplified, feels like it's dumbing things down"
- "Too many options without a clear recommendation"

### Section: "Your Context"

**Q6**
Question: "What's your technical level?"
Hint: "Calibrates the depth of technical explanations"
Options:
- "Non-technical - I work with technical people but don't code"
- "Code-curious - I can read code but don't write production code"
- "Learning - actively building my coding skills"
- "Developer - I write code professionally"

### Section: "Working Patterns"

**Q8** (note: intentionally numbered q8, not q7)
Question: "How do you prefer to work on projects?"
Hint: "Tells Claude whether to help you plan first or dive in"
Options:
- "Plan everything upfront, then execute"
- "Start building, refine as I go"
- "Research deeply first, then decide"
- "Jump in and figure it out"

**Q9**
Question: "What happens when an explanation isn't working for you?"
Hint: "Helps Claude detect when to change approach"
Options:
- "I get quiet - might be overwhelmed"
- "I ask lots of follow-up questions"
- "I say 'this doesn't make sense'"
- "I try to rephrase it myself"

**Q10**
Question: "How do you manage energy for technical work?"
Hint: "Helps Claude suggest breaks at the right moments"
Options:
- "Plan when tired, code when fresh"
- "I work best in long focused blocks"
- "Short bursts with breaks"
- "Depends on the task"

### Section: "Your Context" (text input)

**Q7** (note: this is the 10th question shown, after q10)
Question: "What's your role?"
Hint: "Adds context about your professional background"
Type: text input (optional)
Placeholder: "e.g., Product Manager, Founder, Student, Engineer"

### Section: "Claude Teacher Mode"

**teacherMode** (toggle)
Question: "Want Claude to document your projects as a learning opportunity?"
Type: toggle switch (default OFF)
Description below toggle: "When a new project is created, Claude will ask if you want a FOR_YOU.md file explaining the project in plain language—architecture, decisions, bugs fixed, lessons learned. Like having a senior engineer explain their work to you."

---

### Screen 3: Results

**Header**: "Your Learning Profile"
**Subhead**: "Two views: the profile for Claude, and the breakdown for you"

**Tab Navigation** (two tabs):
- Tab 1: "For Claude" (with file icon)
- Tab 2: "For You" (with calculator/chart icon)

**Tab 1: For Claude**
- Code block with filename header showing "CLAUDE.md"
- Window chrome dots (decorative)
- Scrollable content (max-height ~400px)
- Monospace font, dark background
- Below code block:
  - Primary button: "Copy to Clipboard" (shows checkmark + "Copied!" for 3 seconds on success)
  - Secondary button: "Download CLAUDE.md"
- Help text: "Paste into ~/.claude/CLAUDE.md for global settings, or your project root for project-specific"

**Tab 2: For You**
- Same code block styling but header says "Your Scoring Breakdown"
- Shows the explanation document with their archetype deep-dive and scoring breakdown
- Copy + Download buttons (downloads as "MY_LEARNING_PROFILE.md")
- Help text: "This breakdown shows how your answers determined your learning archetype. The profile on the 'For Claude' tab is what you give to Claude."

**Share Section** (below tabs):
- "Share this tool with others"
- Buttons for: X (Twitter), LinkedIn, WhatsApp
- NO TikTok (no URL share scheme)

**Footer**:
- "Start Over" button with refresh icon

---

## Archetype System

5 learning archetypes with scoring-based determination:

1. **Systems Thinker** - Needs WHY before HOW, mental models, architecture
2. **Hands-On Learner** - Learns by doing, theory after practice
3. **Example-First Learner** - Learns from concrete examples, patterns
4. **Scaffolded Learner** - Needs gradual building, no skipped steps
5. **Connector** - Relates new info to existing knowledge, analogies

**Scoring**: Each answer adds points to different archetypes. Primary = highest score. Secondary = second highest (only if score > 1). Show percentages.

**IMPORTANT**: See `APP_SPECIFICATION.md` for complete scoring logic, all archetype descriptions (short and deep versions), output templates, detection tables, etc.

---

## Design Specs

- Clean, minimal UI with lots of whitespace
- Dark mode support
- Mobile responsive (single column on mobile)
- Smooth slide animations between questions
- shadcn/ui components (Button, Progress, Input, Switch)
- Font: System font stack or Geist
- Code blocks: Dark background with good contrast

## Tech Stack

- Next.js App Router
- Tailwind CSS + shadcn/ui
- NO API routes or database
- Fully client-side
- Vercel deployment

## Meta Tags

Include Open Graph tags:
- title: "Learning Profile Builder - Claude Code"
- description: "Answer 10 questions. Get a personalized CLAUDE.md that makes Claude Code teach the way YOU learn best."
- url: https://learning-profile-builder.vercel.app

---

**CRITICAL**: The real complexity is in the output generation. The `APP_SPECIFICATION.md` file contains ALL the detailed content:
- Complete scoring logic for each question
- All 5 archetype descriptions (short version for CLAUDE.md, deep version for user explanation)
- Frustration triggers, DO/DON'T items, response templates
- Tiredness detection tables
- Stuck detection tables (4 different versions based on Q9)
- Success signals for each archetype
- Teacher Mode section template
- "For You" explanation structure with scoring breakdown

Import that content into the app - v0 cannot infer all this detailed content from the prompt alone.
