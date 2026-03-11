import { useEffect, useState } from "react";
import CarCard from "./CarCard.jsx";
import styles from "../../../styles/rental/cars/ShowCarsPage.module.css";
import NoCarsAvailable from "./NoCarsAvailable.jsx";
import { getAvailability } from "../../../services/rentalService.js";
import HeaderReusable from "../../ui/HeaderReusable.jsx";
import Loading from "../../ui/feedback/Loading.jsx";
import { useSearchParams } from "react-router-dom";

export function ShowCarsPage() {
  const [cars, setCars] = useState(undefined);

  useEffect(() => {
    checkAvailability();
  }, []);

  const [searchParams] = useSearchParams();

  const pickupDate = searchParams.get("pickupDate");
  const pickupTime = searchParams.get("pickupTime");
  const returnDate = searchParams.get("returnDate");
  const returnTime = searchParams.get("returnTime");

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
