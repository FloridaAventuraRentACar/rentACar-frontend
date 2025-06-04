"use client"

import { useContext, useState } from "react"
import { Calendar, Car, CheckCircle, Download, MapPin, PersonStanding, Phone } from "lucide-react"
import styles from "../styles/SuccessfulRental.module.css"
import { AppContext } from "../context/AppContext"
import { useLocation, useNavigate } from "react-router-dom"
import { format, parseISO } from 'date-fns';
import {locationNames} from '../utilities/locationNames'

export default function SuccessfulRental() {
  const location = useLocation();

  const { rental } = location.state || {};

  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    navigate('/');
  }

    const parsePickupDate = parseISO(rental.start);
    const formattedPickupDate = format(parsePickupDate, 'eee, dd. MMM. yyyy');
    
    const parseReturnDate = parseISO(rental.end);
    const formattedReturnDate = format(parseReturnDate, 'eee, dd. MMM. yyyy');

  return (
    <div className={styles.container}>
      <div className={styles.alert}>
        <CheckCircle className={styles.alertIcon} />
        <div>
          <h2 className={styles.alertTitle}>Reserva exitosa!</h2>
          <p className={styles.alertDescription}>Su alquiler se ha confirmado.</p>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.headerContent}>
            <div>
              <h2 className={styles.title}>Reserva confirmada</h2>
              <p className={styles.subtitle}>Gracias por su reserva</p>
            </div>
            <div className={styles.iconWrapper}>
              <Car className={styles.icon} />
            </div>
          </div>
        </div>

        <div className={styles.cardContent}>
          <div className={styles.section}>

            <div className={styles.box}>
              <p className={styles.customer}>Recibira un correo con los detalles de su reserva</p>
            </div>

            <div className={styles.row}>
              <PersonStanding className={styles.rowIcon} />
              <div>
                <p className={styles.value}>{rental.clients[0].name}</p>
                <p className={styles.subLabel}>Conductor principal</p>
              </div>
            </div>

            <div className={styles.row}>
              <Car className={styles.rowIcon} />
              <div>
                <p className={styles.value}>{rental.carName}</p>
                <p className={styles.subLabel}>Vehiculo</p>
              </div>
            </div>

            <div className={styles.row}>
              <Calendar className={styles.rowIcon} />
              <div className={styles.dateGrid}>
                <div>
                  <p className={styles.value}>{formattedPickupDate}</p>
                  <p className={styles.subLabel}>Entrega</p>
                </div>
                <div>
                  <p className={styles.value}>{formattedReturnDate}</p>
                  <p className={styles.subLabel}>Devolucion</p>
                </div>
              </div>
            </div>

            <div className={styles.row}>
              <MapPin className={styles.rowIcon} />
              <div>
                <p className={styles.value}>{locationNames[rental.pickupLocation]}</p>
                <p className={styles.subLabel}>Ubicacion de entrega</p>
              </div>
            </div>
            <div className={styles.row}>
              <MapPin className={styles.rowIcon} />
              <div>
                <p className={styles.value}>{locationNames[rental.returnLocation]}</p>
                <p className={styles.subLabel}>Ubicacion de devolucion</p>
              </div>
            </div>

            <hr className={styles.separator} />

            <div className={styles.amountRow}>
              <p className={styles.amountLabel}>Precio total</p>
              <p className={styles.amount}>${rental.totalPrice}</p>
            </div>
          </div>
        </div>

        <div className={styles.cardFooter}>
          <button
            className={styles.backButton}
            onClick={handleBackButtonClick}
          >
            Volver al inicio
          </button>

          <div className={styles.supportText}>
            <p>¿Tenes dudas sobre tu reserva?</p>
            <p className={styles.phone}>
              <Phone className={styles.phoneIcon} />
              <span>1-305-773-1787</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
