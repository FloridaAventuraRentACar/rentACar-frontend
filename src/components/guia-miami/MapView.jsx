import { useEffect, useMemo, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import PlacePopup from './PlacePopup'
import styles from '../../styles/guia-miami/MapView.module.css'

// ── Icon factories ────────────────────────────────────────

function makePlaceIcon(cat, place, isWished, isDimmed) {
  const cls = ['fa-pin-inner', isWished ? 'wished' : '', isDimmed ? 'dimmed' : '']
    .filter(Boolean).join(' ')
  return L.divIcon({
    className: 'fa-pin',
    html: `<div class="${cls}">
      <span class="dot" style="background:${cat.color}"></span>
      <span>${cat.icono} ${place.gratis ? 'Gratis' : '$'}</span>
    </div>`,
    iconSize: null,
    iconAnchor: [40, 28],
  })
}

const MIA_ICON = L.divIcon({
  className: 'fa-mia-pin',
  html: `<div class="fa-mia-inner">
    <span style="display:inline-block;width:8px;height:8px;background:#E8C653;border-radius:50%;flex-shrink:0;"></span>
    ✈️ MIA Airport
  </div>`,
  iconSize: null,
  iconAnchor: [52, 28],
})

// ── Map controller: exposes Leaflet map instance via ref ──

function MapController({ mapRef }) {
  const map = useMap()
  useEffect(() => { mapRef.current = map }, [map, mapRef])
  return null
}

// ── Individual place marker ───────────────────────────────

function PlaceMarker({ place, cat, isWished, isDimmed, onToggleWishlist, markersRef }) {
  const icon = useMemo(
    () => makePlaceIcon(cat, place, isWished, isDimmed),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cat.color, cat.icono, place.gratis, isWished, isDimmed],
  )

  const storeRef = (el) => {
    if (el) {
      // react-leaflet v4: ref may be { instance, context } or the Leaflet object directly
      const instance = el?.instance ?? el
      markersRef.current[place.id] = instance
    }
  }

  return (
    <Marker ref={storeRef} position={[place.lat, place.lng]} icon={icon}>
      <Popup maxWidth={320}>
        <PlacePopup
          place={place}
          cat={cat}
          isWished={isWished}
          onToggle={() => onToggleWishlist(place.id)}
        />
      </Popup>
    </Marker>
  )
}

// ── Main MapView ──────────────────────────────────────────

export default function MapView({
  places, cats, activeCategory, freeOnly,
  wishlist, onToggleWishlist, mapRef, markersRef,
}) {
  return (
    <div className={styles.wrapper}>
      <MapContainer
        center={[25.82, -80.20]}
        zoom={11}
        zoomControl={false}
        style={{ width: '100%', height: '100%' }}
      >
        <MapController mapRef={mapRef} />
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution="© OpenStreetMap · © CARTO"
          subdomains="abcd"
          maxZoom={19}
        />

        {/* MIA Airport – fixed, non-interactive */}
        <Marker position={[25.7959, -80.2870]} icon={MIA_ICON} interactive={false} />

        {/* Place markers */}
        {places.map(place => {
          const cat = cats[place.categoria]
          const isWished = wishlist.includes(place.id)
          const matchesCat = activeCategory === 'all' || place.categoria === activeCategory
          const matchesFree = !freeOnly || place.gratis
          const isDimmed = !(matchesCat && matchesFree)
          return (
            <PlaceMarker
              key={place.id}
              place={place}
              cat={cat}
              isWished={isWished}
              isDimmed={isDimmed}
              onToggleWishlist={onToggleWishlist}
              markersRef={markersRef}
            />
          )
        })}
      </MapContainer>
    </div>
  )
}
