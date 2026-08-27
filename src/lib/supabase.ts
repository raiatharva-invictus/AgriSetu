import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://rfubnfdtsqzptadgfqcp.supabase.co';
const supabaseAnonKey =
  process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  'sb_publishable_Qqh1Ioz_KLoWc2h37Xaw3w_DTwqWArn';

/**
 * Production-ready Supabase client instance.
 * Decouples environment key retrieval from application UI logic.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false,
  },
});
