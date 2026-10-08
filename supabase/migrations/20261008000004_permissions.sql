-- Migration: 20261008000004_permissions.sql
-- Description: Grant proper schema and table access to Supabase roles

-- Schema usage
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;

-- Table permissions
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;

-- Specific permissions for authenticated users on bookmarks and profiles
GRANT INSERT, UPDATE, DELETE ON TABLE public.bookmarks TO authenticated;
GRANT INSERT, UPDATE ON TABLE public.profiles TO authenticated;

-- Future tables default privileges
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO anon, authenticated;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO anon, authenticated, service_role;
