import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://YOUR_PROJECT.supabase.co'
const SUPABASE_KEY = 'YOUR_PUBLIC_ANON_KEY'

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

// Upload image to Supabase storage
window.uploadImage = async function(file) {
  const fileName = `${Date.now()}-${file.name}`

  const { error } = await supabase.storage
    .from('gallery')
    .upload(fileName, file, { upsert: true })

  if (error) {
    alert('Error uploading image: ' + error.message)
  } else {
    alert('Image uploaded successfully!')
    loadGallery()
  }
}

// Display gallery images
async function loadGallery() {
  const { data, error } = await supabase.storage.from('gallery').list()

  if (error) {
    console.error('Error loading gallery:', error.message)
    return
  }

  const galleryDiv = document.getElementById('gallery-list')
  galleryDiv.innerHTML = ''

  data.forEach(item => {
    const { data: urlData } = supabase.storage.from('gallery').getPublicUrl(item.name)
    const imgDiv = document.createElement('div')
    imgDiv.innerHTML = `
      <img src="${urlData.publicUrl}" alt="Gallery Image" />
      <button class="delete" onclick="deleteImage('${item.name}')">Delete</button>
    `
    galleryDiv.appendChild(imgDiv)
  })
}

// Delete image
window.deleteImage = async function(fileName) {
  const { error } = await supabase.storage.from('gallery').remove([fileName])

  if (error) {
    alert('Error deleting image: ' + error.message)
  } else {
    alert('Image deleted successfully.')
    loadGallery()
  }
}

// Load gallery on page load
loadGallery()
