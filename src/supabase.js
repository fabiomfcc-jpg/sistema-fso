import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://gqxuvpaczrgzyhcfntqg.supabase.co";

const supabaseKey = "sb_publishable_ZBb_DONmJsJ4CHngI0Rq8g__IPlpI37";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);