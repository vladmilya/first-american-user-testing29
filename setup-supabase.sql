-- Supabase Database Setup for Note Taker Collaboration
-- Run this SQL in your Supabase SQL Editor: https://app.supabase.com/project/_/sql

-- ================================================================
-- STEP 1: Create note_boards table
-- ================================================================
CREATE TABLE IF NOT EXISTS note_boards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id TEXT NOT NULL,
  board_id TEXT NOT NULL,
  board_name TEXT NOT NULL,
  notes JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_by_id TEXT,
  updated_by_name TEXT,
  UNIQUE(campaign_id, board_id)
);

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS idx_note_boards_campaign 
  ON note_boards(campaign_id);

CREATE INDEX IF NOT EXISTS idx_note_boards_updated 
  ON note_boards(updated_at DESC);

-- ================================================================
-- STEP 2: Create online_users table (for presence tracking)
-- ================================================================
CREATE TABLE IF NOT EXISTS online_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  user_name TEXT NOT NULL,
  last_seen TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  cursor_position JSONB,
  UNIQUE(campaign_id, user_id)
);

-- Add index
CREATE INDEX IF NOT EXISTS idx_online_users_campaign 
  ON online_users(campaign_id);

-- Auto-delete stale users (older than 2 minutes)
CREATE OR REPLACE FUNCTION delete_stale_users() 
RETURNS void AS $$
BEGIN
  DELETE FROM online_users 
  WHERE last_seen < NOW() - INTERVAL '2 minutes';
END;
$$ LANGUAGE plpgsql;

-- ================================================================
-- STEP 3: Create topics table (synced custom topics)
-- ================================================================
CREATE TABLE IF NOT EXISTS custom_topics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id TEXT NOT NULL,
  topic_id TEXT NOT NULL,
  topic_name TEXT NOT NULL,
  category TEXT DEFAULT 'behavioral',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(campaign_id, topic_id)
);

-- Add index
CREATE INDEX IF NOT EXISTS idx_custom_topics_campaign 
  ON custom_topics(campaign_id);

-- ================================================================
-- STEP 4: Enable Row Level Security (RLS)
-- ================================================================
-- Note: For 3-person collaboration with shared links, we keep it simple
-- Anyone can read/write if they have the campaign_id

ALTER TABLE note_boards ENABLE ROW LEVEL SECURITY;
ALTER TABLE online_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_topics ENABLE ROW LEVEL SECURITY;

-- Allow all operations for now (simple shared link approach)
-- You can restrict this later if needed
CREATE POLICY "Allow all for note_boards" 
  ON note_boards FOR ALL 
  USING (true) 
  WITH CHECK (true);

CREATE POLICY "Allow all for online_users" 
  ON online_users FOR ALL 
  USING (true) 
  WITH CHECK (true);

CREATE POLICY "Allow all for custom_topics" 
  ON custom_topics FOR ALL 
  USING (true) 
  WITH CHECK (true);

-- ================================================================
-- STEP 5: Enable Realtime
-- ================================================================
-- This allows real-time subscriptions to table changes

ALTER PUBLICATION supabase_realtime ADD TABLE note_boards;
ALTER PUBLICATION supabase_realtime ADD TABLE online_users;
ALTER PUBLICATION supabase_realtime ADD TABLE custom_topics;

-- ================================================================
-- STEP 6: Create helper functions
-- ================================================================

-- Update last_seen for user presence
CREATE OR REPLACE FUNCTION update_user_presence(
  p_campaign_id TEXT,
  p_user_id TEXT,
  p_user_name TEXT,
  p_cursor_position JSONB DEFAULT NULL
) RETURNS void AS $$
BEGIN
  INSERT INTO online_users (campaign_id, user_id, user_name, cursor_position, last_seen)
  VALUES (p_campaign_id, p_user_id, p_user_name, p_cursor_position, NOW())
  ON CONFLICT (campaign_id, user_id) 
  DO UPDATE SET 
    last_seen = NOW(),
    user_name = p_user_name,
    cursor_position = COALESCE(p_cursor_position, online_users.cursor_position);
END;
$$ LANGUAGE plpgsql;

-- Get online users for a campaign
CREATE OR REPLACE FUNCTION get_online_users(p_campaign_id TEXT)
RETURNS TABLE (
  user_id TEXT,
  user_name TEXT,
  last_seen TIMESTAMP WITH TIME ZONE,
  cursor_position JSONB
) AS $$
BEGIN
  -- First, clean up stale users
  PERFORM delete_stale_users();
  
  -- Return active users
  RETURN QUERY
  SELECT 
    online_users.user_id,
    online_users.user_name,
    online_users.last_seen,
    online_users.cursor_position
  FROM online_users
  WHERE online_users.campaign_id = p_campaign_id
    AND online_users.last_seen > NOW() - INTERVAL '2 minutes'
  ORDER BY online_users.last_seen DESC;
END;
$$ LANGUAGE plpgsql;

-- ================================================================
-- STEP 7: Create trigger for updated_at
-- ================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_note_boards_updated_at
  BEFORE UPDATE ON note_boards
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ================================================================
-- DONE! Your database is ready for collaboration
-- ================================================================

-- Test query - should return empty
SELECT * FROM note_boards LIMIT 5;
SELECT * FROM online_users LIMIT 5;
SELECT * FROM custom_topics LIMIT 5;

-- ================================================================
-- OPTIONAL: Sample data for testing
-- ================================================================
-- Uncomment to insert test data:

/*
INSERT INTO note_boards (campaign_id, board_id, board_name, notes, updated_by_name) 
VALUES (
  'test-campaign-123',
  'board-user-1',
  'User 1',
  '[{"id": "note-1", "text": "Test note", "x": 100, "y": 100, "color": "yellow"}]'::jsonb,
  'Test User'
);
*/
