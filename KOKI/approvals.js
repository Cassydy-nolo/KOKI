import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://YOUR_PROJECT.supabase.co'
const SUPABASE_KEY = 'YOUR_PUBLIC_ANON_KEY'

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

// Load pending approvals
async function loadApprovals() {
  const { data, error } = await supabase
    .from('users')
    .select('id, email, role, approved')
    .in('role', ['employee','admin'])
    .eq('approved', false)

  if (error) {
    console.error('Error loading approvals:', error.message)
    return
  }

  const tbody = document.getElementById('approval-list')
  tbody.innerHTML = ''

  data.forEach(user => {
    const row = document.createElement('tr')
    row.innerHTML = `
      <td>${user.email}</td>
      <td>${user.role}</td>
      <td>${user.approved ? 'Approved' : 'Pending'}</td>
      <td>
        <button class="approve" onclick="approveUser('${user.id}')">Approve</button>
        <button class="reject" onclick="rejectUser('${user.id}')">Reject</button>
      </td>
    `
    tbody.appendChild(row)
  })
}

// Approve user
window.approveUser = async function(id) {
  const { error } = await supabase
    .from('users')
    .update({ approved: true })
    .eq('id', id)

  if (error) {
    alert('Error approving user: ' + error.message)
  } else {
    alert('User approved successfully!')
    loadApprovals()
  }
}

// Reject user (delete from table)
window.rejectUser = async function(id) {
  const { error } = await supabase
    .from('users')
    .delete()
    .eq('id', id)

  if (error) {
    alert('Error rejecting user: ' + error.message)
  } else {
    alert('User rejected and removed.')
    loadApprovals()
  }
}

// Load approvals on page load
loadApprovals()
