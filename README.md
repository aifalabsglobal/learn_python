# Learn Python — aifa Learner's Track

A structured **Python learner's track** by [aifa](https://github.com/aifalabsglobal) covering fundamentals, function types, and object-oriented programming — with clear explanations, multiple use cases, and runnable code examples in every topic.

## Preview

The app is a single-page interactive reference built with Next.js. It includes a sticky nav bar, a table of contents, seven content sections, summary tables, and an AI-powered study help panel.

## Content

The page is organized into three numbered groups:

### 1. Fundamentals

| Section | Topics covered |
|---------|---------------|
| **Data types** | `int`, `float`, `str`, `bool`, `None`, `bytes` |
| **Collections** | `list`, `tuple`, `set`, `dict`, `range` |
| **Operators** | Arithmetic, comparison, logical, bitwise, assignment, identity, membership, walrus (`:=`) |
| **Conditions** | `if`/`elif`/`else`, ternary, `match`/`case`, truthiness rules |
| **Loops** | `for`, `while`, `break`/`continue`, `else` clause, nested loops |

### 2. Function Types

Built-in, user-defined, lambda, recursive, higher-order, generator, nested, closure, methods, and async — each with 2–4 use-case examples.

### 3. Object-Oriented Programming

Classes & instances, instance vs class attributes, instance methods, `@classmethod`, `@staticmethod`, `@property`, private & name mangling, inheritance & `super()`, multiple inheritance & MRO, ABCs, magic/dunder methods, composition vs inheritance, dataclasses, `__slots__`, context managers.

Every topic includes a short description, a fuller explanation, an "in plain words" summary, and multiple code examples.

## Features

- **Sticky navigation** — Contents, Data types, Collections, Operators, Conditions, Loops, Functions, OOP, Summary
- **Table of contents** — Visual learning path with numbered groups and jump links
- **Section banners** — Unsplash imagery with descriptive copy for each section
- **Summary tables** — All topics at a glance in the same order (Fundamentals → Functions → OOP)
- **Study Help** — A "Need help?" button (bottom-right) opens a chat panel where students can ask Python questions. Answers are powered by **Ollama** (configurable via environment variables). Includes suggested questions and a simple chat-style UI.

## aifa Branding

The **aifa** logo and name appear in:

- **Hero** — Badge with logo + "Learner's track"
- **Table of contents** — Banner with logo + "aifa · Table of contents"
- **Summary** — Intro line
- **Footer** — Logo + "Powered by aifa"

The `AifaLogo` component loads `public/aifa-logo.png` if present. If the file is missing, it falls back to styled text ("ai" in blue + "fa" in dark). A `variant="light"` mode is used on dark backgrounds (hero and TOC).

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | **Next.js 16** (App Router, Turbopack) |
| Language | **TypeScript** |
| UI | **React 19**, **Tailwind CSS 4**, shadcn/ui components |
| Images | **Next.js Image** with Unsplash remote patterns |
| AI Help | **Ollama** (optional, via `/api/help` route) |
| Icons | **Lucide React** |

## Quick Start

```bash
# Clone the repo
git clone https://github.com/aifalabsglobal/learn_python.git
cd Learn_Functions_Python

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:3005](http://localhost:3005) in your browser.

## Build & Deploy

```bash
npm run build
```

Deploy on **Vercel** by connecting the repo — it detects Next.js and runs `npm run build` automatically.

### Environment Variables

For the Study Help feature, set these in your deployment environment (e.g. Vercel → Settings → Environment Variables):

| Variable | Description | Default |
|----------|-------------|---------|
| `OLLAMA_BASE_URL` | Ollama server URL (must be reachable from deployment) | `http://45.198.59.91:11434` |
| `OLLAMA_MODEL` | Model name for generating answers | `llama3.2` |

Make sure Ollama is running and the model is pulled (`ollama pull llama3.2`). The app still runs without these — the help panel will show an error if the server is unreachable.

## Project Structure

```
src/
├── app/
│   ├── page.tsx          # Main page (nav, hero, TOC, all content sections, footer)
│   ├── layout.tsx        # Root layout (metadata, fonts, Toaster)
│   └── api/
│       └── help/
│           └── route.ts  # Ollama chat API for Study Help
├── components/
│   ├── StudyHelp.tsx     # "Need help?" panel (chat UI, suggested questions)
│   └── ui/               # shadcn/ui primitives (button, sheet, textarea, etc.)
public/
├── aifa-logo.png         # aifa logo (optional — text fallback if missing)
└── logo.svg              # Python logo
```

## Repository

**[github.com/aifalabsglobal/learn_python](https://github.com/aifalabsglobal/learn_python)**

## License

MIT
