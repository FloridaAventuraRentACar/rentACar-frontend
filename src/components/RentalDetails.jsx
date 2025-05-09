import React from 'react';
import styles from '../styles/RentalDetails.module.css';

const RentalDetails = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img
          src="https://cdn.motor1.com/images/mgl/p0Z1A/s1/nissan-sentra-sr-2023.jpg"
          alt="Auto"
          className={styles.carImage}
        />
        <div>
          <h3 className={styles.title}>Midsize (Nissan Sentra)</h3>
          <p className={styles.subtitle}>o similar | ICAR</p>
          <p className={styles.duration}>60 días de alquiler</p>
        </div>
      </div>

      <div className={styles.details}>
        <div>
          <p className={styles.label}>Recojo</p>
          <p className={styles.location}>Miami Aeropuerto</p>
          <p className={styles.datetime}>Fri, 16. May. 2025 | 12:30</p>
        </div>
        <div>
          <p className={styles.label}>Devolución</p>
          <p className={styles.location}>Miami Aeropuerto</p>
          <p className={styles.datetime}>Tue, 15. Jul. 2025 | 08:30</p>
        </div>
      </div>

      <div className={styles.summary}>
        <h4>Su resumen de reservas:</h4>
        <ul>
          <li>✔ Línea directa de asistencia en carretera 24/7</li>
          <li>✔ 4.284 millas están incluidos, cada milla adicional cuesta $192,08</li>
          <li>
            ✔ Opción de pago: Mantente flexible - Paga al recoger tu vehículo, cancela y haz cambios en la reserva de forma gratuita hasta antes de la hora de recogida
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RentalDetails;
