
import { useNavigate, useLocation } from "react-router-dom"
import { Home, Calendar, FileText, Car, LogOut, Menu, X } from "lucide-react"
import { useState } from "react"
import styles from "../../styles/admin/AdminSideBar.module.css"

export default function AdminSideBar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleHomeClick = () => {
    navigate("/admin")
    setIsMobileMenuOpen(false)
  }

  const handleCalendarClick = () => {
    navigate("/admin/rentals/gantt")
    setIsMobileMenuOpen(false)
  }

  const handleRentalsClick = () => {
    navigate("/admin/rentals")
    setIsMobileMenuOpen(false)
  }

  const isActive = (path) => {
    return location.pathname === path
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <>
      {/* Botón hamburguesa para móvil */}
      <button className={styles.mobileMenuButton} onClick={toggleMobileMenu} aria-label="Toggle menu">
        {isMobileMenuOpen ? <X className={styles.menuIcon} /> : <Menu className={styles.menuIcon} />}
      </button>

      {/* Overlay para móvil */}
      {isMobileMenuOpen && <div className={styles.overlay} onClick={toggleMobileMenu}></div>}

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${isMobileMenuOpen ? styles.sidebarOpen : ""}`}>
        {/* Logo y título */}
        <div className={styles.logoContainer} onClick={handleHomeClick}>
          <div className={styles.logoBadge}>
            <Car className={styles.logoIcon} />
          </div>
          <div className={styles.logoText}>
            <h1 className={styles.logoTitle}>RentACar</h1>
            <p className={styles.logoSubtitle}>Admin Panel</p>
          </div>
        </div>

        {/* Separador */}
        <div className={styles.separator}></div>

        {/* Navegación principal */}
        <nav className={styles.navigation}>
          <button
            className={`${styles.navButton} ${isActive("/admin") ? styles.navButtonActive : ""}`}
            onClick={handleHomeClick}
          >
            <Home className={styles.navIcon} />
            <span className={styles.navText}>Inicio</span>
            {isActive("/admin") && <div className={styles.activeIndicator}></div>}
          </button>

          <button
            className={`${styles.navButton} ${isActive("/admin/calendar") ? styles.navButtonActive : ""}`}
            onClick={handleCalendarClick}
          >
            <Calendar className={styles.navIcon} />
            <span className={styles.navText}>Calendario</span>
            {isActive("/admin/calendar") && <div className={styles.activeIndicator}></div>}
          </button>

          <button
            className={`${styles.navButton} ${isActive("/admin/rentals") ? styles.navButtonActive : ""}`}
            onClick={handleRentalsClick}
          >
            <FileText className={styles.navIcon} />
            <span className={styles.navText}>Listado de Alquileres</span>
            {isActive("/admin/rentals") && <div className={styles.activeIndicator}></div>}
          </button>
        </nav>

        {/* Separador */}
        <div className={styles.separator}></div>

        {/* Información del usuario */}
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
  )
}
