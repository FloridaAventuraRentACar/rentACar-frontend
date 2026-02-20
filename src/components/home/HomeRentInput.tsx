"use client";

import { useEffect, useState } from "react";
import styles from "../../styles/home/HomeRentInput.module.css";
import { daysCalculate } from "../../utilities/functions/daysCalculate";
import { useNavigate } from "react-router-dom";

export default function HomeRentInput() {

  const navigate = useNavigate();

  const [pickupLocation, setPickupLocation] = useState("MIAMI_AIRPORT");
  const [returnLocation, setReturnLocation] = useState("MIAMI_AIRPORT");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [returnTime, setReturnTime] = useState("");

  useEffect(() => {
    resetStates();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
        
    navigate(createUrlWithParams());
  };

  const createUrlWithParams = () => {
    const url = `/cars?pickupLocation=${pickupLocation}&returnLocation=${returnLocation}&pickupDate=${pickupDate}&pickupTime=${pickupTime}&returnDate=${returnDate}&returnTime=${returnTime}`;
    return url;
  }
  const resetStates = () => {
    setPickupLocation("MIAMI_AIRPORT");
    setReturnLocation("MIAMI_AIRPORT");
    setPickupDate("");
    setPickupTime("");
    setReturnDate("");
    setReturnTime("");
  };

  const handlePickupDateTimeChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const dateTimeValue = e.target.value;
    if (dateTimeValue) {
      const [date, time] = dateTimeValue.split("T");
      setPickupDate(date);
      setPickupTime(time);
    }
  };

  const handleReturnDateTimeChange = (e : React.ChangeEvent<HTMLInputElement>) => {
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
