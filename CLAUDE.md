# VIAcademy Training App — Development Guide

## What This Is

A React-based training platform for Via Trading Corporation (wholesale liquidation company). New sales hires complete courses covering industry knowledge, company background, product programs, consultative sales methodology, and role-specific training (BDR and AM tracks). Built by Miguel Fonseca (Sales Operations).

## Tech Stack

- **React 19** + **TypeScript** + **Vite**
- **Tailwind CSS v4** (utility-first, no component library)
- **react-router-dom v7** (client-side routing)
- **lucide-react** (icon library — always import individual icons)
- **framer-motion** (animations for ExpandableCard, QuizBlock)
- **GitHub Pages** deployment: `git push origin main:deploy`

## Project Structure

```
src/
  components/
    sections/       ← One component per lesson module (e.g., BdrRoleOverview.tsx)
    shared/         ← Reusable UI components (SectionWrapper, ExpandableCard, etc.)
    interactive/    ← Exercise/quiz components (ScenarioCard, FillInBlank, QuizBlock)
  data/
    courses.ts      ← Master course registry (id, title, modules[], status)
    programs.ts     ← Training program groupings
    modules/
      industry/         ← Course 1 data files
      via-trading/      ← Course 2 data files
      product-knowledge/← Course 3 data files
      consultative-sales/ ← Course 4 data files
      bdr-role/         ← Course 5 data files
  pages/
    ModuleView.tsx  ← Central routing: imports all section components, maps moduleId → component
  types/
    index.ts        ← All TypeScript interfaces
  context/
    ProgressContext.tsx ← User progress tracking (localStorage-based)
public/
  images/           ← All images (hero images, inline images, logos)
```

## Source Material Location

Training content source documents live outside the repo at:
```
C:\Users\MiguelFonseca\Desktop\Claude - Context\Training App\
  01_Industry_Knowledge\   ← eBooks, guides
  02_Via_Company_Profile\  ← Company docs, strategy transcripts
  03_Product_Knowledge\    ← Product data, lead forms
  04_HubSpot\              ← CRM sequences, snippets, subscription info
  08_Consultative_Sales\   ← Sales framework (primary: VIA_TRADING_SALES_TRAINING_FRAMEWORK.md)
  09_BDR_Role\             ← BDR call training, mock call scripts
  10_AM_Role\              ← AM training powerpoint (legacy)
  MD\                      ← Context/reference docs for development
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
- Hero images: 1280×720 crop. Inline images: 640×480 crop.

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
git push origin main:deploy  # Deploy to GitHub Pages
```

## Current Course Status

| # | Course | ID | Status | Accent Color | Modules |
|---|--------|----|--------|-------------|---------|
| 1 | Intro to the Liquidation Industry | `intro-to-industry` | ✅ Available | `border-blue-500` | 6 lessons + quiz |
| 2 | Who Is Via Trading | `who-is-via` | ✅ Available | `border-orange-500` | 6 lessons + quiz |
| 3 | Product Knowledge | `product-knowledge` | ✅ Available | varies by retailer | 10 lessons + quiz |
| 4 | Consultative Sales | `sales-philosophy` | ✅ Available | `border-teal-500` | 9 lessons + quiz |
| 5 | BDR Role Training | `bdr-role` | ✅ Available | `border-sky-500` | 7 lessons + quiz |
| 6 | Tools & Systems | `tools-systems` | 🔜 Coming Soon | — | — |
| 7 | Ongoing Development | `ongoing-development` | 🔜 Coming Soon | — | — |

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
- **Key frameworks**: 5-Step Consultative Method (Summarize→State Idea→Explain→Reinforce Benefits→Close), K.L.A.P.D.O.C. (objection handling), 30% Rule (you talk 30%, buyer 70%)

## TypeScript Types (key ones)

```typescript
// src/types/index.ts
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
