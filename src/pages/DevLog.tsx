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
