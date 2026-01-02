import { useEffect, useState } from "react";
import styles from "../../styles/admin/RentalAdminResume.module.css";
import { deleteRentalById, getRentalById, updateRental } from "../../services/rentalService";
import { useNavigate, useParams } from "react-router-dom";
import insuranceNames from "../../utilities/names/insuranceNames";
import babySeatNames from "../../utilities/names/babySeatNames";
import { gasTankNames } from "../../utilities/names/gasTankNames";
import locationNames from "../../utilities/names/locationNames";
import { formatPhoneNumber } from "../../utilities/functions/formatPhoneNumber";
import { formatDateAndHour } from "../../utilities/functions/formatDateAndHour";
import { formatDate } from "../../utilities/functions/formatDate";
import BackButton from "../BackButton";
import { carNames } from "../../utilities/names/carNames";
import ConfirmationModal from "../ui/ConfirmationModal";
import travelLocationNames from "../../utilities/names/travelLocationNames";
import ErrorModal from "../ui/ErrorModal";
import { getErrorMessage } from "../../utilities/errors/errorsMessages";

export default function RentalAdminResume({ isEditable = true }) {
  //capturo el id de la URL
  const { id } = useParams();
  const [rental, setRental] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editedRental, setEditedRental] = useState(null);
  const [cars, setCars] = useState(null);
  const [showConfirmationComponent, setShowConfirmationComponent] =
    useState(false);
  const [confirmationModalMessage, setConfirmationModalMessage] = useState("");
  const [confirmationModalType, setConfirmationModalType] = useState("");
  const [confirmationModalFunction, setConfirmationModalFunction] = useState(() => {});
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorPath, setErrorPath] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorButtonMessage, setErrorButtonMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchRentalDetails(id);
    fetchCarNames();
  }, [id]);

  useEffect(() => {
    if (rental) {
      setEditedRental({ ...rental });
    }
  }, [rental]);

  const fetchCarNames = async () => {
    setCars(await carNames());
  };

  //Trae toda la informacion del alquiler seleccionado
  const fetchRentalDetails = async (id) => {
    try {
      const response = await getRentalById(id);
      const fetchedRental = await response.data;

      setRental(fetchedRental);
    } catch (error) {
      setShowErrorModal(true);
      setErrorButtonMessage("Volver al inicio");
      setErrorMessage("Error al obtener la información del alquiler");
      setErrorPath("/admin");
    } finally {
      setLoading(false);
    }
  };

  const navigateBack = () => {
    navigate(-1);
  };

  const handleEditButtonClick = () => {
    navigate("/admin/rentals/edit/" + id);
  };

  const handleSaveButtonClick = () => {
    setShowConfirmationComponent(true);
    setConfirmationModalMessage("¿Estas seguro que quieres editar el alquiler?");
    setConfirmationModalType("success");
    setConfirmationModalFunction(() => handleSave);
  };
  
  const handleDeleteButtonClick = () => {
    setShowConfirmationComponent(true);
    setConfirmationModalMessage("¿Estas seguro que quieres eliminar el alquiler?");
    setConfirmationModalType("danger");
    setConfirmationModalFunction(() => handleDelete);
  };
  
  const handleSave = async () => {
    console.log("isProcessing: " + isProcessing);
    if (isProcessing) return;
    setIsProcessing(true);
    console.log("isProcessing: " + isProcessing);

    try {
      await updateRental(editedRental);
      
      setShowConfirmationComponent(false);

      setRental({ ...editedRental });

      navigate("/admin", {
        state: {
          showSuccess: true,
          message: "Alquiler actualizado exitosamente",
        },
      });
    } catch (error) {
      setShowConfirmationComponent(false);
      setShowErrorModal(true);
      setErrorButtonMessage("Salir");

      setErrorMessage(getErrorMessage(error.response.data.code, "es"));

      setErrorPath("/admin/rentals/edit/" + id);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDelete = async () => {
    console.log("isProcessing: " + isProcessing);
    if (isProcessing) return;
    setIsProcessing(true);
    console.log("isProcessing: " + isProcessing);
    try {
      await deleteRentalById(id);
      
      setShowConfirmationComponent(false);

      navigate("/admin", {
        state: {
          showSuccess: true,
          message: "Alquiler eliminado exitosamente",
        },
      });
    } catch (error) {
      setShowConfirmationComponent(false);
      setShowErrorModal(true);
      setErrorButtonMessage("Salir");

      setErrorMessage(getErrorMessage(error.response.data.code, "es"));

      setErrorPath("/admin/rentals/view/" + id);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCancel = () => {
    setShowConfirmationComponent(false);
  };

  const handleInputChange = (field, value, driverIndex = null) => {
    if (driverIndex !== null) {
      // Actualizar conductor específico
      setEditedRental((prev) => ({
        ...prev,
        clients: prev.clients.map((client, index) =>
          index === driverIndex ? { ...client, [field]: value } : client
        ),
      }));
    } else {
      // Actualizar campo principal del rental
      setEditedRental((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const renderField = (
    label,
    value,
    field,
    driverIndex = null,
    type = "text"
  ) => {
    const isEditMode = isEditable;
    const currentValue =
      driverIndex !== null
        ? editedRental?.clients[driverIndex]?.[field] || value
        : editedRental?.[field] || value;

    return (
      <div className={styles.field}>
        <span className={styles.label}>{label}:</span>
        {isEditMode ? (
          <input
            type={type}
            value={currentValue}
            onChange={(e) =>
              handleInputChange(field, e.target.value, driverIndex)
            }
            className={styles.editInput}
          />
        ) : (
          <span className={styles.value}>{value}</span>
        )}
      </div>
    );
  };

  const renderSelectField = (
    label,
    value,
    field,
    options,
    driverIndex = null
  ) => {
    if (!options) return <div className={styles.field}>Cargando...</div>;
    const isEditMode = isEditable;
    const currentValue =
      driverIndex !== null
        ? editedRental?.clients[driverIndex]?.[field] || value
        : editedRental?.[field] || value;

    return (
      <div className={styles.field}>
        <span className={styles.label}>{label}:</span>
        {isEditMode ? (
          <select
            value={currentValue}
            onChange={(e) =>
              handleInputChange(field, e.target.value, driverIndex)
            }
            className={styles.editSelect}
          >
            {Object.entries(options).map(([key, displayValue]) => (
              <option key={key} value={key}>
                {displayValue}
              </option>
            ))}
          </select>
        ) : (
          <span className={styles.value}>{options[value] || value}</span>
        )}
      </div>
    );
  };

  if (loading) {
    return <div className={styles.loading}>Cargando...</div>;
  }
  if (!rental) {
    return (
      <div className={styles.failure}>
        Error al traer la informacion del cliente
      </div>
    );
  }

  const mainDriver = rental.clients[0];
  const additionalDrivers = rental.clients.slice(1);

  return (
    <div className={styles.background}>
      <div className={styles.backButtonContainer}>
        <BackButton onClick={navigateBack} />
      </div>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerText}>
            <h1 className={styles.title}>
              {isEditable ? "Editar Alquiler" : "Detalles del Alquiler"}
            </h1>
            {isEditable && <div className={styles.editBadge}>Modo Edición</div>}
          </div>
          {!isEditable && <button className={styles.editButton} onClick={handleEditButtonClick}>Editar</button>}
        </div>

        {/* Información del Alquiler */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Información del Vehículo</h2>
          <div className={styles.grid}>
            {renderSelectField("Vehículo", rental.carId, "carId", cars)}
            {renderField(
              "Precio Total",
              `$${rental.totalPrice}`,
              "totalPrice",
              null,
              "number"
            )}
            <div className={styles.field}>
              <span className={styles.label}>Dias de alquiler</span>
              <span className={styles.value}>{rental.daysRented} dias</span>
            </div>
            {renderSelectField(
              "Seguro",
              rental.insurance,
              "insurance",
              insuranceNames
            )}
            {renderSelectField(
              "Asiento de Bebé",
              rental.babySeat,
              "babySeat",
              babySeatNames
            )}
            {renderSelectField(
              "Tanque de Gasolina",
              rental.gasTank,
              "gasTank",
              gasTankNames
            )}
          </div>
        </div>

        {/* Información de Fechas y Ubicaciones */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Fechas y Ubicaciones</h2>
          <div className={styles.grid}>
            {renderField(
              "Fecha de entrega",
              formatDateAndHour(rental.start),
              "start",
              null,
              "datetime-local"
            )}
            {renderField(
              "Fecha de devolucion",
              formatDateAndHour(rental.end),
              "end",
              null,
              "datetime-local"
            )}
            {renderSelectField(
              "Lugar de entrega",
              rental.pickupLocation,
              "pickupLocation",
              locationNames
            )}
            {renderSelectField(
              "Lugar de Devolución",
              rental.returnLocation,
              "returnLocation",
              locationNames
            )}
            {rental.travelLocation &&
              renderSelectField(
                "Destino de Viaje",
                rental.travelLocation,
                "travelLocation",
                travelLocationNames
              )}
          </div>
        </div>

        {/* Conductor Principal */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Conductor Principal</h2>
          <div className={styles.driverCard}>
            <div className={styles.grid}>
              {renderField("Nombre", mainDriver.name, "name", 0)}
              {renderField("Apellido", mainDriver.surname, "surname", 0)}
              {renderField("Email", mainDriver.email, "email", 0, "email")}
              {renderField("Teléfono", mainDriver.phone, "phone", 0, "tel")}
              {renderField(
                "Fecha de Nacimiento",
                formatDate(mainDriver.bornDate),
                "bornDate",
                0,
                "date"
              )}
              {renderField(
                "Número de Licencia",
                mainDriver.licenseNumber,
                "licenseNumber",
                0
              )}
              {renderField(
                "Nombre en Licencia",
                mainDriver.licenseName,
                "licenseName",
                0
              )}
              {renderField(
                "Dirección en Licencia",
                mainDriver.licenseAddress,
                "licenseAddress",
                0
              )}
              {renderField(
                "Vencimiento de Licencia",
                formatDate(mainDriver.licenseExpirationDate),
                "licenseExpirationDate",
                0,
                "date"
              )}
              {renderField(
                "Numero de vuelo",
                mainDriver.flightNumber,
                "flightNumber",
                0,
                "text"
              )}
            </div>
          </div>
        </div>

        {/* Conductores Adicionales */}
        {additionalDrivers.length > 0 && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Conductores Adicionales</h2>
            {additionalDrivers.map((driver, index) => (
              <div key={index} className={styles.driverCard}>
                <h3 className={styles.driverTitle}>
                  Conductor Adicional {index + 1}
                </h3>
                <div className={styles.grid}>
                  {renderField("Nombre", driver.name, "name", index + 1)}
                  {renderField(
                    "Apellido",
                    driver.surname,
                    "surname",
                    index + 1
                  )}
                  {renderField(
                    "Email",
                    driver.email,
                    "email",
                    index + 1,
                    "email"
                  )}
                  {renderField(
                    "Teléfono",
                    formatPhoneNumber(driver.phone),
                    "phone",
                    index + 1,
                    "tel"
                  )}
                  {renderField(
                    "Fecha de Nacimiento",
                    formatDateAndHour(driver.bornDate),
                    "bornDate",
                    index + 1,
                    "date"
                  )}
                  {renderField(
                    "Número de Licencia",
                    driver.licenseNumber,
                    "licenseNumber",
                    index + 1
                  )}
                  {renderField(
                    "Nombre en Licencia",
                    driver.licenseName,
                    "licenseName",
                    index + 1
                  )}
                  {renderField(
                    "Dirección en Licencia",
                    driver.licenseAddress,
                    "licenseAddress",
                    index + 1
                  )}
                  {renderField(
                    "Vencimiento de Licencia",
                    formatDateAndHour(driver.licenseExpirationDate),
                    "licenseExpirationDate",
                    index + 1,
                    "date"
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {!isEditable && (
            <button
              className={`${styles.deleteButton}`}
              onClick={handleDeleteButtonClick}
            >
              Eliminar
            </button>

        )}
        {/* Botones de acción para modo edición */}
        {isEditable && (
          <div className={styles.actionButtons}>
            <button
              className={`${styles.saveButton} ${styles.button}`}
              onClick={handleSaveButtonClick}
            >
              Guardar Cambios
            </button>
            <button
              className={`${styles.cancelButton} ${styles.button}`}
              onClick={() => setEditedRental({ ...rental })}
            >
              Cancelar Cambios
            </button>
          </div>
        )}
      </div>
      {/* Modal de confirmación */}
      <ConfirmationModal
        message={confirmationModalMessage}
        onConfirm={confirmationModalFunction}
        onCancel={handleCancel}
        isOpen={showConfirmationComponent}
        type={confirmationModalType}
      />
      
      <ErrorModal
        message={errorMessage}
        redirectPath={errorPath}
        buttonText={errorButtonMessage}
        showModal={showErrorModal}
        onClose={() => setShowErrorModal(false)}
      />
    </div>
  );
}
