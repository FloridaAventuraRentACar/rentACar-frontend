import styles from '../../styles/admin/RentalsGrid.module.css'
import { sortRentalsByDate } from '../../utilities/sortRentalsByDate'
import { rentalsFetchSimulate } from '../../utilities/rentalsFetchSimulate'

export default function RentalsGrid() {
  

  const rentals = sortRentalsByDate(rentalsFetchSimulate) //Esta funcion ordena los Rentals de menor a mayor

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
                {formatDate(rental.start)} - {formatDate(rental.endDate)}
              </div>
              <div className={styles.price}>{rental.totalPrice}</div>
              <button className={styles.detailButton}>Ver detalle</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


