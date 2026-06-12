import { ScrollText, GitCommit, Tag } from 'lucide-react'
import { APP_VERSION } from '../version'

interface LogEntry {
  version: string
  date: string
  title: string
  changes: string[]
}

const changelog: LogEntry[] = [
  {
    version: '1.1.1',
    date: '2026-06-12',
    title: 'Fix: Completed Modules Could Reset After an Idle Logout',
    changes: [
      'Fixed a bug where completing modules, getting auto-logged-out for inactivity, then logging back in could reset those modules to incomplete. Opening a module no longer overwrites an existing completion.',
      'Recovered affected progress: completed modules that had been reset were restored from the activity history.',
      'Progress now loads reliably after re-login (retries instead of showing an empty course on a slow connection).',
      'Raised the inactivity auto-logout from 15 to 30 minutes.',
    ],
  },
  {
    version: '1.1.0',
    date: '2026-06-12',
    title: 'CMS-Editable Module Hero Images',
    changes: [
      'Each module\'s hero banner can now be set or replaced from the CMS editor (Page Settings → Hero Image): upload an image or point to an existing file, no code change or redeploy needed.',
      'A CMS hero overrides the built-in default when set; modules without one keep their existing image, so nothing changed for current lessons.',
      'CMS-only modules that never had a banner (AM Role, the BDR workflow lessons, How Via Is Organized) can now get one straight from the editor.',
    ],
  },
  {
    version: '1.0.1',
    date: '2026-06-12',
    title: 'Quality Pass: Formatting Fixes, Honest Placeholders, Dev Log Catch-Up',
    changes: [
      'Numbered lists and two-column lists in CMS content now render bold/italic formatting instead of showing raw <strong> tags.',
      'Text now wraps around floated inline images in CMS lessons (the image renderer was isolating floats, leaving empty gaps beside small images).',
      'Missing images show their description in the placeholder so pending screenshots read as intentional, not broken.',
      'Content pass: reduced em dashes, softened the sales-team emphasis in "How Via Is Organized", and replaced off-topic imagery in Tools & Systems.',
      'Sidebar and login version badges now read from one source and were caught up from 0.13.4.',
    ],
  },
  {
    version: '1.0.0',
    date: '2026-06-12',
    title: 'VIAcademy 1.0: Role-Based Programs, AM Course, App-Wide Quality Pass',
    changes: [
      'Role-based programs: BDR and AM tracks share the five core courses, then split into their role course. Admins assign a user\'s program in Manage Users; everyone sees only their own program (admins see all).',
      'New AM Role Training course (7 lessons + quiz): the deal pipeline (Consultation to Invoice Shipped, the recommendation tag, the 14-day rule), lead sources, the AM toolbox, the consultative first call, and growing accounts.',
      'New "How Via Is Organized" lesson in Who Is Via Trading: the sales growth path, parallel branches, and every department.',
      'Click any lesson image to zoom it full-screen; close with X, a click outside, or Escape.',
      'Images no longer crop: wide screenshots and portraits fit their frame instead of being clipped.',
      'Honest time tracking: time spent only counts while the tab is visible and active; idle sessions log out after 15 minutes.',
      'Module navigation no longer flashes the previous lesson\'s hero image.',
      'New YouTube video block in the CMS: paste a link, get an embedded player.',
      'Course card photo upgrades, including real Via Trading warehouse and trade show photos.',
      'Security and correctness fixes from the pre-release review, including a quiz bypass and a per-user program permission hole.',
    ],
  },
  {
    version: '0.16.0',
    date: '2026-06-11',
    title: 'BDR Operational Workflow + CMS Self-Service Editors',
    changes: [
      'Four new BDR operational modules: Working Your Leads (prospecting workspace + playbooks), Transfers & Meeting Booking (ask-first, BDR - Handoff Rotation, ERP assignment), Logging Tags & Follow-Up (qualified / Must Close - KC), and Your Numbers (KPIs, bonus, BDR Daily Report).',
      'CMS upgrades: rich text toolbar (no more hand-typed HTML), image upload to storage, icon and color pickers, working drag-and-drop block reordering, Monaco code editor.',
      'Course-level sequential gating with admin course ordering and per-user unlock overrides.',
      'Quiz integrity: shuffled answer options per attempt, answers survive reloads, failed quizzes no longer complete the module, proper Try Again flow.',
      'Engagement: completion toasts, learning streaks, numbered course path with Up Next highlight, printable certificates.',
      'Active Learners admin view: current course, time this week, quiz attempts including failures, streaks, and Stalled badges.',
      'Bundle code-split from 1.69MB to a 473KB main chunk; error boundary added.',
      'All 6 Who Is Via lessons converted to CMS drafts for the migration pilot (pending parity review).',
    ],
  },
  {
    version: '0.15.0',
    date: '2026-05-28',
    title: 'Post-Quiz Course Feedback',
    changes: [
      'Learners rate each course after passing its quiz: 5-star rating, relevance, difficulty, and an optional comment. Never blocks progress.',
      'New Feedback admin tab: stats bar, course filter, search, and expandable comment rows.',
    ],
  },
  {
    version: '0.14.0',
    date: '2026-05-26',
    title: 'Password Reset Without Email',
    changes: [
      'Admins generate single-use, 24-hour reset links from Manage Users (key icon) and share them directly.',
      'New public /reset-password page validates the token and lets the user set a new password.',
      'Login page hint: "Forgot your password? Contact your admin for a reset link."',
    ],
  },
  {
    version: '0.13.4',
    date: '2026-05-18',
    title: 'Profile Banner Fix + Content Hub Form Labels + CMS Access',
    changes: [
      'Profile hero redesigned: replaced two-tone navy/white banner with a gradient header — name and email now render as white text on a navy-to-indigo gradient, eliminating the invisible text overlap issue.',
      'Content Hub form labels: all create and edit forms for programs, courses, and modules now display clear field labels above every input and dropdown (Icon, Status, Content Type, Estimated Time, etc.).',
      'CMS "Edit Content" link made more prominent: larger text, orange accent color, renamed from "Content" to "Edit Content" for clarity.',
      'Added info banner at the top of the Courses & Modules tab explaining how the visual content editor works.',
    ],
  },
  {
    version: '0.13.3',
    date: '2026-05-18',
    title: 'Quiz Overhaul — Harder Questions, No Cross-Section Leakage',
    changes: [
      'Rewrote all 5 end-of-course quizzes (Industry, Via Trading, Product Knowledge, Consultative Sales, BDR Role) — 81 total quiz items.',
      'Eliminated 28 cross-section leakage instances where term match definitions, multiple choice text, or fill-in-blank items revealed answers to other questions within the same quiz.',
      'Concept isolation: each fact now appears in exactly ONE section (term match OR multiple choice OR fill-in-blank) — never across sections.',
      'Multiple choice questions rewritten as scenario-based application questions with more plausible distractors, replacing simple recall questions.',
      'Fill-in-blank items test unique numeric facts and specific terms not mentioned anywhere else in the quiz.',
      'Term match definitions written to test vocabulary without leaking answers to MC or FIB sections.',
    ],
  },
  {
    version: '0.13.2',
    date: '2026-05-18',
    title: 'Unified Content Hub + Profile Avatar Fix',
    changes: [
      'New Content Hub: merged "Content Editor" and "Manage Courses" admin tabs into a single unified "Content" tab.',
      'Content Hub overview bar: Programs, Courses, Total Modules, CMS Published, and CMS Drafts at a glance.',
      'Programs sub-tab: table view with create/edit/delete, expandable rows showing included courses, course checkbox assignment.',
      'Courses & Modules sub-tab: table with Course, Modules count, Status, "Used In" column (violet badges showing program membership), and action buttons.',
      'Expandable course rows reveal module sub-table with #, title, type, time, CMS status badges (Published/Draft/Quiz/Built-in), and per-module actions.',
      'Per-module "Content" link opens the CMS block editor at /admin/content/:courseId/:moduleId directly from the table.',
      'Create courses and modules inline with auto-generated slugs, icon picker, status selector, and all metadata fields.',
      'Profile avatar redesigned: replaced two-tone orange/white effect with clean navy circle, white initials, card border, and subtle shadow.',
    ],
  },
  {
    version: '0.13.1',
    date: '2026-05-18',
    title: 'DB-Backed Course Data + Consumer Migration',
    changes: [
      'Migration 007 executed: managed_courses, managed_modules, and managed_programs tables live in production with all seed data.',
      'All 15+ consumer components migrated from hardcoded courses.ts/programs.ts imports to use the CoursesContext (useCourses() hook).',
      'New courses, modules, and programs created via the admin dashboard now appear throughout the entire app: Home, CourseView, ModuleView, Certificates, UserProfile, ProgramCard, ContinueLearning, TopBar breadcrumbs, and all admin tabs.',
      'CoursesProvider moved above ProgressProvider in App.tsx — ProgressContext now reads course data from the DB-backed context instead of hardcoded imports.',
      'CourseStats and UserProgressTable: moved module-level constants (availableCourses, totalModules) inside component scope for dynamic DB data.',
      'TopBar breadcrumbs refactored: getCourseById passed as parameter to buildBreadcrumbs function for hook compatibility.',
      'Only CoursesContext itself retains hardcoded imports as fallback — all other files use the context exclusively.',
    ],
  },
  {
    version: '0.13.0',
    date: '2026-05-18',
    title: 'Admin Course Management, User Editing, CMS Content Override',
    changes: [
      'New "Manage Courses" admin tab: full CRUD for programs, courses, and modules from the admin dashboard.',
      'Create new courses with title, description, icon, status, estimated time, and image path.',
      'Add, edit, and delete modules within any course — set title, time, content type, and description.',
      'Create and manage training programs: select which courses to include and set program metadata.',
      'CoursesContext: app-wide React context loads course/program data from Supabase (managed_courses, managed_modules, managed_programs tables).',
      'DB migration 007: managed_courses, managed_modules, and managed_programs tables with RLS, triggers, and seed data matching existing courses.',
      'Admin can now edit user name and email inline (previously only role and team were editable in Manage Users).',
      'CMS content override: published CMS content now takes priority over built-in hardcoded module content.',
      'Content Editor shows "Create CMS Override" for modules with built-in content, explaining that CMS takes priority once published.',
      'Content Manager shows "Built-in" badge (blue) for hardcoded modules instead of "No CMS" — clearer distinction.',
      'Deleted unused AnnouncementManager.tsx and ComplianceTracker.tsx to fix Vercel build errors.',
      'Fixed TypeScript strict errors in ConstructionManager, CMS editors, ComplianceContext, and contentService that were blocking Vercel deployment.',
      'Synced deploy branch with main — all versions from v0.10.0 through v0.13.0 now live on production.',
    ],
  },
  {
    version: '0.12.0',
    date: '2026-05-18',
    title: 'Construction Status Manager + Acknowledgement Access',
    changes: [
      'New "Construction" tab in Admin dashboard: toggle any course, module, or program as "under construction" with optional custom messages.',
      'ConstructionContext: app-wide context (like ComplianceContext) provides isUnderConstruction() and getConstructionMessage() to all components.',
      'Course cards show "Under Construction" overlay with construction icon and optional message (replaces "Coming Soon" when active).',
      'CourseView blocks regular users from under-construction courses with dedicated message page. Admins/leadership see amber warning banner but can still access.',
      'Module list shows "Under Construction" badge on affected modules. Regular users see construction icon instead of lock; admins see badge alongside normal module link.',
      'ModuleView blocks regular users from under-construction modules with dedicated message. Admins/leadership see amber banner and can still view/edit content.',
      'ProgramCard shows construction banner when the program is marked under construction.',
      'Toggle switches with optimistic updates and rollback — same pattern as compliance system.',
      'Custom messages per entity: optional text shown to users explaining when content will be available.',
      '"Create Announcement" quick link in Construction Manager for easy access to acknowledgement creation.',
      'DB migration 006: construction_overrides table with RLS (all read, admins manage), updated_at trigger, partial index on active overrides.',
    ],
  },
  {
    version: '0.11.0',
    date: '2026-05-18',
    title: 'Admin CMS: Visual Block Editor + Code Editor',
    changes: [
      'Block-based CMS with 18 content block types: paragraph, heading, callout, bullet list, numbered list, content card, two-column list, stat grid, flow diagram, inline image, hero image, expandable card group, icon card grid, scenario exercise, fill-in-blank, term match, additional resources, divider.',
      'Visual block editor with drag-to-reorder, add/delete/duplicate blocks, collapse/expand, and categorized block palette with search.',
      'Code editor mode with live JSON validation — edit the raw PageContent document directly.',
      'Preview mode renders CMS content using existing shared components (SectionWrapper, ExpandableCard, FlowDiagram, etc.).',
      'Auto-save: drafts automatically save 5 seconds after the last edit.',
      'Publish workflow: save as draft, then publish to make content visible to learners. Version history with one-click rollback.',
      'Content resolution in ModuleView: hardcoded TSX modules take priority, then CMS published content, then "coming soon" placeholder.',
      'Admin "Edit in CMS" button appears on every module page for admins.',
      'New "Content Editor" tab in Admin dashboard: lists all courses and modules with CMS status (draft/published/no CMS).',
      'Dedicated content editor page at /admin/content/:courseId/:moduleId with version history panel.',
      'BlockRenderer: renders all 18 block types using existing components, with DOMPurify HTML sanitization.',
      'DB migration 005: module_content + module_content_versions tables with RLS (published readable by all, admins manage), updated_at trigger.',
      'Packages added: @monaco-editor/react, @dnd-kit/core, @dnd-kit/sortable, @dnd-kit/utilities, dompurify, @types/dompurify.',
    ],
  },
  {
    version: '0.10.0',
    date: '2026-05-18',
    title: 'Announcement Lifecycle, Search, Program Stats, Audit Log',
    changes: [
      'Announcement lifecycle: draft, scheduled, live, and archived statuses with tab navigation.',
      'Create announcements as drafts, schedule for later, or publish immediately.',
      'Edit existing announcements with modal editor (title, description, details, priority, due date, departments).',
      'Archive and republish announcements without deleting them.',
      'Department targeting: multi-checkbox selector replaces single dropdown (Sales, Operations, Warehouse, Marketing, Management).',
      'Schedule publish date with datetime picker for future announcements.',
      'Search functionality added to User Progress admin tab (filter by name or email).',
      'Search functionality added to Manage Users admin tab (filter by name or email).',
      'Course Stats now includes Program Overview section with enrolled, completed, and average progress.',
      'Audit log table tracks all admin actions on announcements (create, update, status change, delete).',
      'DB migration 004: added status, scheduled_at, departments[], updated_at, updated_by to compliance_items; created audit_log table with RLS.',
      'Regular users only see live announcements; admins see all statuses via RLS policy update.',
    ],
  },
  {
    version: '0.9.0',
    date: '2026-05-18',
    title: 'Module Gating, Admin UX Overhaul, Responsive Sidebar',
    changes: [
      'Module gating: regular users must complete modules in order (locked with Lock icon). Admins and leadership can skip freely.',
      'Quiz modules hide the Continue button for regular users, forcing quiz completion before progressing.',
      'Merged Announcements and Compliance Tracker into a single "Announcements" admin tab with table format.',
      'Announcements table includes search, sortable columns, clickable ack/pending counts with user list popups.',
      'Scalable for 40+ items: table layout replaces card grid, with search filter and item counts.',
      'Course Stats rewritten as table format with clickable Started/Completed/Avg Score values showing user popups.',
      'Admin dashboard tabs now wrap to multiple rows instead of requiring horizontal scroll.',
      'Responsive sidebar: auto-collapses to icon-only on medium screens (768-1024px), always pushes content.',
      'Mobile hamburger menu now activates below 768px instead of 1024px.',
      'Sidebar never overlays main content: margin always matches sidebar width.',
    ],
  },
  {
    version: '0.8.2',
    date: '2026-05-18',
    title: 'Compliance Migration to Supabase, Auth URL Configuration',
    changes: [
      'Migrated ComplianceContext from localStorage to Supabase: compliance_items + compliance_acknowledgements tables',
      'Created migration 003: compliance tables with RLS policies, seed data, and CASCADE deletes',
      'Acknowledgements now stored per-user in Supabase (no longer browser-specific)',
      'Admin-created announcements persist in Supabase with proper RLS (admins create/delete, users read)',
      'Seed items (system announcements) are protected from deletion via is_seed flag',
      'Optimistic updates with rollback on all compliance operations (acknowledge, create, delete)',
      'User Profile now shows acknowledgement data for all users (not just own profile)',
      'ComplianceTracker admin view matches on user IDs instead of emails',
      'Updated Supabase Auth: Site URL and Redirect URL set to Vercel production domain',
      'Deleted localStorage seed data file (data/compliance.ts), all data now in Supabase',
    ],
  },
  {
    version: '0.8.1',
    date: '2026-05-18',
    title: 'Remove Mock Data, Migrate Admin Tabs to Supabase, Vercel Deployment',
    changes: [
      'Deleted mockUsers.ts and MockUser type: all admin tabs now use real Supabase data',
      'Rewrote User Progress tab: fetches real profiles + module_progress, computes overall %, current course, last active, status',
      'Rewrote Course Stats tab: computes enrolled, completed, and avg quiz scores from real module_progress data',
      'Rewrote Assign Courses tab: lists real profiles, persists assignments to course_assignments table',
      'Updated Compliance Tracker: loads real profiles for acknowledged/pending user lists',
      'Updated Announcement Manager: fetches real user count from Supabase',
      'User Progress rows now link to user profile pages',
      'Migrated hosting from GitHub Pages to Vercel with SPA rewrites',
    ],
  },
  {
    version: '0.8.0',
    date: '2026-05-18',
    title: 'Supabase Auth, Invite System, Admin Management, User Profiles',
    changes: [
      'Fixed critical AuthContext deadlock: separated sync auth listener from async profile fetch to avoid Supabase v2 internal lock contention',
      'Migrated ProgressContext from localStorage to Supabase module_progress table with optimistic updates',
      'Built invite-only signup system: admin creates invitation, generates link with token, new user signs up at /signup?token=xxx',
      'Created Signup page with token validation, auto-provisioned profiles via handle_new_user() trigger',
      'Added validate_invitation_token SECURITY DEFINER function for anon-accessible token validation',
      'Built Invite Users admin tab: create invitations with role/team selection, view pending/accepted/expired invites, copy signup links',
      'Built Manage Teams admin tab: create, rename, and delete teams with member counts from Supabase',
      'Built Manage Users admin tab: sortable table of all users with inline role/team editing, click row to view profile',
      'Built User Profile page (/profile and /profile/:userId): hero section, stats cards, course progress bars, certifications, recent activity timeline',
      'Profile shows courses completed, modules completed, avg quiz score, acks signed',
      'Admin/leadership can view any user profile; acknowledgement data shown only on own profile (localStorage limitation)',
      'Added Profile nav item to sidebar with UserCircle icon',
      'Made sidebar avatar and name clickable to navigate to /profile',
      'Updated TopBar breadcrumbs for profile paths',
      'Disabled email confirmation in Supabase Auth for internal invite-only app',
    ],
  },
  {
    version: '0.7.0',
    date: '2026-05-14',
    title: 'Shipping Terms, Quiz Restructure, Final Exam, Additional Resources',
    changes: [
      'Renamed "Load Types" module to "Shipping Terms" with comprehensive rewrite',
      'Separated Ocean Containers into dedicated section with size comparison table',
      'Added pinwheel explanation and truckload capacity details (26 standard, 28 pinwheeled)',
      'Added Key Shipping Terms section (FOB, BOL, Lift-Gate, Loading Dock, Double-Stacked, Landed Cost, Direct Shipment)',
      'Reordered modules: Buyer Types now precedes Shipping Terms',
      'Fixed "A Market That Keeps Evolving" section (removed inaccurate historical claims)',
      'Added liquidation pricing context (below manufacturing/China costs)',
      'Restructured course quizzes: 4 term match + 8 MC + 4 fill-in-blank (16 items per exam)',
      'Built Program Final Exam: timed (25 min), no going back, 80% passing, certification',
      'Created Additional Resources component with hyperlinked articles at bottom of modules',
      'Created Sources & Citations component for content attribution',
      'Added resources to Secondary Market, Reverse Logistics, Buyer Types, Shipping Terms, and Why Via modules',
      'LTL corrected to "Less Than Load" across all content',
      'Updated truckload data in exercises and quizzes (26 pallets for 53-footer)',
    ],
  },
  {
    version: '0.6.0',
    date: '2026-05-14',
    title: 'Course 2 Overhaul, Corporate Structure, LN & WSR Modules',
    changes: [
      'Introduced "liquidation" as umbrella term in Course 1 opener',
      'Replaced all em-dashes with natural language across entire codebase',
      'Replaced "business buyers" with "business owners" everywhere',
      'Restructured Our Story module with Via Trading Corporation umbrella (Via Trading, LiquidateNow, WeSolveReturns)',
      'Added American dream / entrepreneur empowerment to mission statement',
      'Updated warehouse to 250,000 sq ft (550,000+ with rack space)',
      'Updated team: 300+ years experience, ESOP, Russian/Ukrainian languages',
      'Reordered retailer partners (Target first)',
      'Built corporate tree visualization in Our Platforms module',
      'Created dedicated LiquidateNow module (consignment-based liquidation)',
      'Created dedicated WeSolveReturns module (return center solution)',
      'Rewrote Why Via: Tampa expansion, business development, removed sales language',
      'Removed duplicate content between Course 2 modules',
      'Rewrote Course 2 quiz (12 questions covering all 7 modules)',
      'Updated all exercises and inline exercises for new content',
    ],
  },
  {
    version: '0.5.0',
    date: '2026-05-14',
    title: 'Major Content Rewrite, Industry Accuracy Pass',
    changes: [
      'Rewrote Secondary Market module: inline term definitions, multiple flow charts, warehouse economics, removed exercise',
      'Added WhatsApp, yard sales, Burlington, 99¢ stores, value retailers to sales channels',
      'Precise wholesaler vs broker distinction in channel descriptions',
      'Rewrote Product Conditions: reordered (Customer Returns first), added pros/cons, removed percentages, "brown box" for master case',
      'Rewrote Load Types: corrected truckload data (48\'=22 pallets, 53\'=26 pallets), LTL = 1-6 pallets, removed Sales Insight',
      'Renamed Buyer Types to "Who Buys Liquidation Goods?", added Non-Profits and Large Retailers',
      'Expanded glossary: rewrote Liquidation definition, added LTL, BOL, Lift-Gate, Landed Cost',
      'Removed all sales-centric language across all Industry modules',
      'Removed Key Sales Insight boxes from all modules',
      'All content verified against Via Trading website data',
    ],
  },
  {
    version: '0.4.0',
    date: '2026-05-13',
    title: 'Content Enrichment & Acknowledgements',
    changes: [
      'Added dedicated Acknowledgements page with review flow',
      'Enriched all modules with more reading content and context',
      'Added growth timeline to Our Story module',
      'Bold glossary terms on first appearance throughout modules',
      'Removed redundant inline exercises from several modules',
      'Fixed quiz Q8 and Q11, replaced sales questions with industry knowledge',
      'Fixed Secondary Market term match (removed uncovered Bin Store term)',
      'Added Certificates page and sidebar nav link',
      'Added version number to sidebar',
      'Added Dev Log page (admin only)',
    ],
  },
  {
    version: '0.3.0',
    date: '2026-05-12',
    title: 'UI Overhaul & Interactive Exercises',
    changes: [
      'Removed "Mark as Complete"; modules auto-complete on Continue',
      'Fixed image cropping (object-cover → object-contain)',
      'Added inline exercises sprinkled throughout modules',
      'Restructured end-of-course quizzes (10-15 unique questions, no reveal until submit)',
      'Added confetti animation on quiz pass (85% threshold)',
      'Added "Continue to next course" button on quiz pass',
      'Added "Start Course" button on course landing page',
      'Login form now submits on Enter key',
      'Notification bell shows dropdown instead of redirecting',
      'Glossary definitions visible without clicking',
      'Added "And More..." card to Our Platforms section',
      'Added Macy\'s, JCPenney, Harbor Freight to retailer partners',
      'Added pallet subtypes (Gaylords, Palletized Cases, Watermelon Bins)',
      'Added Whatnot and Facebook Marketplace to online sellers',
      'Added department selector to admin announcements',
      'Added "New Hire: BDR Program" to course assignment',
    ],
  },
  {
    version: '0.2.0',
    date: '2026-05-11',
    title: 'Platform Launch',
    changes: [
      'Built VIAcademy platform with React + TypeScript + Tailwind',
      'Google SSO stub login (accepts @viatrading.com emails)',
      'Home dashboard with compliance banner, program progress, course grid',
      'Course 1: Intro to the Liquidation Industry (7 modules, fully built)',
      'Course 2: Who Is Via Trading (5 modules, fully built)',
      'Courses 3-7 stubbed with "Coming Soon" status',
      'Admin dashboard with 4 tabs (Users, Compliance, Stats, Assign)',
      'Mid-grey Coursera-inspired theme with Via navy + orange accents',
      'Responsive layout with collapsible sidebar',
      'Progress tracking with localStorage persistence',
      'Deployed to GitHub Pages',
    ],
  },
  {
    version: '0.1.0',
    date: '2026-05-10',
    title: 'Initial Prototype',
    changes: [
      'Single-page training module POC',
      'Dark theme with section navigation',
      'Industry content: secondary market, reverse logistics, conditions, load types, buyer types, glossary',
      'Via Trading content: company overview, competitive advantages',
      'Interactive quiz with multiple choice questions',
    ],
  },
]

export function DevLog() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-via-navy flex items-center gap-3">
          <ScrollText className="w-7 h-7 text-via-orange" />
          Dev Log
        </h1>
        <p className="mt-1 text-sm text-via-text-light">
          Development changelog and release notes. Admin only.
        </p>
        <div className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 bg-via-navy/10 rounded-lg">
          <Tag className="w-3.5 h-3.5 text-via-navy" />
          <span className="text-xs font-semibold text-via-navy">
            Current Version: {APP_VERSION}
          </span>
        </div>
      </div>

      {/* Changelog */}
      <div className="space-y-6">
        {changelog.map((entry, i) => (
          <div
            key={entry.version}
            className="bg-via-card rounded-xl border border-via-border overflow-hidden"
          >
            {/* Version header */}
            <div className={`px-6 py-4 border-b border-via-border ${i === 0 ? 'bg-via-orange/5' : ''}`}>
              <div className="flex items-center gap-3">
                <GitCommit className={`w-5 h-5 shrink-0 ${i === 0 ? 'text-via-orange' : 'text-via-text-light'}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-sm font-bold ${i === 0 ? 'text-via-orange' : 'text-via-navy'}`}>
                      v{entry.version}
                    </span>
                    <span className="text-xs text-via-text-light">&middot;</span>
                    <span className="text-xs text-via-text-light">{entry.date}</span>
                    {i === 0 && (
                      <span className="px-2 py-0.5 bg-via-orange/15 text-via-orange text-[10px] font-bold rounded-full uppercase">
                        Latest
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-medium text-via-navy mt-0.5">
                    {entry.title}
                  </p>
                </div>
              </div>
            </div>

            {/* Changes list */}
            <div className="px-6 py-4">
              <ul className="space-y-2">
                {entry.changes.map((change) => (
                  <li key={change} className="flex items-start gap-2 text-sm text-via-text">
                    <span className="w-1.5 h-1.5 rounded-full bg-via-orange mt-1.5 shrink-0" />
                    {change}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
