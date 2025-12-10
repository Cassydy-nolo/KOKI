import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://YOUR_PROJECT.supabase.co'
const SUPABASE_KEY = 'YOUR_PUBLIC_ANON_KEY'

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

// Upload logo to Supabase storage
window.uploadLogo = async function(file) {
  const fileName = 'logo.png'

  const { error } = await supabase.storage
    .from('branding')
    .upload(fileName, file, { upsert: true })

  if (error) {
    alert('Error uploading logo: ' + error.message)
  } else {
    alert('Logo uploaded successfully!')
    displayLogo()
  }
}

// Display current logo
async function displayLogo() {
  const { data } = supabase.storage.from('branding').getPublicUrl('logo.png')
  if (data.publicUrl) {
    document.getElementById('logo-preview').innerHTML =
      `<img src="${data.publicUrl}" alt="Current Logo" />`
  }
}

// Load logo on page load
displayLogo()
