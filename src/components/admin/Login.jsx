
import { useState } from "react"
import styles from "../../styles/admin/Login.module.css"

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Login attempt:", formData)
    // Handle login logic here
  }

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <div className={styles.header}>
          <h1 className={styles.title}>Bienvenido de vuelta</h1>
          <p className={styles.subtitle}>Por favor inicia sesion como administrador</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              Correo electronico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={styles.input}
              placeholder="Ingresa tu correo"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className={styles.input}
              placeholder="Ingresa tu contraseña"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className={styles.submitButton}>
            Iniciar sesion
          </button>
        </form>
      </div>
    </div>
  )
}
