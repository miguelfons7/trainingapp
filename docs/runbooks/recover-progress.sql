-- One-time recovery for module completions that the idle-logout bug downgraded
-- to 'in-progress'. Safe and idempotent: it only restores rows that have a
-- recorded 'module_completed' event in learning_activity but are no longer
-- marked completed. Run the two steps in order in the Supabase SQL editor.

-- ─── STEP 1: MEASURE (run this first, note the number) ───────────────────────
-- How many completed modules were reset by the bug. >0 confirms the diagnosis.
SELECT count(*) AS downgraded
FROM module_progress mp
WHERE mp.status <> 'completed'
  AND EXISTS (
    SELECT 1 FROM learning_activity la
    WHERE la.user_id = mp.user_id AND la.course_id = mp.course_id
      AND la.module_id = mp.module_id AND la.event = 'module_completed');


-- ─── STEP 2: REPAIR + VERIFY (run after step 1) ──────────────────────────────
-- Restores completion from the activity log (original completion time + quiz
-- score preserved). The final SELECT should return 0.
WITH completed AS (
  SELECT user_id, course_id, module_id,
         MIN(created_at) AS completed_at,
         MAX(score)      AS score
  FROM learning_activity
  WHERE event = 'module_completed'
  GROUP BY user_id, course_id, module_id
)
UPDATE module_progress mp
SET status = 'completed',
    completed_at = COALESCE(mp.completed_at, c.completed_at),
    score = COALESCE(mp.score, c.score)
FROM completed c
WHERE mp.user_id = c.user_id AND mp.course_id = c.course_id
  AND mp.module_id = c.module_id AND mp.status <> 'completed';

-- verify: expect 0
SELECT count(*) AS still_downgraded
FROM module_progress mp
WHERE mp.status <> 'completed'
  AND EXISTS (
    SELECT 1 FROM learning_activity la
    WHERE la.user_id = mp.user_id AND la.course_id = mp.course_id
      AND la.module_id = mp.module_id AND la.event = 'module_completed');
