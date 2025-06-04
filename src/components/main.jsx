import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../styles/homePage.css'
import { HomePage } from './HomePage.jsx'
import {  createBrowserRouter, RouterProvider} from 'react-router-dom';
import {ShowCarsPage } from './ShowCarsPage.jsx'
import { CarRentalPage } from './CarRentalPage.jsx'
import { AppProvider } from '../context/AppContext.jsx';
import DriverForm from './DriverForm.jsx';
import Layout  from './Layout.jsx';
import SuccessfulRental from './SuccessfulRental.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/cars", element: <ShowCarsPage /> },
      { path: "/cars/:name", element: <CarRentalPage /> },
      { path: "/driver-form", element: <DriverForm /> },
      { path: "/successful-rental", element: <SuccessfulRental /> }
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </StrictMode>
)
