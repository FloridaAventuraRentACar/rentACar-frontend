import React, { useState, useEffect } from "react";
import styles from "../../styles/Header.module.css"; // Importa los estilos CSS Modules
import { Phone, Instagram } from "lucide-react"; // Para los íconos
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationLinks = [
    { href: "#inicio", label: "Inicio" },
    { href: "#unidades", label: "Nuestras Unidades" },
    { href: "#contacto", label: "Contacto" },
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

  return (
    <header
      className={`${styles.header} ${isScrolled ? styles.headerScrolled : ""} ${className}`}
    >
      <div className={styles.container}>
        <div className={styles.headerInner}>
          {/* Logo */}
          <a
            href="/"
            className={styles.logoLink}
          >
            <div className={styles.logoImageWrapper}>
              <img
                src="/FloridaAventuraLogo.png"
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
                onClick={handleSmoothScroll}
                className={styles.navLink}
              >
                {link.label}
                <span className={styles.navLinkUnderline}></span>
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className={styles.desktopActions}>
            <Button
              asChild
              variant="outline"
              size="sm"
              className={styles.whatsappButton}
            >
              <a
                href="https://wa.me/13057731787" 
                target="_blank"
                rel="noopener noreferrer"
                className={styles.buttonContent}
              >
                <WhatsAppIcon className={styles.icon} />
                <span className={styles.whatsappText}>WhatsApp</span>
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
                <Phone className={styles.icon} />
                <span className={styles.reserveText}>Reservar ahora</span>
              </a>
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className={styles.mobileMenu}>
            {/* Mobile WhatsApp Button */}
            <Button
              asChild
              variant="outline"
              size="sm"
              className={styles.mobileWhatsappButton}
            >
              <a
                href="https://wa.me/13057731787" 
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon className={styles.icon} />
              </a>
            </Button>

            
          </div>
        </div>
      </div>
    </header>
  );
}