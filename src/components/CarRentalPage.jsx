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
    const [selectedSunpass, setSelectedSunpass] = useState('no');

    const [pricePerDay, setPricePerDay] = useState(carData.pricePerDay);
    const {daysBooked, setDaysBooked} = useContext(AppContext);

    const handleInsuranceClick = (selected) => {
        if (!(selected === selectedInsurance)) {
            if (selected === "deductible") {
                setPricePerDay(pricePerDay - 15);
                
            }else{
                setPricePerDay(pricePerDay + 15);
            }
        }
        setSelectedInsurance(selected);
    }
    
    const handleBabySeatClick = (selected) => {
        if (!(selected === selectedBabySeat)) {
            if (selected === "no") {
                setPricePerDay(pricePerDay - 3);
                
            }else{
                setPricePerDay(pricePerDay + 3);
            }
        }
        setSelectedBabySeat(selected);
    }
    const handleBabyAgeChange = (event) => {
        setBabyAge(event.target.value);
    }
    const handleSunpassClick = (selected) => {
        
        setSelectedSunpass(selected);
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
            <span>🚗 {carData.passengers} asientos</span>
            <span>🧳 {carData.suitcases} valijas</span>
            <span>⚙️ Automatico</span>
            <span>🚪 4 Puertas</span>
           </div>
        </div>
      </div>

      
        <div className="insurance">
            <h3>Seguro</h3>

            <label 
                className={`option ${selectedInsurance === "deductible" ? "selected" : ""}`} 
                onClick={() => handleInsuranceClick('deductible')}
            >
                <div className="option-main">
                <input type="radio" name="insurance" defaultChecked />
                <div className="option-text">
                    <strong>Franquicia de $500</strong>
                    <p>Tu pagas los primeros $500, nosotros cubrimos el resto</p>
                </div>
                </div>
                <span className="included-tag">Mismo precio por dia</span>
            </label>

            <label 
                className={`option ${selectedInsurance === "total" ? "selected" : ""}`}
                onClick={() => handleInsuranceClick('total')}
            >
                <div className="option-main">
                <input type="radio" name="insurance" />
                <div className="option-text">
                    <strong>Seguro total</strong>
                    <p>Cubrimos todos los costos</p>
                </div>
                </div>
                <span className="price-tag">+ $15 /dia</span>
            </label>
        </div>

        <div className="baby-seat">
            <h3>Asiento de bebe</h3>

            <label 
                className={`option ${selectedBabySeat === "no" ? "selected" : ""}`} 
                onClick={() => handleBabySeatClick('no')}
            >
                <div className="option-main">
                <input type="radio" name="baby seat" defaultChecked />
                <div className="option-text">
                    <strong>Sin asiento de bebe</strong>
                    <p>Esto significa que no necesitas un asiento de bebe</p>
                </div>
                </div>
                <span className="included-tag">Mismo precio por dia</span>
            </label>

            <label 
                className={`option ${selectedBabySeat === "yes" ? "selected" : ""}`}
                onClick={() => handleBabySeatClick('yes')}
            >
                <div className="option-main">
                    <input type="radio" name="baby seat" />
                    <div className="option-text">
                        <strong>Incluir asiento de bebe</strong>
                        <p>Esto significa que necesitas un asiento de bebe</p>
                    </div>
                </div>
                <FormControl sx={{ m: 1, minWidth: 80 }}>
                    <InputLabel id="baby-age-label">Edad</InputLabel>
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
                <span className="price-tag">+ $3 /dia</span>
            </label>
        </div>

        <div className="sunpass">
            <h3>Sunpass</h3>

            <label 
                className={`option ${selectedSunpass === "no" ? "selected" : ""}`} 
                onClick={() => handleSunpassClick('no')}
            >
                <div className="option-main">
                <input type="radio" name="sunpass" defaultChecked />
                <div className="option-text">
                    <strong>No voy a salir de Miami</strong>
                    <p>Esto significa que no viajaras fuera de Miami con el coche</p>
                </div>
                </div>
                <span className="included-tag">Mismo precio por dia</span>
            </label>

            <label 
                className={`option ${selectedSunpass === "yes" ? "selected" : ""}`}
                onClick={() => handleSunpassClick('yes')}
            >
                <div className="option-main">
                    <input type="radio" name="sunpass" />
                    <div className="option-text">
                        <strong>Viajare fuera de Miami</strong>
                        <p>Esto significa que realizaras algun viaje fuera de Miami con el coche</p>
                    </div>
                </div>
                
                <span className="price-tag">+ $15 /dia</span>
            </label>
        </div>
      <div className="price-section">
        <div className="price-info">
            <div className="price-top">
                <strong>${pricePerDay} <span>/dia</span></strong>
                <p className="days-reserved">{daysBooked} dias reservados</p>

            </div>
          <p className="total-price">${pricePerDay * daysBooked} total</p>
          <a href="#">Detalles del precio</a>
        </div>
        <button className="next-button">Next</button>
      </div>
    </div>
  );
}

