import { createClient } from "@supabase/supabase-js";

console.log(
  "import.meta.env.SUPABASE_SERVICE_ROLE_KEY",
  import.meta.env.SUPABASE_SERVICE_ROLE_KEY
);
export const supabaseServer = createClient(
  import.meta.env.PUBLIC_SUPABASE_URL!,
  import.meta.env.SUPABASE_SERVICE_ROLE_KEY!
);
