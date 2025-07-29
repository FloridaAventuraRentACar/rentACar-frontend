import { useNavigate } from "react-router-dom";
import styles from "../styles/NoCarsAvailable.module.css";
import HeaderReusable from "./ui/HeaderReusable";

export default function NoCarsAvailable() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <HeaderReusable />
      <div className={styles.content}>
        {/* Icono o imagen */}
        <div className={styles.iconContainer}>
          <svg
            className={styles.carIcon}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0M15 17a2 2 0 104 0"
            />
          </svg>
        </div>

        {/* Mensaje principal */}
        <h2 className={styles.title}>Sin autos disponibles</h2>

        {/* Mensaje descriptivo */}
        <p className={styles.description}>
          Lo sentimos, no hay vehículos disponibles para las fechas
          seleccionadas. Te sugerimos modificar tu búsqueda o intentar con
          fechas diferentes.
        </p>

        {/* Sugerencias */}
        <div className={styles.suggestions}>
          <h3 className={styles.suggestionsTitle}>Sugerencias:</h3>
          <ul className={styles.suggestionsList}>
            <li>Intenta con fechas diferentes</li>
            <li>Reduce el período de alquiler</li>
            <li>Contacta con nuestro equipo para más opciones</li>
          </ul>
        </div>

        {/* Botón para regresar */}
        <button onClick={handleGoHome} className={styles.homeButton}>
          Regresar a la página principal
        </button>

        {/* Información de contacto rápido */}
        <div className={styles.contactInfo}>
          <p className={styles.contactText}>
            ¿Necesitas ayuda? Llámanos al{" "}
            <span className={styles.phoneNumber}>+1 (305) 773-1787</span>
          </p>
        </div>
      </div>
    </div>
  );
}
