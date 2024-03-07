import { createClient } from '@supabase/supabase-js'
import { Database } from './types'
const supabaseUrl = 'https://jbzqxselhobgznzpnijn.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpienF4c2VsaG9iZ3puenBuaWpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk2NjUzODksImV4cCI6MjAyNTI0MTM4OX0.iPj6y1w6-p342QoOyiKsQkhpbMewYM0iVqWbrsF3ULc"
const supabase = createClient<Database>(supabaseUrl, supabaseKey)

export default supabase