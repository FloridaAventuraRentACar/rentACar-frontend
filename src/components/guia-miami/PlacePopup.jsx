import styles from '../../styles/guia-miami/PlacePopup.module.css'
import { openExternal, hexShade } from './constants'

function StarIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" style={{ verticalAlign: '-2px' }}>
      <path d="M12 2l2.9 6.9L22 10l-5 5 1.5 7-6.5-3.5L5.5 22 7 15l-5-5 7.1-1.1z" />
    </svg>
  )
}

export default function PlacePopup({ place, cat, isWished, onToggle }) {
  const gmapsDir = `https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}&travelmode=driving`
  const gmapsSearch = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.nombre + ' ' + place.barrio + ' Miami')}`
  const gradientBg = `linear-gradient(135deg, ${cat.color} 0%, ${hexShade(cat.color, -25)} 100%)`

  return (
    <div className={styles.pop}>
      {/* Header image area — foto real si existe, degradado+emoji como fallback */}
      <div className={styles.img} style={place.imagen ? undefined : { background: gradientBg }}>
        {place.imagen
          ? <img src={place.imagen} alt={place.nombre} className={styles.photo} />
          : <span className={styles.emoji}>{cat.icono}</span>
        }
        <span className={styles.badgeFree}>{place.gratis ? 'GRATUITO' : 'DE PAGO'}</span>
        <span className={styles.badgeCat}>{place.categoria.toUpperCase()}</span>
        <button
          className={`${styles.heart} ${isWished ? styles.heartActive : ''}`}
          onClick={onToggle}
          aria-label={isWished ? 'Quitar del itinerario' : 'Añadir al itinerario'}
        >
          {isWished ? '♥' : '♡'}
        </button>
      </div>

      {/* Body */}
      <div className={styles.body}>
        <h3 className={styles.title}>{place.nombre}</h3>
        <div className={styles.sub}>
          <span className={styles.rating}>
            <StarIcon /> {place.rating}
          </span>
          <span className={styles.ratingCount}>({place.ratingsCount})</span>
          <span className={styles.barrio}>{place.barrio}</span>
        </div>
        <p className={styles.desc}>{place.descripcion}</p>

        <div className={styles.meta}>
          <div>🚗 A {place.minutosDesdeMIA} min de tu auto · {place.kmDesdeMIA} km desde MIA</div>
          <div>🕒 {place.horarios}</div>
          <div>
            💵{' '}
            {place.gratis
              ? 'Entrada gratuita'
              : `De pago${place.precioReferencial ? ` — ${place.precioReferencial}` : ''}`}
            {!place.gratis && place.precioReferencial && (
              <span className={styles.disclaimer}> (precio referencial)</span>
            )}
          </div>
          <div>💡 <em>Recomendación local:</em> {place.tips}</div>
        </div>

        <div className={styles.actions}>
          <button
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={() => openExternal(gmapsDir)}
          >
            🚗 Cómo llegar
          </button>
          <button
            className={`${styles.btn} ${styles.btnSecondary}`}
            onClick={() => openExternal(gmapsSearch)}
          >
            ★ Reseñas
          </button>
        </div>
      </div>
    </div>
  )
}
