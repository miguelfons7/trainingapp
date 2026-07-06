# VIAcademy Engineering Handbook

> Written as a knowledge-transfer / exit document so any model or engineer (Opus and successors)
> can operate this system to the standard it was built to. `CLAUDE.md` is the terse machine-facing
> spec; **this** is the "why," the judgment, and the runbooks. Read both. When they disagree, code wins,
> then fix the doc.
>
> Last full audit: **2026-06-23** (v1.2.2). Findings + live worklist: [`docs/AUDIT_2026-06.md`](AUDIT_2026-06.md).

---

## 1. What this is, and who it serves

VIAcademy is an internal training platform for **Via Trading Corporation** (wholesale liquidation, ~15 employees). New sales hires complete role-based programs (BDR / AM tracks) of courses → modules (lessons + a final quiz), earn certificates, and admins manage users, content, and compliance. Owner/PM/only stakeholder: **Miguel Fonseca (Sales Operations)** — not a career engineer, so **you are the engineer**: he sets product direction and standards; you own correctness, security, and craft.

**Threat model / scale reality (calibrate every decision to this):** ~15 trusted internal users on office wifi. The realistic adversary is a curious employee, not a nation-state. This makes many "vulnerabilities" INFO-level (self-cheating quiz scores) while making *operational* footguns (a save that unpublishes content, a silent 1000-row truncation) the things that actually bite. Don't gold-plate security theater; do protect data integrity and the content pipeline.

## 2. The shape of the system (hold this in your head)

A Vite/React 19 + TypeScript SPA on Vercel; Supabase (Postgres + Auth + RLS + Storage) is the backend and **RLS is the security boundary** (the anon key ships in the bundle by design).

- **`App.tsx` nests five context providers in dependency order: Auth → Courses → Progress → Compliance → Construction.** Each fetches its Supabase domain ~once per login and exposes *getter callbacks*, not raw state. Provider order matters (Progress needs Courses; everything needs Auth).
- **Content resolves per module in `ModuleView`:** published CMS JSON (`BlockRenderer`) → hardcoded lazy TSX section component → draft CMS (admins only, via RLS) → "coming soon." Courses 1–4 are mostly TSX; **Tools & Systems, AM Role, the 4 BDR operational modules, and `how-via-is-organized` are CMS-only** (content lives in the DB, not the repo).
- **The DB is the source of truth for course/program structure** (`managed_courses` / `managed_modules` / `managed_programs`), surfaced through `CoursesContext`. `src/data/courses.ts` and `programs.ts` are **fallbacks only** and are currently stale (§7 debt).
- **Gating is client-computed, RLS-enforced.** `useCourseLock` decides lock/unlock from the user's programs + progress; RLS independently prevents reading/writing others' rows.
- **Admin surface** is a lazy `/admin` page + lazy tool pages (Content Hub, the block-based CMS editor with Monaco/TipTap, QuizCreator, MigrationRunner), each self-guarded by `isAdmin` on top of RLS.
- **Versioning is single-sourced:** `package.json` `version` → injected by Vite `define` (`__APP_VERSION__`) → `src/version.ts` `APP_VERSION` → Sidebar + Login footer.

Trace any behavior from `App.tsx` (routes) → the page → the context getter → the Supabase table + its migration. That path is the whole app.

## 3. Standards (these are load-bearing — violating them is a defect)

### 3.1 Copy (Miguel's hard rule)
- **Minimal em dashes: at most one per module, zero preferred.** Restructure with periods, commas, colons, parentheses. This is the single most-repeated piece of feedback in the project's history — treat a stray ` — ` as a bug.
- **Hyphens in operational identifiers are NOT em dashes and must stay verbatim:** `Must Close - KC`, `BDR - Handoff Rotation`, `14-day`, `#introam`. Never "fix" these.
- Teach the *why* behind techniques; genuine curiosity over interrogation; relationship over transaction. The doctor/patient metaphor runs through Consultative Sales (BDR = triage nurse, AM = doctor). Books ("Win Without Pitching", "Crucial Accountability") are woven in, never named.
- Content is grounded in real Via Trading source material at `C:\Users\MiguelFonseca\Desktop\Claude - Context\Training App\` — **read the source before writing training content; never invent facts.**

### 3.2 Imagery (Miguel's hard rule)
- People look **happy** and **reflect the team's demographics (largely Latino)**.
- **Topic-relevant only:** a tool lesson gets that tool's logo or a dashboard screenshot, not loose stock. (History: a HubSpot lesson wrongly showed a Google-Analytics tablet; an Aircall lesson showed someone filing their nails — both rejected.)
- No odd close-ups. Floated inline images must have text wrapping around them (never wrap the floated image itself in `overflow-hidden` — that creates a BFC that kills the wrap; `overflow-hidden` goes on the card, `clear-both` closes the section).
- Pexels for stock (unique query per image, no repeats); real Via photos from the careers page. Every image unique across the app.

### 3.3 Quizzes
- 15–18 items in three sections: **5 term-match / 6–8 multiple-choice / 4–5 fill-in-blank.** (Several older quizzes ship 4 TM — a known deviation, §debt.)
- **`passThreshold` is a FRACTION (0.85), never a percent (85).** A percent value makes the quiz mathematically unpassable. `QuizBlock` now normalizes `>1 → /100` defensively, but author it as `0.85`. The CMS QuizEditor renders the raw value ×100, so an `85` in the DB shows as "8500%".
- A quiz completes the module **only on pass** (`onComplete` fires only when passed; `onAttempt` logs every submission incl. failures). A failed quiz must never unlock the next course.

### 3.4 Version discipline (single-source)
`package.json` is the one source of truth. **Never hand-edit `src/version.ts`.** To ship a user-visible release:
```
npm version patch|minor      # bumps package.json, commits, creates the vX.Y.Z tag
# add a DevLog.tsx changelog entry (today's date)
git push --follow-tags
```
Patch = fixes, minor = features. **Infra-only deploys that change nothing users see keep the version** (no bump, no changelog). Every git tag must have a matching DevLog entry.

### 3.5 Correctness principles (distilled from real incidents — see §6)
1. **Never key behavior off a hardcoded ID registry when the data model already carries the fact.** (A 6-id Set decided "what is a quiz" while `contentType==='quiz'` sat in the DB → the AM exam silently rendered as a completable lesson. v1.2.2.)
2. **A fallback dataset is a liability the moment it can drift.** Either validate it against the DB or block rendering behind `loading`.
3. **Fix the class, not the instance.** The progress-clobber race was fixed on `startModule` but the same race still lives on `completeModule`.
4. **Draft/publish needs two slots.** A single row that flips to `draft` on Save means "edit" == "unpublish" under status-scoped RLS.
5. **Unbounded `select *` is a countdown, not a query.** PostgREST truncates at 1000 rows in arbitrary order, silently. Order + bound + paginate.
6. **Optimistic UI without rollback is a lie with a delay.** Surface persistence failures or retry; `console.error` is not error handling.
7. **When two features read the same state (construction, locks, "loaded"), they must share one predicate.** Divergence = one fails open while the other fails closed.
8. **Trust nothing an admin can author.** CMS JSON needs schema validation at the render boundary (missing arrays crash; empty quizzes auto-pass).

### 3.6 Security / RLS checklist for any new table
1. `ENABLE ROW LEVEL SECURITY` explicitly (RLS-on + no policy = default-deny = safe; RLS-off = fully exposed).
2. Scope reads by ownership + role: `USING (user_id = auth.uid() OR is_leadership_or_admin())`. Avoid `USING (true)` unless truly public-to-all-authenticated.
3. Gate writes to the minimum role; always pair `USING` with `WITH CHECK` on INSERT/UPDATE. (Pattern: migration 016.)
4. Adding a self-editable-sensitive column? Re-issue the owning table's UPDATE policy to **pin** it (`AND col IS NOT DISTINCT FROM (SELECT col FROM … WHERE id = auth.uid())`), as migration 015 did for `program_id`. Adding a column does not retroactively protect it.
5. `TO authenticated` on every policy; never trust JWT/body for role — derive from `profiles` via the SECURITY DEFINER helpers (`is_admin`, `is_leadership_or_admin`, `get_my_role`, `get_my_team_id`).
6. Anon-callable RPCs: SECURITY DEFINER + `SET search_path=public` + unguessable token + expiry/single-use enforced *inside* the function + explicit `GRANT EXECUTE` + schema-qualify extension calls.
7. Log sensitive mutations server-side (AFTER triggers), not from the client (client audit rows are forgeable/skippable).

## 4. Core workflows

### 4.1 Ship a change (the standard loop)
1. Work on `staging` (never commit straight to `deploy`/`main`; if you find yourself on the default branch, branch first).
2. `npm run build` must pass (it runs `tsc -b` then Vite). Fix all type errors — no `@ts-ignore`.
3. **Verify at the surface, not the unit.** If observable in the app, run it via the preview server (`preview_start` → drive it → screenshot/console). Auth-gated flows that need a real login are the owner's to eyeball — say so honestly rather than claiming verification you didn't do.
4. Version + DevLog per §3.4 (or explicitly note "infra-only, no bump").
5. Commit (end message with the `Co-Authored-By: Claude …` trailer), `git push origin staging`, merge to `main`, push, push tags.
6. **Confirm the deploy landed:** poll prod for the version string in the bundle:
   ```bash
   curl -s https://trainingapp-sepia.vercel.app/ | grep -oE 'index-[A-Za-z0-9_-]+\.js'   # get chunk
   curl -s https://trainingapp-sepia.vercel.app/assets/<chunk> | grep -q '1\.2\.2'         # assert version
   ```
7. Update `CLAUDE.md` if the change alters any documented fact. Keep `Claude - Context/Training App/MD/VIACADEMY_DEV_GUIDE.md` byte-identical (it's a manual copy — a second stale ground truth if you forget).

> **Deploy topology caveat (verify before trusting):** GitHub's *default* branch is `deploy`, which is ~35 commits stale — a naive `git clone` gets old code. Production truth is `main`/`staging` (fast-forwarded together). Confirm which branch Vercel builds in its dashboard. A stray `.github/workflows/deploy.yml` also publishes GitHub Pages on push. This should be cleaned up (set default branch to `main`, delete/retire `deploy` and the Pages workflow).

### 4.2 Push CMS content to the DB
CMS lesson/quiz content lives in `module_content` (Postgres), authored either in the visual editor or in bulk via SQL. The bulk pipeline (in gitignored `cms-content/`):
- Author `PageContent` JSON per module (`cms-content/<course>/<module>.json`).
- `node cms-content/<course>/generate-sql.cjs` → emits `sql-*-content.sql` (dollar-quoted `$cms$…$cms$::jsonb` upserts, `ON CONFLICT (course_id, module_id) DO UPDATE`, `status='published'`, admin id) + single-line `load-N.js` Monaco loaders.
- Run in the Supabase SQL editor (see 4.4). `scripts/push-cms-content.cjs` is the reusable pusher.

Content resolution + the **draft footgun**: because there's ONE row per module and RLS gates on `status='published'`, saving an edit as *draft* hides it from all learners. On CMS-only modules, **only ever Publish** — don't Save-and-walk-away. (This is a HIGH item to fix properly; §debt.)

### 4.3 Data repair / one-shot ops SQL
Reusable runbooks live in **`docs/runbooks/`** (rescued from gitignore):
- `recover-progress.sql` — restore completions if progress rows get downgraded (used after the idle-logout bug).
- `fix-quiz-thresholds.sql` — audit + fix any `passThreshold` stored as a percent (`>1 → /100`).
Both are idempotent, comment each step, and end with a verification `SELECT`. Model new ops SQL on them: **measure → change → re-measure**.

### 4.4 Running SQL in the Supabase dashboard (and un-wedging it)
Only prod-DB path available is the browser SQL editor (no service-role key, no direct psql). It intermittently **wedges** (blank SPA, Monaco never mounts, "Failed to fetch"). Recovery ladder, in order: (1) reload; (2) wait 30–40s (cold boot is slow); (3) fresh tab; (4) **re-authenticate via GitHub** — this is what actually fixed a total wedge. Then load SQL via the Monaco API (`window.monaco.editor.getEditors()[0].setValue(...)`) and click the last **Run** button; confirm the destructive-op modal with **Run query**. Read results from `.rdg-cell` (the grid virtualizes — long single-cell `string_agg` results read more reliably than multi-column ones; single `count(*)` reads cleanly).

> **Production writes require explicit owner authorization.** The safety layer will (correctly) block an unprompted prod data mutation. An owner-approved migration/repair is fine to run; an unrequested `UPDATE` is not — hand those to Miguel with the exact SQL instead.

### 4.5 Self-audit (how this very document's audit was run — repeat it)
For a comprehensive review, **fan out read-only agents in parallel, one per lens**, then synthesize and cross-corroborate (findings that appear in ≥2 independent agents are high-confidence). The five lenses used: **Security/RLS, Correctness/data-integrity, Architecture/dead-code/perf, Content/UX consistency, Docs/ops accuracy.** Give each agent: the file tree entry points, the known history (so it verifies fixes hold and hunts for siblings), a severity scale, and a demand for `file:line` evidence + a concrete failure scenario per finding. Require an output format (exec summary, findings table, per-finding detail, verified-safe list, a distilled checklist). Then verify the top findings yourself before acting — agents are sharp but occasionally misdiagnose (e.g., the "198KB icon barrel" was actually supabase-js, merely *named* after a tiny icon chunk).

### 4.6 Incident response pattern
1. Reproduce / locate via `file:line`; state the mechanism precisely before touching code.
2. **Diagnose root cause, not symptom.** (The quiz "always fails" was a threshold format bug, not scoring.)
3. Fix the *class* (guard every path, not the one that burned you).
4. Verify (build + trace control flow + surface test where possible).
5. If live data was corrupted, write an idempotent repair runbook (§4.3) and — because prod writes need owner authorization — either run it with approval or hand it over.
6. Ship as a patch with a DevLog entry; be honest in the changelog about what broke.

## 5. Verification honesty (a standard, not a nicety)
- Report outcomes faithfully. If tests failed, say so with output. If a step was skipped, say that. When something is verified, state it plainly; when it isn't, don't imply it is.
- You cannot drive the authed app (no login session), and creating production credentials is denied. So authed-flow visual verification is genuinely the owner's — say "please eyeball X" rather than claiming a PASS. Build success + traced control flow + unauthed surface checks (login page, version string, console) are what you *can* legitimately verify; do those.

## 6. Incident history (the scars — learn them so you don't reopen them)
| Version | What broke | Root cause | Lesson |
|---|---|---|---|
| 1.1.1 | Completed modules reset after idle logout | `startModule`'s upsert overwrote `completed` rows when the post-login progress fetch hadn't resolved (empty map) | Gate writes on loaded state; use `ignoreDuplicates` (INSERT…ON CONFLICT DO NOTHING) for "mark started"; retry the load, never blank on error |
| 1.1.2 | Quiz marked passing scores as failed (even 100%) | `passThreshold` seeded as `85` (percent) not `0.85`; `passCount = ceil(items × 85)` unreachable | Thresholds are fractions; normalize `>1 → /100` defensively; the CMS default seed was the culprit |
| 1.2.2 | AM exam skippable; certificate without exam | `isQuiz` derived from a hardcoded id Set that never got the CMS-created am-role quiz id | Read `contentType` from the DB, not a Set (principle 3.5.1) |
| (open, HIGH) | Save-draft unpublishes live CMS content | One row/module + `status`-scoped RLS | Needs two-slot draft/publish or save-preserves-published (§debt F2) |
| (open, HIGH) | `completeModule` clobber race | Same race as 1.1.1, `completeModule` ungated | Fix the class (§debt F3) |

## 7. Known debt & the live worklist
The full severity-ranked register with `file:line` and fix sketches is in **[`docs/AUDIT_2026-06.md`](AUDIT_2026-06.md)**. The shortlist a successor should burn down first:
1. **HIGH — Draft-save unpublishes live content** (operational footgun; until fixed, only Publish CMS-only modules).
2. **HIGH — `completeModule` re-completion race** (mirror the `startModule` fix's `progressLoaded` gate onto the complete path, preserving re-pass updates).
3. **HIGH — Unbounded reads** in `UserProgressTable` / `CourseStats` / `useLearningStreak` (add order + date-window/`.range()`; `learning_activity` is the real time bomb).
4. **HIGH — Fallback drift** (`courses.ts`/`programs.ts` lack am-role and the AM program; sync-or-shrink, and surface a visible "couldn't load courses" state instead of silently rendering stale data).
5. **MED — Cold-restore gap** (below): promote seed data + CMS content into the repo, add a backup routine.
6. **MED — `strict` TypeScript off** and **`npm run lint` broken** (552 parse errors from `.claude/worktrees` — add `.claude` to eslint ignores; then turn on `strict` and fix fallout).
7. **MED — Orphan `/final-exam`** writes junk `program-exam` progress rows; delete route+component+data or re-link.
8. **Em-dash debt (~250 occurrences)** in the older hardcoded courses (Consultative Sales, BDR, Product Knowledge) — never swept; and the who-is-via CMS pilot drafts would regress copy if published as-is (pre-publish gate).
9. **Perf wins** (~25% eager-bundle cut): move framer-motion off the critical path; lazy-load QuizBlock; lazy the remaining non-admin pages.
10. **Dead code**: 12 provably-unreachable files listed in the audit (safe to delete).

## 8. Cold-restore reality (the scariest gap)
**If this machine dies, some things cannot be rebuilt from GitHub + Supabase, because they live only in gitignored dirs on this machine and/or the live DB:**
- The current `managed_*` registry state (am-role course + modules, the program rename, `am-training`, BDR ops modules, `how-via-is-organized`) — repo copies exist but are **gitignored** (`cms-content/**/sql-0-*.sql`). Migration 007's seed is a stale early snapshot.
- **Every `module_content` row** (~26+ published CMS modules incl. the am-role CMS quiz) — sources are gitignored `cms-content/**/*.json` + generated SQL + `PUSH-tone-pass.sql`.
- The push pipeline scripts themselves (gitignored `scripts/` + `cms-content/*/generate-sql.cjs`).

**The inverse is worse:** if *Supabase* dies, the only copy of current CMS content is this machine's gitignored `cms-content/`. Machine and Supabase are mutual single points of failure with **zero automated backups**. **Action (do this):** create `supabase/seed/` with the registry + content SQL (narrow the `.gitignore cms-content/` rule to keep sources, ignore only scratch), and add even a monthly manual `pg_dump` / dashboard export of `module_content` + `managed_*`, documented. A backup + handoff plan was drafted but never executed — it's the highest-leverage unglamorous work left.

## 9. Working with Miguel (norms that make this go well)
- He decides product; you decide engineering. He'll pick between options via quick either/or questions — give a **recommendation first**, then alternatives, not an exhaustive survey.
- He is precise about copy and imagery (§3.1/3.2) and notices version drift ("still shows v0.13.4") — hence the single-source pipeline and DevLog discipline. Keep both current.
- He works conversationally and dislikes ceremony; when he says "just do it," execute end-to-end and confirm, don't re-litigate. When a change is a production schema migration or a data mutation, confirm scope once (it's high-impact), then go.
- Be honest about blockers (dashboard wedges, prod-write authorization, authed verification) — he'd rather know the real constraint than get a confident-but-wrong claim.
- Persistent memory for this project lives at `C:\Users\MiguelFonseca\.claude\projects\C--Users-MiguelFonseca-Desktop-trainingapp\memory\` (`copy-and-image-style`, `dev-log-discipline`, and this handbook's pointer). Update it when you learn a durable preference.

## 10. Quick reference
- **Prod:** https://trainingapp-sepia.vercel.app · **Repo:** github.com/miguelfons7/trainingapp · **Supabase project:** `xdogiyfqqpvwrvysexrt`
- **Run locally:** `.env.local` (Supabase URL + anon key) → `npm install` → `npm run dev` (port 5173, see `.claude/launch.json`).
- **Design tokens:** card = `bg-via-card rounded-xl border border-via-border p-6 mb-6`; text `text-via-text` / `text-via-text-light` / `text-via-navy`; callout `bg-{color}-50 border-{color}-200` + `text-{color}-700`.
- **Frameworks referenced in content:** 5-Step Consultative Method, K.L.A.P.D.O.C. (objections), 30% Rule, BARTTED (support prequal).
- **Via facts:** 250,000+ sq ft Lynwood CA warehouse, ~800 pallets/day, 10,000+ lots, ships 129+ countries, 90%+ repeat-buyer rate, open to public Mon–Fri.
