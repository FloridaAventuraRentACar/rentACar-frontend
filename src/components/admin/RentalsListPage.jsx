import RentalsGrid from "./RentalsGrid.jsx";
import styles from "../../styles/admin/RentalsListPage.module.css";
import SuccessNotification from "../ui/SuccessNotification.jsx";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function RentalsListPage() {

  const location = useLocation();

  // Estados para el componente de éxito
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [isSuccessAnimating, setIsSuccessAnimating] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  
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

  return (
    <div>
      <h1 className={styles.title}>Listado de alquileres</h1>
      <RentalsGrid />

      {/* Componente de notificación de éxito */}
      <SuccessNotification
        isVisible={showSuccessNotification}
        isAnimating={isSuccessAnimating}
        message="¡Alquiler actualizado exitosamente!"
        onClose={hideSuccessNotification}
      />
    </div>
  );
}
