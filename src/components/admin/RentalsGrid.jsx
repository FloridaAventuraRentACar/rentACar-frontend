import styles from '../../styles/admin/RentalsGrid.module.css'
import { sortRentalsByDate } from '../../utilities/functions/sortRentalsByDate'
import { getCurrentRentals, getRentalById } from '../../services/rentalService'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function RentalsGrid() {

  const [rentals, setRentals] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    
    fetchCurrentRentals();

  }, []);

  //Trae un resumen de los alquileres activos
  const fetchCurrentRentals = async () => {
    const response = await getCurrentRentals();
    const rentalsData = await response.data;

    setRentals(sortRentalsByDate(rentalsData));
  };

  // Función para formatear fechas
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  const handleRentalDetailClick = async (rental) => {
    
    navigate("/admin/rentalDetail/" + rental.id);
  }

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
                className={styles.detailButton}
                onClick={() => handleRentalDetailClick(rental)}
              >
                Ver detalle
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


