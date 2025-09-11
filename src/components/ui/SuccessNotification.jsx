import { CheckCircle, X } from "lucide-react"
import styles from "../../styles/ui/SuccessNotification.module.css"

export default function SuccessNotification({ 
  isVisible, 
  isAnimating, 
  message = "¡Operación exitosa!", 
  onClose 
}) {
  if (!isVisible) return null

  return (
    <div className={`${styles.successNotification} ${isAnimating ? styles.visible : styles.hidden}`}>
      <CheckCircle className={styles.icon} />
      <div className={styles.textContent}>
        <h3 className={styles.successTitle}>¡Éxito!</h3>
        <p className={styles.successMessage}>
          {message}
        </p>
      </div>
      <button
        onClick={onClose}
        className={styles.closeButton}
      >
        <X className={styles.closeIcon} />
      </button>
    </div>
  )
}