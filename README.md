# Learn Functions in Python

A **Python learner's track** from [aifa](https://github.com/aifalabsglobal): fundamentals, function types, and object-oriented design — with clear explanations, multiple use cases, and runnable code examples.

**aifa** branding appears in the hero badge (“Learner's track”), table-of-contents banner, footer, and summary. Add `public/aifa-logo.png` for the logo image; the app falls back to styled “aifa” text if the file is missing.

## About

One structured path through core Python:

1. **Fundamentals** — Data types (int, float, str, bool, None, bytes), collections (list, tuple, set, dict, range), operators, conditions (if/elif/else, ternary, match/case), and loops (for, while, break, continue, else).
2. **Function types** — Built-in, user-defined, lambda, recursive, higher-order, generators, nested, closures, methods, and async.
3. **Object-oriented (OOP)** — Classes and instances, instance vs class attributes, instance/class/static methods, `@property`, private and name mangling, inheritance and `super()`, multiple inheritance and MRO, ABCs, magic methods, composition vs inheritance, dataclasses, `__slots__`, context managers.

Each topic has a short description, a fuller explanation, “in plain words,” and **multiple use cases with code examples** you can copy and run. Section banners use Unsplash imagery and short copy; nav and table of contents follow the same order (Fundamentals → Functions → OOP).

## Features

- **Study Help** — “Need help?” button (bottom-right) opens a panel where students can ask questions about Python. Answers are powered by your own **Ollama** instance (configurable via env vars). Suggested questions and a simple chat-style UI make it easy to get unstuck.

## Tech stack

- **Next.js** (App Router)
- **React** + **TypeScript**
- **Tailwind CSS**
- **shadcn/ui**–style components
- **Next.js Image** (with Unsplash for section imagery)
- **Ollama** (optional) — for Study Help AI; set `OLLAMA_BASE_URL` and `OLLAMA_MODEL` when deploying

## Quick start

```bash
# Install dependencies
npm install

# Run development server (http://localhost:3005)
npm run dev
```

Open [http://localhost:3005](http://localhost:3005) in your browser.

## Build & deploy

```bash
npm run build
```

Deploy on **Vercel** by connecting this repo; it will detect Next.js and run `npm run build` automatically.

### Environment variables (for Study Help)

If you use the Study Help feature, set these in your deployment (e.g. Vercel → Project → Settings → Environment Variables):

| Variable | Description | Example |
|----------|-------------|---------|
| `OLLAMA_BASE_URL` | Your Ollama server URL (must be reachable from the deployment) | `http://45.198.59.91:11434` |
| `OLLAMA_MODEL` | Model name to use for answers | `llama3.2` |

Ensure your Ollama server is running and the chosen model is pulled (e.g. `ollama pull llama3.2`). If these are not set, the app still runs; the help API will use the defaults and may fail if the server is not reachable.

## Repository

**[github.com/aifalabsglobal/Learn_Functions_Python](https://github.com/aifalabsglobal/Learn_Functions_Python)**

## License

MIT
