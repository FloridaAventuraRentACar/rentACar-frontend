import { useNavigate, useLocation } from "react-router-dom";
import { Home, Calendar, FileText, Car, Menu, X, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import styles from "../../styles/admin/AdminSideBar.module.css";

export default function AdminSideBar({ forceToggle = false }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1500);

  // 🔹 Detecta si la pantalla es móvil y actualiza al redimensionar
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1500);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const handleNavigate = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  // 🔹 Decide si se debe usar el modo “colapsable”
  const isCollapsible = isMobile || forceToggle;

  return (
    <>
      {/* Botón hamburguesa visible solo en modo colapsable */}
      {isCollapsible && (
        <button
          className={styles.mobileMenuButton}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className={styles.menuIcon} />
          ) : (
            <Menu className={styles.menuIcon} />
          )}
        </button>
      )}

      {/* Overlay solo visible cuando el menú está abierto */}
      {isCollapsible && isMenuOpen && (
        <div className={styles.overlay} onClick={toggleMenu}></div>
      )}

      {/* Sidebar */}
      <aside
        className={`${styles.sidebar} ${
          isCollapsible
            ? isMenuOpen
              ? styles.sidebarOpen
              : styles.sidebarClosed
            : styles.sidebarFixed
        }`}
      >
        {/* Logo */}
        <div className={styles.logoContainer} onClick={() => handleNavigate("/admin")}>
          <div className={styles.logoBadge}>
            <Car className={styles.logoIcon} />
          </div>
          <div className={styles.logoText}>
            <h1 className={styles.logoTitle}>RentACar</h1>
            <p className={styles.logoSubtitle}>Admin Panel</p>
          </div>
        </div>

        <div className={styles.separator}></div>

        {/* Navegación */}
        <nav className={styles.navigation}>
          <button
            className={`${styles.navButton} ${
              isActive("/admin") ? styles.navButtonActive : ""
            }`}
            onClick={() => handleNavigate("/admin")}
          >
            <Home className={styles.navIcon} />
            <span className={styles.navText}>Inicio</span>
          </button>

          <button
            className={`${styles.navButton} ${
              isActive("/admin/rentals/gantt") ? styles.navButtonActive : ""
            }`}
            onClick={() => handleNavigate("/admin/rentals/gantt")}
          >
            <Calendar className={styles.navIcon} />
            <span className={styles.navText}>Calendario</span>
          </button>

          <button
            className={`${styles.navButton} ${
              isActive("/admin/rentals") ? styles.navButtonActive : ""
            }`}
            onClick={() => handleNavigate("/admin/rentals")}
          >
            <FileText className={styles.navIcon} />
            <span className={styles.navText}>Listado de Alquileres</span>
          </button>

          <button
            className={`${styles.navButton} ${
              isActive("/admin/register") ? styles.navButtonActive : ""
            }`}
            onClick={() => handleNavigate("/admin/register")}
          >
            <Plus className={styles.navIcon} />
            <span className={styles.navText}>Registrar alquiler</span>
          </button>
        </nav>

        <div className={styles.separator}></div>

        {/* Usuario */}
        <div className={styles.userSection}>
          <div className={styles.userInfo}>
            <div className={styles.userAvatar}>
              <span className={styles.userInitial}>P</span>
            </div>
            <div className={styles.userDetails}>
              <p className={styles.userName}>Patricia</p>
              <p className={styles.userRole}>Administrador</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
