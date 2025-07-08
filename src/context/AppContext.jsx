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
  const [selectedInsurance, setSelectedInsurance] = useState('DEDUCTIBLE');
  const [selectedBabySeat, setSelectedBabySeat] = useState('NONE');
  const [travelLocation, setTravelLocation] = useState(null);
  const [selectedGasTank, setSelectedGasTank] = useState('FULL'); 

  return (
    <AppContext.Provider value={{ 
      daysBooked, setDaysBooked , pickupLocation, setPickupLocation, 
      returnLocation, setReturnLocation, pickupDate, setPickupDate, 
      pickupTime, setPickupTime, returnDate, setReturnDate, returnTime, 
      setReturnTime, carData, setCarData, totalPrice, setTotalPrice, pricePerDay, setPricePerDay, 
      selectedInsurance, setSelectedInsurance, selectedBabySeat, setSelectedBabySeat, travelLocation, 
      setTravelLocation, selectedGasTank, setSelectedGasTank}}>
      {children}
    </AppContext.Provider>
  );
};