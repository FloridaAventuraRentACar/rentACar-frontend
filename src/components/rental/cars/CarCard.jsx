import { useContext } from "react";
import styles from "../../../styles/rental/cars/CarCard.module.css";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import { daysCalculate } from "../../../utilities/functions/daysCalculate";

export function CarCard({ carData }) {
  const navigate = useNavigate()
  const { setCarData, setDaysBooked } = useContext(AppContext);
  const location = useLocation();

  const [searchParams] = useSearchParams();

  const pickupDate = searchParams.get("pickupDate");
  const pickupTime = searchParams.get("pickupTime");
  const returnDate = searchParams.get("returnDate");
  const returnTime = searchParams.get("returnTime");

  const handleClick = () => {

    setCarData(carData);

    setDaysBooked(
      daysCalculate(
        pickupDate,
        returnDate,
        pickupTime,
        returnTime
      )
    );

    navigate(`/cars/${carData.name}${location.search}`, {});
  };

  return (
    <div className={styles.carCard} style={{ backgroundImage: `url(${carData.imageUrl})` }} onClick={handleClick}>
      <div className={styles.carCardOverlay}>
        <h3 className={styles.carName}>{carData.brand} {carData.model}</h3>
        <div className={styles.footerContainer}>
          <div className={styles.carCardFooter}>
            <div className={styles.footerDescription}>
              <span className={styles.price}>${carData.pricePerDay}/dia</span>
              <span className={styles.includes}>Impuestos y seguro incluidos en el precio</span>
            </div>
            <p className={styles.carSeats}>
              <AirlineSeatReclineNormalIcon className={styles.icon} />
              {carData.passengersAmount} asientos
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;



