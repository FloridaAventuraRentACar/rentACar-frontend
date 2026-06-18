export const ASSETS = '/Guia Florida Aventura/design_handoff_guia_miami/assets'

export const WA_URL = 'https://api.whatsapp.com/send/?phone=13057731787'

export const STORE_KEY = 'fa-miami-wishlist-v1'
export const SESSION_KEY = 'fa-cta-shown'

export const INTRO_SLIDES = [
  'key-biscayne', 'downtown', 'wynwood', 'keys-highway',
  'lighthouse-sunset', 'little-havana', 'brickell', 'outlets', 'coconut-grove',
]

// Versiones horizontales / de mayor resolución para desktop.
// Viven en `${ASSETS}/intro/desktop/` y se usan en pantallas >= 1024px,
// donde las verticales de mobile se veían estiradas/borrosas.
export const INTRO_SLIDES_DESKTOP = [
  'Brickell_City_Centre_Interior_2026_SV_1440x900_B2D49E5A-DBB3-447D-701D521859515C3C-b2d49a6bcbebd9e_b2d4a4e6-0b94-8e45-1f2f08223fbf95ac.jpg',
  'Orange_lifeguard_tower_Miami_Beach_green_flag_iStock_1440x900.jpg',
  'miami-experiences-scaled.webp',
  'colony-hotel-miami-florida_0.webp',
  'capa-scaled.webp',
  'fc725e13-city-30651-187381258da.jpg',
  'RAKINZOAQNGQXBX4BVMKU2TZZ4.jpg',
  'fdc1db26-5587-4429-881d-69ed42702db1.jpg',
  '02ee0441-a9dd-4b32-bb53-9644902187e1.jpg',
]

const PRIORITY = ['playa', 'noche', 'compras', 'cultura', 'foodie']

export function dominantCategory(counts) {
  const c = counts || {}
  let best = null, bestN = 0
  PRIORITY.forEach(cat => {
    const n = c[cat] || 0
    if (n > bestN) { best = cat; bestN = n }
  })
  return best
}

export function openExternal(url) {
  const w = window.open(url, '_blank', 'noopener,noreferrer')
  if (!w) navigator.clipboard?.writeText(url)
}

export function hexShade(hex, pct) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  const f = 1 + pct / 100
  const clamp = v => Math.round(Math.max(0, Math.min(255, v * f)))
  return `rgb(${clamp(r)},${clamp(g)},${clamp(b)})`
}
