-- Cleanup for CMS quizzes whose passThreshold was saved as a whole-number
-- percentage (e.g. 85) instead of a fraction (0.85). The app's pass calc
-- multiplies by this, so 85 made the bar unreachable — even a perfect score
-- showed "failed" (hit the Tools & Systems quiz).
--
-- NOTE: the deployed code fix (v1.1.2) already makes quizzes pass correctly
-- regardless of this value. This cleanup is hygiene: it fixes what the CMS quiz
-- editor displays (otherwise it shows e.g. 8500%) and keeps the data correct.
-- Safe and idempotent. Run the steps in order in the Supabase SQL editor.

-- ─── STEP 1: AUDIT (see every CMS quiz and its stored threshold) ──────────────
-- Anything with a threshold > 1 is wrong (should be 0–1).
SELECT course_id, module_id,
       content->'quizData'->>'passThreshold' AS threshold,
       jsonb_array_length(content->'quizData'->'termMatch')      AS term_match,
       jsonb_array_length(content->'quizData'->'multipleChoice') AS multiple_choice,
       jsonb_array_length(content->'quizData'->'fillInBlank')    AS fill_in_blank
FROM module_content
WHERE content ? 'quizData'
ORDER BY course_id, module_id;

-- ─── STEP 2: FIX (divide any percentage-style threshold by 100) ───────────────
-- 85 -> 0.85, 90 -> 0.90 (intent preserved). Only touches rows where it's > 1.
UPDATE module_content
SET content = jsonb_set(content, '{quizData,passThreshold}',
      to_jsonb(round((content->'quizData'->>'passThreshold')::numeric / 100, 2)))
WHERE content ? 'quizData'
  AND (content->'quizData'->>'passThreshold')::numeric > 1;

-- ─── STEP 3: VERIFY (expect 0) ────────────────────────────────────────────────
SELECT count(*) AS still_over_1
FROM module_content
WHERE content ? 'quizData'
  AND (content->'quizData'->>'passThreshold')::numeric > 1;
