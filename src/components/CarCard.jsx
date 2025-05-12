import { useContext } from "react";
import styles from "../styles/carCard.module.css";
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
        <h3 className={styles.carName}>{carData.name}</h3>
        <p className={styles.carSeats}>
          <AirlineSeatReclineNormalIcon className={styles.icon} />
          {carData.passengersAmount} asientos
        </p>
        <div className={styles.carCardFooter}>
          <span className={styles.price}>${carData.pricePerDay}/dia</span>
          <span className={styles.includes}>Impuestos y seguro incluidos en el precio</span>
        </div>
      </div>
    </div>
  );
};


