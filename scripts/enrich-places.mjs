/**
 * enrich-places.mjs
 * Enriquece src/data/lugares-miami.json con datos reales de Google Places API:
 *   - rating y cantidad de reseñas actualizados
 *   - foto real del lugar (descargada a assets/places/)
 *
 * Uso:
 *   node scripts/enrich-places.mjs <TU_API_KEY>
 *
 * Requiere Node 18+ (fetch nativo). Solo correr una vez; después borrás la key de Google Cloud.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const API_KEY = process.argv[2]
if (!API_KEY) {
  console.error('❌  Falta la API key.\nUso: node scripts/enrich-places.mjs <API_KEY>')
  process.exit(1)
}

const DATA_PATH   = join(__dirname, '../src/data/lugares-miami.json')
const PHOTOS_DIR  = join(__dirname, '../public/Guia Florida Aventura/design_handoff_guia_miami/assets/places')
const PHOTOS_URL  = '/Guia Florida Aventura/design_handoff_guia_miami/assets/places'

mkdirSync(PHOTOS_DIR, { recursive: true })

const data = JSON.parse(readFileSync(DATA_PATH, 'utf8'))

// ── Helpers ───────────────────────────────────────────────

function formatRatings(n) {
  if (!n) return null
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + '+'
}

async function findPlace(place) {
  const input = encodeURIComponent(`${place.nombre} ${place.barrio} Miami`)
  const bias  = `circle:3000@${place.lat},${place.lng}`
  const url   = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json` +
                `?input=${input}&inputtype=textquery` +
                `&fields=place_id&locationbias=${bias}&key=${API_KEY}`
  const res  = await fetch(url)
  const json = await res.json()
  if (json.status !== 'OK' && json.status !== 'ZERO_RESULTS') {
    throw new Error(`findPlace: ${json.status} — ${json.error_message ?? ''}`)
  }
  return json.candidates?.[0]?.place_id ?? null
}

async function getDetails(placeId) {
  const url  = `https://maps.googleapis.com/maps/api/place/details/json` +
               `?place_id=${placeId}&fields=rating,user_ratings_total,photos&key=${API_KEY}`
  const res  = await fetch(url)
  const json = await res.json()
  if (json.status !== 'OK') throw new Error(`getDetails: ${json.status}`)
  return json.result ?? null
}

async function downloadPhoto(photoRef, filename) {
  const url = `https://maps.googleapis.com/maps/api/place/photo` +
              `?maxwidth=800&photoreference=${photoRef}&key=${API_KEY}`
  const res = await fetch(url)          // sigue el redirect automáticamente
  if (!res.ok) throw new Error(`photo HTTP ${res.status}`)
  const buf  = await res.arrayBuffer()
  writeFileSync(join(PHOTOS_DIR, filename), Buffer.from(buf))
  return `${PHOTOS_URL}/${filename}`
}

// ── Main loop ─────────────────────────────────────────────

const enriched = []
let photosOk = 0

for (const place of data.lugares) {
  process.stdout.write(`⏳  ${place.nombre} ... `)

  try {
    const placeId = await findPlace(place)
    if (!placeId) {
      console.log('⚠  no encontrado')
      enriched.push(place)
      continue
    }

    const details = await getDetails(placeId)
    const updated = { ...place }

    if (details.rating)              updated.rating       = details.rating
    if (details.user_ratings_total)  updated.ratingsCount = formatRatings(details.user_ratings_total)

    if (details.photos?.[0]?.photo_reference) {
      try {
        updated.imagen = await downloadPhoto(details.photos[0].photo_reference, `${place.id}.jpg`)
        photosOk++
      } catch (e) {
        console.error(`\n  foto falló: ${e.message}`)
      }
    }

    console.log(`✓  rating ${updated.rating} (${updated.ratingsCount})${updated.imagen ? ' 📸' : ''}`)
    enriched.push(updated)

  } catch (err) {
    console.log(`✗  ${err.message}`)
    enriched.push(place)
  }

  // pausa entre lugares para respetar rate limit de la API
  await new Promise(r => setTimeout(r, 250))
}

writeFileSync(DATA_PATH, JSON.stringify({ ...data, lugares: enriched }, null, 2))

console.log(`\n✅  Listo. JSON actualizado.`)
console.log(`📸  Fotos descargadas: ${photosOk}/${data.lugares.length}`)
console.log(`\nPróximo paso: revisá los cambios con git diff src/data/lugares-miami.json`)
