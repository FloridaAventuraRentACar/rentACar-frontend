import styles from '../../styles/guia-miami/TopBar.module.css'
import { ASSETS } from './constants'

export default function TopBar({ cats, activeCategory, setActiveCategory, freeOnly, setFreeOnly }) {
  const allChips = [
    { key: 'all', label: 'Todo', icono: '🗺️' },
    ...Object.entries(cats).map(([key, c]) => ({ key, label: c.label, icono: c.icono })),
  ]

  return (
    <header className={styles.bar}>
      <div className={styles.brand}>
        <img src={`${ASSETS}/imagotipo.png`} alt="Florida Aventura" className={styles.logo} />
        <div className={styles.brandText}>
          <span className={styles.brandTop}>Tu ruta</span>
          <span className={styles.brandBot}>Florida Aventura</span>
        </div>
      </div>

      <div className={styles.chips}>
        {allChips.map(({ key, label, icono }) => (
          <button
            key={key}
            className={`${styles.chip} ${activeCategory === key ? styles.chipActive : ''}`}
            onClick={() => setActiveCategory(key)}
          >
            <span>{icono}</span> {label}
          </button>
        ))}
      </div>

      <label className={styles.toggle}>
        <input
          type="checkbox"
          checked={freeOnly}
          onChange={e => setFreeOnly(e.target.checked)}
          style={{ accentColor: '#1AAFAF' }}
        />
        <span>Planes gratuitos</span>
      </label>
    </header>
  )
}
