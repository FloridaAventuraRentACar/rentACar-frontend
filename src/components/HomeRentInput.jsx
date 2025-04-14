import { useState , useEffect , useContext} from 'react'
import '../styles/homeRentInput.css'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { daysCalculate } from '../utilities/daysCalculate'

export default function HomeRentInput() {
  const [pickupLocation, setPickupLocation] = useState('')
  const [returnLocation, setReturnLocation] = useState('')
  const [pickupDate, setPickupDate] = useState('')
  const [pickupTime , setPickupTime] = useState('')
  const [returnDate, setReturnDate] = useState('')
  const [returnTime, setReturnTime] = useState('')
  const { daysBooked, setDaysBooked } = useContext(AppContext);

  const navigate = useNavigate()

  useEffect(() => {
    resetStates()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    //Metodo para chequear que lo ingresado sea valido
    
    const queryData = [ 
      pickupLocation, //[0]
      returnLocation, //[1]
      pickupDate, //[2]
      pickupTime, //[3]
      returnDate, //[4]
      returnTime //[5]
    ]
    setDaysBooked(daysCalculate(pickupDate, returnDate, pickupTime, returnTime))

    navigate('/cars', { state: { fetchedData: queryData } });
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
              Pickup location
            </label>
            <select 
              className='form-input'
              id="pickupLocation" 
              value={pickupLocation} 
              
              onChange={(e) => setPickupLocation(e.target.value)}
              required
            >
              <option id='default' value="" disabled selected>Select a pickup location</option>
              <option value="Miami international airport">Miami international airport</option>
              <option value="Fortlaurendale airport">Fortlaurendale airport</option>
              <option value="Downtown">Downtown</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="returnLocation" className="form-label">
              Return location
            </label>
            <select 
              className='form-input'
              id="returnLocation" 
              value={returnLocation} 
              onChange={(e) => setReturnLocation(e.target.value)}
              required
            >
              <option id='default' value="" disabled selected>Select a return location</option>
              <option value="Miami international airport">Miami international airport</option>
              <option value="Fortlaurendale airport">Fortlaurendale airport</option>
              <option value="Downtown">Downtown</option>
            </select>
          </div>
        </div>
        <div className="horizontal-center pickup-return">
          <div className="form-group">
            <label htmlFor="pickupDate" className="form-label">
            pickup Date
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
            Pickup time
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
              return Date
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
              return time
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
            Show Cars
          </button>
        </div>
      </form>
    </div>
  )
}