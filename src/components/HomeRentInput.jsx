import { useEffect , useContext} from 'react'
import '../styles/homeRentInput.css'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { daysCalculate } from '../utilities/daysCalculate'

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

  const navigate = useNavigate()

  useEffect(() => {
    resetStates()
  }, [])

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
              <option value="Miami international airport">Aeropuerto internacion de Miami</option>
              <option value="Fortlaurendale airport">Aeropuerto de Fortlaurendale</option>
              <option value="Brickel">Brickel</option>
              <option value="Sunny Isles">Sunny Isles</option>
              <option value="Hallandale">Hallandale</option>
              <option value="South Beach">South Beach</option>
              <option value="Bal Harbour">Bal Harbour</option>
              <option value="North Miami">North Miami</option>
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
              <option id='default' value="" disabled selected>Selecciona una ubicacion de entrega</option>
              <option value="Miami international airport">Aeropuerto internacion de Miami</option>
              <option value="Fortlaurendale airport">Aeropuerto de Fortlaurendale</option>
              <option value="Brickel">Brickel</option>
              <option value="Sunny Isles">Sunny Isles</option>
              <option value="Hallandale">Hallandale</option>
              <option value="South Beach">South Beach</option>
              <option value="Bal Harbour">Bal Harbour</option>
              <option value="North Miami">North Miami</option>
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