import Timeline from "react-calendar-timeline";
import "react-calendar-timeline/dist/style.css";
import moment from "moment";
import { getRentals } from "../../services/rentalService.js";
import { useEffect, useState } from "react";
import AdminSideBar from "./AdminSideBar.jsx";
import { getCarList } from "../../services/carService.js";
import { useNavigate } from "react-router-dom";

export default function GanttChart() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rentalsFetched, setRentalsFetched] = useState([]);
  const [groups, setGroups] = useState([]);

  const navigate = useNavigate();

  // const groups = [
  //   { id: 1, title: "Nissan Kicks (Blanca)" },
  //   { id: 2, title: "Nissan Rogue (Negra)" },
  //   { id: 3, title: "Nissan Rogue (Azul)" },
  //   { id: 4, title: "Nissan Rogue (Blanca)" },
  //   { id: 5, title: "Volkswagen Tiguan" },
  //   { id: 6, title: "Honda Odyssey" },
  //   { id: 7, title: "Nissan Kicks (Negra)" },
  //   { id: 8, title: "Honda Pilot" },
  // ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getRentals();
      const rentals = response.data;
      
      const carResponse = await getCarList();
      const cars = carResponse.data;

      setRentalsFetched(rentals);

      rentalsToItems(rentals);
      carsToGroups(cars);

    } catch (error) {
      console.error("Error fetching rentals:", error);
    } finally {
      setLoading(false);
    }
  };

  const rentalsToItems = (rentals) => {
    const formattedItems = rentals.map((rental) => ({
        id: rental.id,
        group: rental.carId,
        title: rental.clients[0].name + " " + rental.clients[0].surname,
        start_time: moment(rental.start),
        end_time: moment(rental.end),
      }));

      setItems(formattedItems);
  }

  const carsToGroups = (cars) => {
    const formattedGroups = cars.map((car) => ({
        id: car.id,
        title: car.name,
      }));

      setGroups(formattedGroups);
  }

  const handleItemClick = (itemId, e, time) => {
    // Navegar a la página de detalle del alquiler
    console.log("Item clicked:", itemId);
    navigate(`/admin/rentals/view/${itemId}`);
  };

  if (loading)
    return <p className="text-center mt-4">Cargando alquileres...</p>;

  return (
    <div className="container">
      <AdminSideBar forceToggle={true} />
      <Timeline
        groups={groups}
        items={items}
        defaultTimeStart={moment().startOf("month")}
        defaultTimeEnd={moment().endOf("month")}
        sidebarWidth={200}
        lineHeight={80}
        canMove={false}
        canResize={false}
        itemHeightRatio={0.9}
        onItemClick={handleItemClick}
      />
    </div>
  );
}
