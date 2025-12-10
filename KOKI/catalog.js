import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://YOUR_PROJECT.supabase.co'
const SUPABASE_KEY = 'YOUR_PUBLIC_ANON_KEY'

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

// Load catalog items
async function loadCatalog() {
  const { data, error } = await supabase
    .from('catalog')
    .select('*')

  if (error) {
    console.error('Error loading catalog:', error.message)
    return
  }

  const tbody = document.getElementById('catalog-list')
  tbody.innerHTML = ''

  data.forEach(item => {
    const row = document.createElement('tr')
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.type}</td>
      <td>${item.category}</td>
      <td>
        <button class="delete" onclick="deleteCatalogItem('${item.id}')">Delete</button>
      </td>
    `
    tbody.appendChild(row)
  })
}

// Add catalog item
window.addCatalogItem = async function(name, type, category) {
  const { error } = await supabase
    .from('catalog')
    .insert([{ name, type, category }])

  if (error) {
    alert('Error adding item: ' + error.message)
  } else {
    alert('Item added to catalog successfully!')
    loadCatalog()
  }
}

// Delete catalog item
window.deleteCatalogItem = async function(id) {
  const { error } = await supabase
    .from('catalog')
    .delete()
    .eq('id', id)

  if (error) {
    alert('Error deleting item: ' + error.message)
  } else {
    alert('Item deleted successfully.')
    loadCatalog()
  }
}

// Load catalog on page load
loadCatalog()
