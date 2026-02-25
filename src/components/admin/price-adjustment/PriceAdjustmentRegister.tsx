
import { useState, useEffect, useRef } from "react"
import { X, TrendingUp, TrendingDown, DollarSign } from "lucide-react"
import styles from "../../../styles/admin/price-adjustments/PriceAdjustmentRegister.module.css"
import { PriceAdjustment, PriceAdjustmentCreate } from "../../../types/PriceAdjustment"
import ConfirmationModal from "../../ui/modals/ConfirmationModal"
import { formatDate } from "../../../utilities/functions/formatDate"


interface PriceAdjustmentRegisterProps {
  onSave: (data: PriceAdjustmentCreate) => Promise<void>
  editingItem?: PriceAdjustment | null
  onCancelEdit?: () => void
}

export default function PriceAdjustmentRegister({
  onSave,
  editingItem = null,
  onCancelEdit,
}: PriceAdjustmentRegisterProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [periodStart, setPeriodStart] = useState("")
  const [periodEnd, setPeriodEnd] = useState("")
  const [type, setType] = useState<"INCREASE" | "DECREASE">("INCREASE")
  const [percentage, setPercentage] = useState("")
  const [reason, setReason] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const modalRef = useRef<HTMLDivElement>(null)
  const [showConfirmationModal, setConfirmationModal] = useState(false)
  
  useEffect(() => {
    if (editingItem) {
      setPeriodStart(editingItem.periodStart)
      setPeriodEnd(editingItem.periodEnd)
      setType(editingItem.type)
      setPercentage(String(editingItem.percentage))
      setReason(editingItem.reason || "")
      setIsOpen(true)
    }
  }, [editingItem])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const resetForm = () => {
    setPeriodStart("")
    setPeriodEnd("")
    setType("INCREASE")
    setPercentage("")
    setReason("")
    setErrors({})
  }

  const handleClose = () => {
    setIsOpen(false)
    resetForm()
    if (editingItem && onCancelEdit) {
      onCancelEdit()
    }
  }

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}
    if (!periodStart) newErrors.periodStart = "Obligatorio"
    if (!periodEnd) newErrors.periodEnd = "Obligatorio"
    if (periodStart && periodEnd && new Date(periodEnd) <= new Date(periodStart)) {
      newErrors.periodEnd = "Debe ser posterior a la fecha de inicio"
    }
    if (!percentage || Number(percentage) < 0) {
      newErrors.percentage = "Debe ser mayor a 0"
    }
    if (type == "DECREASE" && Number(percentage) >= 100) {
      newErrors.percentage = "Debe ser menor a 100"
    }
    if (type == "INCREASE" && Number(percentage) > 100) {
      newErrors.percentage = "Debe ser menor o igual a 100"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleRegisterButtonClick = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setConfirmationModal(true)
  }
  
  const handleSubmit = async () => {
    await onSave({
      periodStart,
      periodEnd,
      type,
      percentage: Number(percentage),
      reason: reason || undefined,
    })
    handleClose()
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) handleClose()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") handleClose()
  }

  return (
    <>
      <button className={styles.registerButton} onClick={() => setIsOpen(true)}>
        <DollarSign className={styles.registerButtonIcon} />
        Registrar Ajuste de Precio
      </button>

      {isOpen && (
        <div
          className={styles.backdrop}
          onClick={handleBackdropClick}
          onKeyDown={handleKeyDown}
          tabIndex={-1}
        >
          <div className={styles.modal} ref={modalRef}>
            <div className={styles.modalHeader}>
              <div className={styles.modalHeaderLeft}>
                <div className={styles.modalIconBadge}>
                  <DollarSign className={styles.modalHeaderIcon} />
                </div>
                <div>
                  <h2 className={styles.modalTitle}>
                    {editingItem ? "Editar Ajuste" : "Nuevo Ajuste de Precio"}
                  </h2>
                  <p className={styles.modalSubtitle}>
                    {editingItem
                      ? "Modifica los datos del ajuste"
                      : "Registra un nuevo ajuste de precio"}
                  </p>
                </div>
              </div>
              <button className={styles.closeButton} onClick={handleClose} aria-label="Cerrar">
                <X className={styles.closeIcon} />
              </button>
            </div>
 
            <form onSubmit={(e) => handleRegisterButtonClick(e)} className={styles.form}>
              <div className={styles.fieldRow}>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Fecha desde</label>
                  <input
                    type="date"
                    className={styles.input}
                    value={periodStart}
                    onChange={(e) => setPeriodStart(e.target.value)}
                  />
                  {errors.periodStart && <span className={styles.error}>{errors.periodStart}</span>}
                </div>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Fecha hasta</label>
                  <input
                    type="date"
                    className={styles.input}
                    value={periodEnd}
                    onChange={(e) => setPeriodEnd(e.target.value)}
                    min={periodStart || new Date().toISOString().split("T")[0]}
                  />
                  {errors.periodEnd && <span className={styles.error}>{errors.periodEnd}</span>}
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>Tipo de ajuste</label>
                <div className={styles.typeSelector}>
                  <button
                    type="button"
                    className={`${styles.typeOption} ${type === "INCREASE" ? styles.typeIncrease : ""}`}
                    onClick={() => setType("INCREASE")}
                  >
                    <TrendingUp className={styles.typeIcon} />
                    Aumento
                  </button>
                  <button
                    type="button"
                    className={`${styles.typeOption} ${type === "DECREASE" ? styles.typeDecrease : ""}`}
                    onClick={() => setType("DECREASE")}
                  >
                    <TrendingDown className={styles.typeIcon} />
                    Bajada
                  </button>
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>Porcentaje (%)</label>
                <input
                  type="number"
                  className={styles.input}
                  value={percentage}
                  onChange={(e) => setPercentage(e.target.value)}
                  placeholder="Ej: 15"
                  min="0"
                  max="100"
                  step="1"
                />
                {errors.percentage && <span className={styles.error}>{errors.percentage}</span>}
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>
                  Motivo <span className={styles.optional}>(opcional)</span>
                </label>
                <textarea
                  className={styles.textarea}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Ej: Temporada alta de verano"
                  rows={3}
                />
              </div>

              <div className={styles.actions}>
                <button type="button" className={styles.cancelButton} onClick={handleClose}>
                  Cancelar
                </button>
                <button type="submit" className={styles.submitButton}>
                  {editingItem ? "Guardar Cambios" : "Registrar Ajuste"}
                </button>
              </div>
            </form>
          </div>

          {/* Confirmation Modal */}
          <ConfirmationModal
            isOpen={showConfirmationModal}
            type="success"
            message={`¿Estas seguro que quieres registrar una ${type === "INCREASE" ? "subida" : "bajada"} del ${percentage}%  
            en el precio por dia de los vehiculos del ${
            periodStart ? formatDate(periodStart) : ""
            } al ${periodEnd ? formatDate(periodEnd) : ""}?`}
            onConfirm={handleSubmit}
            onCancel={() => setConfirmationModal(false)}
            />
        </div>
      )}
    </>
  )
}
