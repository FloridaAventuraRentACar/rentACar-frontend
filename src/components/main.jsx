import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import HomePage  from "./home/HomePage.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ShowCarsPage } from "./ShowCarsPage.jsx";
import { CarRentalPage } from "./CarRentalPage.jsx";
import { AppProvider } from "../context/AppContext.jsx";
import DriverForm from "./DriverForm.jsx";
import Layout from "./Layout.jsx";
import SuccessfulRental from "./SuccessfulRental.jsx";
import RentalsListPage from "./admin/RentalsListPage.jsx";
import RentalAdminResume from "./admin/RentalAdminResume.jsx";
import Login from "./admin/Login.jsx";
import { AuthProvider } from "../context/AuthContext.jsx";
import ProtectedRoute from "./admin/ProtectedRoute.jsx";
import GanttChart from "./admin/GanttChart.jsx";
import AdminHome from "./admin/AdminHome.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/cars", element: <ShowCarsPage /> },
      { path: "/cars/:name", element: <CarRentalPage /> },
      { path: "/driver-form", element: <DriverForm /> },
      { path: "/successful-rental", element: <SuccessfulRental /> },
      { path: "/admin/login", element: <Login /> },
      { path : "/admin/rentals/gantt", element: <GanttChart /> },

      //Rutas protegidas
      {
        path: "/admin",
        element: (
          <ProtectedRoute>
            <AdminHome />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/rentals",
        element: (
          <ProtectedRoute>
            <RentalsListPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/rentals/view/:id",
        element: (
          <ProtectedRoute>
            <RentalAdminResume isEditable={false} />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/rentals/edit/:id",
        element: (
          <ProtectedRoute>
            <RentalAdminResume />
          </ProtectedRoute>
        ),
      },
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
