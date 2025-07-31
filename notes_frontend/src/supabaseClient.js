import { createClient } from "@supabase/supabase-js";

// Singleton pattern for Supabase client
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_KEY;

/**
 * Returns an initialized Supabase client.
 *
 * Reads the URL and API key from environment variables.
 * Throws error if they are missing.
 */
export function getSupabaseClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Supabase URL or Key missing. Set REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_KEY."
    );
  }
  return createClient(supabaseUrl, supabaseAnonKey);
}
