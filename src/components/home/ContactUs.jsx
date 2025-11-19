import styles from "../../styles/ContactUs.module.css";
import { Phone, Mail, MapPin } from "lucide-react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Textarea from "../ui/TextArea";
import Card from "../ui/Card";
import CardContent from "../ui/CardContent";
import { useRef, useState } from "react";
import useEmailJs from "../../hooks/useEmailJs";
import contactUsHtml from "../../utilities/emailHtml/contactUsHtml";
import autoReplyHtml from "../../utilities/emailHtml/autoReplyHtml";

export default function ContactUs() {
  const formRef = useRef();

  const [isLoading, setIsLoading] = useState(false);

  const contactUsEmail = useEmailJs({
    serviceId: import.meta.env.VITE_EMAIL_JS_SERVICE_ID,
    templateId: import.meta.env.VITE_HTML_TEMPLATE_ID,
    publicKey: import.meta.env.VITE_EMAIL_JS_PUBLIC_KEY,
  });

  const autoReplyEmail = useEmailJs({
    serviceId: import.meta.env.VITE_EMAIL_JS_SERVICE_ID,
    templateId: import.meta.env.VITE_HTML_TEMPLATE_ID,
    publicKey: import.meta.env.VITE_EMAIL_JS_PUBLIC_KEY,
  });

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLoading) {
      console.log("Enviando correo...");
      return;
    }

    setIsLoading(true);

    const form = formRef.current;

    //Mail al cliente
    const AutoReplyTemplateParams = {
      to_email: form.email.value,
      html_message: autoReplyHtml(form.fullName.value),
      subject: "¡Gracias por contactarnos!",
    };

    const response = await autoReplyEmail.sendEmail(AutoReplyTemplateParams);
    if (response) {
      alert("Correo enviado correctamente");
    } else {
      alert("Error al enviar el correo");
      return;
    }

    //Mail a la empresa
    const ContactUsTemplateParams = {
      to_email: "floridaaventuraok@gmail.com",
      html_message: contactUsHtml(form.fullName.value, form.message.value, form.email.value, form.phone.value),
      subject: "Nuevo mensaje de contacto",
    };

    await contactUsEmail.sendEmail(ContactUsTemplateParams);
    setIsLoading(false);
    form.reset();
  };

  return (
    <div className={styles.container}>
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
                  <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className={styles.contactForm}
                  >
                    <div>
                      <label htmlFor="fullName" className={styles.formLabel}>
                        Nombre completo *
                      </label>
                      <Input
                        id="fullName"
                        name="fullName"
                        placeholder="Tu nombre"
                        className={styles.inputFullWidth}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className={styles.formLabel}>
                        Email *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="tu@email.com"
                        className={styles.inputFullWidth}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className={styles.formLabel}>
                        Numero de telefono
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="phone"
                        placeholder="+1 (305) 773-1787"
                        className={styles.inputFullWidth}
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className={styles.formLabel}>
                        Mensaje *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="¿En qué podemos ayudarte?"
                        className={styles.textareaFullWidth}
                        required
                      />
                    </div>
                    <Button className={styles.submitButton}>
                      {isLoading ? "Enviando..." : "Enviar mensaje"}
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
                      <p className={styles.contactText}>+1 (305) 773-1787</p>
                    </div>
                  </div>
                  <div className={styles.contactItem}>
                    <Mail className={styles.contactIcon} />
                    <div>
                      <p className={styles.contactLabel}>Email</p>
                      <p className={styles.contactText}>
                        floridaaventuraok@gmail.com
                      </p>
                    </div>
                  </div>
                  <div className={styles.contactItem}>
                    <MapPin className={styles.contactIcon} />
                    <div>
                      <p className={styles.contactLabel}>Dirección</p>
                      <p className={styles.contactText}>
                        13499 Biscayne Blvd, North Miami, FL 33181
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.hoursOfOperation}>
                <h4 className={styles.hoursTitle}>Horarios de atención</h4>
                <div className={styles.hoursList}>
                  <p>Lunes - Domingo: 9:00 AM - 9:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
