-- ============================================
-- OmniCall AI - Database Schema
-- ============================================

-- Enable pgvector extension for RAG embeddings
CREATE EXTENSION IF NOT EXISTS vector;

-- ============================================
-- SESSIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    user_id TEXT NOT NULL,
    cartridge_id TEXT NOT NULL,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'ended')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    ended_at TIMESTAMPTZ
);

CREATE INDEX idx_sessions_user_id ON sessions (user_id);

CREATE INDEX idx_sessions_cartridge_id ON sessions (cartridge_id);

-- ============================================
-- MESSAGES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    session_id UUID REFERENCES sessions (id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (
        role IN ('user', 'model', 'system')
    ),
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_messages_session_id ON messages (session_id);

-- ============================================
-- CREDITS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS credits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    user_id TEXT UNIQUE NOT NULL,
    balance INTEGER DEFAULT 500,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_credits_user_id ON credits (user_id);

-- ============================================
-- CALLS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS calls (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    user_id TEXT NOT NULL,
    cartridge_id TEXT NOT NULL,
    session_id UUID REFERENCES sessions (id),
    phone_number TEXT,
    channel TEXT DEFAULT 'web' CHECK (
        channel IN ('web', 'whatsapp', 'phone')
    ),
    status TEXT DEFAULT 'active' CHECK (
        status IN (
            'active',
            'completed',
            'failed'
        )
    ),
    duration_seconds INTEGER DEFAULT 0,
    credits_used INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    ended_at TIMESTAMPTZ
);

CREATE INDEX idx_calls_user_id ON calls (user_id);

CREATE INDEX idx_calls_created_at ON calls (created_at DESC);

-- ============================================
-- CUSTOM CARTRIDGES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS custom_cartridges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    user_id TEXT NOT NULL,
    name TEXT NOT NULL,
    sector TEXT NOT NULL,
    description TEXT,
    greeting TEXT,
    keywords TEXT,
    responses TEXT,
    system_instruction TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_custom_cartridges_user_id ON custom_cartridges (user_id);

-- ============================================
-- DOCUMENTS TABLE (for RAG)
-- ============================================
CREATE TABLE IF NOT EXISTS documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    user_id TEXT NOT NULL,
    cartridge_id TEXT NOT NULL,
    filename TEXT NOT NULL,
    content TEXT NOT NULL,
    embedding vector (768),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_documents_cartridge_id ON documents (cartridge_id);

-- ============================================
-- USER SETTINGS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS user_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT UNIQUE NOT NULL,

-- Email Settings
email TEXT,
email_notifications BOOLEAN DEFAULT true,
email_daily_report BOOLEAN DEFAULT false,
smtp_host TEXT,
smtp_port TEXT DEFAULT '587',
smtp_user TEXT,
smtp_password TEXT, -- Should be encrypted in production
email_from TEXT,

-- WhatsApp Settings
phone_number TEXT,
whatsapp_enabled BOOLEAN DEFAULT false,
whatsapp_business_id TEXT,
whatsapp_access_token TEXT, -- Should be encrypted in production
whatsapp_verify_token TEXT DEFAULT 'omnicall-verify',

-- Notification Settings

notify_on_new_call BOOLEAN DEFAULT true,
  notify_on_low_credits BOOLEAN DEFAULT true,
  low_credits_threshold INTEGER DEFAULT 50,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_user_settings_user_id ON user_settings (user_id);

-- ============================================
-- MATCH DOCUMENTS FUNCTION (for RAG search)
-- ============================================
CREATE OR REPLACE FUNCTION match_documents(
  query_embedding vector(768),
  match_cartridge_id TEXT,
  match_count INT DEFAULT 5
)
RETURNS TABLE (
  id UUID,
  user_id TEXT,
  cartridge_id TEXT,
  filename TEXT,
  content TEXT,
  similarity FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    d.id,
    d.user_id,
    d.cartridge_id,
    d.filename,
    d.content,
    1 - (d.embedding <=> query_embedding) AS similarity
  FROM documents d
  WHERE d.cartridge_id = match_cartridge_id
  ORDER BY d.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

ALTER TABLE credits ENABLE ROW LEVEL SECURITY;

ALTER TABLE calls ENABLE ROW LEVEL SECURITY;

ALTER TABLE custom_cartridges ENABLE ROW LEVEL SECURITY;

ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Allow service role full access (for backend API)
CREATE POLICY "Service role full access sessions" ON sessions FOR ALL USING (true);

CREATE POLICY "Service role full access messages" ON messages FOR ALL USING (true);

CREATE POLICY "Service role full access credits" ON credits FOR ALL USING (true);

CREATE POLICY "Service role full access calls" ON calls FOR ALL USING (true);

CREATE POLICY "Service role full access custom_cartridges" ON custom_cartridges FOR ALL USING (true);

CREATE POLICY "Service role full access documents" ON documents FOR ALL USING (true);

ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access user_settings" ON user_settings FOR ALL USING (true);

-- ============================================
-- SEED DATA: Initial test user with credits
-- ============================================
INSERT INTO
    credits (user_id, balance)
VALUES ('test-user-001', 500) ON CONFLICT DO NOTHING;

INSERT INTO
    credits (user_id, balance)
VALUES ('whatsapp_5521999999999', 100) ON CONFLICT DO NOTHING;

-- Success message
SELECT 'OmniCall AI database schema created successfully!' AS status;