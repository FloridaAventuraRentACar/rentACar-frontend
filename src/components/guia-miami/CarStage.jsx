import styles from '../../styles/guia-miami/CarStage.module.css'
import { ASSETS, dominantCategory } from './constants'

const SCENES = {
  playa:   { bg: `${ASSETS}/moods/playa.jpg`,   caption: '<strong>Modo playero:</strong> sol, arena y brisa.' },
  noche:   { bg: `${ASSETS}/moods/noche.jpg`,   caption: '<strong>Modo nocturno:</strong> luces y ciudad.' },
  compras: { bg: `${ASSETS}/moods/compras.jpg`, caption: '<strong>Modo compras:</strong> espacio de sobra en el baúl.' },
  cultura: { bg: `${ASSETS}/moods/cultura.jpg`, caption: '<strong>Modo explorador:</strong> descubriendo tesoros.' },
  foodie:  { bg: `${ASSETS}/moods/foodie.jpg`,  caption: '<strong>Modo foodie:</strong> sabores de Miami.' },
}

const EMPTY_CAPTION = 'Tu Florida Aventura te espera.'

export default function CarStage({ countsByCategory, mini = false }) {
  const cat = dominantCategory(countsByCategory)
  const scene = cat ? SCENES[cat] : null
  const caption = scene ? scene.caption : EMPTY_CAPTION

  return (
    <div className={`${styles.wrap} ${mini ? styles.mini : ''}`}>
      <div className={styles.carWrap}>
        {/* Scene background – key triggers scene-zoom restart on change */}
        {scene ? (
          <div
            key={cat}
            className={styles.scene}
            style={{ backgroundImage: `url('${scene.bg}')` }}
          />
        ) : (
          <div className={`${styles.scene} ${styles.sceneEmpty}`} />
        )}
        <div className={styles.overlay} />
        {/* key triggers car-pop animation restart when dominant category changes */}
        <img
          key={`car-${cat ?? 'empty'}`}
          className={styles.car}
          src={`${ASSETS}/auto-fa.png`}
          alt="Florida Aventura"
          draggable={false}
        />
      </div>

      {!mini && (
        <p
          className={styles.caption}
          dangerouslySetInnerHTML={{ __html: caption }}
        />
      )}
    </div>
  )
}
