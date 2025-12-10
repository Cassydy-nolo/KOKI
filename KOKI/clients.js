import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://YOUR_PROJECT.supabase.co'
const SUPABASE_KEY = 'YOUR_PUBLIC_ANON_KEY'

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

// Load all customers
async function loadClients() {
  const { data, error } = await supabase
    .from('users')
    .select('id, email, created_at')
    .eq('role', 'customer')

  if (error) {
    console.error('Error loading clients:', error.message)
    return
  }

  const tbody = document.getElementById('client-list')
  tbody.innerHTML = ''

  data.forEach(client => {
    const row = document.createElement('tr')
    row.innerHTML = `
      <td>${client.email}</td>
      <td>${new Date(client.created_at).toLocaleDateString()}</td>
      <td>
        <button class="remove" onclick="removeClient('${client.id}')">Remove</button>
      </td>
    `
    tbody.appendChild(row)
  })
}

// Remove client
window.removeClient = async function(id) {
  const { error } = await supabase
    .from('users')
    .delete()
    .eq('id', id)

  if (error) {
    alert('Error removing client: ' + error.message)
  } else {
    alert('Client removed successfully.')
    loadClients()
  }
}

// Load clients on page load
loadClients()
