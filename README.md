# VIAcademy

Internal training platform for **Via Trading Corporation** (wholesale liquidation). New sales hires
complete role-based programs (BDR / AM) of courses → modules (lessons + a final quiz), earn certificates;
admins manage users, content (a block-based CMS), and compliance.

**Stack:** React 19 + TypeScript + Vite · Tailwind CSS v4 · react-router v7 · Supabase (Postgres + Auth +
RLS + Storage) · deployed on Vercel.

## Docs (read these first)
- **[`docs/ENGINEERING_HANDBOOK.md`](docs/ENGINEERING_HANDBOOK.md)** — architecture, standards, workflows, runbooks, how to operate. Start here.
- **[`docs/AUDIT_2026-06.md`](docs/AUDIT_2026-06.md)** — current findings + prioritized debt worklist.
- **[`CLAUDE.md`](CLAUDE.md)** — the terse machine-facing spec (course / CMS / DB reference).
- **[`docs/runbooks/`](docs/runbooks/)** — one-shot ops SQL (data repair, quiz-threshold fix).

## Run locally
```bash
npm install
# create .env.local with:
#   VITE_SUPABASE_URL=...
#   VITE_SUPABASE_ANON_KEY=...
npm run dev          # http://localhost:5173
```

## Build / deploy
```bash
npm run build        # tsc -b + vite build
```
Production tracks `main`/`staging` → Vercel auto-deploys → https://trainingapp-sepia.vercel.app
Releases: `npm version patch|minor` (bumps package.json, commits, tags) + a `src/pages/DevLog.tsx` entry, then `git push --follow-tags`. See the handbook's "Ship a change" for the full loop (and the note about the stale `deploy` default branch).

## Backend
Supabase project `xdogiyfqqpvwrvysexrt`. Schema is in `supabase/migrations/` (run 001→016 in order to bootstrap). **Note:** the course/program registry and CMS lesson content are seeded separately, *not* in the migrations — see the handbook's cold-restore section.
