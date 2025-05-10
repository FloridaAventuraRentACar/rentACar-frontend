import React, { useContext } from "react";
import "../styles/carCard.css";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

export function CarCard({ id, name, pricePerDay, image, passengers, suitcases}){

  const navigate = useNavigate()
  const {setCarData} = useContext(AppContext);
  
  const handleClick = () => {
    const carData = { id, name, pricePerDay, image, passengers , suitcases};
    setCarData(carData);
    navigate(`/cars/${name}`,{});
  }
  
  return (
    <div className="car-card" style={{ backgroundImage: `url(${image})` }} onClick={handleClick}>
      <div className="car-card-overlay">
        <h3 className="car-name">{name}</h3>
        <div className="car-card-footer">
          <span className="price">${pricePerDay}/dia</span>
        </div>
      </div>
    </div>
  );
};


