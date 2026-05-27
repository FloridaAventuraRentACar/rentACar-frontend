import { useState, useRef, useCallback } from 'react'
import IntroScreen from './IntroScreen'
import TopBar from './TopBar'
import MapView from './MapView'
import BottomSheet from './BottomSheet'
import Toast from './Toast'
import PLACES_DATA from '../../data/lugares-miami.json'
import '../../styles/guia-miami/guia-miami.css'

const STORE_KEY = 'fa-miami-wishlist-v1'
const SESSION_KEY = 'fa-cta-shown'

function loadWishlist() {
  try { return JSON.parse(localStorage.getItem(STORE_KEY) || '[]') }
  catch { return [] }
}

export default function GuiaMiamiPage() {
  const [showIntro, setShowIntro]       = useState(true)
  const [activeCategory, setActiveCategory] = useState('all')
  const [freeOnly, setFreeOnly]         = useState(false)
  const [wishlist, setWishlist]         = useState(loadWishlist)
  const [sheetOpen, setSheetOpen]       = useState(false)
  const [toast, setToast]               = useState(null)

  const toastTimer = useRef(null)
  const mapRef     = useRef(null)   // Leaflet map instance
  const markersRef = useRef({})     // Leaflet marker instances by place id

  // ── Toast ──────────────────────────────────────────────
  const showToast = useCallback((msg) => {
    clearTimeout(toastTimer.current)
    setToast(msg)
    toastTimer.current = setTimeout(() => setToast(null), 2400)
  }, [])

  // ── Wishlist toggle ────────────────────────────────────
  const toggleWishlist = useCallback((id) => {
    setWishlist(prev => {
      const isAdding = !prev.includes(id)
      const next = isAdding ? [...prev, id] : prev.filter(x => x !== id)

      try { localStorage.setItem(STORE_KEY, JSON.stringify(next)) } catch { /* noop */ }

      if (isAdding) {
        const place = PLACES_DATA.lugares.find(p => p.id === id)
        if (place) setTimeout(() => showToast(`Añadido: ${place.nombre}`), 0)

        if (next.length === 3 && !sessionStorage.getItem(SESSION_KEY)) {
          sessionStorage.setItem(SESSION_KEY, '1')
          setTimeout(() => {
            setSheetOpen(true)
            showToast('¡Excelente elección! Ya tienes un plan. Míralo aquí abajo.')
          }, 300)
        }
      }

      return next
    })
  }, [showToast])

  // ── Fly to place (from wishlist item click) ────────────
  const flyToPlace = useCallback((lat, lng, id) => {
    setSheetOpen(false)
    const map = mapRef.current
    if (!map) return
    map.flyTo([lat, lng], 14, { duration: 0.8 })
    setTimeout(() => {
      const m = markersRef.current[id]
      if (m) m.openPopup?.()
    }, 900)
  }, [])

  // ── Clear wishlist ─────────────────────────────────────
  const clearWishlist = useCallback(() => {
    setWishlist(prev => {
      if (prev.length === 0) return prev
      if (!window.confirm('¿Borrar todos los lugares de tu lista?')) return prev
      try { localStorage.setItem(STORE_KEY, '[]') } catch { /* noop */ }
      setTimeout(() => showToast('Lista vacía. Comienza de nuevo cuando quieras.'), 0)
      return []
    })
  }, [showToast])

  // ── Share route ────────────────────────────────────────
  const shareRoute = useCallback(() => {
    setWishlist(prev => {
      if (prev.length === 0) {
        setTimeout(() => showToast('Añade algunos lugares primero ✨'), 0)
        return prev
      }
      const counts = {}
      prev.forEach(id => {
        const p = PLACES_DATA.lugares.find(x => x.id === id)
        if (p) counts[p.categoria] = (counts[p.categoria] || 0) + 1
      })
      const text =
        `Mi Miami con @floridaaventura · ${prev.length} lugares · ` +
        Object.entries(counts)
          .map(([k, v]) => `${v} ${PLACES_DATA.categorias[k].label}`)
          .join(' · ')

      if (navigator.share) {
        navigator.share({ title: 'Mi Miami · Florida Aventura', text }).catch(() => {})
      } else {
        navigator.clipboard?.writeText(text)
        setTimeout(() => showToast('Enlace copiado. ¡Compártelo con tus acompañantes!'), 0)
      }
      return prev
    })
  }, [showToast])

  return (
    <div style={{
      position: 'fixed', inset: 0,
      fontFamily: "'Lato', sans-serif",
      background: '#FAF7F1',
      overflow: 'hidden',
    }}>
      {showIntro && <IntroScreen onClose={() => setShowIntro(false)} />}

      <TopBar
        cats={PLACES_DATA.categorias}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        freeOnly={freeOnly}
        setFreeOnly={setFreeOnly}
      />

      <MapView
        places={PLACES_DATA.lugares}
        cats={PLACES_DATA.categorias}
        activeCategory={activeCategory}
        freeOnly={freeOnly}
        wishlist={wishlist}
        onToggleWishlist={toggleWishlist}
        mapRef={mapRef}
        markersRef={markersRef}
      />

      <BottomSheet
        open={sheetOpen}
        setOpen={setSheetOpen}
        wishlist={wishlist}
        places={PLACES_DATA.lugares}
        cats={PLACES_DATA.categorias}
        onToggleWishlist={toggleWishlist}
        onFlyTo={flyToPlace}
        onClear={clearWishlist}
        onShare={shareRoute}
      />

      {toast && <Toast message={toast} />}
    </div>
  )
}
