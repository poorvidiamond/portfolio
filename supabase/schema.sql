-- Run this SQL in your Supabase project's SQL Editor (Dashboard > SQL Editor > New Query)

-- Contact form submissions
CREATE TABLE contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Page view analytics
CREATE TABLE page_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  path TEXT NOT NULL,
  referrer TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Visitor tracking
CREATE TABLE visitors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  ip_address TEXT,
  country TEXT,
  city TEXT,
  first_visit TIMESTAMPTZ DEFAULT now(),
  last_visit TIMESTAMPTZ DEFAULT now(),
  visit_count INTEGER DEFAULT 1
);

-- Enable Row Level Security (RLS) with permissive insert policies
-- so the anon key can insert but not read/update/delete

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow anonymous inserts" ON contact_submissions FOR INSERT WITH CHECK (true);

ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow anonymous inserts" ON page_views FOR INSERT WITH CHECK (true);

ALTER TABLE visitors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow anonymous inserts" ON visitors FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anonymous updates" ON visitors FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Allow anonymous select for upsert" ON visitors FOR SELECT USING (true);
