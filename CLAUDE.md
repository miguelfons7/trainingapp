# VIAcademy Training App — Development Guide

## What This Is

A React-based training platform for Via Trading Corporation (wholesale liquidation company). New sales hires complete courses covering industry knowledge, company background, product programs, consultative sales methodology, and role-specific training (BDR and AM tracks). Built by Miguel Fonseca (Sales Operations).

## Tech Stack

- **React 19** + **TypeScript** + **Vite**
- **Tailwind CSS v4** (utility-first, no component library)
- **react-router-dom v7** (client-side routing)
- **lucide-react** (icon library — always import individual icons)
- **framer-motion** (animations for ExpandableCard, QuizBlock)
- **Supabase** (PostgreSQL + Auth + Row Level Security)
- **Vercel** deployment: `git push origin main` (auto-deploys from main branch)
- **Production URL**: `https://trainingapp-sepia.vercel.app`
- **@monaco-editor/react** (code editor for CMS JSON editing)
- **@dnd-kit** (drag-and-drop for CMS block reordering)
- **dompurify** (HTML sanitization for CMS rich text rendering)

## Project Structure

```
src/
  components/
    admin/          <- Admin dashboard tabs (InviteUsers, ManageTeams, ManageUsers, ContentHub, etc.)
    cms/            <- CMS block editor (BlockEditor, BlockRenderer, BlockPalette, editors/, etc.)
    sections/       <- One component per lesson module (e.g., BdrRoleOverview.tsx)
    shared/         <- Reusable UI components (SectionWrapper, ExpandableCard, etc.)
    interactive/    <- Exercise/quiz components (ScenarioCard, FillInBlank, QuizBlock)
  data/
    courses.ts      <- Master course registry (id, title, modules[], status)
    programs.ts     <- Training program groupings
    modules/
      industry/         <- Course 1 data files
      via-trading/      <- Course 2 data files
      product-knowledge/<- Course 3 data files
      consultative-sales/ <- Course 4 data files
      bdr-role/         <- Course 5 data files
  lib/
    supabase.ts     <- Supabase client initialization (typed with Database)
    contentService.ts <- Supabase CRUD for CMS module content (fetch, save, publish, rollback)
    formatTime.ts   <- Time duration utilities (formatDuration, sumTimeSeconds, avgTimeSeconds)
  hooks/
    useModuleContent.ts <- React hook wrapping contentService for CMS content
  pages/
    ModuleView.tsx  <- Central routing: imports all section components, maps moduleId -> component; CMS fallback
    ContentEditorPage.tsx <- Admin CMS editor page (/admin/content/:courseId/:moduleId)
    Login.tsx       <- Email + password login via Supabase Auth
    Signup.tsx      <- Invite-only signup with token validation
    ResetPassword.tsx <- Token-based password reset (public, no auth)
    UserProfile.tsx <- User profile page with stats, progress, certs, activity
  types/
    index.ts        <- All TypeScript interfaces (User, Course, quiz types, etc.)
    database.ts     <- Supabase Database types (Row/Insert/Update for all tables)
  context/
    AuthContext.tsx  <- Supabase auth: session, profile, signIn/logout, isAdmin/isLeadership
    ProgressContext.tsx <- User progress tracking (Supabase module_progress table)
    ComplianceContext.tsx <- Compliance items + acknowledgements (Supabase, optimistic updates)
supabase/
  migrations/
    001_initial_schema.sql <- Full DB schema (tables, RLS, triggers, seed data)
    002_invitation_validation.sql <- validate_invitation_token() SECURITY DEFINER function
    003_compliance_tables.sql <- compliance_items + compliance_acknowledgements tables, RLS, seed data
    004_announcement_lifecycle.sql <- status/scheduled_at/departments/updated_at/updated_by on compliance_items, audit_log table
    005_module_content.sql <- CMS module_content + module_content_versions tables
    006_construction_overrides.sql <- construction_overrides table for admin toggles
    007_managed_content.sql <- managed_courses, managed_modules, managed_programs tables
    008_issue_reports.sql <- issue_reports table + RLS + trigger
    009_time_spent.sql <- time_spent_seconds column on module_progress
    010_password_resets.sql <- password_resets table + RLS + SECURITY DEFINER reset functions
public/
  images/           <- All images (hero images, inline images, logos)
.env.local          <- Supabase credentials (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)
```

## Database & Authentication

### Supabase Project

- **Project URL**: Stored in `.env.local` as `VITE_SUPABASE_URL`
- **Anon Key**: Stored in `.env.local` as `VITE_SUPABASE_ANON_KEY`
- `.env.local` is gitignored via `*.local` pattern

### Database Schema (13 tables)

| Table | Purpose | Key Fields |
|-------|---------|------------|
| `teams` | Departments (Sales, Operations, Leadership, New Hires) | `id`, `name` |
| `profiles` | User profiles (extends auth.users) | `id` (FK to auth.users), `email`, `full_name`, `role`, `team_id` |
| `course_assignments` | Who needs to take what | `user_id`, `course_id`, `assigned_by`, `due_date` |
| `module_progress` | Per-module completion tracking | `user_id`, `course_id`, `module_id`, `status`, `score`, `time_spent_seconds` |
| `invitations` | Invite-only signup tokens | `email`, `role`, `team_id`, `invited_by`, `token`, `expires_at` |
| `content_requests` | Leadership content change requests | `requested_by`, `title`, `description`, `status`, `reviewed_by` |
| `compliance_items` | Announcements/compliance items (seed + admin-created) | `id`, `title`, `description`, `details`, `priority`, `is_seed`, `status`, `scheduled_at`, `departments[]`, `updated_at`, `updated_by` |
| `compliance_acknowledgements` | Who acknowledged which item | `item_id` (FK), `user_id` (FK), `acknowledged_at`, UNIQUE(item_id, user_id) |
| `audit_log` | Admin action tracking | `actor_id`, `action`, `entity_type`, `entity_id`, `entity_title`, `details` (jsonb) |
| `module_content` | CMS block content per module (one row per module) | `course_id`, `module_id`, `content` (jsonb PageContent), `status` (draft/published), `version`, `created_by`, `updated_by` |
| `module_content_versions` | Immutable version snapshots (created on publish) | `module_content_id` (FK), `content` (jsonb), `version`, `published_by`, `published_at` |
| `construction_overrides` | Admin toggles for under-construction status | `entity_type` (course/module/program), `entity_id`, `is_active`, `message`, `updated_by` |
| `password_resets` | Admin-generated password reset tokens | `user_id`, `token`, `expires_at`, `used_at`, `created_by` |

### Roles & Permissions

Three roles: `'user'`, `'leadership'`, `'admin'`

| Capability | user | leadership | admin |
|------------|------|------------|-------|
| View own profile/progress | Yes | Yes | Yes |
| View team members' data | No | Yes (own team) | Yes (all) |
| Assign courses | No | Yes (own team) | Yes (all) |
| Submit content requests | No | Yes | Yes |
| Manage invitations | No | Yes (user role, own team) | Yes (all) |
| Manage all data | No | No | Yes |

### Row Level Security (RLS)

All tables have RLS enabled. Policies scope data visibility:
- **Users** see only their own data
- **Leadership** see their team's data (via `get_my_team_id()` helper function)
- **Admins** see everything (via `is_admin()` helper function)

Helper functions (SECURITY DEFINER): `get_my_role()`, `get_my_team_id()`, `is_admin()`, `is_leadership_or_admin()`

### Auth Flow

1. **Login**: `supabase.auth.signInWithPassword({ email, password })` in `AuthContext.tsx`
2. **Session**: Supabase handles JWT tokens automatically; `onAuthStateChange` listener updates React state
3. **Profile**: After auth, `fetchProfileAsUser()` queries the `profiles` table and maps to the `User` type
4. **Signup**: Invite-only. The `handle_new_user()` trigger on `auth.users` auto-creates a profile from the matching invitation (role, team_id, invited_by).
5. **Logout**: `supabase.auth.signOut()` clears session
6. **Password Reset**: Admin generates token via ManageUsers → user visits `/reset-password?token=xxx` → SECURITY DEFINER function updates `auth.users` password → user signs in with new credentials. No email required.

### AuthContext API

```typescript
interface AuthContextValue {
  user: User | null       // null when not logged in
  loading: boolean        // true during initial session check
  signIn: (email: string, password: string) => Promise<{ error?: string }>
  logout: () => Promise<void>
  isAdmin: boolean        // user?.role === 'admin'
  isLeadership: boolean   // user?.role === 'leadership' || isAdmin
  refreshProfile: () => Promise<void>  // re-fetch profile from DB
}
```

**Consumers of `useAuth()`**: App.tsx, Sidebar.tsx, Login.tsx, ComplianceContext.tsx, Home.tsx, Acknowledgements.tsx, AnnouncementManager.tsx, Admin.tsx, ProgressContext.tsx

### Database Types (src/types/database.ts)

**Critical**: Supabase JS v2 requires each table in the Database type to include a `Relationships` array, and the schema must include `Views` (even if empty: `Record<string, never>`). Without these, query results type as `never`.

```typescript
// Correct structure for Supabase JS v2
interface Database {
  public: {
    Tables: {
      tablename: {
        Row: { ... }
        Insert: { ... }
        Update: { ... }
        Relationships: [...]  // Required! Empty [] if no relations needed for types
      }
    }
    Views: Record<string, never>  // Required even if no views
    Functions: { ... }
  }
}
```

Convenience aliases: `Profile`, `Team`, `CourseAssignment`, `ModuleProgressRow`, `Invitation`, `ContentRequest`, `ComplianceItemRow`, `ComplianceAcknowledgementRow`, `AuditLogRow`

### Bootstrap / First Admin

To bootstrap a new environment:
1. Run `supabase/migrations/001_initial_schema.sql` in Supabase SQL Editor
2. Run `supabase/migrations/002_invitation_validation.sql`
3. Run `supabase/migrations/003_compliance_tables.sql`
4. Create user via Dashboard > Auth > Users > Add user > Create new user
5. Promote to admin: `UPDATE profiles SET role = 'admin' WHERE email = 'the@email.com';`
6. Set Site URL + Redirect URL in Auth > URL Configuration to your production domain

## Source Material Location

Training content source documents live outside the repo at:
```
C:\Users\MiguelFonseca\Desktop\Claude - Context\Training App\
  01_Industry_Knowledge\   <- eBooks, guides
  02_Via_Company_Profile\  <- Company docs, strategy transcripts
  03_Product_Knowledge\    <- Product data, lead forms
  04_HubSpot\              <- CRM sequences, snippets, subscription info (used in Tools & Systems)
  05_Aircall\              <- Aircall setup, integration docs (used in Tools & Systems)
  06_Via_Ops_ERP\          <- 10 MHTML webapp captures of ViaOps ERP screens (used in Tools & Systems)
  08_Consultative_Sales\   <- Sales framework (primary: VIA_TRADING_SALES_TRAINING_FRAMEWORK.md)
  09_BDR_Role\             <- BDR call training, mock call scripts
  10_AM_Role\              <- AM training powerpoint (legacy)
  MD\                      <- Context/reference docs for development
```

Always read source documents before writing course content. Don't invent training material.

## How to Add a New Course

### Step 1: Plan the Course

Each course needs:
- A unique `id` (kebab-case, e.g., `bdr-role`)
- An **accent color** (the `border-*` color used in SectionWrapper). Already taken:
  - Course 1 (Industry): `border-blue-500`
  - Course 2 (Via Trading): `border-orange-500` / `border-via-orange`
  - Course 3 (Product): `border-red-500` and varies by retailer
  - Course 4 (Consultative Sales): `border-teal-500`
  - Course 5 (BDR Role): `border-sky-500`
- Modules: typically 5-9 lessons + 1 end-of-course quiz
- Each module needs an `id`, `title`, `estimatedTime`, `contentType` ('lesson' | 'quiz')

### Step 2: Create Data Files

Create directory `src/data/modules/{course-slug}/` with:

1. **`{course}Data.ts`** — Structured content arrays (typed objects, not raw JSX). Example patterns:
   - ExpandableCard data: `{ id, title, shortDescription, details, icon }`
   - Flow steps: `{ id, number, title, description }`
   - Do/Don't lists: `{ do: string[], dont: string[] }`

2. **`inlineExercises.ts`** — Exercise datasets using types from `../../../types`:
   - `ScenarioQuestion[]` — Multiple-choice scenarios with `{ id, scenario, options, bestAnswerIndex, explanation }`
   - `FillInBlankItem[]` — Fill-in-blank items with `{ id, sentence, blank, options, correctIndex }`
   - `TermMatchPair[]` — Term matching with `{ term, definition }`

3. **`courseQuiz.ts`** — End-of-course quiz using `SectionedQuiz` type:
   ```typescript
   export const myCourseQuiz: SectionedQuiz = {
     termMatch: TermMatchPair[],     // 5 pairs
     multipleChoice: QuizQuestion[], // 6-8 questions
     fillInBlank: FillInBlankItem[], // 4-5 items
   }
   ```
   Standard: 15-18 total items, 85% pass threshold.

### Step 3: Create Section Components

One `.tsx` file per lesson module in `src/components/sections/`.

**Every section component follows this pattern:**
```tsx
import { SomeIcon } from 'lucide-react'
import { SectionWrapper } from '../shared/SectionWrapper'
// ... other shared component imports
// ... data imports from data files

export function MyModule() {
  return (
    <SectionWrapper
      id="module-id"
      title="Module Title"
      subtitle="Brief description"
      accentColor="border-{color}-500"
      icon={<SomeIcon className="w-5 h-5" />}
    >
      {/* Content sections as cards */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        {/* ... */}
      </div>

      {/* Callout boxes */}
      <div className="bg-{color}-50 rounded-lg border border-{color}-200 p-4">
        <p className="text-sm text-{color}-700 font-medium mb-1">Title</p>
        <p className="text-sm text-{color}-700">Content</p>
      </div>

      {/* Inline exercises */}
      <ScenarioCard scenarios={myScenarios} title="Exercise Title" />
    </SectionWrapper>
  )
}
```

### Available Shared Components

| Component | Props | Use For |
|-----------|-------|---------|
| `SectionWrapper` | `id, title, subtitle, accentColor, icon, children` | Wraps every lesson module |
| `ExpandableCard` | `title, subtitle?, icon?, isExpanded, onToggle, accentColor?, children` | Accordion-style cards (needs `useState<Set<string>>` for tracking) |
| `FlowDiagram` | `steps: string[], label, color, highlightIndex?` | Linear process flows |
| `Badge` | `text, color` | Small colored labels. Colors: emerald, amber, sky, teal, blue, red, orange, purple, violet, rose, slate |
| `InlineImage` | `src, alt, float?, size?, caption?` | Floating images within text. `src` is filename only (e.g., `"inline-bdr-sales.jpg"`), component adds BASE_URL prefix. Wrap parent in `overflow-hidden` |
| `StatCard` | `icon, value, label` | Stat/metric cards |
| `AdditionalResources` | `resources: { title, url, source, description }[]` | External link cards |
| `ImagePlaceholder` | `src, alt, aspectRatio?` | Hero images with fallback |
| `ScenarioCard` | `scenarios: ScenarioQuestion[], title?` | Interactive scenario exercises |
| `FillInBlank` | `items: FillInBlankItem[], title?` | Fill-in-the-blank exercises |
| `TermMatch` | `pairs: TermMatchPair[], title?` | Term matching exercises |

### Step 4: Wire Up Routing

**`src/pages/ModuleView.tsx`** — Three things to update:

1. **Imports** — Add import for each section component
2. **`contentMap`** — Map module IDs to components: `'module-id': MyComponent`
3. **`quizModules`** — Add quiz module ID to the Set
4. **`moduleImageMap`** — Map module IDs to hero images: `'module-id': { src: 'filename.jpg', alt: 'Description' }`

**`src/components/interactive/QuizBlock.tsx`** — Two things:

1. Import the quiz data and add to `sectionedQuizMap`
2. Add to `nextCourseMap` for the "Continue to next course" button

**`src/data/courses.ts`** — Add or update the course entry:
- Set `status: 'available'`
- Populate `modules: [...]` array with all module entries

### Step 5: Images

- **Hero images**: Named `module-{module-id}.jpg`, stored in `public/images/`
- **Inline images**: Named `inline-{descriptive-name}.jpg`, stored in `public/images/`
- **Course card images**: Named `course-{n}-{slug}.png`, stored in `public/images/`

**Image rules:**
- Every image must be unique across the entire app — no repeats
- Images must match the content they accompany — no generic stock photos
- Don't show stock photos labeled as "Via Trading operations" unless they're real
- Real company photos are available from Via Trading's careers page
- Use Pexels for stock photos — use unique search queries per image to avoid visual repetition
- Hero images: 1280x720 crop. Inline images: 640x480 crop.

**Fetching from Pexels via browser:**
```javascript
(async () => {
  const resp = await fetch(`https://www.pexels.com/search/${encodeURIComponent(query)}/`);
  const html = await resp.text();
  const ids = [...new Set([...html.matchAll(/pexels-photo-(\d+)/g)].map(m => m[1]))];
  return ids.slice(0, 3); // top 3 results
})()
```
Download URL: `https://images.pexels.com/photos/{id}/pexels-photo-{id}.jpeg?auto=compress&cs=tinysrgb&w={width}&h={height}&fit=crop`

### Step 6: Build and Deploy

```bash
npm run build          # TypeScript check + Vite build
npm run dev            # Local dev server
git push origin main   # Deploy to Vercel (auto-deploys from main)
```

## Current Course Status

| # | Course | ID | Status | Accent Color | Modules |
|---|--------|----|--------|-------------|---------|
| 1 | Intro to the Liquidation Industry | `intro-to-industry` | Available | `border-blue-500` | 6 lessons + quiz |
| 2 | Who Is Via Trading | `who-is-via` | Available | `border-orange-500` | 6 lessons + quiz |
| 3 | Product Knowledge | `product-knowledge` | Available | varies by retailer | 10 lessons + quiz |
| 4 | Consultative Sales | `sales-philosophy` | Available | `border-teal-500` | 9 lessons + quiz |
| 5 | Tools & Systems | `tools-systems` | Available | `border-violet-500` | 6 lessons + quiz (CMS-only, no TSX sections) |
| 6 | BDR Role Training | `bdr-role` | Available | `border-sky-500` | 7 lessons + quiz |
| 7 | Ongoing Development | `ongoing-development` | Coming Soon | — | — |

**Program order:** Tools & Systems was moved before BDR Role in `managed_programs` so new hires learn the tools before their role-specific course. The BDR course references HubSpot, Aircall, and ERP — tools-systems gives them the foundation first.

**Tools & Systems is CMS-only:** All 6 lesson modules + 1 quiz module are stored as CMS content in Supabase (`module_content` table). There are no hardcoded TSX section components. Content was authored in code mode using `PageContent` JSON with the block system. The BlockRenderer handles field name variations (`data.html`/`data.content`, `data.variant`/`data.style`, string/numeric heading levels).

**Planned but not yet in `courses.ts`:** AM Role Training (after BDR, covers AM-specific day-to-day)

## Design System Tokens

These Tailwind classes are used consistently:

- **Card**: `bg-via-card rounded-xl border border-via-border p-6 mb-6`
- **Card hover** (for ExpandableCard): `hover:bg-via-card-hover`
- **Text**: `text-via-text` (body), `text-via-text-light` (secondary), `text-via-navy` (headings)
- **Section headings**: `text-sm font-semibold text-via-text uppercase tracking-wide mb-3`
- **Sub-headings**: `text-sm font-semibold text-via-navy uppercase tracking-wide mb-3`
- **Body text**: `text-sm text-via-text leading-relaxed`
- **Bullet dots**: `w-1.5 h-1.5 rounded-full bg-{accent}-500 mt-1.5 shrink-0`
- **Callout box**: `bg-{color}-50 rounded-lg border border-{color}-200 p-4` with `text-{color}-700`
- **Code/template blocks**: `bg-via-bg-subtle rounded-lg p-3` with `text-xs font-mono`
- **Subtle background**: `bg-via-bg-subtle`

## Content Conventions

- **Doctor/patient metaphor** runs through Course 4 (Consultative Sales): BDR = triage nurse, AM = doctor
- **"Win Without Pitching" and "Crucial Accountability"** concepts are woven in naturally — books never named
- **Tone**: Teach the WHY behind techniques. Genuine curiosity over interrogation. Relationship-based over transactional.
- **Via Trading specifics**: 250,000+ sq ft warehouse in Lynwood CA, 800 pallets/day, 10,000+ in stock, 129+ countries, 90%+ repeat buyer rate, open to public Mon-Fri
- **Key frameworks**: 5-Step Consultative Method (Summarize->State Idea->Explain->Reinforce Benefits->Close), K.L.A.P.D.O.C. (objection handling), 30% Rule (you talk 30%, buyer 70%)

## TypeScript Types (key ones)

```typescript
// src/types/index.ts
interface User {
  id: string              // Supabase auth.uid
  email: string
  name: string
  avatar?: string
  role: 'user' | 'leadership' | 'admin'
  teamId?: string         // FK to teams table
}

interface SectionedQuiz {
  termMatch: TermMatchPair[]
  multipleChoice: QuizQuestion[]
  fillInBlank: FillInBlankItem[]
  passThreshold?: number // defaults to 0.85
}

interface ScenarioQuestion {
  id: string; scenario: string; options: string[]
  bestAnswerIndex: number; explanation: string
}

interface FillInBlankItem {
  id: string; sentence: string; blank: string
  options: string[]; correctIndex: number
}

interface TermMatchPair { term: string; definition: string }

interface QuizQuestion {
  id: string; question: string; options: string[]
  correctIndex: number; explanation: string
}

interface Course {
  id: string; title: string; description: string; icon: string
  estimatedTime: string; modules: CourseModule[]
  status: 'available' | 'coming-soon'; imagePath?: string
}

interface CourseModule {
  id: string; title: string; estimatedTime: string
  contentType: 'lesson' | 'quiz' | 'interactive'; description?: string
}
```

## Common Pitfalls

- **Unused imports cause build failure** — TypeScript strict mode. Clean imports before building.
- **`moduleImageMap` controls hero display** — If a module ID isn't in the map, no hero renders. Removing an entry is how you hide a duplicate hero.
- **`overflow-hidden` on parent** when using `InlineImage` with `float` — prevents layout overflow.
- **ExpandableCard needs state** — Always pair with `useState<Set<string>>` and a `toggle` function.
- **Course-5-bdr.png was a placeholder** — original was AI-generated 1.4MB, replaced with Pexels photo.
- **Image src in InlineImage** is just the filename — the component prepends `import.meta.env.BASE_URL + "images/"`.
- **Supabase Database types need `Relationships`** — Each table in the Database interface must include a `Relationships: []` array or Supabase JS v2 types resolve to `never`. Also needs `Views: Record<string, never>` in the schema.
- **Old role was `'learner'`, now `'user'`** — The User type role changed from `'learner' | 'admin'` to `'user' | 'leadership' | 'admin'`. If adding new code, always use the new role names.
- **AuthContext is async** — `loading` must be checked before accessing `user`. The `ProtectedRoute` and `AppRoutes` in App.tsx handle this with a `LoadingScreen`.
- **AuthContext deadlock risk** — Never do async work inside `onAuthStateChange` callback. Supabase v2's internal auth lock will deadlock. Capture state synchronously, fetch data in a separate `useEffect`. See three-state pattern: `authUserId: string | null | undefined`.
- **ProgressContext uses Supabase** — Migrated from localStorage to `module_progress` table with optimistic updates and upsert on `user_id,course_id,module_id`.
- **Time tracking (wall-clock)** — `module_progress.time_spent_seconds` records elapsed time from `started_at` to completion. Computed in `completeModule()` with a 24-hour (86400s) sanity cap. Old completions (before migration 009) show "—". `formatDuration()` in `src/lib/formatTime.ts` renders seconds as "< 1 min", "3 min", "1h 15m". UserProfile shows total time stat card + per-course breakdown. CourseStats shows "Avg Time" column. UserProgressTable shows "Time Spent" column.
- **completeModule() must NOT include started_at** — The upsert in `ProgressContext.completeModule()` intentionally omits `started_at` from the payload. Including it overwrites the real start time with the completion time, making all duration data useless. Only `completed_at`, `time_spent_seconds`, `status`, and `score` are sent.
- **ComplianceContext uses Supabase** — Migrated from localStorage to `compliance_items` + `compliance_acknowledgements` tables with optimistic updates and rollback. Seed items protected via `is_seed` flag. `acknowledgedBy` stores user IDs (UUIDs), not emails. Supports full lifecycle: draft/scheduled/live/archived statuses. `updateItem` for editing, `logAudit` for tracking actions. Regular users only see `status='live'` via RLS.
- **Compliance seed data lives in DB** — The old `src/data/compliance.ts` was deleted. Seed items are inserted via migration 003 with `ON CONFLICT DO NOTHING`.
- **Supabase Auth URLs** — Site URL and redirect URL configured for Vercel production domain. Update these if the domain changes.
- **Module gating** — Regular users can only access modules sequentially (previous must be completed). Quiz modules hide the "Continue" button, forcing quiz completion. Admins and leadership (`isAdmin || isLeadership`) bypass all gating. Logic in `ModuleList.tsx` and `ModuleView.tsx`.
- **Admin tabs merged** — "Announcements" and "Compliance" are now one tab (`ComplianceManager.tsx`). Old `AnnouncementManager.tsx` and `ComplianceTracker.tsx` are still in the repo but no longer imported from Admin.tsx.
- **Responsive sidebar** — AppShell uses `window.innerWidth` tracking with breakpoints: `<768px` = mobile hamburger, `768-1024px` = auto-collapsed (icon-only), `>1024px` = user-togglable expanded/collapsed. Content always has margin matching sidebar width.
- **Announcement lifecycle** — Announcements support draft/scheduled/live/archived statuses. ComplianceManager has status tab navigation. Edit modal for updating announcements. Multi-checkbox department targeting. Scheduled publish date. Audit log tracks all admin actions.
- **Search in admin tables** — UserProgressTable and ManageUsers both have search bars filtering by name or email.
- **Program stats** — CourseStats shows a Program Overview table above the per-course table, with enrolled/completed/avg progress.
- **Audit log** — `audit_log` table with RLS (admins read, all insert own actions). ComplianceContext auto-logs create, update, status_change, delete actions.
- **Construction status** — `construction_overrides` table lets admins mark courses/modules/programs as under construction. ConstructionContext provides `isUnderConstruction()` app-wide. Regular users blocked; admins/leadership see warning banners. Toggle switches with optimistic updates. Migration 006.
- **Admin CMS** — Block-based content editor with visual, code, and preview modes. 18 block types matching existing shared/interactive components. Content stored as JSONB in `module_content` table with draft/publish workflow and version history with rollback. Content resolution: published CMS → hardcoded TSX → draft CMS → "coming soon" placeholder. Admin "Edit in CMS" button on every module page. Editor page at `/admin/content/:courseId/:moduleId`. DB migration 005.
- **Content Hub (unified)** — The old "Content Editor" (ContentManager.tsx) and "Manage Courses" (ManageCourses.tsx) admin tabs have been merged into a single "Content" tab (`ContentHub.tsx`). Features: overview stats bar (Programs/Courses/Modules/CMS Published/Drafts), Programs sub-tab with table + create/edit/delete + course checkboxes, Courses & Modules sub-tab with expandable rows showing module sub-tables with CMS status badges and "Edit Content" links to the CMS editor, "Used In" column showing program membership. Full CRUD for programs, courses, and modules. All create/edit forms have field labels above every input and dropdown. Info banner at top of Courses & Modules tab explains the CMS editing workflow. DB-backed via `managed_courses`, `managed_modules`, `managed_programs` tables (migration 007). CoursesContext provides `useCourses()` hook with `courses`, `programs`, `getCourseById`, `getProgram`, and all CRUD methods. Hardcoded `courses.ts`/`programs.ts` used as fallback only in CoursesContext — all other consumers use the hook.
- **Profile hero** — Gradient header (navy-to-indigo) with white text for name/email. Role badge, team badge, and join date display below in the card body. No negative margins or overlapping colors.
- **Admin user editing** — ManageUsers tab supports editing name and email inline (previously only role and team).
- **Consumer migration complete** — All 15+ components that previously imported from `courses.ts`/`programs.ts` now use `useCourses()` hook from CoursesContext. CoursesProvider wraps ProgressProvider in App.tsx so ProgressContext can access course data dynamically.
- **Password reset route has no auth guard** — `/reset-password` is public like `/login` and `/signup`. Don't wrap it in ProtectedRoute or add a user redirect, because users who forgot their password can't be authenticated. Migration 010. Admin generates token in ManageUsers (KeyRound icon) → modal shows copyable link → user visits link → sets new password. Token expires in 24h, single-use.

## Pending Work

- **Build AM Role Training course** (rough draft, same pattern as BDR)
- **Build Ongoing Development course** (placeholder, covers continuous learning topics)
- **Code splitting** — Bundle is >1.2MB; consider dynamic imports for course section components
- **CMS enhancements** — Drag-and-drop block reordering (dnd-kit is installed but not yet wired into BlockEditor), Monaco editor integration (installed but code mode uses textarea), rich text editor for paragraph blocks (currently plain HTML strings)
- **Color palette expansion** — Add tasteful, complementary colors beyond blue/orange for visual variety
- **BlockRenderer robustness** — The renderer now handles field name variations (html/content, variant/style, string/numeric heading levels) but could benefit from a formal content normalization layer
