import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://YOUR_PROJECT.supabase.co'
const SUPABASE_KEY = 'YOUR_PUBLIC_ANON_KEY'

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

// Load services
async function loadServices() {
  const { data, error } = await supabase
    .from('services')
    .select('*')

  if (error) {
    console.error('Error loading services:', error.message)
    return
  }

  const tbody = document.getElementById('service-list')
  tbody.innerHTML = ''

  data.forEach(service => {
    const row = document.createElement('tr')
    row.innerHTML = `
      <td>${service.name}</td>
      <td>${service.price}</td>
      <td>${service.description || ''}</td>
      <td>
        <button class="edit" onclick="editService('${service.id}')">Edit</button>
        <button class="delete" onclick="deleteService('${service.id}')">Delete</button>
      </td>
    `
    tbody.appendChild(row)
  })
}

// Add service
window.addService = async function(name, price, description) {
  const { error } = await supabase
    .from('services')
    .insert([{ name, price, description }])

  if (error) {
    alert('Error adding service: ' + error.message)
  } else {
    alert('Service added successfully!')
    loadServices()
  }
}

// Delete service
window.deleteService = async function(id) {
  const { error } = await supabase
    .from('services')
    .delete()
    .eq('id', id)

  if (error) {
    alert('Error deleting service: ' + error.message)
  } else {
    alert('Service deleted successfully.')
    loadServices()
  }
}

// Edit service
window.editService = async function(id) {
  const newName = prompt('Enter new service name:')
  const newPrice = prompt('Enter new price:')
  const newDescription = prompt('Enter new description:')

  const { error } = await supabase
    .from('services')
    .update({ name: newName, price: newPrice, description: newDescription })
    .eq('id', id)

  if (error) {
    alert('Error editing service: ' + error.message)
  } else {
    alert('Service updated successfully.')
    loadServices()
  }
}

// Load services on page load
loadServices()
