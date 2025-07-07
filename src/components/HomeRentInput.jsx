import { useEffect , useContext, useState} from 'react'
import '../styles/homeRentInput.css'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { daysCalculate } from '../utilities/functions/daysCalculate'
import { calculateMinTime } from '../utilities/functions/CalculateMinTime'

export default function HomeRentInput() {

  const {
    pickupLocation,
    setPickupLocation,
    returnLocation,
    setReturnLocation,
    pickupDate,
    setPickupDate,
    pickupTime,
    setPickupTime,
    returnDate,
    setReturnDate,
    returnTime,
    setReturnTime,
    setDaysBooked
  } = useContext(AppContext);

  // const [minTime,setMinTime] = useState('');

  const navigate = useNavigate()

  useEffect(() => {
    resetStates()
  }, [])

  //Pendiente de resolver error de minTime

  // useEffect(() => {
  //   console.log(new Date(pickupDate))
  //   console.log(new Date())
  //   if(isSameDay(new Date(pickupDate), new Date())){
  //     console.log('entro')
  //     setMinTime(calculateMinTime());
  //   }
    
  // }, [pickupDate])

  const handleSubmit = (e) => {
    e.preventDefault();

    const daysBooked = daysCalculate(pickupDate, returnDate, pickupTime, returnTime);

    if (daysBooked < 3) {
      alert('El alquiler debe ser de minimo 3 dias');
      return;
    }

    setDaysBooked(daysBooked);
    navigate('/cars');
  }

  const resetStates = () => {
    setPickupLocation('')
    setReturnLocation('')
    setPickupDate('')
    setPickupTime('')
    setReturnDate('')
    setReturnTime('')
    setDaysBooked(0)
  }

  return (
    <div className="home-form-container">
      <form onSubmit={handleSubmit} className="form">
        <div className="horizontal-center location">

          <div className="form-group">
            <label htmlFor="pickupLocation" className="form-label">
              Ubicacion de entrega
            </label>
            <select 
              className='form-input'
              id="pickupLocation" 
              value={pickupLocation} 
              
              onChange={(e) => setPickupLocation(e.target.value)}
              required
            >
              <option id='default' value="" disabled selected>Selecciona una ubicacion de entrega</option>
              <option value="MIAMI_AIRPORT">Aeropuerto internacion de Miami</option>
              <option value="FORTLAURENDALE_AIRPORT">Aeropuerto de Fortlaurendale</option>
              <option value="BRICKEL">Brickel</option>
              <option value="SUNNY_ISLES">Sunny Isles</option>
              <option value="HALLANDALE">Hallandale</option>
              <option value="SOUTH_BEACH">South Beach</option>
              <option value="BAL_HARBOUR">Bal Harbour</option>
              <option value="NORTH_MIAMI">North Miami</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="returnLocation" className="form-label">
              Ubicacion de devolucion
            </label>
            <select 
              className='form-input'
              id="returnLocation" 
              value={returnLocation} 
              onChange={(e) => setReturnLocation(e.target.value)}
              required
            >
              <option id='default' value="" disabled selected>Selecciona una ubicacion de devolucion</option>
              <option value="MIAMI_AIRPORT">Aeropuerto internacion de Miami</option>
              <option value="FORTLAURENDALE_AIRPORT">Aeropuerto de Fortlaurendale</option>
              <option value="BRICKEL">Brickel</option>
              <option value="SUNNY_ISLES">Sunny Isles</option>
              <option value="HALLANDALE">Hallandale</option>
              <option value="SOUTH_BEACH">South Beach</option>
              <option value="BAL_HARBOUR">Bal Harbour</option>
              <option value="NORTH_MIAMI">North Miami</option>
            </select>
          </div>
        </div>
        <div className="horizontal-center pickup-return">
          <div className="form-group">
            <label htmlFor="pickupDate" className="form-label">
            Fecha de entrega
            </label>
            <input
              type="date"
              id="pickupDate"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              className="form-input"
              required
              min={new Date().toISOString().split("T")[0]}
            />
          </div>
          <div className="form-group">
            <label htmlFor="pickupTime" className="form-label">
            Hora de entrega
            </label>
            <input
              type="time"
              id="pickupTime"
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
              className="form-input"
              required
             // min={minTime}
            />
          </div>
        </div>
        <div className="horizontal-center pickup-return">
          <div className="form-group">
            <label htmlFor="returnDate" className="form-label">
              Fecha de devolucion
            </label>
            <input
              type="date"
              id="returnDate"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="form-input"
              required
              min={new Date().toISOString().split("T")[0]}
            />
          </div>
          <div className="form-group">
            <label htmlFor="returnTime" className="form-label">
              Hora de devolucion
            </label>
            <input
              type="time"
              id="returnTime"
              value={returnTime}
              onChange={(e) => setReturnTime(e.target.value)}
              className="form-input"
              required
            />
          </div>
        </div>
        <div className="form-group">
          <button type="submit" className="form-button">
            Mostrar autos
          </button>
        </div>
      </form>
    </div>
  )
}