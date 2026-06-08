import { useMemo } from 'react'
import CarStage from './CarStage'
import styles from '../../styles/guia-miami/BottomSheet.module.css'
import { WA_URL, openExternal } from './constants'

export default function BottomSheet({
  open, setOpen, wishlist, places, cats,
  onToggleWishlist, onFlyTo, onClear, onShare,
}) {
  const placesById = useMemo(() => {
    const m = {}
    places.forEach(p => { m[p.id] = p })
    return m
  }, [places])

  const countsByCategory = useMemo(() => {
    const counts = {}
    wishlist.forEach(id => {
      const p = placesById[id]
      if (p) counts[p.categoria] = (counts[p.categoria] || 0) + 1
    })
    return counts
  }, [wishlist, placesById])

  const summary = useMemo(() =>
    Object.entries(countsByCategory)
      .map(([k, v]) => `${v} ${cats[k]?.label?.toLowerCase() ?? k}`)
      .join(' · '),
    [countsByCategory, cats],
  )

  const headTitle = wishlist.length === 0
    ? 'Tu itinerario'
    : `Tu ruta · ${wishlist.length} lugar${wishlist.length === 1 ? '' : 'es'}`
  const headSub = wishlist.length === 0
    ? 'Toca ♥ en el mapa para empezar.'
    : summary

  return (
    <div className={`${styles.sheet} ${open ? styles.open : ''}`}>

      {/* ── Header (always visible) ── */}
      <div
        className={styles.head}
        onClick={() => setOpen(o => !o)}
        role="button"
        aria-expanded={open}
      >
        <div className={styles.miniCar}>
          <CarStage countsByCategory={countsByCategory} mini />
        </div>
        <div className={styles.headInfo}>
          <span className={styles.headTitle}>{headTitle}</span>
          <span className={styles.headSub}>{headSub}</span>
        </div>
        {wishlist.length > 0 && (
          <span className={styles.badge}>{wishlist.length}</span>
        )}
        <span className={`${styles.arrow} ${open ? styles.arrowOpen : ''}`}>▴</span>
      </div>

      {/* ── Body (visible when open) ── */}
      <div className={styles.body}>
        <div className={styles.cols}>
          {/* Car stage column */}
          <div className={styles.carCol}>
            <CarStage countsByCategory={countsByCategory} />
          </div>

          {/* Wishlist column */}
          <div className={styles.listCol}>
            {wishlist.length === 0 ? (
              <div className={styles.empty}>
                Tu itinerario está vacío. Toca el <strong>♡</strong> en los lugares que quieres visitar.
              </div>
            ) : (
              <div className={styles.list}>
                {wishlist.map(id => {
                  const p = placesById[id]
                  if (!p) return null
                  const cat = cats[p.categoria]
                  return (
                    <div
                      key={id}
                      className={styles.item}
                      onClick={() => onFlyTo(p.lat, p.lng, id)}
                      role="button"
                    >
                      <span className={styles.itemDot} style={{ background: cat.color }} />
                      <div className={styles.itemInfo}>
                        <div className={styles.itemName}>{p.nombre}</div>
                        <div className={styles.itemMeta}>
                          {cat.label} · {p.kmDesdeMIA} km · {p.gratis ? 'Gratuito' : 'De pago'}
                        </div>
                      </div>
                      <button
                        className={styles.removeBtn}
                        onClick={e => { e.stopPropagation(); onToggleWishlist(id) }}
                        aria-label="Quitar"
                      >
                        ×
                      </button>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* ── CTA card (3+ places) ── */}
        {wishlist.length >= 3 && (
          <div className={styles.ctaCard}>
            <div className={styles.ctaDeco} />
            <h3 className={styles.ctaTitle}>Ya conoces Miami. Ahora recórrelo.</h3>
            <p className={styles.ctaLede}>
              Con Florida Aventura tienes tu auto listo al aterrizar. Sin filas, sin sorpresas y en tu idioma.
            </p>
            <ul className={styles.ctaChecks}>
              <li>Entrega directa en el aeropuerto</li>
              <li>Precio final, sin cargos ocultos</li>
              <li>El auto que reservas es el que recibes</li>
              <li>Atención personalizada las 24 hs</li>
              <li>Sillas infantiles disponibles</li>
            </ul>
            <button className={styles.ctaBtn} onClick={() => openExternal(WA_URL)}>
              💬 Reservar por WhatsApp
            </button>
          </div>
        )}

        {/* ── Actions ── */}
        <div className={styles.actions}>
          <button className={styles.actClear} onClick={onClear}>
            Borrar todo
          </button>
          <button className={styles.actShare} onClick={onShare}>
            Compartir mi ruta 📸
          </button>
        </div>
      </div>
    </div>
  )
}
