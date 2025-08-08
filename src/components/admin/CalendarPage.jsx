import RentalGanttCalendar from "./RentalGanttCalendar";
import { useEffect, useState } from "react";
import { sortRentalsByDate } from "../../utilities/functions/sortRentalsByDate";
import { getCurrentRentals } from "../../services/rentalService";
import { getCars } from "../../services/carService";

export default function CalendarPage() {

    const [rentals, setRentals] = useState([]);
    const [cars, setCars] = useState([]);

    useEffect(() => {
        fetchCurrentRentals();
        fetchCars();
    }, []);
 
    const fetchCurrentRentals = async () => {
        const response = await getCurrentRentals();
        const rentalsData = await response.data;

        setRentals(sortRentalsByDate(rentalsData));
    }

    const fetchCars = async () => {

        const response = await getCars();
        const carsData = await response.data;

        setCars(carsData); 
    }

    return (
        <div>
            <h1>Calendario</h1>
            <RentalGanttCalendar cars={cars} rentals={rentals} />
        </div>
    )
}