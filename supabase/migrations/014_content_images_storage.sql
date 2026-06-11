-- Migration 014: Content Images Storage
-- Public bucket for CMS image uploads. Anyone can view (images render for
-- all learners); only leadership/admins can upload, update, or delete.

INSERT INTO storage.buckets (id, name, public)
VALUES ('content-images', 'content-images', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read for content images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'content-images');

CREATE POLICY "Leadership can upload content images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'content-images' AND is_leadership_or_admin());

CREATE POLICY "Leadership can update content images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'content-images' AND is_leadership_or_admin());

CREATE POLICY "Leadership can delete content images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'content-images' AND is_leadership_or_admin());
