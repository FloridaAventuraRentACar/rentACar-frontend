import { useState, useEffect, useContext } from "react";
import { Star, Shield, Clock, DollarSign, Car, ChevronLeft, ChevronRight, HelpCircle } from 'lucide-react';
import styles from "../../styles/home/HomePage.module.css";
import HomeRentInput from "./HomeRentInput";
import Header from "../layout/Header";
import Card from "../ui/cards/Card.jsx";
import CardContent from "../ui/cards/CardContent.jsx";
import { cars } from "../../utilities/home/CarsToShow.js";
import ContactUs from "./ContactUs.jsx";
import Footer from "../layout/Footer";
import testimonials from "../../utilities/home/testimonials.js";
import { AppContext } from "../../context/AppContext.jsx";
import { faqs } from "../../utilities/home/faqs.js";
import WhatsAppFloat from "../layout/WhatsAppFloat";


export default function HomePage() {
  const [scrollY, setScrollY] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentFaq, setCurrentFaq] = useState(0);
  const { clearRentalData } = useContext(AppContext);

  useEffect(() => {
    clearRentalData();
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const nextFaq = () => {
    setCurrentFaq((prev) => (prev + 1) % faqs.length);
  };

  const prevFaq = () => {
    setCurrentFaq((prev) => (prev - 1 + faqs.length) % faqs.length);
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <Header />
      <WhatsAppFloat />
      {/* Hero Section */}
      <section id="inicio" className={styles.heroSection}>
        <div
          className={styles.heroBackground}
          style={{
            backgroundImage: `url("/backgroundLandingPage.jpg")`,
          }}
        />
        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Alquiler de autos en Miami
            <span className={styles.heroSubtitle}>sin filas ni sorpresas</span>
          </h1>
          <p className={styles.heroDescription}>
            Renta de autos en Miami con entrega directa en el aeropuerto. El vehículo que reservaste, ese mismo te espera.
          </p>

          <div className={styles.heroInputContainer}>
            <HomeRentInput />
          </div>
        </div>
      </section>

      {/* Nuestras Unidades */}
      <section id="unidades" className={styles.sectionUnits}>
        <div className={styles.innerContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Nuestras Unidades</h2>
            <p className={styles.sectionDescription}>
              Vehículos de último modelo, en excelente estado, listos para comenzar tu aventura. Las mejores opciones para alquilar automovil en Miami, sin sorpresas. Recibí el vehículo que reservaste.
            </p>
          </div>

          <div className={styles.carsGrid}>
            {cars.map((car, index) => (
              <Card key={index} className={styles.carCard}>
                <CardContent className={styles.carCardContent}>
                  <div className={styles.carImageContainer}>
                    <img
                      src={car.image || "/placeholder.svg"}
                      alt={car.name}
                      width={300}
                      height={200}
                      className={styles.carImage}
                    />
                    <div className={styles.carCategory}>{car.category}</div>
                  </div>
                  <div className={styles.carInfo}>
                    <h3 className={styles.carName}>{car.name}</h3>
                    <div className={styles.carPriceActions}>
                      <span className={styles.carPrice}>{car.price}</span>
                      <span className={styles.includes}>
                        Impuestos y seguro incluidos en el precio
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ¿Por qué elegirnos? */}
      <section className={styles.sectionWhyChooseUs}>
        <div className={styles.innerContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={` ${styles.blackTitle} ${styles.sectionTitle} `}>¿Por qué elegirnos?</h2>
            <p className={`${styles.sectionDescription} ${styles.blackDescription}`}>
              Alquilar un auto en Miami con Florida Aventura es simple: coordinas por WhatsApp, aterrizas y el vehículo ya está listo. Precio final, seguro incluido, atención en tu idioma.
            </p>
          </div>

          <div className={styles.featuresGrid}>
            <div className={styles.featureItem}>
              <div className={styles.featureIconContainer}>
                <DollarSign className={styles.featureIcon} />
              </div>
              <h3 className={styles.featureTitle}>Precios Competitivos</h3>
              <p className={styles.featureDescription}>
                Los mejores precios del mercado con transparencia total, sin
                costos ocultos
              </p>
            </div>

            <div className={styles.featureItem}>
              <div className={styles.featureIconContainer}>
                <Clock className={styles.featureIcon} />
              </div>
              <h3 className={styles.featureTitle}>Atención 24/7</h3>
              <p className={styles.featureDescription}>
                Soporte completo en tu idioma las 24 horas del día, los 7 días de la semana
              </p>
            </div>

            <div className={styles.featureItem}>
              <div className={styles.featureIconContainer}>
                <Shield className={styles.featureIcon} />
              </div>
              <h3 className={styles.featureTitle}>Seguro Incluido</h3>
              <p className={styles.featureDescription}>
                Seguro incluido en todos nuestros vehículos
              </p>
            </div>

            <div className={styles.featureItem}>
              <div className={styles.featureIconContainer}>
                <Car className={styles.featureIcon} />
              </div>
              <h3 className={styles.featureTitle}>Flota Moderna</h3>
              <p className={styles.featureDescription}>
                Vehículos nuevos y bien mantenidos para tu máxima comodidad
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.sectionFaq}>
        <div className={styles.innerContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Preguntas Frecuentes</h2>
            <p className={styles.sectionDescription}>
              Encuentra respuestas a las preguntas más comunes sobre nuestro servicio de renta de autos
            </p>
          </div>

          <div className={styles.faqCarousel}>
            <Card className={styles.faqCard}>
              <CardContent className={styles.faqCardContent}>
                <div className={styles.faqIconContainer}>
                  <HelpCircle className={styles.faqIcon} />
                </div>
                <h3 className={styles.faqQuestion}>
                  {faqs[currentFaq].question}
                </h3>
                <p className={styles.faqAnswer}>
                  {faqs[currentFaq].answer}
                </p>
                <div className={styles.faqCounter}>
                  {currentFaq + 1} / {faqs.length}
                </div>
              </CardContent>
            </Card>

            <button
              onClick={prevFaq}
              className={styles.carouselButtonLeft}
              aria-label="Pregunta anterior"
            >
              <ChevronLeft className={styles.icon} />
            </button>
            <button
              onClick={nextFaq}
              className={styles.carouselButtonRight}
              aria-label="Siguiente pregunta"
            >
              <ChevronRight className={styles.icon} />
            </button>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className={styles.sectionTestimonials}>
        <div className={styles.innerContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={` ${styles.blackTitle} ${styles.sectionTitle} `}>
              Lo que dicen nuestros clientes
            </h2>
            <p className={` ${styles.blackDescription} ${styles.sectionDescription}`}>
              Miles de clientes satisfechos recomiendan nuestro servicio de alquiler de coche en Miami.
            </p>
          </div>

          <div className={styles.testimonialCarousel}>
            <Card className={styles.testimonialCard}>
              <CardContent className={styles.testimonialCardContent}>
                {/* Header: avatar + nombre + Google logo */}
                <div className={styles.testimonialHeader}>
                  <div
                    className={styles.testimonialAvatar}
                    style={{ background: testimonials[currentTestimonial].avatarColor }}
                  >
                    {testimonials[currentTestimonial].name
                      .split(" ")
                      .slice(0, 2)
                      .map((w) => w[0])
                      .join("")
                      .toUpperCase()}
                  </div>
                  <div className={styles.testimonialMeta}>
                    <h4 className={styles.testimonialName}>
                      {testimonials[currentTestimonial].name}
                    </h4>
                    <p className={styles.testimonialReviewCount}>
                      {testimonials[currentTestimonial].reviewCount}
                    </p>
                    <div className={styles.testimonialStarsRow}>
                      <div className={styles.testimonialRating}>
                        {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                          <Star key={i} className={styles.starIcon} />
                        ))}
                      </div>
                      <span className={styles.testimonialDate}>
                        {testimonials[currentTestimonial].date}
                      </span>
                    </div>
                  </div>
                  <svg
                    className={styles.googleLogo}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    aria-label="Google"
                  >
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                </div>
                {/* Texto del review */}
                <p className={styles.testimonialComment}>
                  {testimonials[currentTestimonial].comment}
                </p>
              </CardContent>
            </Card>

            <button
              onClick={prevTestimonial}
              className={styles.carouselButtonLeft}
            >
              <ChevronLeft className={styles.icon} />
            </button>
            <button
              onClick={nextTestimonial}
              className={styles.carouselButtonRight}
            >
              <ChevronRight className={styles.icon} />
            </button>
          </div>
        </div>
      </section>

      <ContactUs />

      <section className={styles.sectionContact}>
        <div className={styles.innerContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Politica de privacidad</h2>
            <p className={styles.sectionDescription}>
              <strong className={styles.boldText}>Introduccion</strong> <br />
              Nosotros, FLORIDA AVENTURA, estamos comprometidos a
              proteger la privacidad de nuestros usuarios y, por lo tanto, esta
              política de privacidad se ha creado para informarle sobre cómo
              recopilamos, utilizamos y protegemos la información personal que
              nos proporciona cuando utiliza nuestro sitio web de viajes.
              <br /><strong className={styles.boldText}>Información que recopilamos</strong> <br />
              Recopilamos información personal de
              nuestros usuarios cuando nos proporciona información como nombre,
              dirección de correo electrónico, número de teléfono, domicilio,
              información de pago, información de viaje, entre otros. Además,
              también recopilamos información de navegación del usuario,
              incluida la dirección IP, el tipo de navegador, el sistema
              operativo y la URL de referencia.
              <br /><strong className={styles.boldText}>Uso de la información recopilada </strong> <br />
              La información personal que recopilamos se utiliza para
              proporcionar y mejorar nuestros servicios, personalizar su
              experiencia de usuario, procesar pagos, enviarle actualizaciones
              sobre sus reservas y contactarlo sobre otros productos y servicios
              que puedan ser de su interés.
              <br /><strong className={styles.boldText}>El intercambio de información  </strong> <br />
              No compartimos su información personal con terceros, excepto cuando
              sea necesario para procesar pagos o proporcionar servicios
              contratados por usted. Además, podemos compartir información no
              identificable con terceros con fines de marketing, publicidad o
              investigación de mercado.
              <br /><strong className={styles.boldText}>Cookies y tecnologías de seguimiento </strong> <br />
              Utilizamos cookies y otras tecnologías de seguimiento para mejorar
              su experiencia de usuario en nuestro sitio web y con fines
              analíticos. La información recopilada por estas tecnologías puede
              incluir información de navegación, como las páginas visitadas y el
              tiempo pasado en el sitio.
              <br /><strong className={styles.boldText}>Protección de información personal </strong> <br />
              Toda la información personal que recopilamos se almacena de forma
              segura y está protegida contra acceso o divulgación no
              autorizados. Tomamos medidas de seguridad adecuadas para proteger
              la información personal de nuestros usuarios.
              <br /><strong className={styles.boldText}>Derechos de los usuarios </strong> <br />
              Tiene derecho a solicitar acceso a su información
              personal, corregir información inexacta, solicitar la eliminación
              de su información personal u optar por no recibir nuestras
              comunicaciones de marketing.
              <br /><strong className={styles.boldText}>Cambios en esta política de privacidad </strong> <br />
              Podemos actualizar esta política de privacidad de vez
              en cuando para reflejar cambios en nuestras prácticas de
              privacidad. Le recomendamos que consulte esta página
              periódicamente para estar al tanto de cualquier cambio.
              <br /><strong className={styles.boldText}>Contacto </strong> <br />
              Si tiene alguna pregunta o inquietud sobre esta política de
              privacidad, contáctenos en: floridaaventuraok@gmail.com
            </p>
          </div>
        </div>
      </section>

      <Footer />

    </div>
  );
}
