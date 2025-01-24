import { useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import {CarCard} from './CarCard.jsx'
import '../styles/showCarsPage.css'
import { NoAvailability } from './NoAvailability.jsx';

export function ShowCarsPage() {
    useEffect(() => {
        //const data = availabilityQuery(fetchedData)
    })

    const NoAvailability = true
    const location = useLocation(); //Este useState se usa para pasar datos entre componentes
    const { fetchedData } = location.state || {};
    console.log(fetchedData[0]);

    const availabilityQuery = (e) => {
        //fetch al back 
        return {}
    }
    
    const cars = [
        {
          name: "Toyota Corolla",
          pricePerDay: 50,
          image: "https://www.autonation.com/~/media/Images/Landingpage%20-%20Car%20Research/2025-honda-pilot-sport.jpg", // Reemplázalo con una URL real
          passengers: 5,
        },
        {
          name: "Honda Civic",
          pricePerDay: 60,
          image: "https://www.autonation.com/~/media/Images/Landingpage%20-%20Car%20Research/2025-honda-pilot-sport.jpg",
          passengers: 5,
        },
        {
          name: "Ford Mustang",
          pricePerDay: 120,
          image: "https://www.autonation.com/~/media/Images/Landingpage%20-%20Car%20Research/2025-honda-pilot-sport.jpg",
          passengers: 4,
        },
        {
          name: "Chevrolet Tahoe",
          pricePerDay: 80,
          image: "https://www.autonation.com/~/media/Images/Landingpage%20-%20Car%20Research/2025-honda-pilot-sport.jpg",
          passengers: 7,
        },
        {
          name: "BMW X5",
          pricePerDay: 150,
          image: "https://www.autonation.com/~/media/Images/Landingpage%20-%20Car%20Research/2025-honda-pilot-sport.jpg",
          passengers: 5,
        },
      ];
    
      return (
            <div className="main-container">
              {cars.map((car, index) => (
                <CarCard
                  key={index} // Solo define la key aquí, ya que es suficiente para cada elemento de la lista
                  name={car.name}
                  pricePerDay={car.pricePerDay}
                  image={car.image}
                  passengers={car.passengers}
                />
              ))}
            </div>
      );
}