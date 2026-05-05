'use client'

import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL  = process.env.NEXT_PUBLIC_SUPABASE_URL  || 'https://zpqvqcvykicoqfumpdsc.supabase.co'
const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpwcXZxY3Z5a2ljb3FmdW1wZHNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMDQxODIsImV4cCI6MjA5MTc4MDE4Mn0.qGzUK3NeBhmYA2ThQjCYGKlxCF8-VLulizH-8YwEOZw'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON, {
  auth: { persistSession: true, storageKey: 'chama-verde-session' },
})
