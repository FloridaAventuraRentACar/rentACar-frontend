import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Star,
  Shield,
  Clock,
  DollarSign,
  Car,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import styles from "../styles/HomePage.module.css"; // Import CSS Module
import HomeRentInput from "./HomeRentInput";
import Header from "./Header";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Textarea from "./ui/TextArea";
import Card from "./ui/Card";
import CardContent from "./ui/CardContent";
import { cars } from "../utilities/CarsToShow";

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const testimonials = [
    {
      name: "María González",
      rating: 5,
      comment:
        "Excelente servicio, el auto estaba impecable y el proceso fue muy rápido. Definitivamente volveré a alquilar con ellos.",
      location: "Visitante de España",
    },
    {
      name: "John Smith",
      rating: 5,
      comment:
        "Great experience! The car was perfect for exploring Miami. Professional staff and competitive prices.",
      location: "Tourist from New York",
    },
    {
      name: "Carlos Rodríguez",
      rating: 5,
      comment:
        "Atención al cliente excepcional. Me ayudaron con todo y el auto superó mis expectativas. Muy recomendado.",
      location: "Local de Miami",
    },
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section id="inicio" className={styles.heroSection}>
        <div
          className={styles.heroBackground}
          style={{
            backgroundImage: `url("https://di-uploads-pod17.dealerinspire.com/lokeyvolkswagen/uploads/2025/01/2025_volkswagen_atlas-cross-sport_4dr-suv_sel-premium-r-line_fq_oem_1_1600.jpg")`,
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        />
        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Explora Miami
            <span className={styles.heroSubtitle}>Con Estilo</span>
          </h1>
          <p className={styles.heroDescription}>
            Descubre la ciudad del sol con nuestra flota premium de vehículos.
            Comodidad, seguridad y los mejores precios garantizados.
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
              Desde autos económicos hasta vehículos de lujo, tenemos la opción
              perfecta para tu aventura en Miami
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
            <h2 className={styles.sectionTitle}>¿Por qué elegirnos?</h2>
            <p className={styles.sectionDescription}>
              Más de 10 años de experiencia brindando el mejor servicio de
              alquiler de autos en Miami
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

      {/* Testimonios */}
      <section className={styles.sectionTestimonials}>
        <div className={styles.innerContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              Lo que dicen nuestros clientes
            </h2>
            <p className={styles.sectionDescription}>
              Miles de clientes satisfechos confían en nosotros para sus
              aventuras en Miami
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

      {/* Contacto */}
      <section id="contacto" className={styles.sectionContact}>
        <div className={styles.innerContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Contáctanos</h2>
            <p className={styles.sectionDescription}>
              ¿Tienes preguntas? Estamos aquí para ayudarte a planificar tu
              próxima aventura
            </p>
          </div>

          <div className={styles.contactGrid}>
            <div>
              <Card className={styles.contactFormCard}>
                <CardContent className={styles.cardContentPadding}>
                  <h3 className={styles.formTitle}>Envíanos un mensaje</h3>
                  <form className={styles.contactForm}>
                    <div>
                      <label htmlFor="fullName" className={styles.formLabel}>
                        Nombre completo
                      </label>
                      <Input
                        id="fullName"
                        placeholder="Tu nombre"
                        className={styles.inputFullWidth}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className={styles.formLabel}>
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="tu@email.com"
                        className={styles.inputFullWidth}
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className={styles.formLabel}>
                        Mensaje
                      </label>
                      <Textarea
                        id="message"
                        placeholder="¿En qué podemos ayudarte?"
                        className={styles.textareaFullWidth}
                      />
                    </div>
                    <Button className={styles.submitButton}>
                      Enviar mensaje
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className={styles.contactInfoSection}>
              <div>
                <h3 className={styles.contactInfoTitle}>
                  Información de contacto
                </h3>
                <div className={styles.contactDetails}>
                  <div className={styles.contactItem}>
                    <Phone className={styles.contactIcon} />
                    <div>
                      <p className={styles.contactLabel}>Teléfono</p>
                      <p className={styles.contactText}>+1 (305) 123-4567</p>
                    </div>
                  </div>
                  <div className={styles.contactItem}>
                    <Mail className={styles.contactIcon} />
                    <div>
                      <p className={styles.contactLabel}>Email</p>
                      <p className={styles.contactText}>
                        info@floridaaventura.com
                      </p>
                    </div>
                  </div>
                  <div className={styles.contactItem}>
                    <MapPin className={styles.contactIcon} />
                    <div>
                      <p className={styles.contactLabel}>Dirección</p>
                      <p className={styles.contactText}>
                        123 Ocean Drive, Miami Beach, FL 33139
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.hoursOfOperation}>
                <h4 className={styles.hoursTitle}>Horarios de atención</h4>
                <div className={styles.hoursList}>
                  <p>Lunes - Viernes: 8:00 AM - 8:00 PM</p>
                  <p>Sábados: 9:00 AM - 6:00 PM</p>
                  <p>Domingos: 10:00 AM - 4:00 PM</p>
                </div>
              </div>

              {/* Mapa embebido */}
              <div className={styles.mapPlaceholder}>
                <p>Mapa de Miami - Ubicación de la oficina</p>
              </div>
            </div>
          </div>
        </div>
      </section>
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
      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.innerContainer}>
          <div className={styles.footerGrid}>
            <div>
              <h3 className={styles.footerLogo}>Florida Aventura Rent a Car</h3>
              <p className={styles.footerDescription}>
                Tu compañero de confianza para explorar Miami con estilo y
                comodidad.
              </p>
              <div className={styles.socialLinks}>
                <Facebook className={styles.socialIcon} />
                <Instagram className={styles.socialIcon} />
                <Twitter className={styles.socialIcon} />
              </div>
            </div>

            <div>
              <h4 className={styles.footerHeading}>Enlaces útiles</h4>
              <ul className={styles.footerList}>
                <li>
                  <a href="#" className={styles.footerLink}>
                    Términos y condiciones
                  </a>
                </li>
                <li>
                  <a href="#" className={styles.footerLink}>
                    Política de privacidad
                  </a>
                </li>
                <li>
                  <a href="#" className={styles.footerLink}>
                    Preguntas frecuentes
                  </a>
                </li>
                <li>
                  <a href="#" className={styles.footerLink}>
                    Seguros
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className={styles.footerHeading}>Servicios</h4>
              <ul className={styles.footerList}>
                <li>
                  <a href="#" className={styles.footerLink}>
                    Alquiler diario
                  </a>
                </li>
                <li>
                  <a href="#" className={styles.footerLink}>
                    Alquiler semanal
                  </a>
                </li>
                <li>
                  <a href="#" className={styles.footerLink}>
                    Alquiler mensual
                  </a>
                </li>
                <li>
                  <a href="#" className={styles.footerLink}>
                    Servicios corporativos
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className={styles.footerHeading}>Contacto</h4>
              <div className={styles.footerContactDetails}>
                <p>+1 (305) 773-1787</p>
                <p>floridaaventuraok@gmail.com</p>
                <p>Poner direccion de la oficina</p>
                <p>Miami Beach, FL 33009</p>
              </div>
            </div>
          </div>

          <div className={styles.copyright}>
            <p>
              &copy; {new Date().getFullYear()} Florida Aventura Rent a Car.
              Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
