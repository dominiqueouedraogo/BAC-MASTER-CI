# BAC MASTER CI

## Overview

Full-stack educational web application for high school students in Côte d'Ivoire (Terminale A, C, D).

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **Frontend**: React + Vite + Tailwind CSS
- **Auth**: JWT (bcryptjs + jsonwebtoken)
- **AI**: OpenAI via Replit AI Integrations (educational chatbot)

## Structure

```text
artifacts-monorepo/
├── artifacts/
│   ├── api-server/          # Express API server
│   └── bac-master-ci/       # React + Vite frontend (at /)
├── lib/
│   ├── api-spec/            # OpenAPI spec + Orval codegen config
│   ├── api-client-react/    # Generated React Query hooks
│   ├── api-zod/             # Generated Zod schemas from OpenAPI
│   ├── db/                  # Drizzle ORM schema + DB connection
│   ├── integrations-openai-ai-server/  # OpenAI server integration
│   └── integrations-openai-ai-react/   # OpenAI React integration
├── scripts/                 # Utility scripts
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── tsconfig.json
└── package.json
```

## Features

1. **Landing Page** - Modern hero, features, CTAs
2. **Authentication** - JWT register/login, profile
3. **Dashboard** - Progress stats, daily goals, recent lessons
4. **Courses** - Subjects by series (A/C/D), lessons with content
5. **Audio/Video** - Media players per lesson
6. **Exercises** - MCQ, true/false, open-ended with instant feedback
7. **Past Exams** - By year, series, subject with corrections
8. **AI Chatbot** - Educational-only AI tutor (OpenAI powered)
9. **Gamification** - Points, badges, leaderboard
10. **Methodology** - Study techniques and strategies
11. **Admin Panel** - CRUD lessons, exercises, exams; moderate reviews
12. **Freemium Model** - Free/premium content distinction

## Default Admin Credentials

- Email: `admin@bacmaster.ci`
- Password: `admin123`

## API Routes

- `POST /api/auth/register` - Register
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Current user
- `GET /api/subjects` - Subjects (with ?series=A/C/D)
- `GET /api/lessons` - Lessons
- `GET /api/exercises` - Exercises
- `POST /api/exercises/:id/submit` - Submit exercise
- `GET /api/exams` - Past exams
- `GET /api/progress` - User progress
- `POST /api/progress/lesson/:id` - Mark lesson complete
- `GET /api/leaderboard` - Rankings
- `GET /api/badges` - User badges
- `GET /api/reviews` - Lesson reviews
- `POST /api/chat/message` - AI chatbot
- `GET /api/chat/history` - Chat history
- `GET /api/admin/stats` - Admin statistics

## Database Tables

- `users` - Students and admins
- `subjects` - Course subjects by series
- `lessons` - Lesson content (text, video, audio, PDF)
- `exercises` - Interactive exercises
- `exams` - Past BAC exams with corrections
- `lesson_progress` - User lesson completion
- `exercise_progress` - User exercise results
- `badges` - Available badges
- `user_badges` - Earned badges
- `reviews` - Lesson ratings/comments
- `chat_messages` - AI chatbot history

## Development Commands

- `pnpm --filter @workspace/api-server run dev` - Run API server
- `pnpm --filter @workspace/bac-master-ci run dev` - Run frontend
- `pnpm --filter @workspace/db run push` - Push DB schema
- `pnpm --filter @workspace/api-spec run codegen` - Regenerate API client
