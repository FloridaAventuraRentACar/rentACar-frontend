import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../styles/homePage.css'
import { HomePage } from './HomePage.jsx'
import {  createBrowserRouter, RouterProvider} from 'react-router-dom';
import {ShowCarsPage } from './ShowCarsPage.jsx'
import { CarRentalPage } from './CarRentalPage.jsx'

const router = createBrowserRouter([{
  path: '/',
  element: <HomePage />
  },{
    path: '/cars',
    element: <ShowCarsPage />
  },{
    path: '/cars/:name',
    element: <CarRentalPage />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />;
  </StrictMode>
)
