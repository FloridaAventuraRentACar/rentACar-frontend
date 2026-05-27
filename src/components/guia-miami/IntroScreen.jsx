import { useState, useEffect } from 'react'
import styles from '../../styles/guia-miami/IntroScreen.module.css'
import { ASSETS, INTRO_SLIDES } from './constants'

export default function IntroScreen({ onClose }) {
  const [current, setCurrent] = useState(0)
  const [closing, setClosing] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % INTRO_SLIDES.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const handleClose = () => {
    setClosing(true)
    setTimeout(onClose, 550)
  }

  return (
    <div className={`${styles.intro} ${closing ? styles.closing : ''}`}>
      {INTRO_SLIDES.map((slide, i) => (
        <div
          key={slide}
          className={`${styles.slide} ${i === current ? styles.active : ''}`}
          style={{ backgroundImage: `url('${ASSETS}/intro/${slide}.jpg')` }}
        />
      ))}
      <div className={styles.overlay} />
      <div className={styles.card}>
        <img
          src={`${ASSETS}/imagotipo-completo.png`}
          alt="Florida Aventura"
          className={styles.logo}
        />
        <h1 className={styles.headline}>
          Miami a tu manera.<br />Tu ruta, tus reglas.
        </h1>
        <p className={styles.tagline}>
          Descubre los lugares que sólo conoces si tienes auto. Arma tu lista de deseos y nosotros te llevamos.
        </p>
        <button className={styles.cta} onClick={handleClose}>
          Comenzar mi ruta →
        </button>
      </div>
    </div>
  )
}
