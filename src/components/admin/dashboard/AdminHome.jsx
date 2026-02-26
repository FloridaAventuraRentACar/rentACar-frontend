"use client";

import { useNavigate, useLocation } from "react-router-dom";
import { Calendar, FileText, TrendingUp, Car, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import styles from "../../../styles/admin/dashboard/AdminHome.module.css";
import AdminSideBar from "./AdminSideBar";
import SuccessNotification from "../../ui/feedback/SuccessNotification.jsx";

export default function AdminHome() {
  const navigate = useNavigate();
  const location = useLocation();

  // Estados para el componente de éxito
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [isSuccessAnimating, setIsSuccessAnimating] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Función para mostrar la notificación de éxito
  const showSuccessMessage = () => {
    setShowSuccessNotification(true);
    setIsSuccessAnimating(true);

    // Después de 5 segundos, inicia la animación de salida
    setTimeout(() => {
      setIsSuccessAnimating(false);
    }, 5000);

    // Después de la animación de salida, oculta completamente
    setTimeout(() => {
      setShowSuccessNotification(false);
    }, 5300);
  };

  // Función para ocultar manualmente la notificación
  const hideSuccessNotification = () => {
    setIsSuccessAnimating(false);
    setTimeout(() => {
      setShowSuccessNotification(false);
    }, 300);
  };

  // Verificar si se debe mostrar la notificación de éxito al cargar el componente
  useEffect(() => {
    if (location.state?.showSuccess) {
      const message = location.state.message || "¡Operación exitosa!";
      setSuccessMessage(message);
      showSuccessMessage();

      // Limpiar el state de navegación para que no se muestre de nuevo al recargar
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleCalendarClick = () => {
    navigate("/admin/rentals/gantt");
  };

  const handlePriceAdjustmentClick = () => {
    navigate("/admin/price-adjustment");
  };

  const handleRegisterClick = () => {
    navigate("/admin/register");
  };

  return (
    <div className={styles.container}>
      {/* Decoración de fondo */}
      <div className={styles.backgroundDecoration}>
        <div className={styles.decorationCircle1}></div>
        <div className={styles.decorationCircle2}></div>
      </div>

      <AdminSideBar />
      <div className={styles.content}>
        {/* Icono decorativo */}
        <div className={styles.iconContainer}>

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

        {/* Mensaje de bienvenida */}
        <div className={styles.welcomeSection}>
          <h1 className={styles.welcomeTitle}>Bienvenida de vuelta</h1>
          <h2 className={styles.userName}>Patricia</h2>
          <p className={styles.subtitle}>Panel de administración RentACar</p>
        </div>

        {/* Botones de acción */}
        <div className={styles.buttonContainer}>
          <button
            onClick={handleCalendarClick}
            className={styles.primaryButton}
          >
            <div className={styles.buttonContent}>
              <Calendar className={styles.buttonIcon} />
              <div className={styles.buttonText}>
                <span className={styles.buttonTitle}>Ver Calendario</span>
                <span className={styles.buttonSubtitle}>
                  Gestión de reservas
                </span>
              </div>
            </div>
          </button>


          <button
            onClick={handleRegisterClick}
            className={styles.secondaryButton}
          >
            <div className={styles.buttonContent}>
              <Plus className={styles.buttonIcon} />
              <div className={styles.buttonText}>
                <span className={styles.buttonTitle}>
                  Registrar alquiler
                </span>
                <span className={styles.buttonSubtitle}>
                  Nuevo registro
                </span>
              </div>
            </div>
          </button>

          <button
            onClick={handlePriceAdjustmentClick}
            className={styles.secondaryButton}
          >
            <div className={styles.buttonContent}>
              <FileText className={styles.buttonIcon} />
              <div className={styles.buttonText}>
                <span className={styles.buttonTitle}>
                  Ajuste de precios
                </span>
                <span className={styles.buttonSubtitle}>
                  Modifica el precio de los vehiculos en un período
                </span>
              </div>
            </div>
          </button>
        </div>
      </div>
      {/* Componente de notificación de éxito */}
      <SuccessNotification
        isVisible={showSuccessNotification}
        isAnimating={isSuccessAnimating}
        message={successMessage}
        onClose={hideSuccessNotification}
      />
    </div>
  );
}
