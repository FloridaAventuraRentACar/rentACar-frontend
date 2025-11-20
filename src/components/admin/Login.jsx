import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Car, Mail, Lock, AlertCircle } from "lucide-react";
import styles from "../../styles/admin/Login.module.css";
import fetchLogin from "../../services/userService";
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Limpiar error al escribir
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetchLogin(formData.email, formData.password);
      const data = await response.data;
      login(data.jwt);
      navigate("/admin");
    } catch (error) {
      console.log(error);
      setError("Email o contraseña incorrectos. Por favor, intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {/* Decoración de fondo */}
      <div className={styles.backgroundDecoration}>
        <div className={styles.decorationCircle1}></div>
        <div className={styles.decorationCircle2}></div>
      </div>

      <div className={styles.loginCard}>
        {/* Logo y marca */}
        <div className={styles.logoSection}>
          <div className={styles.logoBadge}>
            <a href="/" className={styles.logoLink}>
              <div className={styles.logoImageWrapper}>
                <img
                  src="/FloridaAventuraLogo.jpg"
                  alt="Florida Aventura Rent a Car Logo"
                  className={styles.logoImage}
                />
              </div>
            </a>
          </div>
          <h2 className={styles.brandName}>Florida Aventura</h2>
          <p className={styles.brandSubtitle}>RentACar Admin</p>
        </div>

        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>Bienvenido de vuelta</h1>
          <p className={styles.subtitle}>
            Por favor inicia sesión como administrador
          </p>
        </div>

        {/* Mensaje de error */}
        {error && (
          <div className={styles.errorContainer}>
            <AlertCircle className={styles.errorIcon} />
            <p className={styles.errorMessage}>{error}</p>
          </div>
        )}

        {/* Formulario */}
        <form className={styles.form} onSubmit={handleSubmit} method="POST">
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              <Mail className={styles.labelIcon} />
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="username"
              className={styles.input}
              placeholder="tu@email.com"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              <Lock className={styles.labelIcon} />
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="current-password"
              className={styles.input}
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className={styles.spinner}></div>
                <span>Iniciando sesión...</span>
              </>
            ) : (
              <span>Iniciar sesión</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
