import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://YOUR_PROJECT.supabase.co'
const SUPABASE_KEY = 'YOUR_PUBLIC_ANON_KEY'

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

// Load approved admins
async function loadAdmins() {
  const { data, error } = await supabase
    .from('users')
    .select('id, email, role, approved')
    .eq('role', 'admin')
    .eq('approved', true)

  if (error) {
    console.error('Error loading admins:', error.message)
    return
  }

  const tbody = document.getElementById('admin-list')
  tbody.innerHTML = ''

  data.forEach(admin => {
    const row = document.createElement('tr')
    row.innerHTML = `
      <td>${admin.email}</td>
      <td>${admin.approved ? 'Approved' : 'Pending'}</td>
      <td>
        <button class="remove" onclick="removeAdmin('${admin.id}')">Remove</button>
        <button class="downgrade" onclick="downgradeAdmin('${admin.id}')">Downgrade to Employee</button>
      </td>
    `
    tbody.appendChild(row)
  })
}

// Remove admin completely
window.removeAdmin = async function(id) {
  const { error } = await supabase
    .from('users')
    .delete()
    .eq('id', id)

  if (error) {
    alert('Error removing admin: ' + error.message)
  } else {
    alert('Admin removed successfully.')
    loadAdmins()
  }
}

// Downgrade admin to employee
window.downgradeAdmin = async function(id) {
  const { error } = await supabase
    .from('users')
    .update({ role: 'employee', approved: true })
    .eq('id', id)

  if (error) {
    alert('Error downgrading admin: ' + error.message)
  } else {
    alert('Admin downgraded to employee.')
    loadAdmins()
  }
}

// Load admins on page load
loadAdmins()
