import styles from "../../styles/admin/RentalsGrid.module.css";
import { sortRentalsByDate } from "../../utilities/functions/sortRentalsByDate";
import {
  deleteRentalById,
  getCurrentRentals,
} from "../../services/rentalService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { parseISO, format } from "date-fns";
import { es } from "date-fns/locale";
import ConfirmationModal from "../ui/ConfirmationModal";
import { getErrorMessage } from "../../utilities/errors/errorsMessages";
import ErrorModal from "../ui/ErrorModal";

export default function RentalsGrid() {
  const [rentals, setRentals] = useState([]);
  const [showConfirmationComponent, setShowConfirmationComponent] =
    useState(false);
  const [rentalIdToDelete, setRentalIdToDelete] = useState(null);

  //Mensaje de error
  const [errorMessage, setErrorMessage] = useState("");
  const [errorPath, setErrorPath] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorButtonMessage, setErrorButtonMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchCurrentRentals();
  }, [showConfirmationComponent]);

  //Trae un resumen de los alquileres activos
  const fetchCurrentRentals = async () => {
    const response = await getCurrentRentals();
    const rentalsData = await response.data;

    setRentals(sortRentalsByDate(rentalsData));
  };

  // Función para formatear fechas
  const formatDate = (dateString) => {
    const parseDate = parseISO(dateString);

    return format(parseDate, "eee, dd. MMM. yyyy", { locale: es });
  };

  const handleRentalDetailClick = (rental) => {
    navigate("/admin/rentals/view/" + rental.id);
  };

  const handleRentalEditClick = (rental) => {
    navigate("/admin/rentals/edit/" + rental.id);
  };

  const handleRentalDeleteClick = (rentalId) => {
    setShowConfirmationComponent(true);
    setRentalIdToDelete(rentalId);
  };

  const handleDelete = async () => {
    try {
      await deleteRentalById(rentalIdToDelete);
    } catch (error) {

      setShowConfirmationComponent(false);
      setShowErrorModal(true);
      setErrorButtonMessage("Salir");

      setErrorMessage("Error al eliminar el alquiler");

      setErrorPath("/admin/rentals/edit/" + id);
    }
    setShowConfirmationComponent(false);
  };

  const handleCancel = () => {
    setShowConfirmationComponent(false);
  };
  return (
    <div className={styles.container}>
      <div className={styles.cardList}>
        {rentals.map((rental) => (
          <div key={rental.id} className={styles.card}>
            <div className={styles.cardContent}>
              <div className={styles.carName}>{rental.carName}</div>
              <div className={styles.clientName}>{rental.clientName}</div>
              <div className={styles.dateRange}>
                {formatDate(rental.start)} - {formatDate(rental.end)}
              </div>
              <div className={styles.price}>${rental.totalPrice}</div>
              <button
                className={styles.detailButton + " " + styles.button}
                onClick={() => handleRentalDetailClick(rental)}
              >
                Ver detalle
              </button>
              <button
                className={styles.editButton + " " + styles.button}
                onClick={() => handleRentalEditClick(rental)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#e3e3e3"
                >
                  <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                </svg>
              </button>
              <button
                className={styles.deleteButton + " " + styles.button}
                onClick={() => handleRentalDeleteClick(rental.id)}
              >
                X
              </button>
            </div>
          </div>
        ))}
      </div>
      <ConfirmationModal
        message={"¿Estas seguro que quieres eliminar el alquiler?"}
        onConfirm={handleDelete}
        onCancel={handleCancel}
        isOpen={showConfirmationComponent}
        type={"danger"}
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
