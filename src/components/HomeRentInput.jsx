import { useState , useEffect } from 'react'
import '../styles/homeRentInput.css'

export default function HomeRentInput() {
  const [pickupLocation, setPickupLocation] = useState('')
  const [returnLocation, setReturnLocation] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  useEffect(() => {
    resetStates()
  }, [])

  const handleSubmit = (e) => {
    //fetch al backend
  }

  const resetStates = () => {
    setPickupLocation('')
    setReturnLocation('')
    setStartDate('')
    setEndDate('')
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
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
        <div className="form-group">
          <label htmlFor="startDate" className="form-label">
          Start Date
          </label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="endDate" className="form-label">
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="form-input"
            required
          />
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