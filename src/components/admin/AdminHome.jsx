"use client";

import { useNavigate } from "react-router-dom";
import { Calendar, FileText, TrendingUp, Car } from "lucide-react";
import styles from "../../styles/admin/AdminHome.module.css";
import AdminSideBar from "./AdminSideBar";

export default function AdminHome() {
  const navigate = useNavigate();

  const handleCalendarClick = () => {
    navigate("/admin/rentals/gantt");
  };

  const handleRentalsClick = () => {
    navigate("/admin/rentals");
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
                src="/FloridaAventuraLogo.png"
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
            onClick={handleRentalsClick}
            className={styles.secondaryButton}
          >
            <div className={styles.buttonContent}>
              <FileText className={styles.buttonIcon} />
              <div className={styles.buttonText}>
                <span className={styles.buttonTitle}>
                  Ver Listado de Alquileres
                </span>
                <span className={styles.buttonSubtitle}>
                  Historial completo
                </span>
              </div>
            </div>
          </button>
        </div>

        {/* Información adicional */}
        <div className={styles.infoCards}>
          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>
              <Calendar className={styles.infoIconSvg} />
            </div>
            <div className={styles.infoText}>
              <span className={styles.infoNumber}>12</span>
              <span className={styles.infoLabel}>Reservas activas</span>
            </div>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>
              <Car className={styles.infoIconSvg} />
            </div>
            <div className={styles.infoText}>
              <span className={styles.infoNumber}>8</span>
              <span className={styles.infoLabel}>Vehículos disponibles</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
