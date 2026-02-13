import { useContext, useEffect, useState } from "react";
import CarCard from "./CarCard.jsx";
import styles from "../../../styles/rental/cars/ShowCarsPage.module.css";
import NoCarsAvailable from "./NoCarsAvailable.jsx";
import { AppContext } from "../../../context/AppContext.jsx";
import { getAvailability } from "../../../services/rentalService.js";
import HeaderReusable from "../../ui/HeaderReusable.jsx";
import Loading from "../../ui/feedback/Loading.jsx";

export function ShowCarsPage() {
  const [cars, setCars] = useState(undefined);

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
        setCars([]);
      });
  };

  return (
    <div className={styles.showCarsMainContainer}>
      <HeaderReusable />
      {cars ? (
        cars.length === 0 ? (
          <NoCarsAvailable />
        ) : (
          <div className={styles.carsContainer}>
            {cars.map((car, index) => (
              <CarCard key={index} carData={car} />
            ))}
          </div>
        )
      ) : (
        <Loading text="Chequeando disponibilidad de vehiculos..." />
      )}
    </div>
  );
}
