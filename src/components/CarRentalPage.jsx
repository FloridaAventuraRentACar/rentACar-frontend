import { useLocation, useNavigate } from 'react-router-dom'
import '../styles/carRentalPage.css'
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import locationPrices from '../utilities/locationPrices'

export function CarRentalPage() {
    const navigate = useNavigate()

    const handleClick = () => {
      
      navigate('/driver-form')
    };

    const location = useLocation(); //Este useState se usa para pasar datos entre componentes
    const { carData } = location.state || {};

    const [selectedInsurance, setSelectedInsurance] = useState('deductible');
    const [selectedBabySeat, setSelectedBabySeat] = useState('no');
    const [selectedSunpass, setSelectedSunpass] = useState('no');
    const [travelLocation, setTravelLocation] = useState('none');
    const [travelLocationPrice, setTravelLocationPrice] = useState(0);

    const [pricePerDay, setPricePerDay] = useState(carData.pricePerDay);

    const {
        daysBooked,
        pickupLocation,
        returnLocation,
        pickupDate,
        pickupTime,
        returnDate,
        returnTime
    } = useContext(AppContext);

    const [totalPrice, setTotalPrice] = useState(pricePerDay * daysBooked);

    useEffect(() => {
        setTotalPrice(pricePerDay * daysBooked + travelLocationPrice);
    }, [pricePerDay, travelLocationPrice]);

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
                
            }else if(selectedBabySeat === "no"){
                setPricePerDay(pricePerDay + 3);
            }
        }
        setSelectedBabySeat(selected);
    }

    const handleTravelLocationChange = (event) => {

        const newLocation = event.target.value;
        const newLocationPrice = locationPrices[newLocation];

        // Actualizamos travelLocation y travelLocationPrice
        setTravelLocation(newLocation);
        setTravelLocationPrice(newLocationPrice);
    }

    const handleSunpassClick = (selected) => {
        if (selected === "no") {
            setTravelLocation('none');
            setTravelLocationPrice(0);
        }
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
            <div className="main-div">
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
                {daysBooked >= 20 && (
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
                )}
            </div>
        </div>

        <div className="baby-seat">
            <div className="main-div">
                <h3>Asiento de bebe</h3>

                <label 
                    className={`option ${selectedBabySeat === "no" ? "selected" : ""}`} 
                    onClick={() => handleBabySeatClick('no')}
                >
                    <div className="option-main">
                    <input type="radio" name="baby seat" defaultChecked />
                    <div className="option-text">
                        <strong>Sin asiento para niño</strong>
                        <p>Esto significa que no necesitas un asiento para niño adicional</p>
                    </div>
                    </div>
                    <span className="included-tag">Mismo precio por dia</span>
                </label>

                <label 
                    className={`option ${selectedBabySeat === "baby-seat" ? "selected" : ""}`}
                    onClick={() => handleBabySeatClick('baby-seat')}
                >
                    <div className="option-main">
                        <input type="radio" name="baby seat" />
                        <div className="option-text">
                            <strong>Incluir asiento de bebe</strong>
                            <p>Pensada para niños de hasta 1 año</p>
                        </div>
                    </div>
                    <span className="price-tag">+ $3 /dia</span>
                </label>

                <label 
                    className={`option ${selectedBabySeat === "toddler-seat" ? "selected" : ""}`}
                    onClick={() => handleBabySeatClick('toddler-seat')}
                >
                    <div className="option-main">
                        <input type="radio" name="baby seat" />
                        <div className="option-text">
                            <strong>Incluir Toddler seat</strong>
                            <p>Pensada para niños de entre 1 y 4 años</p>
                        </div>
                    </div>
                    <span className="price-tag">+ $3 /dia</span>
                </label>

                <label 
                    className={`option ${selectedBabySeat === "booster-seat" ? "selected" : ""}`}
                    onClick={() => handleBabySeatClick('booster-seat')}
                >
                    <div className="option-main">
                        <input type="radio" name="baby seat" />
                        <div className="option-text">
                            <strong>Incluir Booster seat</strong>
                            <p>Pensada para niños de entre 4 y 12 años</p>
                        </div>
                    </div>
                    <span className="price-tag">+ $3 /dia</span>
                </label>
            </div>
        </div>
        
        <div className="sunpass">
            <div className="main-div">
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
                                <MenuItem value={'Orlando'}>Orlando</MenuItem> 
                                <MenuItem value={'KeyWest'}>KeyWest</MenuItem>
                                <MenuItem value={'WestPalmBeach'}>West Palm Beach</MenuItem>
                                <MenuItem value={'Daytona'}>Daytona</MenuItem>
                                <MenuItem value={'ClearWater'}>Clearwater beach</MenuItem>
                                <MenuItem value={'Isla morada'}>Isla morada</MenuItem>
                                <MenuItem value={'Naples'}>Naples</MenuItem>
                            </Select>
                        </FormControl>
                    )}
                    {selectedSunpass === "yes" && (
                        <span className="price-tag">+ ${travelLocationPrice} al total</span>
                    )}
                </label>
            </div>
        </div>

        <div className="aditional-services">
            <div className="main-div">
                <h3>Servicios adicionales</h3>
                <div 
                    className='option selected' 
                >
                    <div className="option-main">
                    <div className="option-text">
                        <strong>Asistente de carretera</strong>
                        <p>Te proveemos de una grua en caso que la necesites</p>
                    </div>
                    </div>
                    <span className="included-tag">Incluido</span>
                </div>    
            </div>
        </div>

      <div className="price-section">
        <div className="price-info">
            <div className="price-top">
                <p className="price-per-day">${pricePerDay} <span>/dia</span></p>
                <p className="days-reserved">{daysBooked} dias reservados</p>

            </div>
          <strong className="total-price">${totalPrice} total</strong>
          <a href="#">Detalles del precio</a>
        </div>
        <div className="reserve-info">
            <div className='pickup-info'>
                <strong className='title'>Entrega</strong>
                <p className='location'>{pickupLocation}</p>
                <p className='date'>{pickupDate} - {pickupTime}</p>
            </div>
            <div className='return-info'>
                <strong className='title'>Devolucion</strong>
                <p className='location'>{returnLocation}</p>
                <p className='date'>{returnDate} - {returnTime}</p>
            </div>
        </div>
        <button type="button" className="next-button" onClick={handleClick}>Siguiente</button>
      </div>
    </div>
  );
}

