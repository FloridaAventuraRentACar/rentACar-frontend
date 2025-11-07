import RentalsGrid from "./RentalsGrid.jsx";
import styles from "../../styles/admin/RentalsListPage.module.css";
import SuccessNotification from "../ui/SuccessNotification.jsx";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import AdminSideBar from "./AdminSideBar.jsx";

export default function RentalsListPage() {

  return (
    <div>
      <AdminSideBar />
      <h1 className={styles.title}>Listado de alquileres</h1>
      <div className={styles.rentalsGridContainer}>
        <RentalsGrid />
      </div>
    </div>
  );
}
