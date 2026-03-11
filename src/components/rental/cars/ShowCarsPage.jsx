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

    // getAvailability(start, end)
    //   .then((response) => {
    //     setCars(response.data);
    //   })
    //   .catch((error) => {
    //     setCars([]);
    //   });

    setCars([
      {
        name: "Toyota Corolla",
        brand: "Toyota",
        model: "Corolla",
        name: "Toyota Corolla",
        color: "Negro",
        passengersAmount: 5,
        manual: true,
        suitcasesAmount: 2,
        pricePerDay: 100,
        imageUrl: "https://media.toyota.com.ar/29dbe8aa-9ddf-4258-b924-78924959bf79.jpeg",
        carType: "SUV",
        year: 2022,
        id: 1,
      },
    ]);
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
