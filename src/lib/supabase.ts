import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://xzrywdwwzerrurzyhusy.supabase.co';
export const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6cnl3ZHd3emVycnVyenlodXN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE0MjMwMTcsImV4cCI6MjEwNjk5OTAxN30.4eO2mi8FlKmKTBNnSd_8mOgzUr_BceCd5APkKvhjwoE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
