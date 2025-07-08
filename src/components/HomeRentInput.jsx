import { useEffect, useContext } from "react";
import styles from "../styles/HomeRentInput.module.css";
import { useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();

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
    navigate("/cars");
  };

  const resetStates = () => {
    setPickupLocation("");
    setReturnLocation("");
    setPickupDate("");
    setPickupTime("");
    setReturnDate("");
    setReturnTime("");
    setDaysBooked(0);
  };

  return (
    <div className={styles.homeFormContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
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
              <option value="" disabled selected>
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
              <option value="" disabled selected>
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
        <div className={`${styles.horizontalCenter} ${styles.pickupReturn}`}>
          <div className={styles.formGroup}>
            <label htmlFor="pickupDate" className={styles.formLabel}>
              Fecha de entrega
            </label>
            <input
              type="date"
              id="pickupDate"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              className={styles.formInput}
              required
              min={new Date().toISOString().split("T")[0]}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="pickupTime" className={styles.formLabel}>
              Hora de entrega
            </label>
            <input
              type="time"
              id="pickupTime"
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
              className={styles.formInput}
              required
            />
          </div>
        </div>
        <div className={`${styles.horizontalCenter} ${styles.pickupReturn}`}>
          <div className={styles.formGroup}>
            <label htmlFor="returnDate" className={styles.formLabel}>
              Fecha de devolución
            </label>
            <input
              type="date"
              id="returnDate"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className={styles.formInput}
              required
              min={new Date().toISOString().split("T")[0]}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="returnTime" className={styles.formLabel}>
              Hora de devolución
            </label>
            <input
              type="time"
              id="returnTime"
              value={returnTime}
              onChange={(e) => setReturnTime(e.target.value)}
              className={styles.formInput}
              required
            />
          </div>
        </div>
        <div className={styles.formGroup}>
          <button type="submit" className={styles.formButton}>
            Mostrar autos
          </button>
        </div>
      </form>
    </div>
  );
}
