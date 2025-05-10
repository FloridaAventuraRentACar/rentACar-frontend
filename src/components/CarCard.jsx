import React, { useContext } from "react";
import "../styles/carCard.css";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

export function CarCard({ carData }){
  const navigate = useNavigate()
  const {setCarData} = useContext(AppContext);
  
  const handleClick = () => {
    setCarData(carData);
    navigate(`/cars/${carData.name}`, {});
  };

  return (
    <div className="car-card" style={{ backgroundImage: `url(${carData.imageUrl})` }} onClick={handleClick}>
      <div className="car-card-overlay">
        <h3 className="car-name">{carData.name}</h3>
        <div className="car-card-footer">
          <span className="price">${carData.pricePerDay}/dia</span>
        </div>
      </div>
    </div>
  );
};


