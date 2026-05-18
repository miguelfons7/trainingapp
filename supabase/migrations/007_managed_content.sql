-- Migration 007: Managed courses, modules, and programs
-- Enables admin CRUD for course structure from the admin dashboard
-- Seed data mirrors current hardcoded courses.ts and programs.ts

-- ============================================================
-- Courses table
-- ============================================================
CREATE TABLE IF NOT EXISTS managed_courses (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  icon TEXT NOT NULL DEFAULT 'BookOpen',
  estimated_time TEXT NOT NULL DEFAULT '~30 min',
  status TEXT NOT NULL DEFAULT 'coming-soon' CHECK (status IN ('available', 'coming-soon')),
  image_path TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  created_by UUID REFERENCES profiles(id),
  updated_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- Modules table
-- ============================================================
CREATE TABLE IF NOT EXISTS managed_modules (
  id TEXT NOT NULL,
  course_id TEXT NOT NULL REFERENCES managed_courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  estimated_time TEXT NOT NULL DEFAULT '10 min',
  content_type TEXT NOT NULL DEFAULT 'lesson' CHECK (content_type IN ('lesson', 'quiz', 'interactive')),
  description TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (course_id, id)
);

-- ============================================================
-- Programs table
-- ============================================================
CREATE TABLE IF NOT EXISTS managed_programs (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  course_ids TEXT[] NOT NULL DEFAULT '{}',
  estimated_time TEXT NOT NULL DEFAULT '~6 hours',
  icon TEXT NOT NULL DEFAULT 'GraduationCap',
  sort_order INT NOT NULL DEFAULT 0,
  created_by UUID REFERENCES profiles(id),
  updated_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- Row Level Security
-- ============================================================
ALTER TABLE managed_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE managed_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE managed_programs ENABLE ROW LEVEL SECURITY;

-- All authenticated users can read
CREATE POLICY "read_managed_courses" ON managed_courses FOR SELECT TO authenticated USING (true);
CREATE POLICY "read_managed_modules" ON managed_modules FOR SELECT TO authenticated USING (true);
CREATE POLICY "read_managed_programs" ON managed_programs FOR SELECT TO authenticated USING (true);

-- Admins can manage all
CREATE POLICY "admin_manage_courses" ON managed_courses FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "admin_manage_modules" ON managed_modules FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "admin_manage_programs" ON managed_programs FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());

-- ============================================================
-- Updated_at triggers (reuses existing function)
-- ============================================================
CREATE TRIGGER set_updated_at_managed_courses
  BEFORE UPDATE ON managed_courses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_updated_at_managed_modules
  BEFORE UPDATE ON managed_modules
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_updated_at_managed_programs
  BEFORE UPDATE ON managed_programs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- Seed: Courses
-- ============================================================
INSERT INTO managed_courses (id, title, description, icon, estimated_time, status, image_path, sort_order) VALUES
  ('intro-to-industry', 'Intro to the Liquidation Industry',
   'Learn the fundamentals of the liquidation industry: how it works, who the key players are, and why this sector continues to grow.',
   'Warehouse', '~45 min', 'available', 'course-1-industry.png', 1),
  ('who-is-via', 'Who Is Via Trading',
   'Discover Via Trading''s story, mission, values, and what makes us the industry leader. Understand our platforms and competitive advantages.',
   'Building2', '~40 min', 'available', 'course-2-via-trading.png', 2),
  ('product-knowledge', 'Product Knowledge',
   'Explore Via Trading''s retail partner programs, product categories, and merchandise offerings. Each module covers a single retail partner in depth.',
   'Package', '~90 min', 'available', 'course-3-product.png', 3),
  ('sales-philosophy', 'Consultative Sales',
   'Master Via Trading''s consultative approach to sales. Learn to diagnose buyer needs before prescribing solutions, handle objections with confidence, and build lasting partnerships.',
   'Target', '~90 min', 'available', 'course-4-sales.png', 4),
  ('bdr-role', 'BDR Role Training',
   'Everything you need to know about the Business Development Representative role: your daily workflow, opening calls, the discovery framework, objection handling, HubSpot tools, and the follow-up accountability loop.',
   'Headphones', '~60 min', 'available', 'course-5-bdr.png', 5),
  ('tools-systems', 'Tools & Systems',
   'Get hands-on with the CRM, phone systems, email tools, and internal platforms you will use every day as an Account Manager at Via Trading.',
   'Settings', '~45 min', 'coming-soon', 'course-6-tools.png', 6),
  ('ongoing-development', 'Ongoing Development',
   'Continue growing your skills with advanced topics, industry updates, and professional development resources. This course evolves as you grow.',
   'TrendingUp', '~ongoing', 'coming-soon', 'course-7-development.png', 7)
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- Seed: Modules — Course 1 (Intro to Industry)
-- ============================================================
INSERT INTO managed_modules (id, course_id, title, estimated_time, content_type, description, sort_order) VALUES
  ('secondary-market', 'intro-to-industry', 'The Secondary Market', '8 min', 'lesson',
   'Understand what the secondary market is and how liquidation fits into the broader retail ecosystem.', 1),
  ('reverse-logistics', 'intro-to-industry', 'Reverse Logistics', '10 min', 'lesson',
   'Learn how products flow from consumers back through the supply chain and into the liquidation pipeline.', 2),
  ('product-conditions', 'intro-to-industry', 'Product Conditions', '10 min', 'lesson',
   'Learn Via Trading''s condition categories, from new overstock to salvage, and understand what each means.', 3),
  ('buyer-types', 'intro-to-industry', 'Who Buys Liquidation Goods?', '8 min', 'lesson',
   'Discover the wide range of business owners and organizations that participate in the secondary market.', 4),
  ('shipping-terms', 'intro-to-industry', 'Shipping Terms', '8 min', 'lesson',
   'Learn the standard lot sizes, shipping formats, and logistics terminology used in the liquidation industry.', 5),
  ('key-terminology', 'intro-to-industry', 'Key Terminology', '5 min', 'lesson',
   'Review essential industry terms and jargon you will encounter daily.', 6),
  ('industry-knowledge-check', 'intro-to-industry', 'Industry Knowledge Check', '10 min', 'quiz',
   'Test your understanding of the liquidation industry fundamentals.', 7)
ON CONFLICT (course_id, id) DO NOTHING;

-- ============================================================
-- Seed: Modules — Course 2 (Who Is Via Trading)
-- ============================================================
INSERT INTO managed_modules (id, course_id, title, estimated_time, content_type, description, sort_order) VALUES
  ('our-story', 'who-is-via', 'Our Story', '8 min', 'lesson',
   'Learn how Via Trading Corporation grew from a 6,000 sq ft warehouse to a 550,000+ sq ft industry leader.', 1),
  ('mission-values', 'who-is-via', 'Mission & Values', '5 min', 'lesson',
   'Understand Via Trading''s mission, core values, and commitment to helping business owners build their enterprises.', 2),
  ('our-platforms', 'who-is-via', 'Our Platforms', '5 min', 'lesson',
   'See how Via Trading Corporation''s three platforms connect: ViaTrading.com, LiquidateNow.com, and WeSolveReturns.com.', 3),
  ('liquidatenow', 'who-is-via', 'LiquidateNow', '5 min', 'lesson',
   'Learn how LiquidateNow leverages Via Trading''s buyer network for consignment-based liquidation.', 4),
  ('wesolvereturns', 'who-is-via', 'WeSolveReturns', '5 min', 'lesson',
   'Understand how WeSolveReturns acts as a return center solution and feeds inventory back into Via Trading.', 5),
  ('why-via', 'who-is-via', 'Why Via', '8 min', 'lesson',
   'Discover the competitive advantages that make Via Trading a leader and why 90%+ of customers are repeat business owners.', 6),
  ('via-knowledge-check', 'who-is-via', 'Via Knowledge Check', '8 min', 'quiz',
   'Test your knowledge of Via Trading''s history, values, platforms, and advantages.', 7)
ON CONFLICT (course_id, id) DO NOTHING;

-- ============================================================
-- Seed: Modules — Course 3 (Product Knowledge)
-- ============================================================
INSERT INTO managed_modules (id, course_id, title, estimated_time, content_type, description, sort_order) VALUES
  ('product-overview', 'product-knowledge', 'What We Sell', '8 min', 'lesson',
   'An overview of Via Trading''s product categories, how retail partner programs work, and the difference between manifested and unmanifested loads.', 1),
  ('target-programs', 'product-knowledge', 'Target Programs', '10 min', 'lesson',
   'Explore Via Trading''s Target sub-programs, including Salvage, DC, Premium, Apparel, RAW, and more.', 2),
  ('walmart-programs', 'product-knowledge', 'Walmart Programs', '8 min', 'lesson',
   'Explore Via Trading''s Walmart programs, including WMAPP (Apparel) and WMCOM (Walmart.com Exits).', 3),
  ('home-depot-programs', 'product-knowledge', 'Home Depot Programs', '8 min', 'lesson',
   'Explore Via Trading''s Home Depot programs and understand the manifested vs. unmanifested tradeoff.', 4),
  ('amazon-programs', 'product-knowledge', 'Amazon Programs', '6 min', 'lesson',
   'Discover Via Trading''s Amazon liquidation program, offering flexible load sizes from single pallets to full truckloads.', 5),
  ('wayfair-programs', 'product-knowledge', 'Wayfair Programs', '6 min', 'lesson',
   'Explore Via Trading''s Wayfair program: manifested furniture and home goods loads priced as a percentage of retail.', 6),
  ('zappos-programs', 'product-knowledge', 'Zappos Programs', '6 min', 'lesson',
   'Learn about the Zappos footwear program and how it operates through Via Trading''s WeSolveReturns (WSR) platform.', 7),
  ('sams-club-programs', 'product-knowledge', 'Sam''s Club Programs', '6 min', 'lesson',
   'Explore Via Trading''s Sam''s Club program: manifested general merchandise loads priced at 20-35% of retail value.', 8),
  ('other-programs', 'product-knowledge', 'Additional Retail Partners', '6 min', 'lesson',
   'Discover smaller and specialty retail partners including Costway, JCPenney, Boscov''s, Albertsons, and more.', 9),
  ('ln-offerings', 'product-knowledge', 'LiquidateNow Offerings', '6 min', 'lesson',
   'Understand what merchandise is available through LiquidateNow and how it complements Via Trading''s direct programs.', 10),
  ('product-knowledge-check', 'product-knowledge', 'Product Knowledge Check', '10 min', 'quiz',
   'Test your understanding of Via Trading''s programs, categories, and product offerings.', 11)
ON CONFLICT (course_id, id) DO NOTHING;

-- ============================================================
-- Seed: Modules — Course 4 (Consultative Sales)
-- ============================================================
INSERT INTO managed_modules (id, course_id, title, estimated_time, content_type, description, sort_order) VALUES
  ('consultative-mindset', 'sales-philosophy', 'The Consultative Mindset', '10 min', 'lesson',
   'Why Via doesn''t sell — they consult. The philosophy that drives everything.', 1),
  ('asking-right-questions', 'sales-philosophy', 'Asking the Right Questions', '10 min', 'lesson',
   'The art and science of questioning: open-ended, funnelling, and genuine curiosity.', 2),
  ('listening-beyond-words', 'sales-philosophy', 'Listening Beyond Words', '8 min', 'lesson',
   'Active listening, reading gaps, matching energy, and understanding perspective.', 3),
  ('know-your-patients', 'sales-philosophy', 'Know Your Patients', '10 min', 'lesson',
   'Buyer archetypes, the customer needs hierarchy, and what drives each type.', 4),
  ('five-step-method', 'sales-philosophy', 'The 5-Step Method', '12 min', 'lesson',
   'The consultative selling framework: from diagnosis to prescription.', 5),
  ('when-patients-push-back', 'sales-philosophy', 'When Patients Push Back', '10 min', 'lesson',
   'Objection handling with K.L.A.P.D.O.C. — structured, empathetic, effective.', 6),
  ('art-of-the-close', 'sales-philosophy', 'The Art of the Close', '10 min', 'lesson',
   'Six closing techniques and why the best close follows naturally from a great conversation.', 7),
  ('transaction-to-partnership', 'sales-philosophy', 'From Transaction to Partnership', '10 min', 'lesson',
   'Growing accounts, re-engaging dormant buyers, and building lasting relationships.', 8),
  ('triage-and-diagnosis', 'sales-philosophy', 'Triage & Diagnosis: BDR + AM', '10 min', 'lesson',
   'How the BDR (triage nurse) and AM (doctor) complement each other.', 9),
  ('sales-philosophy-quiz', 'sales-philosophy', 'Consultative Sales Quiz', '15 min', 'quiz',
   'Test your understanding of consultative selling, objection handling, and the Via Trading sales approach.', 10)
ON CONFLICT (course_id, id) DO NOTHING;

-- ============================================================
-- Seed: Modules — Course 5 (BDR Role Training)
-- ============================================================
INSERT INTO managed_modules (id, course_id, title, estimated_time, content_type, description, sort_order) VALUES
  ('bdr-role-overview', 'bdr-role', 'Your Role as a BDR', '8 min', 'lesson',
   'What a BDR does, what they don''t do, and how the role fits into Via Trading''s sales organization.', 1),
  ('bdr-daily-workflow', 'bdr-role', 'Your Daily Workflow', '8 min', 'lesson',
   'Structure your day for maximum impact: prep, call blocks, documentation, and follow-up rhythm.', 2),
  ('bdr-opening-calls', 'bdr-role', 'Opening the Call', '8 min', 'lesson',
   'The first 30 seconds set the tone: permission-based openers, scripts, and the right energy.', 3),
  ('bdr-discovery-framework', 'bdr-role', 'The Discovery Framework', '10 min', 'lesson',
   'Seven key questions, asked one at a time. The heart of every BDR call.', 4),
  ('bdr-objections-routing', 'bdr-role', 'Handling Objections & Routing', '10 min', 'lesson',
   'Common objections, when to redirect to the AM, and reading buyer intent signals.', 5),
  ('bdr-tools-hubspot', 'bdr-role', 'Your Toolbox: HubSpot & Beyond', '10 min', 'lesson',
   'CRM logging, playbooks, sequences, WhatsApp snippets, and the tools you''ll use every day.', 6),
  ('bdr-follow-ups', 'bdr-role', 'Follow-Ups & Accountability', '10 min', 'lesson',
   'Post-call documentation, AM handoff quality, follow-up cadence, and the accountability loop.', 7),
  ('bdr-role-quiz', 'bdr-role', 'BDR Role Quiz', '10 min', 'quiz',
   'Test your understanding of the BDR role, discovery framework, objection handling, and daily workflow.', 8)
ON CONFLICT (course_id, id) DO NOTHING;

-- ============================================================
-- Seed: Programs
-- ============================================================
INSERT INTO managed_programs (id, title, description, course_ids, estimated_time, icon, sort_order) VALUES
  ('new-am-training', 'New AM Training Program',
   'Comprehensive onboarding program for new Account Managers at Via Trading. Covers industry fundamentals, company knowledge, product expertise, sales techniques, and the tools you need to succeed.',
   ARRAY['intro-to-industry', 'who-is-via', 'product-knowledge', 'sales-philosophy', 'bdr-role', 'tools-systems', 'ongoing-development'],
   '~6 hours', 'GraduationCap', 1)
ON CONFLICT (id) DO NOTHING;
