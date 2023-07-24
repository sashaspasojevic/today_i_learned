import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://octphgzurnaanhgcsynu.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9jdHBoZ3p1cm5hYW5oZ2NzeW51Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg1Nzk2MjksImV4cCI6MjAwNDE1NTYyOX0.eDc-duw8OxqWmPySWG3Ev1oiRgumqvPsNnSPOObH8Co";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
