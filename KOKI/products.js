import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://YOUR_PROJECT.supabase.co'
const SUPABASE_KEY = 'YOUR_PUBLIC_ANON_KEY'

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

// Load products
async function loadProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')

  if (error) {
    console.error('Error loading products:', error.message)
    return
  }

  const tbody = document.getElementById('product-list')
  tbody.innerHTML = ''

  data.forEach(product => {
    const row = document.createElement('tr')
    row.innerHTML = `
      <td>${product.name}</td>
      <td>${product.price}</td>
      <td>${product.description || ''}</td>
      <td>${product.stock}</td>
      <td>
        <button class="edit" onclick="editProduct('${product.id}')">Edit</button>
        <button class="delete" onclick="deleteProduct('${product.id}')">Delete</button>
      </td>
    `
    tbody.appendChild(row)
  })
}

// Add product
window.addProduct = async function(name, price, description, stock) {
  const { error } = await supabase
    .from('products')
    .insert([{ name, price, description, stock }])

  if (error) {
    alert('Error adding product: ' + error.message)
  } else {
    alert('Product added successfully!')
    loadProducts()
  }
}

// Delete product
window.deleteProduct = async function(id) {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id)

  if (error) {
    alert('Error deleting product: ' + error.message)
  } else {
    alert('Product deleted successfully.')
    loadProducts()
  }
}

// Edit product (basic example: prompt for new values)
window.editProduct = async function(id) {
  const newName = prompt('Enter new product name:')
  const newPrice = prompt('Enter new price:')
  const newStock = prompt('Enter new stock quantity:')

  const { error } = await supabase
    .from('products')
    .update({ name: newName, price: newPrice, stock: newStock })
    .eq('id', id)

  if (error) {
    alert('Error editing product: ' + error.message)
  } else {
    alert('Product updated successfully.')
    loadProducts()
  }
}

// Load products on page load
loadProducts()
