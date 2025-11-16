import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mtlfbyjnlvxrsodqtsgp.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10bGZieWpubHZ4cnNvZHF0c2dwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwMjM0OTcsImV4cCI6MjA3NzU5OTQ5N30.rlqDxdFrMCB4JlbxHKV0Xygf4n9QS94zGKCkyZeJ-b4'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
