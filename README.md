# Learning Profile Builder

Answer 10 questions. Get a personalized `CLAUDE.md` that makes Claude Code teach the way YOU learn best.

[![Live Demo](https://img.shields.io/badge/Live-Demo-black?style=for-the-badge)](https://learning-profile-builder.vercel.app)

## What It Does

The Learning Profile Builder identifies your **learning archetype** and generates a custom profile for Claude Code:

| Archetype | Core Need |
|-----------|-----------|
| **Systems Thinker** | WHY before HOW - needs mental models first |
| **Hands-On Learner** | Build first, theory later |
| **Example-First** | Learn by seeing working code |
| **Scaffolded** | Step-by-step, no skipped steps |
| **Connector** | Relate new concepts to existing knowledge |

## How It Works

1. **Take the quiz** - 10 questions about how you learn, communicate, and work
2. **Get your profile** - See your primary + secondary archetype with scoring breakdown
3. **Copy to Claude** - Paste into `~/.claude/CLAUDE.md` or your project root

## What's Generated

### For Claude (`CLAUDE.md`)
- Quick reference table (archetype, response length, tech level)
- Communication rules (DO/DON'T based on your preferences)
- Stuck detection table (how Claude recognizes when you need help)
- Tiredness detection (when to suggest breaks)
- Response templates
- Optional: Teacher Mode for learning documentation

### For You (Explanation)
- Deep dive into your archetype (characteristics, strengths, blind spots)
- Scoring breakdown showing how each answer contributed
- Reference table of all 5 archetypes

## Privacy

Your answers never leave your browser. Nothing is stored or tracked.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Tech Stack

- Next.js 16
- TypeScript
- Tailwind CSS
- shadcn/ui components

## Documentation

- [`docs/APP_SPECIFICATION.md`](docs/APP_SPECIFICATION.md) - Full specification with scoring logic
- [`docs/FUTURE_FEATURES.md`](docs/FUTURE_FEATURES.md) - Planned features (Momentum Keeper mode)
- [`docs/V0_PROMPT.md`](docs/V0_PROMPT.md) - Original v0 prompt for UI scaffold

## License

MIT
