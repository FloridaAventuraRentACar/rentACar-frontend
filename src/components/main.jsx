import { StrictMode } from "react";
import "../index.css";

import { createRoot } from "react-dom/client";
import HomePage from "./home/HomePage.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ShowCarsPage } from "./rental/cars/ShowCarsPage.jsx";
import { CarRentalPage } from "./rental/booking/CarRentalPage.jsx";
import { AppProvider } from "../context/AppContext.jsx";
import DriverForm from "./rental/booking/DriverForm.jsx";
import Layout from "./layout/Layout.jsx";
import SuccessfulRental from "./rental/booking/SuccessfulRental.jsx";
import RentalAdminResume from "./admin/rentals/RentalAdminResume.jsx";
import Login from "./admin/auth/Login.jsx";
import { AuthProvider } from "../context/AuthContext.jsx";
import ProtectedRoute from "./admin/auth/ProtectedRoute.jsx";
import GanttChart from "./admin/dashboard/GanttChart.jsx";
import AdminHome from "./admin/dashboard/AdminHome.jsx";
import AdminRentalFormPage from "./admin/rentals/registerForm/AdminRentalFormPage.jsx";
import PriceAdjustmentPage from "./admin/price-adjustment/PriceAdjustmentPage";
import UruguayLandingPage from "./landing/UruguayLandingPage";
import PublicLayout from "./layout/PublicLayout.jsx";
import GuiaMiamiPage from "./guia-miami/GuiaMiamiPage";

const router = createBrowserRouter([
  { path: "/uruguay", element: <UruguayLandingPage /> },
  { path: "/guia-miami", element: <GuiaMiamiPage /> },

  // Rutas públicas — con ChatBot
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/cars", element: <ShowCarsPage /> },
      { path: "/cars/:name", element: <CarRentalPage /> },
      { path: "/driver-form", element: <DriverForm /> },
      { path: "/successful-rental", element: <SuccessfulRental /> },
      { path: "/admin/login", element: <Login /> },
    ],
  },

  //  Rutas admin — sin ChatBot
  {
  path: "/admin",
  element: (
    <ProtectedRoute>
      <Layout />
    </ProtectedRoute>
  ),
  children: [
    { path: "", element: <AdminHome /> },
    { path: "rentals/gantt", element: <GanttChart /> },
    { path: "rentals/view/:id", element: <RentalAdminResume isEditable={false} /> },
    { path: "rentals/edit/:id", element: <RentalAdminResume /> },
    { path: "register", element: <AdminRentalFormPage /> },
    { path: "price-adjustment", element: <PriceAdjustmentPage /> },
  ],
},
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>
    </AuthProvider>
  </StrictMode>
);
