import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let cachedClient: SupabaseClient<any> | null = null;

export function getSupabaseAdmin() {
  if (cachedClient) {
    return cachedClient;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Supabase admin environment variables are not configured.');
  }

  // Server-side client with service role key for admin operations
  cachedClient = createClient<any>(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  return cachedClient;
}
