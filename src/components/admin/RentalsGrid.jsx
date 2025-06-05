import styles from '../../styles/admin/RentalsGrid.module.css'
import { sortRentalsByDate } from '../../utilities/sortRentalsByDate'
import { rentalsFetchSimulate } from '../../utilities/rentalsFetchSimulate'
import { getCurrentRentals } from '../../services/rentalService'
import { useEffect, useState } from 'react'

export default function RentalsGrid() {

  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    
    fetchRentals();
    setRentals(sortRentalsByDate(rentals));
  }, []);

  const fetchRentals = async () => {
    const response = await getCurrentRentals();
    console.log("Response:", response);
    const rentalsData = await response.data;
    console.log("Rentals response:", rentalsData);
    setRentals(rentalsData);
  };

  // const rentals = sortRentalsByDate(rentalsFetchSimulate) //Esta funcion ordena los Rentals de menor a mayor

  // Función para formatear fechas
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
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
              <button className={styles.detailButton}>Ver detalle</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


