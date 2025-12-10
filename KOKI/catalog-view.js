import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://YOUR_PROJECT.supabase.co'
const SUPABASE_KEY = 'YOUR_PUBLIC_ANON_KEY'

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

// Load catalog items grouped by category
async function loadCatalog() {
  const { data, error } = await supabase
    .from('catalog')
    .select('*')
    .order('category', { ascending: true })

  if (error) {
    console.error('Error loading catalog:', error.message)
    return
  }

  const container = document.getElementById('catalog-container')
  container.innerHTML = ''

  // Group items by category
  const grouped = {}
  data.forEach(item => {
    if (!grouped[item.category]) grouped[item.category] = []
    grouped[item.category].push(item)
  })

  // Render categories
  Object.keys(grouped).forEach(category => {
    const categoryDiv = document.createElement('div')
    categoryDiv.className = 'category'
    categoryDiv.innerHTML = `<h2>${category}</h2>`

    grouped[category].forEach(item => {
      const itemDiv = document.createElement('div')
      itemDiv.className = 'item'
      itemDiv.innerHTML = `
        <h3>${item.name}</h3>
        <p>Type: ${item.type}</p>
        <p>Category: ${item.category}</p>
        <button onclick="addToCart('${item.id}', '${item.name}')">Add to Cart</button>
      `
      categoryDiv.appendChild(itemDiv)
    })

    container.appendChild(categoryDiv)
  })
}

// Add to cart (basic example)
window.addToCart = function(id, name) {
  alert(`${name} added to cart!`)
  // Later: integrate with orders table
}

// Load catalog on page load
loadCatalog()
