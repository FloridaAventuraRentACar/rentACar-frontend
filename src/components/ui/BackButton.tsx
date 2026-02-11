import { useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import styles from "../../styles/ui/BackButton.module.css"

interface BackButtonProps {
  label?: string
  href?: string
}

export function BackButton({ label = "Volver", href }: BackButtonProps) {
  const navigate = useNavigate()

  const handleClick = () => {
    if (href) {
      navigate(href)
    } else {
      navigate(-1)
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={styles.backButton}
      aria-label={label}
    >
      <span className={styles.iconWrapper}>
        <ArrowLeft className={styles.icon} strokeWidth={2.5} />
      </span>
      <span>{label}</span>
    </button>
  )
}