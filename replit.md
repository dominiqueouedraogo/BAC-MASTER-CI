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
- **Auth**: JWT (bcryptjs + jsonwebtoken) + Replit OIDC (openid-client, sessions in PostgreSQL)
- **AI**: OpenAI via Replit AI Integrations (educational chatbot + AI quiz generation)

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
├── seedCourses.js           # Standalone MongoDB seed script (Terminale D)
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
5. **Enhanced Lesson View** - Explication, Notions Clés, Exemples résolus, Exercices liés
6. **Audio/Video** - Media buttons per lesson (YouTube embed, audio, PDF)
7. **Exercises** - MCQ, true/false, open-ended with instant feedback and points
8. **AI Quiz System** - Auto-generated quiz from course content after each lesson (+10pts/correct)
9. **Past Exams** - By year, series, subject with corrections
10. **AI Chatbot** - Educational-only AI tutor (OpenAI powered)
11. **Gamification** - Points system (+10/correct), badges, leaderboard
12. **Methodology** - Study techniques and strategies
13. **Super Admin System** - Role-based access (admin/student), admin middleware protection
14. **Admin Dashboard** - Hub with navigation to all admin sections
15. **Admin Courses** - List, search, edit, delete all courses
16. **Admin Add/Edit Course** - Full course form with keyPoints, examples, media, and exercises
17. **Admin Stats** - Charts: daily registrations (bar), series breakdown (pie), top courses
18. **Admin Users** - Full user list with points, series, role, premium status
19. **Freemium Model** - Free/premium content distinction

## Database Content

- **26 lessons** across all 10 subjects (Maths, Physique-Chimie C/D, SVT C/D, Français, Philosophie, Anglais, Histoire-Géo A, Sciences Éco A)
- **41 exercises** linked to lessons with MCQ format and explanations
- **7 past BAC exams** (2022-2023) across multiple subjects with full corrections
- All lessons include: `content`, `keyPoints`, `examples`, `summary`, `duration`

## Default Admin Credentials

- Email: `admin@bacmaster.ci`
- Password: `admin123`

## Frontend Routes

### Student
- `/` - Landing page
- `/login`, `/register` - Auth
- `/dashboard` - Progress overview
- `/courses` - Browse courses by series/subject
- `/lessons/:id` - Full lesson view (Explication + Notions + Exemples + Exercices + AI Quiz)
- `/exercises`, `/exercises/:id` - Interactive exercises
- `/exams` - Past BAC exams
- `/chat` - AI tutor chatbot
- `/leaderboard` - Rankings by points
- `/methodology` - Study tips
- `/profile` - Settings

### Admin
- `/admin` - Hub with stats overview and navigation
- `/admin/courses` - Course list (search, edit, delete)
- `/admin/add-course` - Create new course with exercises
- `/admin/edit-course/:id` - Edit existing course
- `/admin/stats` - Analytics charts
- `/admin/users` - User management

## API Routes

### Auth
- `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`

### Content
- `GET /api/subjects` - Subjects (with ?series=A/C/D)
- `GET /api/lessons`, `GET /api/lessons/:id` - Lessons
- `POST /api/lessons`, `PUT /api/lessons/:id`, `DELETE /api/lessons/:id` (admin)
- `GET /api/exercises?lessonId=X` - Exercises (supports lessonId filter)
- `POST /api/exercises/:id/submit` - Submit answer (+10/20/30 points)
- `GET /api/exams` - Past exams

### Progress & Gamification
- `GET /api/progress` - User progress
- `POST /api/progress/lesson/:id` - Mark lesson complete
- `GET /api/leaderboard`, `GET /api/badges`
- `GET /api/reviews`, `POST /api/reviews`

### AI & Chat
- `POST /api/chat/message` - AI chatbot (educational filter)
- `GET /api/chat/history` - Chat history
- `POST /api/chat/quiz-generate` - Generate AI quiz from lesson content
- `POST /api/chat/quiz-complete` - Award points for quiz score

### Admin (require admin role)
- `GET /api/admin/stats` - Platform statistics
- `GET /api/admin/users` - All users
- `GET /api/admin/courses` - All courses for management
- `DELETE /api/admin/courses/:id` - Delete course + linked exercises
- `GET /api/admin/subjects` - All subjects (for dropdowns)
- `GET /api/admin/activity` - Charts data (registrations, top lessons, series breakdown)

## Database Tables

- `users` - Students and admins (role, points, streak, series, isPremium)
- `subjects` - Course subjects by series
- `lessons` - Lesson content (text, keyPoints, examples, video, audio, PDF)
- `exercises` - Interactive exercises (linked to lessons via lessonId)
- `exams` - Past BAC exams with corrections
- `lesson_progress` - User lesson completion
- `exercise_progress` - User exercise results
- `badges`, `user_badges` - Gamification badges
- `reviews` - Lesson ratings/comments
- `chat_messages` - AI chatbot history

## Seeded Content

### Anglais (subject_id=7, series=ALL)
- 24 lessons (orders 5-28), covering Unités 1-8 of Terminale programme
- 76 exercises (MCQ + True/False), 3 per lesson
- Seed file: `artifacts/api-server/src/lib/seed-anglais.ts`

### SVT D (subject_id=4, series=D)
- 21 lessons (orders 5-25), covering 5 thèmes: Communication dans l'organisme, Reproduction, Ressources minières CI, Sols et pédologie, Génétique et évolution
- 63+ exercises (MCQ + True/False), 3 per lesson
- Seed file: `artifacts/api-server/src/lib/seed-svt-d.ts`

### Maths D (subject_id=1, series=D)
- 19 lessons (orders 5-23), covering 7 thèmes: Calculs algébriques (ℝ, polynômes, équations, complexes, Moivre/Euler), Fonctions numériques (généralités, limites, dérivées, exp/ln), Calcul intégral, Suites, Probabilités (élémentaires, conditionnelles/Bayes, variables aléatoires), Géométrie complexes, Équations différentielles
- 57 exercises (MCQ + True/False), 3 per lesson
- Seed file: `artifacts/api-server/src/lib/seed-maths-d.ts`

### Series filter fix
- `exercises.ts` route uses `OR(series=X, series='ALL')` so that `series='ALL'` exercises show for all series

## Development Commands

- `pnpm --filter @workspace/api-server run dev` - Run API server
- `pnpm --filter @workspace/bac-master-ci run dev` - Run frontend
- `pnpm --filter @workspace/db run push` - Push DB schema changes
- `pnpm --filter @workspace/api-spec run codegen` - Regenerate API client

