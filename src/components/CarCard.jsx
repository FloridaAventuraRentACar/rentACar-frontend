import { useContext } from "react";
import styles from "../styles/CarCard.module.css";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';

export function CarCard({ carData }){
  const navigate = useNavigate()
  const {setCarData} = useContext(AppContext);
  
  const handleClick = () => {
    setCarData(carData);
    navigate(`/cars/${carData.name}`, {});
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


