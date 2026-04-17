import { useState } from "react";
import { Star, Shield, Clock, DollarSign, Car, ChevronLeft, ChevronRight } from "lucide-react";

// Importa el CSS original del sitio — garantiza que todo sea idéntico
import homeStyles from "../../styles/home/HomePage.module.css";
// Solo para elementos exclusivos de la landing (badge, overlay, fondos)
import styles from "../../styles/landing/UruguayLanding.module.css";

import HomeRentInput from "../home/HomeRentInput";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import WhatsAppFloat from "../layout/WhatsAppFloat";
import backgroundUY from "./assets/background-uy-flag.jpg";
import { cars } from "../../utilities/home/CarsToShow.js";
import testimonials from "../../utilities/home/testimonials.js";

export default function UruguayLandingPage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () =>
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () =>
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <div className={homeStyles.container}>
      <Header />
      <WhatsAppFloat />

      {/* ── HERO — estructura idéntica al original ── */}
      <section id="inicio" className={homeStyles.heroSection}>
        <div
          className={homeStyles.heroBackground}
          style={{ backgroundImage: `url(${backgroundUY})` }}
        />
        {/* Overlay con color de la landing en vez del negro del original */}
        <div className={styles.heroOverlay} />

        <div className={homeStyles.heroContent}>
          {/* Badge exclusivo de la landing */}
          <div className={styles.badge}>
            <img src="https://flagcdn.com/20x15/uy.png" alt="Uruguay" style={{ verticalAlign: 'middle', marginRight: '4px' }} /> Mundial 2026
          </div>

          <h1 className={homeStyles.heroTitle}>
            Vení a alentar a
            <span className={homeStyles.heroSubtitle}>La Celeste</span>
            en Miami
          </h1>
          <p className={homeStyles.heroDescription}>
            Te esperamos con tu vehículo listo desde que aterrizas del avión. Recibí el auto que reservaste sin sorpresas.
          </p>

          <div className={homeStyles.heroInputContainer}>
            <HomeRentInput />
          </div>
        </div>
      </section>

      {/* ── PROPUESTA — sección exclusiva de la landing ── */}
      <section className={styles.sectionPromo}>
        <div className={homeStyles.innerContainer}>
          <div className={styles.promoGrid}>
            <div className={styles.promoCard}>
              <span className={styles.promoIcon}>✈️</span>
              <h3 className={homeStyles.featureTitle}>Te esperamos en el aeropuerto</h3>
              <p className={homeStyles.featureDescription}>
                Entrega directamente en la puerta de salida del vuelo. Nada de shuttles ni trámites en counters.
              </p>
            </div>
            <div className={styles.promoCard}>
              <span className={styles.promoIcon}>🗣️</span>
              <h3 className={homeStyles.featureTitle}>Atención en español, 24/7</h3>
              <p className={homeStyles.featureDescription}>
                Sabemos que en la previa del partido cualquier duda puede surgir. Siempre hay alguien disponible.
              </p>
            </div>
            <div className={styles.promoCard}>
              <span className={styles.promoIcon}>🛡️</span>
              <h3 className={homeStyles.featureTitle}>Seguro incluido, sin letra chica</h3>
              <p className={homeStyles.featureDescription}>
                El precio que ves es el precio que pagás. Sin cargos extras al retirar el vehículo.
              </p>
            </div>
            <div className={styles.promoCard}>
              <span className={styles.promoIcon}>🏟️</span>
              <h3 className={homeStyles.featureTitle}>Conocé Miami a tu ritmo</h3>
              <p className={homeStyles.featureDescription}>
                Estadio, playa, South Beach, Wynwood. Con tu auto llegás cuando querés, sin depender de nadie.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── NUESTROS AUTOS — idéntico al original, fondo cambiado ── */}
      <section id="unidades" className={`${homeStyles.sectionUnits} ${styles.sectionCars}`}>
        <div className={homeStyles.innerContainer}>
          <div className={homeStyles.sectionHeader}>
            <h2 className={homeStyles.sectionTitle}>Nuestras Unidades</h2>
            <p className={homeStyles.sectionDescription}>
              Vehículos de último modelo, en excelente estado, listos para comenzar tu aventura. Las mejores opciones para alquilar automovil en Miami, sin sorpresas. Recibí el vehículo que reservaste.
            </p>
          </div>

          <div className={homeStyles.carsGrid}>
            {cars.map((car, index) => (
              <div key={index} className={homeStyles.carCard}>
                <div className={homeStyles.carCardContent}>
                  <div className={homeStyles.carImageContainer}>
                    <img
                      src={car.image || "/placeholder.svg"}
                      alt={car.name}
                      width={300}
                      height={200}
                      className={homeStyles.carImage}
                    />
                    <div className={homeStyles.carCategory}>{car.category}</div>
                  </div>
                  <div className={homeStyles.carInfo}>
                    <h3 className={homeStyles.carName}>{car.name}</h3>
                    <div className={homeStyles.carPriceActions}>
                      <span className={homeStyles.carPrice}>{car.price}</span>
                      <span className={homeStyles.includes}>
                        Impuestos y seguro incluidos en el precio
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.ctaCenter}>
            <a href="#inicio" className={styles.ctaButton}>Reservá tu auto</a>
          </div>
        </div>
      </section>

      {/* ── POR QUÉ ELEGIRNOS — idéntico al original ── */}
      <section className={ `${homeStyles.sectionWhyChooseUs} ${styles.sectionWhyChooseUs}` }>
        <div className={homeStyles.innerContainer}>
          <div className={homeStyles.sectionHeader}>
            <h2 className={`${homeStyles.blackTitle} ${homeStyles.sectionTitle}`}>¿Por qué elegirnos?</h2>
            <p className={`${homeStyles.sectionDescription} ${homeStyles.blackDescription}`}>
              Atención personalizada, sin complicaciones. <br /> Olvidate de las demoras al alquilar vehículo en Miami. Que el alquiler sea lo más simple del viaje, no un problema para resolver.
            </p>
          </div>

          <div className={homeStyles.featuresGrid}>
            <div className={homeStyles.featureItem}>
              <div className={homeStyles.featureIconContainer}>
                <DollarSign className={homeStyles.featureIcon} />
              </div>
              <h3 className={homeStyles.featureTitle}>Precios Competitivos</h3>
              <p className={homeStyles.featureDescription}>
                Los mejores precios del mercado con transparencia total, sin costos ocultos
              </p>
            </div>
            <div className={homeStyles.featureItem}>
              <div className={homeStyles.featureIconContainer}>
                <Clock className={homeStyles.featureIcon} />
              </div>
              <h3 className={homeStyles.featureTitle}>Atención 24/7</h3>
              <p className={homeStyles.featureDescription}>
                Soporte completo en tu idioma las 24 horas del día, los 7 días de la semana
              </p>
            </div>
            <div className={homeStyles.featureItem}>
              <div className={homeStyles.featureIconContainer}>
                <Shield className={homeStyles.featureIcon} />
              </div>
              <h3 className={homeStyles.featureTitle}>Seguro Incluido</h3>
              <p className={homeStyles.featureDescription}>
                Seguro incluido en todos nuestros vehículos
              </p>
            </div>
            <div className={homeStyles.featureItem}>
              <div className={homeStyles.featureIconContainer}>
                <Car className={homeStyles.featureIcon} />
              </div>
              <h3 className={homeStyles.featureTitle}>Flota Moderna</h3>
              <p className={homeStyles.featureDescription}>
                Vehículos nuevos y bien mantenidos para tu máxima comodidad
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIOS — idéntico al original ── */}
      <section className={`${homeStyles.sectionTestimonials} ${styles.sectionTestimonials}`}>
        <div className={homeStyles.innerContainer}>
          <div className={homeStyles.sectionHeader}>
            <h2 className={`${homeStyles.blackTitle} ${homeStyles.sectionTitle}`}>
              Lo que dicen nuestros clientes
            </h2>
            <p className={`${homeStyles.blackDescription} ${homeStyles.sectionDescription}`}>
              Miles de clientes satisfechos recomiendan nuestro servicio de alquiler de coche en Miami.
            </p>
          </div>

          <div className={homeStyles.testimonialCarousel}>
            <div className={homeStyles.testimonialCard}>
              <div className={homeStyles.testimonialCardContent}>
                <div className={homeStyles.testimonialHeader}>
                  <div
                    className={homeStyles.testimonialAvatar}
                    style={{ background: testimonials[currentTestimonial].avatarColor }}
                  >
                    {testimonials[currentTestimonial].name
                      .split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase()}
                  </div>
                  <div className={homeStyles.testimonialMeta}>
                    <h4 className={homeStyles.testimonialName}>
                      {testimonials[currentTestimonial].name}
                    </h4>
                    <p className={homeStyles.testimonialReviewCount}>
                      {testimonials[currentTestimonial].reviewCount}
                    </p>
                    <div className={homeStyles.testimonialStarsRow}>
                      <div className={homeStyles.testimonialRating}>
                        {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                          <Star key={i} className={homeStyles.starIcon} />
                        ))}
                      </div>
                      <span className={homeStyles.testimonialDate}>
                        {testimonials[currentTestimonial].date}
                      </span>
                    </div>
                  </div>
                  <svg className={homeStyles.googleLogo} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-label="Google">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                </div>
                <p className={homeStyles.testimonialComment}>
                  {testimonials[currentTestimonial].comment}
                </p>
              </div>
            </div>

            <button onClick={prevTestimonial} className={homeStyles.carouselButtonLeft} aria-label="Anterior">
              <ChevronLeft className={homeStyles.icon} />
            </button>
            <button onClick={nextTestimonial} className={homeStyles.carouselButtonRight} aria-label="Siguiente">
              <ChevronRight className={homeStyles.icon} />
            </button>
          </div>
        </div>
      </section>

      {/* ── CTA FINAL — exclusivo de la landing ── */}
      <section id="contacto" className={styles.sectionFinalCta}>
        <div className={homeStyles.innerContainer}>
          <div className={homeStyles.sectionHeader}>
            <img src="https://flagcdn.com/40x30/uy.png" alt="Uruguay" className={styles.finalCtaFlag} />
            <h2 className={homeStyles.sectionTitle}>
              Que el auto no sea un problema, disfrutá el viaje
            </h2>
            <p className={homeStyles.sectionDescription}>
              Reservá hoy y asegurá tu vehículo para cuando llegues a disfrutar del <br/> Mundial 2026 en Miami.
            </p>
          </div>
          <div className={styles.finalCtaButtons}>
            <a href="#inicio" className={styles.ctaButton}>Reservar ahora</a>
            <a
              href="https://wa.me/13057731787"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaButtonWhatsapp}
            >
              Consultar por WhatsApp
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
