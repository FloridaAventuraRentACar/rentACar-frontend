import { useContext, useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import styles from "../../../styles/rental/booking/DriverForm.module.css";
import RentalDetails from "./RentalDetails.jsx";
import { postRental } from "../../../services/rentalService.js";
import { AppContext } from "../../../context/AppContext.jsx";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import useEmailJs from "../../../hooks/useEmailJs.js";
import rentalClientConfirmationEmailhtml from "../../../utilities/emailHtml/rentalClientConfimationEmailHtml.js";
import Loading from "../../ui/feedback/Loading.jsx";
import rentalConfirmationEmailHtml from "../../../utilities/emailHtml/rentalConfirmationEmailHtml.js";
import ClientsForm from "../../admin/rentals/registerForm/ClientsForm";
import BackButton from "../../ui/buttons/BackButton";

const driverSchema = Yup.object({
  name: Yup.string().required("Obligatorio"),
  surname: Yup.string().required("Obligatorio"),
  email: Yup.string()
    .email("Debes ingresar un formato de mail valido")
    .required("Obligatorio"),
  phone: Yup.string().required("Obligatorio"),
  licenseNumber: Yup.string().required("Obligatorio"),
  bornDate: Yup.date()
    .required("Obligatorio")
    .test(
      "age-min-25",
      "El conductor debe tener al menos 25 años",
      function (value) {
        if (!value) return false;

        const today = new Date();
        const birthDate = new Date(value);

        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        // Ajuste si todavía no cumplió años este año
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }

        return age >= 25;
      }
    ),
  licenseName: Yup.string().required("Obligatorio"),
  licenseAddress: Yup.string().required("Obligatorio"),
  licenseExpirationDate: Yup.date().required("Obligatorio").min(new Date(), "La licencia debe estar vigente (fecha futura)"),
  ageCheckbox: Yup.boolean()
    .oneOf([true], "Debes tener mas de 25 años para manejar un vehiculo")
    .required("Obligatorio"),
});

const DriverForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const [searchParams] = useSearchParams();

  const pickupDate = searchParams.get("pickupDate");
  const pickupTime = searchParams.get("pickupTime");
  const returnDate = searchParams.get("returnDate");
  const returnTime = searchParams.get("returnTime");
  const pickupLocation = searchParams.get("pickupLocation");
  const returnLocation = searchParams.get("returnLocation");

  const { sendEmail } = useEmailJs({
    serviceId: import.meta.env.VITE_EMAIL_JS_SERVICE_ID,
    templateId: import.meta.env.VITE_HTML_TEMPLATE_ID,
    publicKey: import.meta.env.VITE_EMAIL_JS_PUBLIC_KEY,
  });

  const {
    carData,
    daysBooked,
    totalPrice,
    selectedInsurance,
    selectedBabySeat,
    travelLocation,
    selectedGasTank,
    additionalDriversCount,
    setAdditionalDriversCount,
  } = useContext(AppContext);

  const sendRentalClientConfimationEmail = async (rental) => {
    const templateParams = {
      to_email: rental.clients[0].email,
      html_message: rentalClientConfirmationEmailhtml(
        rental.clients[0].name,
        rental.clients[0].surname,
        rental.carName,
        rental.clients[0].phone,
        rental.start,
        rental.end,
        pickupLocation,
        returnLocation,
        rental.daysRented,
        rental.totalPrice
      ),
      subject: "Su reserva ha sido confirmada",
    };

    await sendEmail(templateParams);
  };

  const sendRentalConfimationEmail = async (rental) => {
    const templateParams = {
      to_email: "floridaaventuraok@gmail.com",
      html_message: rentalConfirmationEmailHtml(
        rental.clients[0].name,
        rental.clients[0].surname,
        rental.clients[0].email,
        rental.carName,
        rental.clients[0].phone,
        rental.start,
        rental.end,
        pickupLocation,
        returnLocation,
        rental.daysRented,
        rental.totalPrice
      ),
      subject: "Nueva reserva confirmada",
    };

    await sendEmail(templateParams);
  };
  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      const clientList = [values.driver, ...values.additionalDrivers];

      const rental = await saveRental(clientList);

      await sendRentalClientConfimationEmail(rental);

      await sendRentalConfimationEmail(rental);

      navigate("/successful-rental", { state: { rental } });
    } catch (error) {
      alert("Ocurrio un error al guardar la renta");
    }
  };

  const saveRental = async (clientsToSave) => {
    const start = `${pickupDate}T${pickupTime}`;
    const end = `${returnDate}T${returnTime}`;

    const rental = {
      carId: carData.id,
      clients: clientsToSave,
      start,
      end,
      pickupLocation,
      returnLocation,
      insurance: selectedInsurance,
      babySeat: selectedBabySeat,
      travelLocation,
      gasTank: selectedGasTank,
      notifyAdmin: true //Se notifica al admin del alquiler, ya que lo realiza el cliente
    };

    try {
      const response = await postRental(rental);

      return response.data;
    } catch (error) {
    }
  };

  const initialValues = {
    driver: {
      name: "",
      surname: "",
      email: "",
      phone: "",
      licenseNumber: "",
      bornDate: "",
      licenseName: "",
      licenseAddress: "",
      licenseExpirationDate: "",
      ageCheckbox: false,
    },
    additionalDrivers: [],
  };

  const validationSchema = Yup.object({
    driver: driverSchema,
    additionalDrivers: Yup.array().of(driverSchema),
  });

  return (
    <div className={styles.background}>
      {loading ? (
        <Loading text="Cargando confirmacion de reserva..." />
      ) : (
        <div className={styles.mainContainer}>
          <div className={styles.backButtonContainer}>
            <BackButton href={`/cars/${carData.name}${location.search}`} />
          </div>
          <div className={styles.formContainer}>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values }) => {
                if (
                  values.additionalDrivers.length !== additionalDriversCount
                ) {
                  setAdditionalDriversCount(values.additionalDrivers.length);
                }

                return (
                  <Form>
                    <ClientsForm />

                    <br />
                    <button
                      type="submit"
                      className={`${styles.submitButton} ${styles.button}`}
                    >
                      Confirmar reserva
                    </button>
                  </Form>
                );
              }}
            </Formik>
          </div>
          <div className={styles.rentalDetailsContainer}>
            <RentalDetails
              carData={carData}
              daysBooked={daysBooked}
              pickupLocation={pickupLocation}
              pickupDate={pickupDate}
              pickupTime={pickupTime}
              returnLocation={returnLocation}
              returnDate={returnDate}
              returnTime={returnTime}
              totalPrice={totalPrice}
              selectedInsurance={selectedInsurance}
              selectedBabySeat={selectedBabySeat}
              travelLocation={travelLocation}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DriverForm;
