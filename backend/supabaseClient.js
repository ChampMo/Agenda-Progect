import { createClient } from '@supabase/supabase-js'

export const supabase = createClient('https://fpvhqgksrqktucubhvte.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZwdmhxZ2tzcnFrdHVjdWJodnRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc2NTI5ODMsImV4cCI6MjAzMzIyODk4M30.g4LSUEsLnc9qOrZ873_t7WvSyr07ai4j0c7B-7uiFOA')