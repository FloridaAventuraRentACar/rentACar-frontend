import { useLocation } from 'react-router-dom'
import '../styles/carRentalPage.css'
import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export function CarRentalPage() {

    const location = useLocation(); //Este useState se usa para pasar datos entre componentes
    const { carData } = location.state || {};

    const [selectedInsurance, setSelectedInsurance] = useState('deductible');
    const [selectedBabySeat, setSelectedBabySeat] = useState('no');
    const [babyAge, setBabyAge] = useState('none');

    const [totalPrice, setTotalPrice] = useState(carData.pricePerDay);
    const {daysBooked, setDaysBooked} = useContext(AppContext);

    const handleInsuranceClick = (selected) => {
        setSelectedInsurance(selected);
    }

    const handleBabySeatClick = (selected) => {
        setSelectedBabySeat(selected);
    }
    const handleBabyAgeChange = (event) => {
        setBabyAge(event.target.value);
    }

  return ( 
    <div className="car-rental-card">
      <div className="car-info">
        <img
          src={carData.image} 
          alt={carData.name}
          className="car-image"
        />
        <div className="car-description">
          <h2 className="car-name">{carData.name}</h2>
          <div className="car-specs">
            <span>🚗 {carData.passengers} Seats</span>
            <span>🧳 {carData.suitcases} suitcases</span>
            <span>⚙️ Automatic</span>
            <span>🚪 4 Doors</span>
           </div>
        </div>
      </div>

      
        <div className="insurance">
            <h3>Insurance</h3>

            <label 
                className={`option ${selectedInsurance === "deductible" ? "selected" : ""}`} 
                onClick={() => handleInsuranceClick('deductible')}
            >
                <div className="option-main">
                <input type="radio" name="insurance" defaultChecked />
                <div className="option-text">
                    <strong>$500 deductible</strong>
                    <p>You pay for the first $500, we cover the rest</p>
                </div>
                </div>
                <span className="included-tag">Same price per day</span>
            </label>

            <label 
                className={`option ${selectedInsurance === "total" ? "selected" : ""}`}
                onClick={() => handleInsuranceClick('total')}
            >
                <div className="option-main">
                <input type="radio" name="insurance" />
                <div className="option-text">
                    <strong>Total insurance</strong>
                    <p>We cover all the costs</p>
                </div>
                </div>
                <span className="price-tag">+ $15 / day</span>
            </label>
        </div>

        <div className="baby-seat">
            <h3>Baby seat</h3>

            <label 
                className={`option ${selectedBabySeat === "no" ? "selected" : ""}`} 
                onClick={() => handleBabySeatClick('no')}
            >
                <div className="option-main">
                <input type="radio" name="baby seat" defaultChecked />
                <div className="option-text">
                    <strong>No baby seat</strong>
                    <p>This means you don't have a baby seat</p>
                </div>
                </div>
                <span className="included-tag">Same price per day</span>
            </label>

            <label 
                className={`option ${selectedBabySeat === "yes" ? "selected" : ""}`}
                onClick={() => handleBabySeatClick('yes')}
            >
                <div className="option-main">
                    <input type="radio" name="baby seat" />
                    <div className="option-text">
                        <strong>Include baby seat</strong>
                        <p>This means you have a baby and need a baby seat</p>
                    </div>
                </div>
                <FormControl sx={{ m: 1, minWidth: 80 }}>
                    <InputLabel id="baby-age-label">Baby age</InputLabel>
                    <Select
                        labelId="baby-age-label"
                        id="baby-age-select"
                        value={babyAge}
                        label="Baby Age"
                        onChange={handleBabyAgeChange}
                    >
                        <MenuItem value={0}>0</MenuItem>
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                    </Select>
                </FormControl>
                <span className="price-tag">+ $3 / day</span>
            </label>
        </div>

      <div className="price-section">
        <div className="price-info">
          <strong>${totalPrice} <span>/day</span></strong>
          <p>${totalPrice * daysBooked} total</p>
          <a href="#">Price details</a>
        </div>
        <button className="next-button">Next</button>
      </div>
    </div>
  );
}

