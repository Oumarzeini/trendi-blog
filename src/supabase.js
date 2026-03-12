import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://gjimpeijrkmzhmyrasjo.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqaW1wZWlqcmttemhteXJhc2pvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk1NDU0NTUsImV4cCI6MjA4NTEyMTQ1NX0.TAnpgiOqqgvMnaoyF-ojZL09l5ZvfUCLNZvISGUNP_k",
);

export default supabase;
