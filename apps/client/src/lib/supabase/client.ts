import { createBrowserSupabase } from "@repo/database/supabase/supabase.client";
import { env } from "../env";

export const browserSupabase = createBrowserSupabase(
  env.NEXT_PUBLIC_SUPABASE_URL!,
  env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);
