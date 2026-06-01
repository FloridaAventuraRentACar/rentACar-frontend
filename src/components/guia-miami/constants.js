export const ASSETS = '/Guia Florida Aventura/design_handoff_guia_miami/assets'

export const WA_URL = 'https://api.whatsapp.com/send/?phone=13057731787'

export const STORE_KEY = 'fa-miami-wishlist-v1'
export const SESSION_KEY = 'fa-cta-shown'

export const INTRO_SLIDES = [
  'key-biscayne', 'downtown', 'wynwood', 'keys-highway',
  'lighthouse-sunset', 'little-havana', 'brickell', 'outlets', 'coconut-grove',
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
