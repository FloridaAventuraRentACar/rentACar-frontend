import React, { useContext, useEffect } from 'react';
import styles from '../styles/RentalDetails.module.css';
import { AppContext } from '../context/AppContext';
import { format, parseISO } from 'date-fns';
import locationNames from '../utilities/names/locationNames';
import insuranceNames from '../utilities/names/insuranceNames';
import babySeatNames from '../utilities/names/babySeatNames';
import travelLocationNames from '../utilities/names/travelLocationNames';

const RentalDetails = ({updatedPrice}) => {

  const {
    carData, daysBooked, pickupLocation, pickupDate,pickupTime, returnLocation, returnDate, returnTime, 
    totalPrice ,selectedInsurance, selectedBabySeat, travelLocation
  } = useContext(AppContext);
  

  const parsePickupDate = parseISO(pickupDate);
  const formattedPickupDate = format(parsePickupDate, 'eee, dd. MMM. yyyy');
  
  const parseReturnDate = parseISO(returnDate);
  const formattedReturnDate = format(parseReturnDate, 'eee, dd. MMM. yyyy');

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img
          src={carData.imageUrl}
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
          <p className={styles.location}>{locationNames[pickupLocation]}</p>
          <p className={styles.datetime}>{formattedPickupDate} | {pickupTime}</p>
        </div>
        <div>
          <p className={styles.label}>Devolución</p>
          <p className={styles.location}>{locationNames[returnLocation]}</p>
          <p className={styles.datetime}>{formattedReturnDate} | {returnTime}</p>
        </div>
      </div>

      <div className={styles.summary}>
        <h4>Su resumen de reservas:</h4>
        <ul>
          <li>✔ Seguro {insuranceNames[selectedInsurance]}</li>
          {(selectedBabySeat !== 'NONE') && <li>✔ {babySeatNames[selectedBabySeat]}</li>}
          {travelLocation && <li>✔ Viajaras a {travelLocationNames[travelLocation]} </li>}
        </ul>
      </div>
      <div className={styles.priceContainer}>
        <p className={styles.priceText}>Precio total:</p>
        <p className={styles.totalPrice}>${totalPrice}</p>
      </div>
    </div>
  );
};

export default RentalDetails;
