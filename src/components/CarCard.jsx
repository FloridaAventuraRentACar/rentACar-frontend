import React from "react";
import "../styles/carCard.css";

export function CarCard({ name, pricePerDay, image, passengers }){
  return (
    <div className="car-card" style={{ backgroundImage: `url(${image})` }}>
      <div className="car-card-overlay">
        <h3 className="car-name">{name}</h3>
        <div className="car-card-footer">
          <span className="price">${pricePerDay}/day</span>
          <span className="passengers">
            {passengers}
          </span>
        </div>
      </div>
    </div>
  );
};


