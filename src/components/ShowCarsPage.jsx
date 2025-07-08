import { useContext, useEffect, useState } from "react";
import { CarCard } from "./CarCard.jsx";
import styles from "../styles/ShowCarsPage.module.css";
import NoCarsAvailable from "./NoCarsAvailable.jsx";
import { carsQuery } from "../utilities/CarsFetchSimulate.js";
import { AppContext } from "../context/AppContext";
import { getAvailability } from "../services/rentalService.js";

export function ShowCarsPage() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    checkAvailability();
  }, []);

  const { pickupDate, pickupTime, returnDate, returnTime } =
    useContext(AppContext);

  const checkAvailability = () => {
    const start = `${pickupDate}T${pickupTime}`;
    const end = `${returnDate}T${returnTime}`;

    getAvailability(start, end)
      .then((response) => {
        setCars(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={styles.showCarsMainContainer}>
      {cars ? (
        cars.length === 0 ? (
          <NoCarsAvailable />
        ) : (
          cars.map((car, index) => <CarCard key={index} carData={car} />)
        )
      ) : (
        <h1>Cargando</h1>
      )}
    </div>
  );
}
