
import { useEffect } from "react"
import { X } from "lucide-react"
import styles from "../../styles/ui/PriceDetailsModal.module.css"
import gasTankPrices from "../../utilities/gasTankPrices"
import locationPrices from "../../utilities/locationPrices"
import travelLocationNames from "../../utilities/names/travelLocationNames"

export default function PriceDetailsModal({
  daysRented,
  pricePerDay,
  insurance,
  babySeat,
  travelLocation,
  gasTank,
  carType,
  totalPrice,
  onClose,
  isOpen = false
}) {

  if (!isOpen) return null

//   // Bloquear scroll del body cuando el modal está abierto
//   useEffect(() => {
//     document.body.style.overflow = "hidden"
//     return () => {
//       document.body.style.overflow = "unset"
//     }
//   }, [])

  // Manejar tecla Escape para cerrar el modal
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [onClose])

  const handleBackdropClick = (e) => {
    // Solo cerrar si se hace clic en el backdrop, no en el contenido
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className={styles.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="price-details-title"
    >
      <div className={styles.container}>
        {/* Botón de cerrar */}
        <button className={styles.closeButton} onClick={onClose} aria-label="Cerrar modal">
          <X className={styles.closeIcon} />
        </button>

        {/* Header del modal */}
        <div className={styles.header}>
          <h2 id="price-details-title" className={styles.modalTitle}>
            Detalles del Precio
          </h2>
          <p className={styles.modalSubtitle}>Desglose completo de tu reserva</p>
        </div>

        <div className={styles.content}>
          <div className={styles.pricePerDayContainer}>
            <div className={styles.section}>
              <h3 className={styles.title}>Gastos de alquiler</h3>
              <div className={styles.line}>
                <span className={styles.info}>
                  {daysRented} días de alquiler x US${pricePerDay}
                </span>
                <span className={styles.value}>${pricePerDay * daysRented}</span>
              </div>
            </div>

            <div className={styles.section}>
              <h3 className={styles.title}>Extras</h3>

              {/* Insurance */}
              {insurance === "TOTAL" ? (
                <div className={styles.line}>
                  <span className={styles.info}>{daysRented} días de seguro x US$15</span>
                  <span className={styles.value}>${15 * daysRented}</span>
                </div>
              ) : (
                <div className={styles.line}>
                  <span className={styles.info}>Seguro con franquicia de $500</span>
                  <span className={styles.included}>incluido</span>
                </div>
              )}

              {/* Baby seat */}
              {babySeat !== "NONE" && (
                <div className={styles.line}>
                  <span className={styles.info}>{daysRented} días de asiento de niño x US$3</span>
                  <span className={styles.value}>${3 * daysRented}</span>
                </div>
              )}

              {/* Travel location */}
              {travelLocation && (
                <div className={styles.line}>
                  <span className={styles.info}>Viajar a {travelLocationNames[travelLocation]}</span>
                  <span className={styles.value}>${locationPrices[travelLocation]}</span>
                </div>
              )}

              {/* Gas tank */}
              {gasTank === "EMPTY" && (
                <div className={styles.line}>
                  <span className={styles.info}>Tanque de gasolina</span>
                  <span className={styles.value}>${gasTankPrices[carType]}</span>
                </div>
              )}
            </div>

            <div className={styles.section}>
              <h3 className={styles.title}>Impuestos y tasas</h3>
              <div className={styles.line}>
                <span className={styles.info}>Impuestos</span>
                <span className={styles.included}>incluido</span>
              </div>
              <div className={styles.line}>
                <span className={styles.info}>Tasas</span>
                <span className={styles.included}>incluido</span>
              </div>
            </div>
          </div>

          {/* Total */}
          <div className={styles.totalContainer}>
            <h3 className={styles.totalTitle}>Total</h3>
            <div className={styles.totalLine}>
              <span className={styles.totalText}>Total a pagar</span>
              <span className={styles.totalValue}>${totalPrice}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
