# Learning Profile Builder - Complete Specification

This document contains ALL the detailed content for the Learning Profile Builder. Use this alongside the v0 prompt.

---

## Questions

### Q1 - How You Learn
**Question**: "When learning something technical, what frustrates you most?"
**Hint**: "Reveals your learning blockers so Claude knows what to avoid"
**Options**:
0. "Jumping into details without showing me the big picture first"
1. "Too much theory before I can try anything"
2. "No concrete examples to learn from"
3. "Explanations that assume I know more than I do"

### Q2 - How You Learn
**Question**: "What's your ideal way to understand a new concept?"
**Hint**: "Tells Claude how to structure explanations for you"
**Options**:
0. "Explain WHY it exists and how it fits the bigger system, then show me"
1. "Give me step-by-step instructions I can follow"
2. "Show me a working example I can modify and experiment with"
3. "Break it into small pieces and build up gradually"

### Q3 - How You Learn
**Question**: "When you're stuck on a problem, what helps most?"
**Hint**: "Shapes how Claude helps when you hit a wall"
**Options**:
0. "A hint so I can figure it out myself"
1. "The direct answer with an explanation of why"
2. "Seeing how an expert would think through it"
3. "Breaking it into smaller, manageable pieces"

### Q4 - Communication Style
**Question**: "How should Claude communicate with you?"
**Hint**: "Sets Claude's tone and verbosity level"
**Options**:
0. "Direct and concise - no fluff, respect my time"
1. "Thorough and detailed - I want the full picture"
2. "Conversational - like talking to a knowledgeable friend"
3. "Minimal - just give me the code or answer"

### Q5 - Communication Style
**Question**: "What annoys you most in explanations?"
**Hint**: "Helps Claude avoid your pet peeves"
**Options**:
0. "Unnecessary praise or cheerleading"
1. "Too technical without explaining why it matters"
2. "Oversimplified, feels like it's dumbing things down"
3. "Too many options without a clear recommendation"

### Q6 - Your Context
**Question**: "What's your technical level?"
**Hint**: "Calibrates the depth of technical explanations"
**Options**:
0. "Non-technical - I work with technical people but don't code"
1. "Code-curious - I can read code but don't write production code"
2. "Learning - actively building my coding skills"
3. "Developer - I write code professionally"

### Q7 - Your Context (TEXT INPUT)
**Question**: "What's your role?"
**Hint**: "Adds context about your professional background"
**Placeholder**: "e.g., Product Manager, Founder, Student, Engineer"
**Type**: text (optional)

### Q8 - Working Patterns
**Question**: "How do you prefer to work on projects?"
**Hint**: "Tells Claude whether to help you plan first or dive in"
**Options**:
0. "Plan everything upfront, then execute"
1. "Start building, refine as I go"
2. "Research deeply first, then decide"
3. "Jump in and figure it out"

### Q9 - Working Patterns
**Question**: "What happens when an explanation isn't working for you?"
**Hint**: "Helps Claude detect when to change approach"
**Options**:
0. "I get quiet - might be overwhelmed"
1. "I ask lots of follow-up questions"
2. "I say 'this doesn't make sense'"
3. "I try to rephrase it myself"

### Q10 - Working Patterns
**Question**: "How do you manage energy for technical work?"
**Hint**: "Helps Claude suggest breaks at the right moments"
**Options**:
0. "Plan when tired, code when fresh"
1. "I work best in long focused blocks"
2. "Short bursts with breaks"
3. "Depends on the task"

### Teacher Mode (TOGGLE)
**Section**: "Claude Teacher Mode"
**Question**: "Want Claude to document your projects as a learning opportunity?"
**Description**: "When a new project is created, Claude will ask if you want a FOR_YOU.md file explaining the project in plain language—architecture, decisions, bugs fixed, lessons learned. Like having a senior engineer explain their work to you."

---

## Archetype Scoring Logic

5 archetypes: Systems Thinker, Hands-On Learner, Example-First Learner, Scaffolded Learner, Connector

### Q1 Scoring
- Option 0 (no big picture): +2 Systems Thinker, +1 Connector
- Option 1 (too much theory): +2 Hands-On Learner
- Option 2 (no examples): +2 Example-First Learner
- Option 3 (assumes knowledge): +2 Scaffolded Learner

### Q2 Scoring
- Option 0 (explain WHY): +2 Systems Thinker, +2 Connector
- Option 1 (step-by-step): +2 Hands-On Learner
- Option 2 (working example): +2 Example-First Learner
- Option 3 (small pieces): +2 Scaffolded Learner

### Q3 Scoring
- Option 0 (hint): +1 Systems Thinker
- Option 1 (direct answer): no specific boost
- Option 2 (expert thinking): +1 Connector, +1 Example-First Learner
- Option 3 (break down): +2 Scaffolded Learner

### Q8 Scoring
- Option 0 (plan upfront): +1 Systems Thinker
- Option 1 (start building): +1 Hands-On Learner
- Option 2 (research first): +1 Systems Thinker, +1 Connector
- Option 3 (jump in): +1 Hands-On Learner, +1 Example-First Learner

### Q9 Scoring
- Option 0 (get quiet): +1 Scaffolded Learner
- Option 1 (follow-up questions): +1 Connector
- Option 2 (direct feedback): no specific boost
- Option 3 (rephrase): +1 Systems Thinker

### Determining Primary/Secondary
- Sort archetypes by score descending
- Primary = highest score
- Secondary = second highest ONLY IF score > 1
- Calculate percentages: (score / totalScore) * 100

---

## Archetype Descriptions (Short - for CLAUDE.md)

### Systems Thinker
- Always explain WHY before HOW - I need the mental model before I can act
- Connect to what I know - Bridge new concepts to my existing understanding
- Big picture first - Show me where we are in the system before zooming in
- Architecture before code - I want to understand the structure, not just copy-paste

### Hands-On Learner
- Get me to working code quickly, then explain as needed
- Minimize theory upfront - I learn by doing
- Give me something I can run and modify right away
- Let me experiment and fail - that's how I learn best

### Example-First Learner
- Lead with concrete, working examples
- Show me real code I can study and modify
- Demonstrate concepts through practical implementation, not abstract explanation
- Annotate examples so I understand what each part does

### Scaffolded Learner
- Break complex topics into small, digestible pieces
- Don't skip steps or assume prior knowledge
- Check my understanding before moving to the next concept
- Build up gradually from simple to complex

### Connector
- Bridge new concepts to things I already understand
- Show how different parts of the system relate to each other
- Help me see patterns across different contexts
- Connect technical decisions to business outcomes

---

## Archetype Descriptions (Deep - for "For You" aha moment)

### Systems Thinker
**Description**: "You need to understand WHY before HOW. Surface-level knowledge creates anxiety—you need to know what's happening 'below the surface' to feel confident. You're the person who quits tutorials that say 'just do this' without explaining the mechanism."

**Characteristics**:
- Need the mental model before taking action
- Uncomfortable with "magic" or unexplained abstraction
- Want to know cause-and-effect relationships
- Prefer understanding the system architecture first
- Ask "but why?" frequently

**Strengths**:
- Deep understanding leads to better debugging
- Can reason about edge cases others miss
- Don't need to memorize—you understand
- Excel at architecture and system design
- Knowledge transfers across domains

**Blind Spots**:
- Can get stuck in "analysis paralysis"
- Might over-engineer simple solutions
- Frustration with "just try it" approaches
- Slower initial progress (but deeper long-term mastery)
- May delay starting until you feel you "fully understand"

**Ideal Learning**:
- Explain the system architecture first
- Show cause-and-effect relationships
- Reveal what's happening "under the hood"
- Connect new concepts to existing mental models

**Frustrations**:
- "Just run this command" without explanation
- "We'll explain later" (no! explain NOW)
- Tutorials that skip the WHY
- Magic that isn't demystified

### Hands-On Learner
**Description**: "You learn by doing, not by reading. Theory without practice feels abstract and hard to retain. You want to build something NOW and understand it through experimentation."

**Characteristics**:
- Want to build something immediately
- Learn by doing, not reading
- "I'll understand it when I see it work"
- Comfortable with abstraction initially
- Impatient with long explanations

**Strengths**:
- Fast initial progress
- High motivation from tangible results
- Learn debugging through experience
- Good at prototyping and iteration
- Resilient—failure is just data

**Blind Spots**:
- Gaps in fundamental knowledge
- Struggle when things break unexpectedly
- May copy-paste without understanding
- Hit walls when abstracting/scaling
- Can build habits that need unlearning later

**Ideal Learning**:
- Quick wins and visible results
- Projects before theory
- "Build this, then we'll explain it"
- Hands-on exercises immediately

**Frustrations**:
- Long theoretical explanations upfront
- Reading documentation before trying
- "First, let's understand the fundamentals"
- Waiting to build

### Example-First Learner
**Description**: "You learn by seeing patterns across multiple examples. Show you 5 variations and you'll figure out the underlying principle. Abstract explanations without concrete code feel hollow."

**Characteristics**:
- Learn by seeing multiple examples
- "Show me 5 examples, I'll figure out the pattern"
- Visual and pattern-oriented
- Need to see variations to understand
- Abstract theory feels disconnected

**Strengths**:
- Great at recognizing solutions to similar problems
- Excel at design patterns
- Good code reviewers
- Natural at refactoring
- Build intuition through exposure

**Blind Spots**:
- Struggle with truly novel problems
- May miss underlying principles
- Over-rely on analogies that can break
- Need exposure to enough examples first
- Can pattern-match incorrectly

**Ideal Learning**:
- Lots of examples with slight variations
- Side-by-side comparisons
- Visual diagrams and flowcharts
- "Here's the pattern, now apply it"

**Frustrations**:
- Abstract explanations without examples
- Concepts explained in isolation
- One example expected to cover everything
- Theory-heavy approaches

### Scaffolded Learner
**Description**: "You learn best when complex topics are broken into digestible pieces with clear progression. Jumping ahead or skipping steps creates confusion. You need to solidify each layer before building on it."

**Characteristics**:
- Need clear, linear progression
- "What's the next step?"
- Uncomfortable with ambiguity
- Like checklists and recipes
- Each step builds on the previous

**Strengths**:
- Systematic and thorough
- Don't skip steps
- Good at following best practices
- Reliable execution
- Build solid foundations

**Blind Spots**:
- Struggle when path is unclear
- Need structure (hard to self-direct)
- May not develop improvisation skills
- Dependent on good tutorials
- Can feel stuck without guidance

**Ideal Learning**:
- Clear sequential steps
- No surprises or jumps
- Validation at each stage
- Defined learning paths

**Frustrations**:
- Skipping steps or assuming knowledge
- "You should already know this"
- Jumping around topics
- Unclear progression

### Connector
**Description**: "You learn by relating new information to what you already know. Every new concept needs an anchor to existing knowledge. You see patterns across domains and think in analogies."

**Characteristics**:
- Need to see how everything fits together
- "How does this relate to what I know?"
- Build analogies and mental maps
- Cross-disciplinary thinking
- See the bigger business/life context

**Strengths**:
- Great at interdisciplinary work
- Can explain complex topics simply
- Transfer knowledge across domains
- Natural teachers/communicators
- See implications others miss

**Blind Spots**:
- Struggle when starting totally new domains
- Over-rely on analogies (which can break)
- May miss domain-specific nuances
- Need existing knowledge to anchor to
- Can overgeneralize

**Ideal Learning**:
- Context and motivation first
- Connections to prior knowledge
- Big picture before details
- Analogies to familiar domains

**Frustrations**:
- New concepts without relating to what you know
- Isolated facts without context
- "Just memorize this"
- Missing the business/real-world connection

---

## Learning Pattern Flows (for CLAUDE.md)

- Systems Thinker: "Why → Big Picture → Zoom In → Apply → Iterate"
- Hands-On Learner: "Try → Fail → Learn → Refine → Master"
- Example-First Learner: "See Example → Understand → Modify → Create → Extend"
- Scaffolded Learner: "Simple → Add Layer → Check Understanding → Build → Integrate"
- Connector: "Context → Relate → Connect → Apply → Synthesize"

---

## Frustration Triggers (based on Q1 + archetype)

### Q1 = 0 (no big picture)
- "Just do this" without explaining why
- "Don't worry about this for now" - I always worry about it

### Q1 = 1 (too much theory)
- Long theoretical explanations before I can try anything
- Too much context when I just want to start

### Q1 = 2 (no examples)
- Abstract explanations without concrete examples
- Concepts explained in isolation (no working code)

### Q1 = 3 (assumes knowledge)
- Skipping steps or assuming prior knowledge
- Moving too fast through complex material

### Additional for Systems Thinker
- Information presented in isolation (no connections)
- Skipping the architecture for "simplicity"

### Additional for Connector
- New concepts without relating to what I know

---

## Communication Rules

### DO Items (based on Q4)
**Q4 = 0 (direct)**:
- Be direct and concise - no fluff, respect my time
- Business context first - why does this matter?

**Q4 = 1 (thorough)**:
- Be thorough and detailed
- Provide the full context and reasoning

**Q4 = 2 (conversational)**:
- Be conversational and approachable
- Explain things like a knowledgeable friend would

**Q4 = 3 (minimal)**:
- Be minimal - prioritize code and direct answers
- Skip explanations unless I ask for them

**Always include**:
- Start simple, add complexity when I signal readiness
- Flag hidden issues - security, scalability, technical debt
- Challenge my thinking - I'd rather be corrected than coddled

### DON'T Items (based on Q5)
**Q5 = 0 (hates praise)**:
- Use unnecessary praise or cheerleading
- Praise or validation - I'm here to learn, not feel good

**Q5 = 1 (hates jargon)**:
- Give technical explanations without business/practical context
- Technical jargon without business relevance

**Q5 = 2 (hates oversimplification)**:
- Oversimplify or dumb things down
- Assume I need hand-holding

**Q5 = 3 (hates indecision)**:
- Give me multiple options without a clear recommendation
- Be wishy-washy - have an opinion

**If Q4 = 0 or 3, also add**:
- Long explanations without action items

**Always include**:
- Excessive theory before application

---

## Response Length (based on Q4)

- Q4 = 0: "Medium (concise but complete)"
- Q4 = 1: "Detailed (comprehensive)"
- Q4 = 2: "Conversational (natural flow)"
- Q4 = 3: "Minimal (code-focused)"

---

## When Stuck Approach (based on Q3)

### Q3 = 0 (wants hints)
1. Ask what I've tried
2. Give a hint so I can figure it out myself
3. Explain my mistake, don't just fix it

### Q3 = 1 (wants direct answer)
1. Acknowledge the problem
2. Give the direct answer
3. Explain WHY that's the answer

### Q3 = 2 (wants expert walkthrough)
1. Show how an expert would approach this
2. Walk through the thinking process
3. Highlight the key insight

### Q3 = 3 (wants breakdown)
1. Break the problem into smaller pieces
2. Solve one piece at a time
3. Show how pieces connect

---

## Working Patterns (based on Q8, Q10)

### Planning Style (Q8)
- Q8 = 0: "Thorough PRDs before building (architecture, schemas, file structure)"
- Q8 = 1: "Iterative - start building, refine as I go"
- Q8 = 2: "Research-first - deep investigation before decisions"
- Q8 = 3: "Exploratory - jump in and figure it out"

### Energy Management (Q10)
- Q10 = 0: "Plan when tired, code when fresh"
- Q10 = 1: "Long focused blocks work best"
- Q10 = 2: "Short bursts with breaks"
- Q10 = 3: (skip - "Depends" isn't actionable)

### Always include
- "Session continuity: Create `RESUME_SESSION.md` at end of longer sessions"

---

## Tiredness Detection Table (always included)

| Signal | Response |
|--------|----------|
| Multiple tasks completed in session | "We've tackled [X, Y, Z] so far. Want to pause here or continue?" |
| Complex implementation just finished | Offer to create `RESUME_SESSION.md` |
| User says "one more thing" or "last thing" | Recognize natural stopping point, confirm before continuing |
| Errors increasing after a streak of success | "Want to pick this up fresh later?" |
| User mentions being tired/late/rushed | Acknowledge, suggest planning vs. coding |

**IMPORTANT**: Confirm, don't assume. Always ask before suggesting breaks.

### Energy Style Addendum (based on Q10)
**Q10 = 0**: "My energy style: I plan when tired, code when fresh. → If I seem fatigued during implementation, suggest: 'Want to switch to planning/architecture for now and code this when fresh?'"

**Q10 = 1**: "My energy style: Long focused blocks work best. → Don't interrupt my flow. Only check in at natural completion points."

**Q10 = 2**: "My energy style: Short bursts with breaks. → After completing a chunk, naturally offer a pause point: 'Good stopping point here. Continue or take a break?'"

---

## Stuck Detection (based on Q9)

### Q9 = 0 (gets quiet)
**My signal when stuck**: I go quiet (might be overwhelmed)

| Signal | What It Means | Response |
|--------|---------------|----------|
| No response after explanation | Processing or lost | "Let me try explaining this differently..." |
| Short replies ("ok", "sure") | Might be overwhelmed | "Want me to break this down further?" |
| Long pause before responding | Thinking or stuck | Wait, then offer: "Any part I should clarify?" |

**IMPORTANT**: Don't flood me with more info. Pause and offer a different angle.

### Q9 = 1 (asks questions)
**My signal when stuck**: I ask lots of follow-up questions

| Signal | What It Means | Response |
|--------|---------------|----------|
| 3+ questions on the same topic | Missing foundational context | "Let me step back and cover the basics first" |
| Questions getting more specific | Drilling down, might need to zoom out | "Here's the bigger picture before we dive deeper" |
| Repeating similar questions | Explanation not landing | Try analogy or different example |

**IMPORTANT**: Rapid questions = I need more foundation, not more details.

### Q9 = 2 (direct feedback)
**My signal when stuck**: I say "this doesn't make sense" directly

| Signal | What It Means | Response |
|--------|---------------|----------|
| "I don't get it" / "confused" | Explanation approach isn't working | Try different angle (visual, analogy, code) |
| "Wait, but..." | Something contradicts my mental model | Address the contradiction explicitly |
| Frustrated tone | Need a reset | "Let me try a completely different approach" |

**IMPORTANT**: I give direct feedback. Take it at face value and adapt.

### Q9 = 3 (rephrases)
**My signal when stuck**: I try to rephrase it myself

| Signal | What It Means | Response |
|--------|---------------|----------|
| "So basically..." (incorrect) | Mental model needs correction | "Close, but [specific correction]" |
| "Let me see if I get this..." | Actively synthesizing | Confirm what's right, correct what's wrong |
| My restatement misses the point | Core concept not landing | "The key insight is actually..." |

**IMPORTANT**: I learn by restating. Correct me gently but directly.

---

## Success Signals (based on archetype)

### Systems Thinker - It's Working When:
- I'm asking about edge cases and implications
- I'm connecting this to other things I know
- I say "that makes sense" or "now I see why"

### Hands-On Learner - It's Working When:
- I'm actively modifying and experimenting with code
- I'm asking "what if I try this instead?"
- I'm making progress, even if messy

### Example-First Learner - It's Working When:
- I'm studying the example and asking clarifying questions
- I'm modifying the example to test my understanding
- I can explain what the code does

### Scaffolded Learner - It's Working When:
- I'm following along and completing each step
- I can answer check-in questions correctly
- I'm ready for the next piece

### Connector - It's Working When:
- I'm seeing patterns and making analogies
- I'm relating this to previous projects
- I understand the business implications

### It's NOT Working When (based on Q9)
**Q9 = 0**: I go quiet or seem withdrawn → Pause, zoom out, check if I need a different angle
**Q9 = 1**: I'm asking lots of rapid follow-up questions → Step back and provide more foundational context
**Q9 = 2**: I say "this doesn't make sense" directly → Try a different explanation approach
**Q9 = 3**: I keep trying to rephrase what you said → Confirm or correct my understanding

---

## Teacher Mode Section (if enabled)

```markdown
## Claude Teacher Mode

When starting a new project, ask: "Would you like me to create a learning document for this project?"

If yes, create a FOR_YOU.md file in the project directory with:

1. **Project Overview** - What it does, business problem, why it matters
2. **Architecture Map** - ASCII diagram, 30k foot view, data flow
3. **Technology Choices** - WHY each tech, trade-offs, business implications
4. **Codebase Structure** - Folders explained, how parts connect
5. **Build Journey** - Decisions, bugs, aha moments (narrative style)
6. **Lessons Learned** - Security, scalability, best practices, pitfalls
7. **Business Context** - Applications to the user's work, skills gained
8. **Quick Reference** - Commands, file locations, common tasks

**Writing style**: Engaging, analogies welcome, WHY before WHAT, scannable, honest about flaws.
```

---

## Response Templates (always included in CLAUDE.md)

### Technical Concepts
```
## [Topic]
**Why This Matters**: [1-2 sentences]
**How It Works**: [Mental model]
**In Practice**: [Example/code]
**Go Deeper?**: [Offer more]
```

### Decisions
```
## Options
| Option | Pros | Cons | Best When |
**Recommendation**: [Clear stance + reasoning]
```

---

## Quick Reference Table Format

| Attribute | Value |
|-----------|-------|
| **Primary Archetype** | [archetype] ([X]%) |
| **Secondary** | [archetype] ([X]%) or — |
| **Response Length** | [based on Q4] |
| **Technical Level** | [based on Q6] |
| **Role** | [from Q7 or "[YOUR_ROLE]"] |

---

## "For You" Explanation Structure

1. **Header**: "Understanding Your Learning Profile"
2. **You're a [Archetype]** with deep description paragraph
3. **The Key Insight: You're a Blend** - scoring table with all 5 archetypes
4. **Your Characteristics** (bullet list)
5. **Your Strengths** (with checkmarks)
6. **Potential Blind Spots** (with warnings, "not weaknesses—just areas to be aware of")
7. **What You Need From Claude** (with arrows)
8. **What Frustrates You** (with X marks)
9. **How We Calculated This** - for each scoring question, show their answer and what points it gave
10. **What Happens Now** - instructions to use the profile
11. **The 5 Learning Archetypes** - reference table

### Special Blend Messages
If primary = Systems Thinker AND secondary = Connector:
"You need the WHY and the mental model, but you also need it connected to what you already know. Pure theory without relevance won't land."

If primary = Systems Thinker AND secondary = Hands-On Learner:
"You need to understand the system deeply, but you also need to build/apply to cement that understanding. Theory + Practice integration."

If primary = Hands-On Learner AND secondary = Example-First Learner:
"You learn by doing, but you need to see working examples first. Show me, then let me try."

Otherwise:
"Claude will prioritize [primary] approaches while weaving in [secondary] elements."
