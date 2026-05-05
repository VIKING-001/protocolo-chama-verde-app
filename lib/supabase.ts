'use client'

import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL  = process.env.NEXT_PUBLIC_SUPABASE_URL  || 'https://oaqittwtcysdttorxjol.supabase.co'
const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9hcWl0dHd0Y3lzZHR0b3J4am9sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc5NzI0ODAsImV4cCI6MjA5MzU0ODQ4MH0.46NB_fAGHwRbPqnSa9ROnJyFPdEDkB-aphiZRnoyUEk'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON, {
  auth: { persistSession: true, storageKey: 'chama-verde-session' },
})
