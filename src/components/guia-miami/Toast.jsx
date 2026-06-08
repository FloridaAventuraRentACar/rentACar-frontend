import styles from '../../styles/guia-miami/Toast.module.css'

export default function Toast({ message }) {
  return (
    <div className={styles.toast} role="status" aria-live="polite">
      {message}
    </div>
  )
}
