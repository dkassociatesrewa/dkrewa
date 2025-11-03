import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://owwvkcjfrluzdvykmlru.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93d3ZrY2pmcmx1emR2eWttbHJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEzOTM5MTEsImV4cCI6MjA3Njk2OTkxMX0.Vp30aBS4-2BxV0jNe93eFYlXgVEH9FECNjmdozi_TBg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);