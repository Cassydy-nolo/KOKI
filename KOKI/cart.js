// Temporary cart storage (replace with Supabase orders later)
let cart = JSON.parse(localStorage.getItem('cart')) || []

// Load cart items
function loadCart() {
  const tbody = document.getElementById('cart-list')
  tbody.innerHTML = ''

  cart.forEach((item, index) => {
    const row = document.createElement('tr')
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.type}</td>
      <td>
        <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)" />
      </td>
      <td>
        <button class="remove" onclick="removeItem(${index})">Remove</button>
      </td>
    `
    tbody.appendChild(row)
  })
}

// Update quantity
window.updateQuantity = function(index, quantity) {
  cart[index].quantity = parseInt(quantity)
  localStorage.setItem('cart', JSON.stringify(cart))
  loadCart()
}

// Remove item
window.removeItem = function(index) {
  cart.splice(index, 1)
  localStorage.setItem('cart', JSON.stringify(cart))
  loadCart()
}

// Checkout (basic example)
window.checkout = function() {
  alert('Proceeding to checkout...')
  // Later: integrate with Supabase orders table
}

// Load cart on page load
loadCart()
