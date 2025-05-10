import React, { useContext } from 'react';
import styles from '../styles/RentalDetails.module.css';
import { AppContext } from '../context/AppContext';
import { format, parseISO } from 'date-fns';

const RentalDetails = () => {

  const {carData, daysBooked, pickupLocation, pickupDate,pickupTime, returnLocation, returnDate, returnTime} = useContext(AppContext);

  const parsePickupDate = parseISO(pickupDate);
  const formattedPickupDate = format(parsePickupDate, 'eee, dd. MMM. yyyy');
  
  const parseReturnDate = parseISO(returnDate);
  const formattedReturnDate = format(parseReturnDate, 'eee, dd. MMM. yyyy');

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img
          src={carData.image}
          alt="Auto"
          className={styles.carImage}
        />
        <div>
          <h3 className={styles.title}>{carData.name}</h3>
          <p className={styles.duration}>{daysBooked} días de alquiler</p>
        </div>
      </div>

      <div className={styles.details}>
        <div>
          <p className={styles.label}>Entrega</p>
          <p className={styles.location}>{pickupLocation}</p>
          <p className={styles.datetime}>{formattedPickupDate} | {pickupTime}</p>
        </div>
        <div>
          <p className={styles.label}>Devolución</p>
          <p className={styles.location}>{returnLocation}</p>
          <p className={styles.datetime}>{formattedReturnDate} | {returnTime}</p>
        </div>
      </div>

      <div className={styles.summary}>
        <h4>Su resumen de reservas:</h4>
        <ul>
          <li>✔ Asistente de carretera 24/7</li>
          <li>✔ Millas ilimitadas dentro de Miami</li>
          <li>
            ✔ Te entregamos y recojemos el auto donde lo necesite
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RentalDetails;
