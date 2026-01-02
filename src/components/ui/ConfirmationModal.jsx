
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react"
import styles from "../../styles/ui/ConfirmationModal.module.css"

const ConfirmationModal = ({
  message,
  onConfirm,
  onCancel,
  isOpen = false,
  type = "warning", // 'warning', 'danger', 'success'
}) => {
  if (!isOpen) return null

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className={styles.iconSuccess} />
      case "danger":
        return <XCircle className={styles.iconDanger} />
      default:
        return <AlertTriangle className={styles.iconWarning} />
    }
  }

  const getTitle = () => {
    switch (type) {
      case "success":
        return "Confirmación"
      case "danger":
        return "Acción Peligrosa"
      default:
        return "Confirmar Acción"
    }
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onCancel()
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onCancel()
    }
  }


  return (
    <div className={styles.backdrop} onClick={handleBackdropClick} onKeyDown={handleKeyDown} tabIndex={-1}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <div className={styles.iconContainer}>{getIcon()}</div>
          <h3 className={styles.title}>{getTitle()}</h3>
        </div>

        <div className={styles.content}>
          <p className={styles.message}>{message}</p>
        </div>

        <div className={styles.actions}>
          <button className={`${styles.button} ${styles.cancelButton}`} onClick={onCancel} type="button">
            Cancelar
          </button>
          <button className={`${styles.button} ${styles.confirmButton}`} onClick={onConfirm} type="button" autoFocus>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModal
