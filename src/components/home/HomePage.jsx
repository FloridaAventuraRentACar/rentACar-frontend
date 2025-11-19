import { useState, useEffect, useContext } from "react";
import { Star, Shield, Clock, DollarSign, Car, ChevronLeft, ChevronRight, HelpCircle } from 'lucide-react';
import styles from "../../styles/HomePage.module.css"; // Import CSS Module
import HomeRentInput from "../HomeRentInput.jsx";
import Header from "./Header";
import Card from "../ui/Card.jsx";
import CardContent from "../ui/CardContent.jsx";
import { cars } from "../../utilities/CarsToShow.js";
import ContactUs from "./ContactUs.jsx";
import Footer from "./Footer.jsx";
import testimonials from "../../utilities/testimonials.js";
import { AppContext } from "../../context/AppContext.jsx";
import {faqs} from "../../utilities/faqs.js";
import WhatsAppFloat from "./WhatsAppFloat.jsx";


export default function HomePage() {
  const [scrollY, setScrollY] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentFaq, setCurrentFaq] = useState(0);
  const {clearRentalData} = useContext(AppContext);

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
            backgroundImage: `url("https://www.volkswagen.cl/dam/images/c8d028b2c737e686c203c1f67c0b3330a2fdf699/6d9348c871dd4f3beae3e6217e3e9478/e4bad2ec-cd8a-4c37-9604-858174c72fc8/crop:SMART/resize:3840:2160/captura-de-pantalla-2024-01-16-a-la-s-15-52-22.png")`,
          }}
        />
        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Explora Miami
            <span className={styles.heroSubtitle}>Con Estilo</span>
          </h1>
          <p className={styles.heroDescription}>
            Alquilar auto en Miami nunca fue tan fácil. Vehículos premium, entrega inmediata y precios transparentes.
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
              Desde autos económicos hasta vehículos de lujo. La mejor opción para alquilar auto en Miami y comenzar tu aventura
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
              Atención personalizada, sin colas ni trámites — Olvídate de las colas al alquilar carro en Miami.
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
                Soporte completo las 24 horas del día, los 7 días de la semana
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
                <div className={styles.testimonialRating}>
                  {[...Array(testimonials[currentTestimonial].rating)].map(
                    (_, i) => (
                      <Star key={i} className={styles.starIcon} />
                    )
                  )}
                </div>
                <p className={styles.testimonialComment}>
                  "{testimonials[currentTestimonial].comment}"
                </p>
                <div>
                  <h4 className={styles.testimonialName}>
                    {testimonials[currentTestimonial].name}
                  </h4>
                  <p className={styles.testimonialLocation}>
                    {testimonials[currentTestimonial].location}
                  </p>
                </div>
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
              <strong className={styles.boldText}>Introduccion</strong> <br/>
              Nosotros, FLORIDA AVENTURA, estamos comprometidos a
              proteger la privacidad de nuestros usuarios y, por lo tanto, esta
              política de privacidad se ha creado para informarle sobre cómo
              recopilamos, utilizamos y protegemos la información personal que
              nos proporciona cuando utiliza nuestro sitio web de viajes.
              <br /><strong className={styles.boldText}>Información que recopilamos</strong> <br/>
              Recopilamos información personal de
              nuestros usuarios cuando nos proporciona información como nombre,
              dirección de correo electrónico, número de teléfono, domicilio,
              información de pago, información de viaje, entre otros. Además,
              también recopilamos información de navegación del usuario,
              incluida la dirección IP, el tipo de navegador, el sistema
              operativo y la URL de referencia. 
              <br /><strong className={styles.boldText}>Uso de la información recopilada </strong> <br/>
              La información personal que recopilamos se utiliza para
              proporcionar y mejorar nuestros servicios, personalizar su
              experiencia de usuario, procesar pagos, enviarle actualizaciones
              sobre sus reservas y contactarlo sobre otros productos y servicios
              que puedan ser de su interés. 
              <br /><strong className={styles.boldText}>El intercambio de información  </strong> <br/>
                No compartimos su información personal con terceros, excepto cuando
              sea necesario para procesar pagos o proporcionar servicios
              contratados por usted. Además, podemos compartir información no
              identificable con terceros con fines de marketing, publicidad o
              investigación de mercado. 
              <br /><strong className={styles.boldText}>Cookies y tecnologías de seguimiento </strong> <br/>
              Utilizamos cookies y otras tecnologías de seguimiento para mejorar
              su experiencia de usuario en nuestro sitio web y con fines
              analíticos. La información recopilada por estas tecnologías puede
              incluir información de navegación, como las páginas visitadas y el
              tiempo pasado en el sitio. 
              <br /><strong className={styles.boldText}>Protección de información personal </strong> <br/> 
              Toda la información personal que recopilamos se almacena de forma
              segura y está protegida contra acceso o divulgación no
              autorizados. Tomamos medidas de seguridad adecuadas para proteger
              la información personal de nuestros usuarios. 
              <br /><strong className={styles.boldText}>Derechos de los usuarios </strong> <br/> 
              Tiene derecho a solicitar acceso a su información
              personal, corregir información inexacta, solicitar la eliminación
              de su información personal u optar por no recibir nuestras
              comunicaciones de marketing. 
              <br /><strong className={styles.boldText}>Cambios en esta política de privacidad </strong> <br/> 
              Podemos actualizar esta política de privacidad de vez
              en cuando para reflejar cambios en nuestras prácticas de
              privacidad. Le recomendamos que consulte esta página
              periódicamente para estar al tanto de cualquier cambio. 
              <br /><strong className={styles.boldText}>Contacto </strong> <br/>
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
