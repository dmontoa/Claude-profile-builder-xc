# Future Features - Learning Profile Builder

Features to add after v0 scaffold is complete. These require logic changes, not just UI.

---

## Feature: Momentum Keeper Mode

### The Problem

Systems Thinkers (and similar archetypes) can get stuck in "understanding mode" - they grasp concepts perfectly but don't act. The learning becomes a trap: keep researching, keep understanding, never building.

Claude Code used to naturally prompt for action after explanations:
- "Want me to implement this now?"
- "Should we test this before moving on?"
- "Ready to tackle [next logical step]?"

This kept analytical users in a productive flow. Without it, they can spiral into analysis paralysis.

### Who Needs It

**High need:**
- Systems Thinkers (analysis paralysis risk)
- Scaffolded Learners (need explicit "next step" to proceed)
- Users who answered Q5=3 (want clear recommendations, not open-ended options)

**Low need / might find annoying:**
- Hands-On Learners (already action-biased)
- Users with Q4=3 (minimal communication preference)
- Highly autonomous users who prefer to direct the conversation

### Proposed Question

**Section**: Working Patterns (add as Q11, before Teacher Mode toggle)

**Question**: "When Claude finishes explaining something, what do you need?"

**Hint**: "Helps Claude keep you in productive flow"

**Options**:
| Index | Option Text | What It Enables |
|-------|-------------|-----------------|
| 0 | "Suggest the next action - keep me moving" | Full Momentum Keeper mode |
| 1 | "Ask if I have questions before moving on" | Reflective pause, then prompt |
| 2 | "Just wait for my next request" | No prompts, user-directed |
| 3 | "Summarize what we covered, then suggest next steps" | Recap + action prompt |

### Scoring Impact

This question doesn't affect archetype scoring - it's a behavioral preference.

Could optionally give:
- Option 0: +1 Hands-On Learner (action-oriented)
- Option 1: +1 Scaffolded Learner (needs checkpoints)
- Option 3: +1 Systems Thinker (wants synthesis)

But recommend keeping it purely as a behavior toggle, not archetype signal.

### Output for CLAUDE.md

**If Q11 = 0 (suggest next action):**
```markdown
### Momentum Keeper

After completing a task or explanation, always suggest a concrete next action:
- "Want me to implement this now?"
- "Should we test this before moving on?"
- "Ready to tackle [next logical step]?"

Don't just inform—prompt for action. I can get stuck in "understanding mode" and need a push to start doing.
```

**If Q11 = 1 (ask if questions):**
```markdown
### Before Moving On

After explaining something, pause and ask: "Any questions before we continue?"
Give me a moment to process before suggesting next steps.
```

**If Q11 = 2 (wait for request):**
```markdown
### Let Me Lead

After completing a task, don't prompt for next actions. Wait for my direction.
I prefer to control the pace and decide what's next.
```

**If Q11 = 3 (summarize + suggest):**
```markdown
### Momentum Keeper

After completing a task or explanation:
1. Briefly summarize what we accomplished
2. Suggest 1-2 concrete next actions

Example: "We've set up the database schema. Want me to create the API routes next, or should we add seed data first?"

This helps me stay oriented and maintain momentum.
```

### Default Behavior by Archetype (Alternative to Question)

If we don't want to add another question, we could auto-enable based on archetype:

| Archetype | Default Momentum Keeper |
|-----------|------------------------|
| Systems Thinker | ON (high analysis paralysis risk) |
| Scaffolded Learner | ON (needs explicit next steps) |
| Connector | ON (benefits from synthesis) |
| Hands-On Learner | OFF (already action-oriented) |
| Example-First Learner | OFF (prefers to experiment) |

**Recommendation**: Add the question. Explicit preference > assumption.

---

## Feature: Structured Decision Responses

### The Problem

When users ask Claude for suggestions or clarification between options, they sometimes get:
- A list without clear recommendation
- Walls of text without structure
- Options presented without trade-offs

Analytical users (especially those who answered Q5=3 "hates too many options without recommendation") want structured comparisons.

### Current State

The profile already includes a "Decisions" response template:
```
## Options
| Option | Pros | Cons | Best When |
**Recommendation**: [Clear stance + reasoning]
```

But this isn't strongly enforced. Users report inconsistent behavior.

### Proposed Enhancement

Strengthen the instruction in Communication Rules. Add to DON'T section for Q5=3 users:

```markdown
### DON'T
- Give me options without a clear recommendation
- Present choices as a list without comparison
- Be wishy-washy - have an opinion and defend it
```

Add to Response Templates (for all users):

```markdown
### When I Ask "What Should I Do?" or "Which Option?"

Always respond with:

| Option | Pros | Cons | Best When |
|--------|------|------|-----------|
| A | ... | ... | ... |
| B | ... | ... | ... |

**My Recommendation**: [Option X] because [clear reasoning].

Never give me a menu without telling me what you'd order.
```

### Who Gets This

- **Full table format**: Q5=3 (hates options without recommendation)
- **Table + strong opinion**: Systems Thinkers, Connectors
- **Simpler format**: Hands-On Learners (might find tables slow)

For Hands-On Learners, use:
```markdown
### When I Ask for Options
Give me your top recommendation first, then briefly mention alternatives.
Don't make me read a comparison table - just tell me what to do.
```

---

## Implementation Notes

### Adding Q11 (Momentum Keeper)

1. Add to `QUESTIONS` array in `questionnaire-screen.tsx`:
```typescript
{
  id: "q11" as const,
  section: "Working Patterns",
  question: "When Claude finishes explaining something, what do you need?",
  hint: "Helps Claude keep you in productive flow",
  options: [
    "Suggest the next action - keep me moving",
    "Ask if I have questions before moving on",
    "Just wait for my next request",
    "Summarize what we covered, then suggest next steps",
  ],
  type: "choice" as const,
},
```

2. Add to `Answers` type in `lib/types.ts`:
```typescript
q11: number | null;  // Momentum keeper: action/questions/wait/summarize
```

3. Add to `generate-markdown.ts`:
   - New function `getMomentumKeeperSection(q11: number | null): string`
   - Include output in final markdown

4. Update question count references (11 → 12)

### Files to Modify

| File | Change |
|------|--------|
| `lib/types.ts` | Add q11 to Answers interface |
| `components/questionnaire-screen.tsx` | Add Q11 to QUESTIONS array |
| `lib/generate-markdown.ts` | Add getMomentumKeeperSection function, include in output |
| `app/page.tsx` | Update initial state to include q11: null |
| `V0_PROMPT.md` | Add Q11 documentation (after v0 scaffold) |
| `APP_SPECIFICATION.md` | Add Q11 details and output templates |

---

## Other Feature Ideas (Backlog)

### Render "For You" as Formatted Markdown
Currently shows raw markdown in `<pre>` block. Could use `react-markdown` to render properly with headers, tables, bullet points.

**Complexity**: Low (add dependency, swap component)
**Impact**: Medium (better readability)

### Export as JSON
Some users might want machine-readable profile for custom integrations.

**Complexity**: Low
**Impact**: Low (niche use case)

### Profile Comparison
"Retake quiz" and show how your profile changed.

**Complexity**: Medium (needs localStorage)
**Impact**: Low (novelty feature)

### Team Profiles
Generate a team CLAUDE.md that accounts for multiple learning styles.

**Complexity**: High
**Impact**: Medium (interesting for teams)
