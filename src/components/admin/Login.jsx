import { useContext, useState } from "react";
import styles from "../../styles/admin/Login.module.css";
import fetchLogin from "../../services/userService";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login attempt:", formData);
    try {
      const response = await fetchLogin(formData.email, formData.password);
      const data = await response.data;
      login(data.jwt);
      console.log(data);
      navigate("/admin");
    } catch (error) {
      console.log(error);
      alert("Email o contraseña incorrectos");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <div className={styles.header}>
          <h1 className={styles.title}>Bienvenido de vuelta</h1>
          <p className={styles.subtitle}>
            Por favor inicia sesion como administrador
          </p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit} method="POST">
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              Correo electronico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="username"
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
              autoComplete="current-password"
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
  );
}
