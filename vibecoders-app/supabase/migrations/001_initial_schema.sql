-- VibeCoders Database Schema
-- Run this in Supabase SQL Editor

-- ============================================
-- 1. CREATE TABLES
-- ============================================

-- Users table (extends auth.users)
CREATE TABLE IF NOT EXISTS users (
  id            UUID          PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username      TEXT          UNIQUE NOT NULL,
  display_name  TEXT,
  bio           TEXT          CHECK (char_length(bio) <= 300),
  avatar_url    TEXT,
  created_at    TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- Username format constraint
ALTER TABLE users ADD CONSTRAINT username_format 
  CHECK (username ~ '^[a-zA-Z0-9_-]{3,30}$');

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id            UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID          NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title         TEXT          NOT NULL CHECK (char_length(title) BETWEEN 5 AND 100),
  url           TEXT          NOT NULL CHECK (url ~ '^https?://'),
  description   TEXT          NOT NULL CHECK (char_length(description) BETWEEN 20 AND 500),
  created_at    TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- Reactions table
CREATE TYPE reaction_type_enum AS ENUM ('like', 'dislike');

CREATE TABLE IF NOT EXISTS reactions (
  id              UUID                PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id      UUID                NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  user_id         UUID                NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  reaction_type   reaction_type_enum  NOT NULL,
  created_at      TIMESTAMPTZ         NOT NULL DEFAULT NOW(),
  UNIQUE (project_id, user_id)
);

-- Comments table
CREATE TABLE IF NOT EXISTS comments (
  id          UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id  UUID          NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  user_id     UUID          NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content     TEXT          NOT NULL CHECK (char_length(content) BETWEEN 1 AND 500),
  created_at  TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- ============================================
-- 2. CREATE INDEXES
-- ============================================

CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects(user_id);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reactions_project_id ON reactions(project_id);
CREATE INDEX IF NOT EXISTS idx_reactions_user_id ON reactions(user_id);
CREATE INDEX IF NOT EXISTS idx_comments_project_id ON comments(project_id);
CREATE INDEX IF NOT EXISTS idx_comments_user_id ON comments(user_id);
CREATE INDEX IF NOT EXISTS idx_comments_created_at ON comments(created_at ASC);

-- Unique URL per user
ALTER TABLE projects ADD CONSTRAINT unique_url_per_user 
  UNIQUE (user_id, url);

-- ============================================
-- 3. CREATE FUNCTIONS
-- ============================================

-- Updated_at auto-update function
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Auto-create users row when auth.users created
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, username, display_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', 'user_' || substr(NEW.id::text, 1, 8)),
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Prevent self-reaction
CREATE OR REPLACE FUNCTION prevent_self_reaction()
RETURNS TRIGGER AS $$
BEGIN
  IF (SELECT user_id FROM projects WHERE id = NEW.project_id) = NEW.user_id THEN
    RAISE EXCEPTION 'Cannot react to your own project';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Leaderboard function
CREATE OR REPLACE FUNCTION get_leaderboard()
RETURNS TABLE (
  user_id UUID,
  username TEXT,
  total_score BIGINT,
  project_count BIGINT
) AS $$
  SELECT 
    u.id AS user_id,
    u.username,
    COALESCE(SUM(
      CASE WHEN r.reaction_type = 'like' THEN 1
           WHEN r.reaction_type = 'dislike' THEN -1
           ELSE 0 END
    ), 0) AS total_score,
    COUNT(DISTINCT p.id) AS project_count
  FROM users u
  LEFT JOIN projects p ON p.user_id = u.id
  LEFT JOIN reactions r ON r.project_id = p.id
  GROUP BY u.id, u.username
  HAVING COUNT(DISTINCT p.id) > 0
  ORDER BY total_score DESC, COUNT(DISTINCT p.id) DESC, MIN(u.created_at) ASC
  LIMIT 50;
$$ LANGUAGE sql STABLE;

-- ============================================
-- 4. CREATE TRIGGERS
-- ============================================

-- Updated_at triggers
CREATE TRIGGER users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER comments_updated_at
  BEFORE UPDATE ON comments
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

-- Auto-create user on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Self-reaction check
CREATE TRIGGER check_self_reaction
  BEFORE INSERT ON reactions
  FOR EACH ROW EXECUTE FUNCTION prevent_self_reaction();

-- ============================================
-- 5. ENABLE ROW LEVEL SECURITY
-- ============================================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 6. CREATE RLS POLICIES
-- ============================================

-- USERS policies
CREATE POLICY "Users are publicly readable" ON users
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- PROJECTS policies
CREATE POLICY "Projects are publicly readable" ON projects
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert projects" ON projects
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own projects" ON projects
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own projects" ON projects
  FOR DELETE USING (auth.uid() = user_id);

-- REACTIONS policies
CREATE POLICY "Reactions are publicly readable" ON reactions
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can react (not own projects)" ON reactions
  FOR INSERT WITH CHECK (
    auth.uid() = user_id AND
    auth.uid() != (SELECT user_id FROM projects WHERE id = project_id)
  );

CREATE POLICY "Users can update their own reactions" ON reactions
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reactions" ON reactions
  FOR DELETE USING (auth.uid() = user_id);

-- COMMENTS policies
CREATE POLICY "Comments are publicly readable" ON comments
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can comment" ON comments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own comments" ON comments
  FOR DELETE USING (auth.uid() = user_id);
