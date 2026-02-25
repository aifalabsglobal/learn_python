# aifa Learning Platform

A full-featured **Learning Management System** by [aifa](https://github.com/aifalabsglobal) — TailAdmin-style dashboard with Clerk authentication, gamification, adaptive learning, and 5 programming subjects.

## Subjects

| Subject | Topics | Description |
|---------|--------|-------------|
| **Python** | 16 | Data types, collections, operators, conditions, loops, functions, OOP |
| **JavaScript** | 10 | Variables, functions, arrays, DOM, events, promises, async/await, ES6+ |
| **HTML / CSS** | 8 | Elements, forms, semantic HTML, selectors, box model, Flexbox, Grid, responsive |
| **SQL** | 6 | SELECT, WHERE, JOINs, aggregation, subqueries, indexes |
| **Git** | 5 | Init/commits, branching, merging, rebasing, workflows |

## Features

### Dashboard
- Stats cards (lessons completed, XP, study hours, active subjects)
- XP bar with level progression (20 levels)
- Learning streak tracker (daily/weekly visualization)
- Subject progress rings
- Recommended next topics (adaptive)
- Recent activity feed

### Gamification
- **XP system**: 10-50 XP per lesson based on difficulty
- **Levels**: 1-20 with increasing thresholds
- **Streaks**: Daily learning streak tracking
- **Badges**: 12+ badges across milestones, streaks, XP, and subject mastery
- **Progress rings**: Visual completion percentage per subject

### Adaptive Learning
- Difficulty levels: Beginner, Intermediate, Advanced
- Topic prerequisites and dependency tracking
- Personalized recommendations based on completed topics and skill level
- Difficulty adjustment based on recent performance

### Navigation
- TailAdmin-style collapsible sidebar with subject sub-navigation
- Top bar with search, dark mode toggle, notifications, and user menu
- Mobile-responsive with slide-out sidebar

### Other Pages
- **Subjects**: Grid view with progress, difficulty range, and continue links
- **Subject Detail**: Topic roadmap with completion status, locked/unlocked states
- **Lesson View**: Explanation, "in plain words", code examples with syntax highlighting
- **Calendar**: Monthly view with study sessions, upcoming events panel
- **Goals**: Daily/weekly/monthly/subject goals with progress bars
- **Rewards**: Badge grid by category (milestones, streaks, subject mastery, XP, fun)
- **Roadmap**: Cross-subject phased learning path (Foundations → Skills → Advanced)
- **Profile**: User stats, learning history, subject progress overview

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | **Next.js 16** (App Router, Turbopack) |
| Language | **TypeScript** |
| Auth | **Clerk** (sign-in/up, user sync via webhooks) |
| Database | **PostgreSQL** via **Prisma ORM** |
| UI | **React 19**, **Tailwind CSS 4**, shadcn/ui |
| Charts | **Recharts** |
| Dark Mode | **next-themes** |
| Images | **Next.js Image** (Unsplash) |
| AI Help | **Ollama** (optional, via `/api/help`) |

## Quick Start

```bash
git clone https://github.com/aifalabsglobal/learn_python.git
cd learn_python
npm install
```

### Environment Setup

Copy `.env.example` to `.env.local` and fill in:

```bash
cp .env.example .env.local
```

Required variables:
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` — from [Clerk Dashboard](https://dashboard.clerk.com)
- `CLERK_SECRET_KEY` — from Clerk Dashboard
- `DATABASE_URL` — PostgreSQL connection string
- `WEBHOOK_SECRET` — from Clerk Dashboard → Webhooks

### Database Setup

```bash
npx prisma generate
npx prisma db push
npm run db:seed
```

### Run

```bash
npm run dev
```

Open [http://localhost:3005](http://localhost:3005).

## Project Structure

```
src/
├── app/
│   ├── (auth)/                     # Clerk sign-in/sign-up pages
│   ├── (dashboard)/                # Dashboard layout + all pages
│   │   ├── page.tsx                # Dashboard home
│   │   ├── subjects/               # Subject listing + detail + lesson
│   │   ├── calendar/               # Calendar page
│   │   ├── goals/                  # Goals page
│   │   ├── rewards/                # Rewards/badges page
│   │   ├── roadmap/                # Learning roadmap
│   │   └── profile/                # User profile
│   ├── api/
│   │   ├── help/                   # Ollama study help API
│   │   └── webhooks/clerk/         # Clerk user sync webhook
│   └── page.tsx                    # Original Python learner's track
├── components/
│   ├── dashboard/                  # Sidebar, topbar, stats, progress, XP, streak
│   ├── ui/                         # shadcn/ui components (48 files)
│   ├── CodeBlock.tsx               # Syntax-highlighted code blocks
│   └── StudyHelp.tsx               # AI study help panel
├── lib/
│   ├── actions/                    # Server actions (progress, goals, calendar, recommendations)
│   ├── db.ts                       # Prisma client
│   ├── gamification.ts             # XP, levels, streaks, badge logic
│   └── utils.ts                    # Utility functions
prisma/
├── schema.prisma                   # Database schema (10 models)
└── seed.ts                         # Seed data (5 subjects, topics, badges)
proxy.ts                            # Clerk middleware (Next.js 16)
```

## Database Models

- **User** — synced from Clerk, tracks XP/level/streak
- **Subject** — Python, JavaScript, HTML/CSS, SQL, Git
- **Topic** — belongs to Subject, has order and difficulty
- **Lesson** — belongs to Topic, stores content as JSON
- **UserProgress** — tracks lesson completion and XP earned
- **UserGoal** — daily/weekly/monthly learning goals
- **Badge** — achievement definitions with criteria
- **UserBadge** — earned badges per user
- **CalendarEvent** — scheduled study sessions
- **UserStreak** — daily streak tracking

## Deploy

Deploy on **Vercel**:
1. Connect the repo
2. Set environment variables
3. Vercel auto-detects Next.js

For the database, use [Neon](https://neon.tech), [Supabase](https://supabase.com), or any PostgreSQL provider.

## Repository

**[github.com/aifalabsglobal/learn_python](https://github.com/aifalabsglobal/learn_python)**

## License

MIT
