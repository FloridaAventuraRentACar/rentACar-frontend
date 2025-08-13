import { useContext, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";

import styles from "../styles/DriverForm.module.css";
import RentalDetails from "./RentalDetails.jsx";
import { postRental } from "../services/rentalService.js";
import { AppContext } from "../context/AppContext.jsx";
import { useNavigate } from "react-router-dom";
import useEmailJs from "../hooks/useEmailJs.js";
import rentalConfirmationEmailhtml from "../utilities/emailHtml/rentalConfimationEmailHtml.js";

const driverSchema = Yup.object({
  name: Yup.string().required("Obligatorio"),
  surname: Yup.string().required("Obligatorio"),
  email: Yup.string()
    .email("Debes ingresar un formato de mail valido")
    .required("Obligatorio"),
  phone: Yup.string().required("Obligatorio"),
  licenseNumber: Yup.string().required("Obligatorio"),
  bornDate: Yup.date().required("Obligatorio"),
  licenseName: Yup.string().required("Obligatorio"),
  licenseAddress: Yup.string().required("Obligatorio"),
  licenseExpirationDate: Yup.date().required("Obligatorio"),
  ageCheckbox: Yup.boolean()
    .oneOf([true], "Debes tener mas de 25 años para manejar un vehiculo")
    .required("Obligatorio"),
});

const DriverForm = () => {
  const navigate = useNavigate();

  const { sendEmail } = useEmailJs({
    serviceId: import.meta.env.VITE_EMAIL_JS_SERVICE_ID,
    templateId: import.meta.env.VITE_HTML_TEMPLATE_ID,
    publicKey: import.meta.env.VITE_EMAIL_JS_PUBLIC_KEY,
  });

  const {
    carData,
    pickupLocation,
    returnLocation,
    pickupDate,
    pickupTime,
    returnDate,
    returnTime,
    selectedInsurance,
    selectedBabySeat,
    travelLocation,
    selectedGasTank,
    additionalDriversCount,
    setAdditionalDriversCount
  } = useContext(AppContext);

  const sendRentalConfimationEmail = async (rental) => {
    const ContactUsTemplateParams = {
      to_email: rental.clients[0].email,
      html_message: rentalConfirmationEmailhtml(
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

    await sendEmail(ContactUsTemplateParams);
  };

  const handleSubmit = async (values) => {

    const clientList = [values.driver, ...values.additionalDrivers];

    const rental = await saveRental(clientList);

    await sendRentalConfimationEmail(rental);

    navigate("/successful-rental", { state: { rental } });
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
    };

    try {
      const response = await postRental(rental);

      return response.data;
    } catch (error) {
      console.error("Error al guardar la renta:", error);
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

  const renderFields = (prefix) => (
    <>
      <div className={styles.fieldGroup}>
        <label className={styles.label}>Nombre</label>
        <Field className={styles.input} name={`${prefix}.name`} />
        <ErrorMessage
          className={styles.error}
          name={`${prefix}.name`}
          component="div"
        />
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label}>Apellido</label>
        <Field className={styles.input} name={`${prefix}.surname`} />
        <ErrorMessage
          className={styles.error}
          name={`${prefix}.surname`}
          component="div"
        />
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label}>Email</label>
        <Field className={styles.input} type="email" name={`${prefix}.email`} />
        <ErrorMessage
          className={styles.error}
          name={`${prefix}.email`}
          component="div"
        />
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label}>Numero de telefono</label>
        <Field className={styles.input} name={`${prefix}.phone`} />
        <ErrorMessage
          className={styles.error}
          name={`${prefix}.phone`}
          component="div"
        />
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label}>Numero de licencia de conducir</label>
        <Field className={styles.input} name={`${prefix}.licenseNumber`} />
        <ErrorMessage
          className={styles.error}
          name={`${prefix}.licenseNumber`}
          component="div"
        />
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label}>Fecha de nacimiento</label>
        <Field
          className={styles.input}
          type="date"
          name={`${prefix}.bornDate`}
        />
        <ErrorMessage
          className={styles.error}
          name={`${prefix}.bornDate`}
          component="div"
        />
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label}>Nombre en licencia de conducir</label>
        <Field className={styles.input} name={`${prefix}.licenseName`} />
        <ErrorMessage
          className={styles.error}
          name={`${prefix}.licenseName`}
          component="div"
        />
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label}>
          Direccion en licencia de conducir
        </label>
        <Field className={styles.input} name={`${prefix}.licenseAddress`} />
        <ErrorMessage
          className={styles.error}
          name={`${prefix}.licenseAddress`}
          component="div"
        />
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label}>
          Fecha de expiracion de licencia de conducir
        </label>
        <Field
          className={styles.input}
          type="date"
          name={`${prefix}.licenseExpirationDate`}
        />
        <ErrorMessage
          className={styles.error}
          name={`${prefix}.licenseExpirationDate`}
          component="div"
        />
      </div>
      <div className={styles.checkbox}>
        <Field
          type="checkbox"
          name={`${prefix}.ageCheckbox`}
          className={styles.ageCheckbox}
        />
        <label className={styles.label}>Tengo mas de 25 años</label>
        <ErrorMessage
          className={styles.error}
          name={`${prefix}.ageCheckbox`}
          component="div"
        />
      </div>
    </>
  );

  return (
    <div className={styles.background}>
      <div className={styles.mainContainer}>
        <div className={styles.formContainer}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values }) => {

              if (values.additionalDrivers.length !== additionalDriversCount) {
                setAdditionalDriversCount(values.additionalDrivers.length);
              }

              return (
                <Form>
                  <h3 className={styles.sectionTitle}>Conductor principal</h3>
                  {renderFields("driver")}

                  <h3 className={styles.sectionTitle}>Conductores adicionales</h3>
                  <span className={styles.include}>Hasta un conductor adicional incluido en el precio</span>
                  <FieldArray name="additionalDrivers">
                    {({ push, remove }) => (
                      <div>
                        {values.additionalDrivers.map((_, index) => (
                          <div key={index} className={styles.driverBox}>
                            <h4 className={styles.sectionTitle}>
                              Conductor adicional {index + 1}
                            </h4>
                            {renderFields(`additionalDrivers[${index}]`)}
                            <button
                              type="button"
                              className={`${styles.button} ${styles.removeButton}`}
                              onClick={() => remove(index)}
                            >
                              Remover
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          className={`${styles.button} ${styles.addButton}`}
                          onClick={() => {
                            push({
                              name: "",
                              surname: "",
                              email: "",
                              phone: "",
                              licenseNumber: "",
                              bornDate: "",
                              licenseName: "",
                              licenseAddress: "",
                              licenseExpirationDate: "",
                            });
                          }}
                        >
                          Agregar conductor adicional
                        </button>
                      </div>
                    )}
                  </FieldArray>

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
          <RentalDetails />
        </div>
      </div>
    </div>
  );
};

export default DriverForm;