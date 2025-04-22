import { useContext, useEffect , useState} from 'react';
import {CarCard} from './CarCard.jsx'
import '../styles/showCarsPage.css'
import { NoAvailability } from './NoAvailability.jsx';
import axios from 'axios';
import {carsQuery} from '../utilities/CarsFetchSimulate.js'
import { AppContext } from '../context/AppContext'

export function ShowCarsPage() {

    const [cars, setCars] = useState(carsQuery);
    useEffect(() => {
        //availabilityQuery(fetchedData)
    })

    const {
        pickupDate,
        pickupTime,
        returnDate,
        returnTime
      } = useContext(AppContext);

    const start = `${pickupDate}T${pickupTime}`
    const end = `${returnDate}T${returnTime}`
    const availabilityURL = `http://localhost:8080/availability?startDateTime=${start}&endDateTime=${end}`
    const NoAvailability = true
    
    const availabilityQuery = async () => {
      try {
        const response = await axios.get(availabilityURL) 
        setCars(response.data)
        console.log(cars)
        
      } catch (error) {
        console.log(error)
      }
    }


    return (
        <div className="show-cars-main-container">
          {cars ? (
              cars.map((car, index) => (
                <CarCard
                  key={index} // Solo define la key aquí, ya que es suficiente para cada elemento de la lista
                  id={car.id}
                  name={car.name}
                  pricePerDay={car.pricePerDay}
                  image={car.imageUrl}
                  passengers={car.passengersAmount}
                  suitcases={car.suitcasesAmount}
                />
              ))
            ) : (
              <h1>Cargando</h1>
            )}
        </div>

      );
}