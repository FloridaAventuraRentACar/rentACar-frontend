"use client"

import { useEffect } from "react"
import { AlertTriangle } from "lucide-react"
import styles from "../../styles/ui/ErrorModal.module.css"
import { useNavigate } from "react-router-dom"

export default function ErrorModal({ message, redirectPath, buttonText = "Volver al inicio", showModal, onClose }) {
  const navigate = useNavigate()

  // Bloquear scroll del body cuando el modal está abierto
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    // Cleanup al desmontar el componente
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [showModal])

  // Manejar tecla Escape para cerrar el modal
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape" && showModal && onClose) {
        onClose()
      }
    }

    if (showModal) {
      document.addEventListener("keydown", handleEscape)
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [showModal, onClose])

  const navigatePath = () => {
    navigate(redirectPath)
    if (onClose) {
      onClose()
    }
  }

  const handleBackdropClick = (e) => {
    // Solo cerrar si se hace clic en el backdrop, no en el contenido
    if (e.target === e.currentTarget && onClose) {
      onClose()
    }
  }

  if (!showModal) return null

  return (
    <div
      className={styles.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="error-title"
    >
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Botón de cerrar (X) */}
          {onClose && (
            <button className={styles.closeButton} onClick={onClose} aria-label="Cerrar modal">
              <svg
                className={styles.closeIcon}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}

          {/* Icono de error */}
          <div className={styles.iconContainer}>
            <AlertTriangle className={styles.icon} />
          </div>

          {/* Mensaje de error */}
          <h2 id="error-title" className={styles.title}>
            ¡Ha ocurrido un error!
          </h2>
          <p className={styles.message}>{message}</p>

          {/* Botón para redirigir */}
          <button onClick={navigatePath} className={styles.button}>
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  )
}
