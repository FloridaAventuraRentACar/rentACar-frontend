import { useEffect, useState } from "react";
import styles from "../../styles/admin/RentalAdminResume.module.css";
import { getRentalById } from "../../services/rentalService";
import { useNavigate, useParams } from "react-router-dom";
import insuranceNames from "../../utilities/names/insuranceNames";
import babySeatNames from "../../utilities/names/babySeatNames";
import { gasTankNames } from "../../utilities/names/gasTankNames";
import locationNames from "../../utilities/names/locationNames";
import { formatPhoneNumber } from "../../utilities/functions/formatPhoneNumber";
import { formatDateAndHour } from "../../utilities/functions/formatDateAndHour";
import { formatDate } from "../../utilities/functions/formatDate";
import BackButton from "../BackButton";

export default function RentalAdminResume() {
  //capturo el id de la URL
  const { id } = useParams();
  const [rental, setRental] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRentalDetails(id);
  }, [id]);

  //Trae toda la informacion del alquiler seleccionado
  const fetchRentalDetails = async (id) => {
    try {
      const response = await getRentalById(id);
      const fetchedRental = await response.data;

      setRental(fetchedRental);
    } catch (error) {
      console.log("An error ocurred: " + error);
    } finally {
      setLoading(false);
    }
  };

  const onClick = () => {
    navigate(`/admin`);
  };

  if (loading) {
    return <div className={styles.loading}>Cargando...</div>;
  }
  if (!rental) {
    return (
      <div className={styles.failure}>
        Error al traer la informacion del cliente
      </div>
    );
  }

  const mainDriver = rental.clients[0];
  const additionalDrivers = rental.clients.slice(1);

  return (
    <div className={styles.background}>
      <BackButton onClick={onClick} />
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Detalles del Alquiler</h1>
        </div>

        {/* Información del Alquiler */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Información del Vehículo</h2>
          <div className={styles.grid}>
            <div className={styles.field}>
              <span className={styles.label}>Vehículo:</span>
              <span className={styles.value}>{rental.carName}</span>
            </div>
            <div className={styles.field}>
              <span className={styles.label}>Precio Total:</span>
              <span className={styles.value}>${rental.totalPrice}</span>
            </div>
            <div className={styles.field}>
              <span className={styles.label}>Días de Alquiler:</span>
              <span className={styles.value}>{rental.daysRented} días</span>
            </div>
            <div className={styles.field}>
              <span className={styles.label}>Seguro:</span>
              <span className={styles.value}>
                {insuranceNames[rental.insurance]}
              </span>
            </div>
            <div className={styles.field}>
              <span className={styles.label}>Asiento de Bebé:</span>
              <span className={styles.value}>
                {babySeatNames[rental.babySeat]}
              </span>
            </div>
            <div className={styles.field}>
              <span className={styles.label}>Tanque de Gasolina:</span>
              <span className={styles.value}>
                {gasTankNames[rental.gasTank]}
              </span>
            </div>
          </div>
        </div>

        {/* Información de Fechas y Ubicaciones */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Fechas y Ubicaciones</h2>
          <div className={styles.grid}>
            <div className={styles.field}>
              <span className={styles.label}>Fecha de entrega:</span>
              <span className={styles.value}>
                {formatDateAndHour(rental.start)}
              </span>
            </div>
            <div className={styles.field}>
              <span className={styles.label}>Fecha de devolucion:</span>
              <span className={styles.value}>
                {formatDateAndHour(rental.end)}
              </span>
            </div>
            <div className={styles.field}>
              <span className={styles.label}>Lugar de entrega:</span>
              <span className={styles.value}>
                {locationNames[rental.pickupLocation]}
              </span>
            </div>
            <div className={styles.field}>
              <span className={styles.label}>Lugar de Devolución:</span>
              <span className={styles.value}>
                {locationNames[rental.returnLocation]}
              </span>
            </div>
            {rental.travelLocation && (
              <div className={styles.field}>
                <span className={styles.label}>Destino de Viaje:</span>
                <span className={styles.value}>{rental.travelLocation}</span>
              </div>
            )}
          </div>
        </div>

        {/* Conductor Principal */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Conductor Principal</h2>
          <div className={styles.driverCard}>
            <div className={styles.grid}>
              <div className={styles.field}>
                <span className={styles.label}>Nombre:</span>
                <span className={styles.value}>
                  {mainDriver.name} {mainDriver.surname}
                </span>
              </div>
              <div className={styles.field}>
                <span className={styles.label}>Email:</span>
                <span className={styles.value}>{mainDriver.email}</span>
              </div>
              <div className={styles.field}>
                <span className={styles.label}>Teléfono:</span>
                <span className={styles.value}>{mainDriver.phone}</span>
              </div>
              <div className={styles.field}>
                <span className={styles.label}>Fecha de Nacimiento:</span>
                <span className={styles.value}>
                  {formatDate(mainDriver.bornDate)}
                </span>
              </div>
              <div className={styles.field}>
                <span className={styles.label}>Número de Licencia:</span>
                <span className={styles.value}>{mainDriver.licenseNumber}</span>
              </div>
              <div className={styles.field}>
                <span className={styles.label}>Nombre en Licencia:</span>
                <span className={styles.value}>{mainDriver.licenseName}</span>
              </div>
              <div className={styles.field}>
                <span className={styles.label}>Dirección en Licencia:</span>
                <span className={styles.value}>
                  {mainDriver.licenseAddress}
                </span>
              </div>
              <div className={styles.field}>
                <span className={styles.label}>Vencimiento de Licencia:</span>
                <span className={styles.value}>
                  {formatDate(mainDriver.licenseExpirationDate)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Conductores Adicionales */}
        {additionalDrivers.length > 0 && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Conductores Adicionales</h2>
            {additionalDrivers.map((driver, index) => (
              <div key={index} className={styles.driverCard}>
                <div className={styles.grid}>
                  <div className={styles.field}>
                    <span className={styles.label}>Nombre:</span>
                    <span className={styles.value}>
                      {driver.name} {driver.surname}
                    </span>
                  </div>
                  <div className={styles.field}>
                    <span className={styles.label}>Email:</span>
                    <span className={styles.value}>{driver.email}</span>
                  </div>
                  <div className={styles.field}>
                    <span className={styles.label}>Teléfono:</span>
                    <span className={styles.value}>
                      {formatPhoneNumber(driver.phone)}
                    </span>
                  </div>
                  <div className={styles.field}>
                    <span className={styles.label}>Fecha de Nacimiento:</span>
                    <span className={styles.value}>
                      {formatDateAndHour(driver.bornDate)}
                    </span>
                  </div>
                  <div className={styles.field}>
                    <span className={styles.label}>Número de Licencia:</span>
                    <span className={styles.value}>{driver.licenseNumber}</span>
                  </div>
                  <div className={styles.field}>
                    <span className={styles.label}>Nombre en Licencia:</span>
                    <span className={styles.value}>{driver.licenseName}</span>
                  </div>
                  <div className={styles.field}>
                    <span className={styles.label}>Dirección en Licencia:</span>
                    <span className={styles.value}>
                      {driver.licenseAddress}
                    </span>
                  </div>
                  <div className={styles.field}>
                    <span className={styles.label}>
                      Vencimiento de Licencia:
                    </span>
                    <span className={styles.value}>
                      {formatDateAndHour(driver.licenseExpirationDate)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
