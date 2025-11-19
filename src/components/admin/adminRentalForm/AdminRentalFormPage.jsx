import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import styles from "../../../styles/admin/adminRentalForm/AdminRentalFormPage.module.css";
import { postRental } from "../../../services/rentalService.js";
import { carNames } from "../../../utilities/names/carNames.js";
import Loading from "../../ui/Loading.jsx";
import ErrorModal from "../../ui/ErrorModal.jsx";
import { getErrorMessage } from "../../../utilities/errors/errorsMessages.js";
import VehicleRentalForm from "./VehicleRentalForm.jsx";
import ClientsForm from "./ClientsForm.jsx";
import AdminSideBar from "../AdminSideBar.jsx";

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

const AdminRentalFormPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [cars, setCars] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);

  useEffect(() => {
    fetchCarNames();
  }, []);

  const fetchCarNames = async () => {
    try {
      const carNamesList = await carNames();
      setCars(carNamesList);
    } catch (error) {
      console.error("Error al obtener la lista de autos:", error);
      setErrorMessage("Error al obtener la lista de autos");
      setShowErrorModal(true);
    }
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      const clientList = [values.driver, ...values.additionalDrivers];

      // Formatear fechas para el backend
      const start = values.startDateTime;
      const end = values.endDateTime;

      const rental = {
        carId: parseInt(values.carId),
        clients: clientList,
        start,
        end,
        pickupLocation: values.pickupLocation,
        returnLocation: values.returnLocation,
        insurance: values.insurance,
        babySeat: values.babySeat,
        travelLocation: values.travelLocation || null,
        gasTank: values.gasTank,
        totalPrice: values.calculateTotal ? null : parseFloat(values.totalPrice) || null,
      };

      await postRental(rental);

      navigate("/admin", {
        state: {
          showSuccess: true,
          message: "Alquiler registrado exitosamente",
        },
      });
    } catch (error) {
      setLoading(false);
      setErrorMessage(
        getErrorMessage(error.response?.data?.code, "es") ||
          "Ocurrió un error al registrar el alquiler"
      );
      setShowErrorModal(true);
      console.error("Error al guardar el alquiler: ", error);
    }
  };

  const initialValues = {
    carId: "",
    startDateTime: "",
    endDateTime: "",
    pickupLocation: "",
    returnLocation: "",
    travelLocation: "",
    insurance: "",
    babySeat: "",
    gasTank: "",
    totalPrice: "",
    calculateTotal: false,
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
    carId: Yup.string().required("Obligatorio"),
    startDateTime: Yup.string().required("Obligatorio"),
    endDateTime: Yup.string()
      .required("Obligatorio")
      .test(
        "is-after-start",
        "La fecha de devolución debe ser posterior a la fecha de entrega",
        function (value) {
          const { startDateTime } = this.parent;
          if (!startDateTime || !value) return true;
          return new Date(value) > new Date(startDateTime);
        }
      ),
    pickupLocation: Yup.string().required("Obligatorio"),
    returnLocation: Yup.string().required("Obligatorio"),
    insurance: Yup.string().required("Obligatorio"),
    babySeat: Yup.string().required("Obligatorio"),
    gasTank: Yup.string().required("Obligatorio"),
    totalPrice: Yup.number()
      .nullable()
      .when("calculateTotal", {
        is: false,
        then: (schema) => schema.required("Obligatorio").min(0, "El precio debe ser mayor o igual a 0"),
        otherwise: (schema) => schema.nullable(),
      }),
    driver: driverSchema,
    additionalDrivers: Yup.array().of(driverSchema),
  });

  if (!cars) {
    return (
      <div className={styles.background}>
        <Loading text="Cargando formulario..." />
      </div>
    );
  }

  return (
    <div className={styles.background}>
      {loading ? (
        <Loading text="Registrando alquiler..." />
      ) : (
        <div className={styles.mainContainer}>
          <AdminSideBar />
          <div className={styles.formContainer}>
            <h1 className={styles.formTitle}>Registrar Nuevo Alquiler</h1>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values }) => (
                <Form>
                  <VehicleRentalForm cars={cars} values={values} />
                  <ClientsForm />
                  <br />
                  <button
                    type="submit"
                    className={`${styles.submitButton} ${styles.button}`}
                  >
                    Registrar Alquiler
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
      <ErrorModal
        message={errorMessage}
        redirectPath="/admin/register"
        buttonText="Volver"
        showModal={showErrorModal}
        onClose={() => setShowErrorModal(false)}
      />
    </div>
  );
};

export default AdminRentalFormPage;

