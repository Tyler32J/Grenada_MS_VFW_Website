import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// The anon key is meant to be public. What protects the data is the row level
// security in supabase/schema.sql, which the database enforces for every request.
// If the env vars are missing, the site still works using its default content.
export const supabase =
    supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;
