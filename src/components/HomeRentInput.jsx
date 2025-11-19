"use client";

import { useEffect, useContext } from "react";
import styles from "../styles/HomeRentInput.module.css";
import { AppContext } from "../context/AppContext";
import { daysCalculate } from "../utilities/functions/daysCalculate";

export default function HomeRentInput() {
  const {
    pickupLocation,
    setPickupLocation,
    returnLocation,
    setReturnLocation,
    pickupDate,
    setPickupDate,
    pickupTime,
    setPickupTime,
    returnDate,
    setReturnDate,
    returnTime,
    setReturnTime,
    setDaysBooked,
  } = useContext(AppContext);

  useEffect(() => {
    resetStates();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const daysBooked = daysCalculate(
      pickupDate,
      returnDate,
      pickupTime,
      returnTime
    );

    if (daysBooked < 3) {
      alert("El alquiler debe ser de mínimo 3 días");
      return;
    }

    setDaysBooked(daysBooked);
    // En lugar de navigate, mostramos un mensaje de éxito
    alert(`¡Perfecto! Has reservado por ${daysBooked} días. Mostrando autos disponibles...`);
  };

  const resetStates = () => {
    setPickupLocation("MIAMI_INTERNATIONAL_AIRPORT");
    setReturnLocation("MIAMI_INTERNATIONAL_AIRPORT");
    setPickupDate("");
    setPickupTime("");
    setReturnDate("");
    setReturnTime("");
    setDaysBooked(0);
  };

  const handlePickupDateTimeChange = (e) => {
    const dateTimeValue = e.target.value;
    if (dateTimeValue) {
      const [date, time] = dateTimeValue.split("T");
      setPickupDate(date);
      setPickupTime(time);
    }
  };

  const handleReturnDateTimeChange = (e) => {
    const dateTimeValue = e.target.value;
    if (dateTimeValue) {
      const [date, time] = dateTimeValue.split("T");
      setReturnDate(date);
      setReturnTime(time);
    }
  };

  const pickupDateTime = pickupDate && pickupTime ? `${pickupDate}T${pickupTime}` : "";
  const returnDateTime = returnDate && returnTime ? `${returnDate}T${returnTime}` : "";

  return (
    <div className={styles.homeFormContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={`${styles.horizontalCenter} ${styles.location}`}>

          <div className={`${styles.horizontalCenter} ${styles.location}`}>
            <div className={styles.formGroup}>
              <label htmlFor="pickupLocation" className={styles.formLabel}>
                Ubicación de entrega
              </label>
              <select
                className={styles.formInput}
                id="pickupLocation"
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                required
              >
                <option value="" disabled>
                  Selecciona una ubicación de entrega
                </option>
                <option value="MIAMI_AIRPORT">
                  Aeropuerto internacional de Miami
                </option>
                <option value="FORTLAURENDALE_AIRPORT">
                  Aeropuerto de Fort Lauderdale
                </option>
                <option value="BRICKEL">Brickel</option>
                <option value="SUNNY_ISLES">Sunny Isles</option>
                <option value="HALLANDALE">Hallandale</option>
                <option value="SOUTH_BEACH">South Beach</option>
                <option value="BAL_HARBOUR">Bal Harbour</option>
                <option value="NORTH_MIAMI">North Miami</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="returnLocation" className={styles.formLabel}>
                Ubicación de devolución
              </label>
              <select
                className={styles.formInput}
                id="returnLocation"
                value={returnLocation}
                onChange={(e) => setReturnLocation(e.target.value)}
                required
              >
                <option value="" disabled>
                  Selecciona una ubicación de devolución
                </option>
                <option value="MIAMI_AIRPORT">
                  Aeropuerto internacional de Miami
                </option>
                <option value="FORTLAURENDALE_AIRPORT">
                  Aeropuerto de Fort Lauderdale
                </option>
                <option value="BRICKEL">Brickel</option>
                <option value="SUNNY_ISLES">Sunny Isles</option>
                <option value="HALLANDALE">Hallandale</option>
                <option value="SOUTH_BEACH">South Beach</option>
                <option value="BAL_HARBOUR">Bal Harbour</option>
                <option value="NORTH_MIAMI">North Miami</option>
              </select>
            </div>
          </div>
          <div className={`${styles.horizontalCenter} ${styles.dateTimeRow}`}>
            <div className={styles.formGroup}>
              <label htmlFor="pickupDateTime" className={styles.formLabel}>
                Fecha y hora de entrega
              </label>
              <input
                type="datetime-local"
                id="pickupDateTime"
                value={pickupDateTime}
                onChange={handlePickupDateTimeChange}
                className={styles.formInput}
                required
                min={new Date().toISOString().slice(0, 16)}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="returnDateTime" className={styles.formLabel}>
                Fecha y hora de devolución
              </label>
              <input
                type="datetime-local"
                id="returnDateTime"
                value={returnDateTime}
                onChange={handleReturnDateTimeChange}
                className={styles.formInput}
                required
                min={pickupDateTime || new Date().toISOString().slice(0, 16)}
              />
            </div>
          </div>
        </div>
        <div className={styles.buttonRow}>
          <button type="submit" className={styles.formButton}>
            Mostrar autos
          </button>
        </div>
      </form>
    </div>
  );
}
