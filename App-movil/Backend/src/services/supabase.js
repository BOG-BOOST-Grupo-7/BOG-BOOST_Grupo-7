import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
);

console.log(
  "SECRET KEY:",
  process.env.SUPABASE_SECRET_KEY?.slice(0, 20)
);

export default supabase;