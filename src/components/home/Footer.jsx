import styles from '../../styles/Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Frase empresarial */}
          <div className={styles.brandSection}>
            <h3 className={styles.brandTitle}>Florida Aventura Rent a Car</h3>
            <p className={styles.brandSlogan}>
              Tu compañero de confianza para alquilar carro en Miami con estilo y comodidad.
              Descubre la ciudad del sol con nuestra flota premium de vehículos.
            </p>
            <a
              href="/"
              className={styles.logoLink}
            >
              <div className={styles.logoImageWrapper}>
                <img
                  src="/FloridaAventuraLogo.jpg"
                  alt="Florida Aventura Rent a Car Logo"
                  className={styles.logoImage}
                />
              </div>
            </a>
          </div>

          {/* Información de contacto */}
          <div className={styles.contactSection}>
            <h4 className={styles.contactTitle}>Información de Contacto</h4>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>Teléfono:</span>
                <span className={styles.contactValue}>+1 (305) 773-1787</span>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>Email:</span>
                <span className={styles.contactValue}>floridaaventuraok@gmail.com</span>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>Dirección:</span>
                <span className={styles.contactValue}>13499 Biscayne Blvd, North Miami, FL 33181</span>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>Horarios:</span>
                <span className={styles.contactValue}>Lun - Dom: 9:00 AM - 9:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className={styles.copyright}>
          <p className={styles.copyrightText}>
            &copy; {currentYear} Florida Aventura Rent a Car. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
