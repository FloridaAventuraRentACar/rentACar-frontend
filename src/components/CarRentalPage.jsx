import { useLocation, useNavigate } from "react-router-dom";

import styles from "../styles/CarRentalPage.module.css";

import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import locationPrices from "../utilities/locationPrices";
import gasTankPrices from "../utilities/gasTankPrices";
import AirlineSeatReclineNormalIcon from "@mui/icons-material/AirlineSeatReclineNormal";
import MotionPhotosAutoIcon from "@mui/icons-material/MotionPhotosAuto";
import LuggageIcon from "@mui/icons-material/Luggage";
import SensorDoorIcon from "@mui/icons-material/SensorDoor";
import locationNames from "../utilities/names/locationNames.js";

export function CarRentalPage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/driver-form");
  };

  const [selectedSunpass, setSelectedSunpass] = useState("no");
  const [travelLocationPrice, setTravelLocationPrice] = useState(0);

  const {
    daysBooked,
    pickupLocation,
    returnLocation,
    pickupDate,
    pickupTime,
    returnDate,
    returnTime,
    carData,
    totalPrice,
    selectedInsurance,
    setSelectedInsurance,
    selectedBabySeat,
    setSelectedBabySeat,
    travelLocation,
    setTravelLocation,
    selectedGasTank,
    setSelectedGasTank,
  } = useContext(AppContext);

  const insuranceCharge = () => {
    if (selectedInsurance === "DEDUCTIBLE") {
      return 0;
    }
    return 15 * daysBooked;
  };

  const babySeatCharge = () => {
    if (selectedBabySeat === "NONE") {
      return 0;
    }
    return 3 * daysBooked;
  };

  const gasTankCharge = () => {
    if (selectedGasTank === "EMPTY") {
      return gasTankPrices[carData.type];
    }
    return 0;
  };

  // useEffect(() => {
  //   setTotalPrice(
  //     carData.pricePerDay * daysBooked +
  //     insuranceCharge() +
  //     babySeatCharge() +
  //     travelLocationPrice +
  //     gasTankCharge()
  //   );
  // }, [
  //   selectedInsurance,
  //   selectedBabySeat,
  //   travelLocationPrice,
  //   selectedGasTank,
  // ]);

  const handleInsuranceClick = (selected) => {
    setSelectedInsurance(selected);
  };

  const handleBabySeatClick = (selected) => {
    setSelectedBabySeat(selected);
  };

  const handleTravelLocationChange = (event) => {
    const newLocation = event.target.value;
    const newLocationPrice = locationPrices[newLocation];

    // Actualizamos travelLocation y travelLocationPrice
    setTravelLocation(newLocation);
    setTravelLocationPrice(newLocationPrice);
  };

  const handleSunpassClick = (selected) => {
    if (selected === "no") {
      setTravelLocation(null);
      setTravelLocationPrice(0);
    }
    setSelectedSunpass(selected);
  };

  const handleGasTankClick = (selected) => {
    setSelectedGasTank(selected);
  };

  return (
    <div className={styles.carRentalCard}>
      <div className={styles.carInfo}>
        <img
          src={carData.imageUrl}
          alt={carData.name}
          className={styles.carImage}
        />
        <div className={styles.carDescription}>
          <h2 className={styles.carName}>{carData.name}</h2>
          <div className={styles.carSpecs}>
            <div className={styles.seats}>
              <AirlineSeatReclineNormalIcon
                fontSize="large"
                className={styles.seatIcon}
              />
              <span>{carData.passengersAmount} asientos</span>
            </div>
            <div className={styles.luggage}>
              <LuggageIcon fontSize="large" className={styles.luggageIcon} />
              <span>{carData.suitcasesAmount} valijas</span>
            </div>
            <div className={styles.automatic}>
              <MotionPhotosAutoIcon
                fontSize="large"
                className={styles.automaticIcon}
              />
              <span>Automatico</span>
            </div>
            <div className={styles.door}>
              <SensorDoorIcon fontSize="large" className={styles.doorIcon} />
              <span>4 Puertas</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.insurance}>
        <div className={styles.mainDiv}>
          <h3>Seguro</h3>

          <label
            className={`${styles.option} ${
              selectedInsurance === "DEDUCTIBLE" ? styles.selected : ""
            }`}
            onClick={() => handleInsuranceClick("DEDUCTIBLE")}
          >
            <div className={styles.optionMain}>
              <input type="radio" name="insurance" defaultChecked />
              <div className={styles.optionText}>
                <strong>Franquicia de $500</strong>
                <p>Tu pagas los primeros $500, nosotros cubrimos el resto</p>
              </div>
            </div>
            <span className={styles.includedTag}>Mismo precio por dia</span>
          </label>
          {daysBooked >= 20 && (
            <label
              className={`${styles.option} ${
                selectedInsurance === "TOTAL" ? styles.selected : ""
              }`}
              onClick={() => handleInsuranceClick("TOTAL")}
            >
              <div className={styles.optionMain}>
                <input type="radio" name="insurance" />
                <div className={styles.optionText}>
                  <strong>Seguro total</strong>
                  <p>Cubrimos todos los costos</p>
                </div>
              </div>
              <span className={styles.priceTag}>+ $15 /dia</span>
            </label>
          )}
        </div>
      </div>

      <div className={styles.babySeat}>
        <div className={styles.mainDiv}>
          <h3>Asiento de bebe</h3>

          <label
            className={`${styles.option} ${
              selectedBabySeat === "NONE" ? styles.selected : ""
            }`}
            onClick={() => handleBabySeatClick("NONE")}
          >
            <div className={styles.optionMain}>
              <input type="radio" name="baby seat" defaultChecked />
              <div className={styles.optionText}>
                <strong>Sin asiento para niño</strong>
                <p>
                  Esto significa que no necesitas un asiento para niño adicional
                </p>
              </div>
            </div>
            <span className={styles.includedTag}>Mismo precio por dia</span>
          </label>

          <label
            className={`${styles.option} ${
              selectedBabySeat === "BABY_SEAT" ? styles.selected : ""
            }`}
            onClick={() => handleBabySeatClick("BABY_SEAT")}
          >
            <div className={styles.optionMain}>
              <input type="radio" name="baby seat" />
              <div className={styles.optionText}>
                <strong>Incluir asiento de bebe</strong>
                <p>Pensada para niños de hasta 1 año</p>
              </div>
            </div>
            <span className={styles.priceTag}>+ $3 /dia</span>
          </label>

          <label
            className={`${styles.option} ${
              selectedBabySeat === "TODDLER_SEAT" ? styles.selected : ""
            }`}
            onClick={() => handleBabySeatClick("TODDLER_SEAT")}
          >
            <div className={styles.optionMain}>
              <input type="radio" name="baby seat" />
              <div className={styles.optionText}>
                <strong>Incluir Toddler seat</strong>
                <p>Pensada para niños de entre 1 y 4 años</p>
              </div>
            </div>
            <span className={styles.priceTag}>+ $3 /dia</span>
          </label>

          <label
            className={`${styles.option} ${
              selectedBabySeat === "BOOSTER_SEAT" ? styles.selected : ""
            }`}
            onClick={() => handleBabySeatClick("BOOSTER_SEAT")}
          >
            <div className={styles.optionMain}>
              <input type="radio" name="baby seat" />
              <div className={styles.optionText}>
                <strong>Incluir Booster seat</strong>
                <p>Pensada para niños de entre 4 y 12 años</p>
              </div>
            </div>
            <span className={styles.priceTag}>+ $3 /dia</span>
          </label>
        </div>
      </div>

      <div className={styles.sunpass}>
        <div className={styles.mainDiv}>
          <h3>Sunpass</h3>

          <label
            className={`${styles.option} ${
              selectedSunpass === "no" ? styles.selected : ""
            }`}
            onClick={() => handleSunpassClick("no")}
          >
            <div className={styles.optionMain}>
              <input type="radio" name="sunpass" defaultChecked />
              <div className={styles.optionText}>
                <strong>No voy a salir de Miami</strong>
                <p>
                  Esto significa que no viajaras fuera de Miami con el coche
                </p>
              </div>
            </div>
            <span className={styles.includedTag}>Mismo precio por dia</span>
          </label>

          <label
            className={`${styles.option} ${
              selectedSunpass === "yes" ? styles.selected : ""
            }`}
            onClick={() => handleSunpassClick("yes")}
          >
            <div className={styles.optionMain}>
              <input type="radio" name="sunpass" />
              <div className={styles.optionText}>
                <strong>Viajare fuera de Miami</strong>
                <p>Debes seleccionar a donde tienes planeado viajar</p>
              </div>
            </div>
            {selectedSunpass === "yes" && (
              <FormControl sx={{ m: 1, minWidth: 100 }}>
                <InputLabel id="travel-location-label">Donde</InputLabel>
                <Select
                  labelId="travel-location-label"
                  id="travel-location-select"
                  value={travelLocation}
                  label="Travel location"
                  onChange={handleTravelLocationChange}
                >
                  <MenuItem value={"Orlando"}>Orlando</MenuItem>
                  <MenuItem value={"KeyWest"}>KeyWest</MenuItem>
                  <MenuItem value={"WestPalmBeach"}>West Palm Beach</MenuItem>
                  <MenuItem value={"Daytona"}>Daytona</MenuItem>
                  <MenuItem value={"ClearWater"}>Clearwater beach</MenuItem>
                  <MenuItem value={"IslaMorada"}>Isla morada</MenuItem>
                  <MenuItem value={"Naples"}>Naples</MenuItem>
                </Select>
              </FormControl>
            )}
            {selectedSunpass === "yes" && (
              <span className={styles.priceTag}>
                + ${travelLocationPrice} al total
              </span>
            )}
          </label>
        </div>
      </div>

      <div className={styles.gasTank}>
        <div className={styles.mainDiv}>
          <h3>Tanque de nafta</h3>

          <label
            className={`${styles.option} ${
              selectedGasTank === "FULL" ? styles.selected : ""
            }`}
            onClick={() => handleGasTankClick("FULL")}
          >
            <div className={styles.optionMain}>
              <input type="radio" name="gas-tank" defaultChecked />
              <div className={styles.optionText}>
                <strong>Devolver tanque lleno</strong>
                <p>
                  Esto significa que debes devolver el coche con el tanque de
                  gasolina lleno
                </p>
              </div>
            </div>
            <span className={styles.includedTag}>Mismo precio total</span>
          </label>

          <label
            className={`${styles.option} ${
              selectedGasTank === "EMPTY" ? styles.selected : ""
            }`}
            onClick={() => handleGasTankClick("EMPTY")}
          >
            <div className={styles.optionMain}>
              <input type="radio" name="gas-tank" />
              <div className={styles.optionText}>
                <strong>No devolver tanque lleno</strong>
                <p>
                  Puedes devolver el tanque como esté, pero se te cobrará el
                  tanque completo
                </p>
              </div>
            </div>
            <span className={styles.priceTag}>
              + ${gasTankPrices[carData.type]} al total
            </span>
          </label>
        </div>
      </div>

      <div className={styles.aditionalServices}>
        <div className={styles.mainDiv}>
          <h3>Servicios adicionales</h3>
          <div className={`${styles.option} ${styles.selected}`}>
            <div className={styles.optionMain}>
              <div className={styles.optionText}>
                <strong>Asistente de carretera</strong>
                <p>Te proveemos de una grua en caso que la necesites</p>
              </div>
            </div>
            <span className={styles.includedTag}>Incluido</span>
          </div>
          <div className={`${styles.option} ${styles.selected}`}>
            <div className={styles.optionMain}>
              <div className={styles.optionText}>
                <strong>Conductor adicional</strong>
                <p>
                  Puedes registrar hasta 1 conductor adicional al conductor
                  principal sin cargo extra
                </p>
              </div>
            </div>
            <span className={styles.includedTag}>Incluido</span>
          </div>
          <div className={`${styles.option} ${styles.selected}`}>
            <div className={styles.optionMain}>
              <div className={styles.optionText}>
                <strong>Millas ilimitadas</strong>
                <p>Tienes millas ilimitadas dentro de la florida</p>
              </div>
            </div>
            <span className={styles.includedTag}>Incluido</span>
          </div>
        </div>
      </div>

      <div className={styles.priceSection}>
        <div className={styles.priceInfo}>
          <div className={styles.priceTop}>
            <p className={styles.pricePerDay}>
              ${carData.pricePerDay} <span>/dia</span>
            </p>
            <p className={styles.daysReserved}>{daysBooked} dias reservados</p>
          </div>
          <strong className={styles.totalPrice}>${totalPrice} total</strong>
          <a href="#">Detalles del precio</a>
        </div>
        <div className={styles.reserveInfo}>
          <div className={styles.pickupInfo}>
            <strong className={styles.title}>Entrega</strong>
            <p className={styles.location}>{locationNames[pickupLocation]}</p>
            <p className={styles.date}>
              {pickupDate} - {pickupTime}
            </p>
          </div>
          <div className={styles.returnInfo}>
            <div className={styles.title}>Devolucion</div>
            <p className={styles.location}>{locationNames[returnLocation]}</p>
            <p className={styles.date}>
              {returnDate} - {returnTime}
            </p>
          </div>
        </div>
        <button
          type="button"
          className={styles.nextButton}
          onClick={handleClick}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
