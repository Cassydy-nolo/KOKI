import { createClient } from '@supabase/supabase-js'

// Replace with your actual values
const SUPABASE_URL = 'https://txpqngxxwbdgfoqesowp.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4cHFuZ3h4d2JkZ2ZvcWVzb3dwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUzNDUyNTcsImV4cCI6MjA4MDkyMTI1N30.5-UNtmaJZuJ28UnxBKjCxPRtG5HJSkuC_4Qs7a5CHr8'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

// Example: test connection
async function testConnection() {
  const { data, error } = await supabase.from('bookings').select('*')
  if (error) {
    console.error('Supabase error:', error.message)
  } else {
    console.log('Bookings:', data)
  }
}
testConnection()
