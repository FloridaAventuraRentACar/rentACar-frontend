import React, { useState, useEffect } from "react";
import styles from "../styles/Header.module.css"; // Importa los estilos CSS Modules
import { Menu, MessageCircle, Phone } from "lucide-react"; // Para los íconos
import WhatsAppIcon from "./WhatsappIcon";

// Componentes placeholder para Button, Sheet y sus sub-componentes
// En un proyecto real, deberías tener tus propias implementaciones de estos componentes
// que no dependan de Shadcn UI o Tailwind.
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

const Sheet = ({ open, onOpenChange, children }) => {
  // Un componente simple para manejar el estado del menú.
  // SheetTrigger y SheetContent se manejarán por el children.
  return <>{children}</>;
};

const SheetTrigger = ({ asChild, children }) => {
  // Simplemente renderiza el hijo, pasándole la función para abrir/cerrar
  const [open, setOpen] = useState(false); // Estado interno para el trigger si no se pasa desde Sheet

  const handleClick = (e) => {
    // Si asChild es true, el primer hijo es el botón real
    if (asChild && React.isValidElement(children)) {
      if (children.props.onClick) {
        children.props.onClick(e);
      }
      // Si la Sheet principal maneja el openChange, este trigger solo lo invoca
      // Si no, podemos manejar un estado interno para un comportamiento básico de toggle
      if (typeof children.props.onClick !== 'function') { // Evita duplicar el toggle si el padre ya lo maneja
          setOpen(!open);
      }
    } else {
        setOpen(!open);
    }
  };

  if (asChild) {
    return React.cloneElement(children, { onClick: handleClick });
  }
  return <button onClick={handleClick}>{children}</button>;
};

const SheetContent = ({ side, className, children }) => {
  // Esto es una simplificación. En un caso real, necesitarías lógica para
  // renderizar esto condicionalmente (ej. basado en isMobileMenuOpen) y para la animación.
  // Aquí, simplemente aplica los estilos de la barra lateral.
  return (
    <div className={`${styles.sheetContent} ${styles[`sheetContent-${side}`]} ${className || ""}`}>
      {children}
    </div>
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
    setIsMobileMenuOpen(false); // Cierra el menú móvil después de hacer clic
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
            {/* WhatsApp Button */}
            <Button
              asChild
              variant="outline"
              size="sm"
              className={styles.whatsappButton}
            >
              <a
                href="https://wa.me/13057731787" // Deja en blanco según lo solicitado
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
                <span>Reservar</span>
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
                href="https://wa.me/13057731787" // Deja en blanco según lo solicitado
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