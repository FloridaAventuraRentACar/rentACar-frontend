import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import styles from "../../../styles/rental/booking/CarRentalPage.module.css";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppContext.jsx";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import locationPrices from "../../../utilities/prices/locationPrices.js";
import gasTankPrices from "../../../utilities/prices/gasTankPrices.js";
import AirlineSeatReclineNormalIcon from "@mui/icons-material/AirlineSeatReclineNormal";
import MotionPhotosAutoIcon from "@mui/icons-material/MotionPhotosAuto";
import LuggageIcon from "@mui/icons-material/Luggage";
import SensorDoorIcon from "@mui/icons-material/SensorDoor";
import PriceDetailsModal from "../../ui/modals/PriceDetailsModal.jsx";
import { formatDate } from "../../../utilities/functions/formatDate.js";
import BackButton from "../../ui/buttons/BackButton";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { sizeTranslation } from "../../../utilities/names/sizeTranslation.js";
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  slotProps: {
    paper: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  },
};

function getStyles(location, selectedLocations, theme) {
  return {
    fontWeight: selectedLocations.includes(location)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

export function CarRentalPage() {
  const navigate = useNavigate();

  const [isPriceDetailsModalOpen, setIsPriceDetailsModalOpen] = useState(false);

  const location = useLocation();

  const [searchParams] = useSearchParams();

  const pickupLocation = searchParams.get("pickupLocation");
  const returnLocation = searchParams.get("returnLocation");
  const pickupDate = searchParams.get("pickupDate");
  const returnDate = searchParams.get("returnDate");

  const [selectedSunpass, setSelectedSunpass] = useState("no");

  const theme = useTheme();

  const {
    daysBooked,
    carData,
    totalPrice,
    selectedInsurance,
    setSelectedInsurance,
    selectedBabySeat,
    setSelectedBabySeat,
    travelLocations,
    setTravelLocations,
    selectedGasTank,
    setSelectedGasTank,
    travelLocationPrice,
    clearRentalOptions
  } = useContext(AppContext);

  useEffect(() => {
    clearRentalOptions();
  }, []);

  const handleClick = () => {
    navigate(`/driver-form${location.search}`);
  };

  const handleInsuranceClick = (selected) => {
    setSelectedInsurance(selected);
  };

  const handleBabySeatClick = (selected) => {
    setSelectedBabySeat(selected);
  };

  const handleTravelLocationsChange = (event) => {
    const { target: { value } } = event;
    setTravelLocations(typeof value === 'string' ? value.split(',') : value);
  };

  const handleSunpassClick = (selected) => {
    if (selected === "no") {
      setTravelLocations([]);
    }
    setSelectedSunpass(selected);
  };

  const handleGasTankClick = (selected) => {
    setSelectedGasTank(selected);
  };

  const handlePriceDetailsClose = () => {
    setIsPriceDetailsModalOpen(false);
  }

  const handlePriceDetailsClick = () => {
    setIsPriceDetailsModalOpen(true);
  }

  return (
    <div className={styles.background}>
      <div className={styles.backButtonContainer}>
        <BackButton href={`/cars${location.search}`} />
      </div>
      <div className={styles.carRentalCard}>
        <div className={styles.carInfo}>
          <img
            src={carData.imageUrl}
            alt={carData.brand}
            className={styles.carImage}
          />
          <div className={styles.carDescription}>
            <h2 className={styles.carName}>{carData.brand} {carData.model}</h2>
            <div className={styles.carSpecs}>
              <div className={styles.seats}>
                <AirlineSeatReclineNormalIcon
                  fontSize="large"
                  className={styles.icon}
                />
                <span>{carData.passengersAmount} asientos</span>
              </div>
              <div className={styles.luggage}>
                <LuggageIcon fontSize="large" className={styles.icon} />
                <span>{carData.suitcasesAmount} valijas</span>
              </div>
              <div className={styles.automatic}>
                <MotionPhotosAutoIcon
                  fontSize="large"
                  className={styles.icon}
                />
                <span>Automatico</span>
              </div>
              <div className={styles.iconContainer}>
                <DirectionsCarIcon fontSize="large" className={styles.icon} />
                <span>{sizeTranslation[carData.size]}</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.insurance}>
          <div className={styles.mainDiv}>
            <h3>Seguro</h3>

            <label
              className={`${styles.option} ${selectedInsurance === "DEDUCTIBLE" ? styles.selected : ""
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
                className={`${styles.option} ${selectedInsurance === "TOTAL" ? styles.selected : ""
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
              className={`${styles.option} ${selectedBabySeat === "NONE" ? styles.selected : ""
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
              className={`${styles.option} ${selectedBabySeat === "BABY_SEAT" ? styles.selected : ""
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
              <span className={styles.includedTag}>Mismo precio por dia</span>
            </label>

            <label
              className={`${styles.option} ${selectedBabySeat === "TODDLER_SEAT" ? styles.selected : ""
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
              <span className={styles.includedTag}>Mismo precio por dia</span>
            </label>

            <label
              className={`${styles.option} ${selectedBabySeat === "BOOSTER_SEAT" ? styles.selected : ""
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
              <span className={styles.includedTag}>Mismo precio por dia</span>
            </label>
          </div>
        </div>

        <div className={styles.sunpass}>
          <div className={styles.mainDiv}>
            <h3>Sunpass</h3>

            <label
              className={`${styles.option} ${selectedSunpass === "no" ? styles.selected : ""
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
              <span className={styles.priceTag}>+ ${(2.15 * daysBooked).toFixed(2)} al total</span>
            </label>

            <label
              className={`${styles.option} ${selectedSunpass === "yes" ? styles.selected : ""
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
                    multiple
                    value={travelLocations}
                    onChange={handleTravelLocationsChange}
                    input={<OutlinedInput id="select-multiple-chip" label="Donde" />}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                    MenuProps={MenuProps}
                  >
                    <MenuItem value="Orlando" style={getStyles("Orlando", travelLocations, theme)}>Orlando</MenuItem>
                    <MenuItem value="KeyWest" style={getStyles("KeyWest", travelLocations, theme)}>KeyWest</MenuItem>
                    <MenuItem value="WestPalmBeach" style={getStyles("WestPalmBeach", travelLocations, theme)}>West Palm Beach</MenuItem>
                    <MenuItem value="Daytona" style={getStyles("Daytona", travelLocations, theme)}>Daytona</MenuItem>
                    <MenuItem value="ClearWater" style={getStyles("ClearWater", travelLocations, theme)}>Clearwater Beach</MenuItem>
                    <MenuItem value="IslaMorada" style={getStyles("IslaMorada", travelLocations, theme)}>Isla Morada</MenuItem>
                    <MenuItem value="Naples" style={getStyles("Naples", travelLocations, theme)}>Naples</MenuItem>
                  </Select>
                </FormControl>
              )}
              {selectedSunpass === "yes" && (
                <span className={styles.priceTag}>
                  + ${travelLocations.length === 0 ? 0 : travelLocationPrice} al total
                </span>
              )}
            </label>
          </div>
        </div>

        <div className={styles.gasTank}>
          <div className={styles.mainDiv}>
            <h3>Tanque de nafta</h3>

            <label
              className={`${styles.option} ${selectedGasTank === "FULL" ? styles.selected : ""
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
              className={`${styles.option} ${selectedGasTank === "EMPTY" ? styles.selected : ""
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
                + ${carData.tankPrice} al total
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
                  <p>Tienes millas ilimitadas dentro de la Florida</p>
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
            <a className={styles.priceDetails} onClick={handlePriceDetailsClick}>Detalles del precio</a>
          </div>
          <div className={styles.reserveInfo}>
            <div className={styles.pickupInfo}>
              <strong className={styles.title}>Entrega</strong>
              <p className={styles.date}>
                {formatDate(pickupDate)}
              </p>
            </div>
            <div className={styles.returnInfo}>
              <div className={styles.title}>Devolucion</div>
              <p className={styles.date}>
                {formatDate(returnDate)}
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
        <PriceDetailsModal
          daysRented={daysBooked}
          pricePerDay={carData.pricePerDay}
          insurance={selectedInsurance}
          babySeat={selectedBabySeat}
          travelLocations={travelLocations}
          gasTank={selectedGasTank}
          tankPrice={carData.tankPrice}
          totalPrice={totalPrice}
          onClose={handlePriceDetailsClose}
          isOpen={isPriceDetailsModalOpen}
        />
      </div>
    </div>
  );
}
