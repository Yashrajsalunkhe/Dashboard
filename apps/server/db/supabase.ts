import { createClient } from '@supabase/supabase-js';

// Replace with your actual Supabase project URL and anon key
const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_ANON_KEY || ''
);

export default supabase;
