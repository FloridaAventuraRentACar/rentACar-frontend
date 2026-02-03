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

  useEffect(() => {
    fetchData();
  }, []);

  //Lanza un evento para volver a renderizar el timeline(Arregla bug de desfaso de alquileres por ancho de pantalla)
  useEffect(() => {
    if (!loading) {
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        }, 100);
    }
  }, [loading]);

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
        start_time: moment(rental.start).valueOf(),
        end_time: moment(rental.end).valueOf(),
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
