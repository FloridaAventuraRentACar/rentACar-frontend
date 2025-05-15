import React from 'react';
import styles from '../styles/NoCarsAvailable.module.css';

const NoCarsAvailable = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Sin autos disponibles</h2>
        <p className={styles.message}>
          Todos los autos para esas fechas están ocupados. Por favor, elige otras fechas.
        </p>
      </div>
    </div>
  );
};

export default NoCarsAvailable;
