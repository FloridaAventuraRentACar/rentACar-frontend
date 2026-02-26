
import { useState, useEffect } from "react"
import {
  DollarSign,
  Edit2,
  Trash2,
  TrendingUp,
  TrendingDown,
  Calendar,
  AlertCircle,
} from "lucide-react"
import styles from "../../../styles/admin/price-adjustments/PriceAdjustmentList.module.css"
import ErrorModal from "../../ui/modals/ErrorModal"
import Loading from "../../ui/feedback/Loading"
import ConfirmationModal from "../../ui/modals/ConfirmationModal"
import { PriceAdjustment, PriceAdjustmentCreate } from "../../../types/PriceAdjustment"
import { formatDate } from "../../../utilities/functions/formatDate"
import PriceAdjustmentRegister from "./PriceAdjustmentRegister"

interface PriceAdjustmentListProps {
  fetchAdjustments: () => Promise<{ data: PriceAdjustment[] }>
  onSave: (data: PriceAdjustmentCreate) => Promise<{ data: PriceAdjustment }>
  onUpdate: (id: number, data: Omit<PriceAdjustment, "id" | "active">) => Promise<{ data: PriceAdjustment }>
  onDelete: (id: number) => Promise<void>
}

export default function PriceAdjustmentList({
  fetchAdjustments,
  onSave,
  onUpdate,
  onDelete,
}: PriceAdjustmentListProps) {
  const [adjustments, setAdjustments] = useState<PriceAdjustment[]>([])
  const [loading, setLoading] = useState(true)
  const [editingItem, setEditingItem] = useState<PriceAdjustment | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<PriceAdjustment | null>(null)
  const [errorModal, setErrorModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const loadData = async () => {
    setLoading(true)
    try {
      const { data } = await fetchAdjustments()
      setAdjustments(data)
    } catch (error) {
      setErrorModal(true)
      setErrorMessage("Error al cargar los ajustes de precio")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleSave = async (data: PriceAdjustmentCreate) => {
    try {
      if (editingItem) {
        await onUpdate(editingItem.id, data)
      } else {
        await onSave(data)
      }
      setEditingItem(null)
      await loadData()
    } catch (error : any) {
      setErrorModal(true)
      setErrorMessage(error.response.data.message)
    }
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    try {
      await onDelete(deleteTarget.id)
      setDeleteTarget(null)
      await loadData()
    } catch (error : any) {
      setErrorModal(true)
      setErrorMessage(error.response.data.message)
    }
  }

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Loading text="Cargando ajustes de precio..." />
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.iconBadge}>
            <DollarSign className={styles.headerIcon} />
          </div>
          <div>
            <h2 className={styles.title}>Ajustes de Precio</h2>
            <p className={styles.subtitle}>
              {adjustments.length} ajuste{adjustments.length !== 1 ? "s" : ""} registrado
              {adjustments.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
        <PriceAdjustmentRegister
          onSave={handleSave}
          editingItem={editingItem}
          onCancelEdit={() => setEditingItem(null)}
        />
      </div>

      {adjustments.length === 0 ? (
        <div className={styles.emptyState}>
          <AlertCircle className={styles.emptyIcon} />
          <p className={styles.emptyTitle}>Sin ajustes registrados</p>
          <p className={styles.emptyText}>
            No hay ajustes de precio registrados. Crea uno nuevo para comenzar.
          </p>
        </div>
      ) : (
        <div className={styles.list}>
          {adjustments.map((item) => (
            <div
              key={item.id}
              className={`${styles.card} ${!item.active ? styles.cardInactive : ""}`}
            >
              {!item.active && <div className={styles.inactiveBadge}>Inactivo</div>}

              <div className={styles.cardTop}>
                <div
                  className={`${styles.typeBadge} ${
                    item.type === "INCREASE" ? styles.badgeIncrease : styles.badgeDecrease
                  }`}
                >
                  {item.type === "INCREASE" ? (
                    <TrendingUp className={styles.badgeIcon} />
                  ) : (
                    <TrendingDown className={styles.badgeIcon} />
                  )}
                  {item.type === "INCREASE" ? "Aumento" : "Bajada"}
                </div>
                <span
                  className={`${styles.percentage} ${
                    item.type === "INCREASE" ? styles.percentageIncrease : styles.percentageDecrease
                  }`}
                >
                  {item.type === "INCREASE" ? "+" : "-"}
                  {item.percentage}%
                </span>
              </div>

              <div className={styles.cardDates}>
                <Calendar className={styles.dateIcon} />
                <span className={styles.dateText}>
                  {formatDate(item.periodStart)} - {formatDate(item.periodEnd)}
                </span>
              </div>

              {item.reason && <p className={styles.reason}>{item.reason}</p>}

              {item.active && (
                <div className={styles.cardActions}>
                  <button
                    className={styles.editButton}
                    onClick={() => setEditingItem(item)}
                  >
                    <Edit2 className={styles.actionIcon} />
                    Editar
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => setDeleteTarget(item)}
                  >
                    <Trash2 className={styles.actionIcon} />
                    Eliminar
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <ConfirmationModal
        isOpen={!!deleteTarget}
        type="danger"
        message={`¿Estas seguro que quieres eliminar este ajuste de precio del ${
          deleteTarget ? formatDate(deleteTarget.periodStart) : ""
        } al ${deleteTarget ? formatDate(deleteTarget.periodEnd) : ""}?`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />

      <ErrorModal
        showModal={errorModal}
        message={errorMessage}
        redirectPath="/admin/price-adjustment"
        buttonText="Volver a los ajustes de precio"
        onClose={() => setErrorModal(false)}
      />
    </div>
  )
}
