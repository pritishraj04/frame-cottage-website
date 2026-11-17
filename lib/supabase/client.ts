import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { Database } from "./types";
import { createMockSupabaseClient } from "./mock-store";

export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return false;
  if (url.includes("your-project-id") || anonKey.includes("your-anon-key")) return false;
  return true;
}

export function createClient() {
  if (!isSupabaseConfigured()) {
    return createMockSupabaseClient() as any;
  }

  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export const supabaseClient = createClient();
