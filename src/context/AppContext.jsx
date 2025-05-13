import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

  const [daysBooked, setDaysBooked] = useState(0);
  const [pickupLocation, setPickupLocation] = useState('')
  const [returnLocation, setReturnLocation] = useState('')
  const [pickupDate, setPickupDate] = useState('')
  const [pickupTime , setPickupTime] = useState('')
  const [returnDate, setReturnDate] = useState('')
  const [returnTime, setReturnTime] = useState('')
  const [carData,setCarData] = useState({})
  const [totalPrice, setTotalPrice] = useState(100);
  const [pricePerDay, setPricePerDay] = useState(100);

  return (
    <AppContext.Provider value={{ 
      daysBooked, setDaysBooked , pickupLocation, setPickupLocation, 
      returnLocation, setReturnLocation, pickupDate, setPickupDate, 
      pickupTime, setPickupTime, returnDate, setReturnDate, returnTime, 
      setReturnTime, carData, setCarData, totalPrice, setTotalPrice, pricePerDay, setPricePerDay }}>
      {children}
    </AppContext.Provider>
  );
};