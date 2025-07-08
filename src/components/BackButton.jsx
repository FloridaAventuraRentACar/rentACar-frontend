import React from 'react';
import { ArrowLeft } from 'lucide-react';
import styles from '../styles/BackButton.module.css';

const BackButton = ({ onClick }) => {
  return (
    <button
      className={styles.backButton}
      onClick={onClick}
      type="button"
    >
      <ArrowLeft className={styles.icon} size={20} />
      <span className={styles.text}>Volver</span>
    </button>
  );
};

export default BackButton;
