import { useState } from "react";
import emailjs from "@emailjs/browser";

const useEmailJs = ({ serviceId, templateId, publicKey }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const sendEmail = async (templateParams) => {
    setLoading(true);
    setSuccess(null);
    setError(null);

    try {
      const response = await emailjs.send(serviceId, templateId, templateParams, publicKey);
      setSuccess("Correo enviado correctamente");
      return response;
    } catch (err) {
      setError("Error al enviar el correo");
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { sendEmail, loading, success, error };
};

export default useEmailJs;
