import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://txpqngxxwbdgfoqesowp.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4cHFuZ3h4d2JkZ2ZvcWVzb3dwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUzNDUyNTcsImV4cCI6MjA4MDkyMTI1N30.5-UNtmaJZuJ28UnxBKjCxPRtG5HJSkuC_4Qs7a5CHr8'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

// Email + Password Login with Redirect
export async function loginWithEmail(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password
  })

  if (error) {
    alert('Login failed: ' + error.message)
    return
  }

  // Fetch user role + approval status
  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('role, approved')
    .eq('email', email)
    .single()

  if (userError) {
    alert('Error fetching user role: ' + userError.message)
    return
  }

  // Redirect based on role
  if (userData.role === 'guest') {
    window.location.href = 'guest.xhtml'
  } else if (userData.role === 'customer') {
    window.location.href = 'client.xhtml'
  } else if (userData.role === 'employee' || userData.role === 'admin') {
    if (userData.approved) {
      window.location.href = userData.role === 'employee' ? 'employee.xhtml' : 'admin.xhtml'
    } else {
      alert('Your account is awaiting Super Admin approval.')
    }
  } else if (userData.role === 'super_admin') {
    window.location.href = 'superadmin.xhtml'
  } else {
    alert('Unknown role. Please contact support.')
  }
}
