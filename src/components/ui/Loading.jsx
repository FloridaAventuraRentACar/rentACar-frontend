
import styles from "../../styles/ui/Loading.module.css"

export default function Loading({ text = "Cargando..." }) {
  return (
    <div className={styles.backdrop}>
      <div className={styles.container}>
        {/* Spinner circular */}
        <div className={styles.spinnerWrapper}>
          <div className={styles.spinner}>
            <div className={styles.spinnerCircle}></div>
          </div>
          <div className={styles.pulseRing}></div>
        </div>

        {/* Texto de carga */}
        <div className={styles.textContainer}>
          <h2 className={styles.loadingText}>{text}</h2>
          <div className={styles.dots}>
            <span className={styles.dot}></span>
            <span className={styles.dot}></span>
            <span className={styles.dot}></span>
          </div>
        </div>

        {/* Barra de progreso decorativa */}
        <div className={styles.progressBar}>
          <div className={styles.progressFill}></div>
        </div>
      </div>
    </div>
  )
}
