import { useState, useEffect } from 'react'
import styles from '../../styles/guia-miami/IntroScreen.module.css'
import { ASSETS, INTRO_SLIDES, INTRO_SLIDES_DESKTOP } from './constants'

export default function IntroScreen({ onClose }) {
  const [current, setCurrent] = useState(0)
  const [closing, setClosing] = useState(false)
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== 'undefined' &&
      window.matchMedia('(min-width: 1024px)').matches
  )

  // En desktop usamos imágenes horizontales de mayor resolución;
  // en mobile, las verticales originales.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const onChange = e => setIsDesktop(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const slides = isDesktop ? INTRO_SLIDES_DESKTOP : INTRO_SLIDES

  useEffect(() => {
    setCurrent(0)
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides])

  const handleClose = () => {
    setClosing(true)
    setTimeout(onClose, 550)
  }

  return (
    <div className={`${styles.intro} ${closing ? styles.closing : ''}`}>
      {slides.map((slide, i) => {
        const src = isDesktop
          ? `${ASSETS}/intro/desktop/${slide}`
          : `${ASSETS}/intro/${slide}.jpg`
        return (
          <div
            key={slide}
            className={`${styles.slide} ${i === current ? styles.active : ''}`}
            style={{ backgroundImage: `url('${src}')` }}
          />
        )
      })}
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
