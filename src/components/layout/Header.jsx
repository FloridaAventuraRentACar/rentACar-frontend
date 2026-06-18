import React, { useState, useEffect } from "react";
import styles from "../../styles/layout/Header.module.css"; // Importa los estilos CSS Modules
import { Instagram, Menu, X, MapPin, CalendarDays } from "lucide-react"; // Para los íconos
import WhatsAppIcon from "../icons/WhatsappIcon";

// Componentes placeholder para Button, Sheet y sus sub-componentes
const Button = ({ asChild, children, className, variant, size, ...props }) => {
  if (asChild) {
    // Si asChild es true, esperamos que el primer hijo sea un elemento, como un <a>
    return React.cloneElement(children, {
      className: `${styles.button} ${className || ""} ${variant ? styles[variant] : ""} ${size ? styles[size] : ""}`,
      ...props,
    });
  }
  return (
    <button
      className={`${styles.button} ${className || ""} ${variant ? styles[variant] : ""} ${size ? styles[size] : ""}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default function Header({ className = "" }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Bloquea el scroll del body mientras el menú mobile está abierto
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const navigationLinks = [
    { href: "#inicio", label: "Inicio" },
    { href: "#unidades", label: "Nuestras Unidades" },
    { href: "#contacto", label: "Contacto" },
    { href: "/guia-miami", label: "Guía Miami" },
  ];

  const handleSmoothScroll = (e) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute("href");
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Click en un link del menú mobile: cierra el panel y, si es ancla, hace scroll suave
  const handleMobileNavClick = (e) => {
    const href = e.currentTarget.getAttribute("href");
    if (href && href.startsWith("#")) {
      handleSmoothScroll(e);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
    <header
      className={`${styles.header} ${isScrolled ? styles.headerScrolled : ""} ${className}`}
    >
      <div className={styles.container}>
        <div className={styles.headerInner}>
          {/* Logo */}
          <a
            href="#inicio"
            onClick={handleSmoothScroll}
            className={styles.logoLink}
          >
            <div className={styles.logoImageWrapper}>
              <img
                src="/FloridaAventuraLogo.jpg"
                alt="Florida Aventura Rent a Car Logo"
                className={styles.logoImage}
              />
            </div>
            <div className={styles.logoTextWrapper}>
              <h1 className={styles.logoTitle}>Florida Aventura</h1>
              <p className={styles.logoSubtitle}>Rent a Car</p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className={styles.desktopNav}>
            {navigationLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={link.href.startsWith("#") ? handleSmoothScroll : undefined}
                className={styles.navLink}
              >
                {link.label}
                <span className={styles.navLinkUnderline}></span>
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className={styles.desktopActions}>
            {/* Instagram Button */}
            <Button asChild className={styles.instagramButton}>
              <a
                href="https://www.instagram.com/floridaaventura/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.buttonContent}
              >
                <Instagram className={styles.icon} />
              </a>
            </Button>
            {/* Reserve Button */}
            <Button
              asChild
              className={styles.reserveButton}
            >
              <a
                href="#inicio"
                onClick={handleSmoothScroll}
                className={styles.buttonContent}
              >
                <CalendarDays className={styles.icon} />
                <span className={styles.reserveText}>Reservar ahora</span>
              </a>
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className={styles.mobileMenu}>
            {/* Instagram Button */}
            <Button asChild className={styles.instagramButton}>
              <a
                href="https://www.instagram.com/floridaaventura/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.buttonContent}
              >
                <Instagram className={styles.icon} />
              </a>
            </Button>
            <Button
              asChild
              className={`${styles.reserveButton} ${styles.mobilePhoneButton}`}
            >
              <a
                href="#inicio"
                onClick={handleSmoothScroll}
                className={styles.buttonContent}
                aria-label="Reservar ahora"
              >
                <CalendarDays className={styles.icon} />
              </a>
            </Button>
            {/* Hamburger trigger */}
            <Button
              className={styles.menuTriggerButton}
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Abrir menú"
              aria-expanded={isMobileMenuOpen}
            >
              <Menu className={styles.menuIcon} />
            </Button>
          </div>
        </div>
      </div>
    </header>

    {/* Mobile Sidebar (sheet) — fuera del header para que position:fixed
        no quede atrapado por el backdrop-filter del header */}
      <div
        className={`${styles.sheetOverlay} ${isMobileMenuOpen ? styles.sheetOverlayOpen : ""}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />
      <aside
        className={`${styles.sheetContent} ${styles["sheetContent-right"]} ${isMobileMenuOpen ? styles.sheetOpen : ""}`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className={styles.mobileMenuInner}>
          <div className={styles.mobileMenuHeader}>
            <div className={styles.mobileLogoWrapper}>
              <div className={styles.mobileLogoImageWrapper}>
                <img
                  src="/FloridaAventuraLogo.jpg"
                  alt="Florida Aventura Rent a Car Logo"
                  className={styles.mobileLogoImage}
                />
              </div>
              <div>
                <p className={styles.mobileLogoTitle}>Florida Aventura</p>
                <p className={styles.mobileLogoSubtitle}>Rent a Car</p>
              </div>
            </div>
            <Button
              className={styles.menuTriggerButton}
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Cerrar menú"
            >
              <X className={styles.menuIcon} />
            </Button>
          </div>

          <nav className={styles.mobileNavLinks}>
            {navigationLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleMobileNavClick}
                className={styles.mobileNavLink}
              >
                {link.href === "/guia-miami" && (
                  <MapPin className={styles.menuIcon} />
                )}
                <span className={styles.mobileNavLinkText}>{link.label}</span>
              </a>
            ))}
          </nav>

          <div className={styles.mobileActions}>
            <Button asChild className={styles.mobileReserveButtonFull}>
              <a
                href="#inicio"
                onClick={handleMobileNavClick}
                className={styles.buttonContent}
              >
                <CalendarDays className={styles.icon} />
                <span className={styles.reserveText}>Reservar ahora</span>
              </a>
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
