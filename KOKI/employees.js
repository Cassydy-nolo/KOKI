import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://YOUR_PROJECT.supabase.co'
const SUPABASE_KEY = 'YOUR_PUBLIC_ANON_KEY'

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

// Load approved employees
async function loadEmployees() {
  const { data, error } = await supabase
    .from('users')
    .select('id, email, role, approved')
    .eq('role', 'employee')
    .eq('approved', true)

  if (error) {
    console.error('Error loading employees:', error.message)
    return
  }

  const tbody = document.getElementById('employee-list')
  tbody.innerHTML = ''

  data.forEach(employee => {
    const row = document.createElement('tr')
    row.innerHTML = `
      <td>${employee.email}</td>
      <td>${employee.approved ? 'Approved' : 'Pending'}</td>
      <td>
        <button class="remove" onclick="removeEmployee('${employee.id}')">Remove</button>
        <button class="promote" onclick="promoteEmployee('${employee.id}')">Promote to Admin</button>
      </td>
    `
    tbody.appendChild(row)
  })
}

// Remove employee completely
window.removeEmployee = async function(id) {
  const { error } = await supabase
    .from('users')
    .delete()
    .eq('id', id)

  if (error) {
    alert('Error removing employee: ' + error.message)
  } else {
    alert('Employee removed successfully.')
    loadEmployees()
  }
}

// Promote employee to admin
window.promoteEmployee = async function(id) {
  const { error } = await supabase
    .from('users')
    .update({ role: 'admin', approved: true })
    .eq('id', id)

  if (error) {
    alert('Error promoting employee: ' + error.message)
  } else {
    alert('Employee promoted to admin.')
    loadEmployees()
  }
}

// Load employees on page load
loadEmployees()
