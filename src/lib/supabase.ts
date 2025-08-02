import { createClient } from "@supabase/supabase-js";

// Use the appropriate key based on the environment
const isServer = typeof window === "undefined";

export const supabase = createClient(
  import.meta.env.PUBLIC_SUPABASE_URL!,
  isServer
    ? import.meta.env.SUPABASE_SERVICE_ROLE_KEY! // Server-side: Service role key
    : import.meta.env.PUBLIC_SUPABASE_ANON_KEY! // Client-side: Anon key
);
