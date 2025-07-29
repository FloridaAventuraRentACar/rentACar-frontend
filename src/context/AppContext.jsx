import { createContext } from "react";
import { useSessionState } from "../hooks/useSessionState"; // ajustá la ruta si es necesario

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [daysBooked, setDaysBooked] = useSessionState("daysBooked", 0);
  const [pickupLocation, setPickupLocation] = useSessionState("pickupLocation", '');
  const [returnLocation, setReturnLocation] = useSessionState("returnLocation", '');
  const [pickupDate, setPickupDate] = useSessionState("pickupDate", '');
  const [pickupTime , setPickupTime] = useSessionState("pickupTime", '');
  const [returnDate, setReturnDate] = useSessionState("returnDate", '');
  const [returnTime, setReturnTime] = useSessionState("returnTime", '');
  const [carData, setCarData] = useSessionState("carData", {});
  const [totalPrice, setTotalPrice] = useSessionState("totalPrice", 100);
  const [pricePerDay, setPricePerDay] = useSessionState("pricePerDay", 100);
  const [selectedInsurance, setSelectedInsurance] = useSessionState("selectedInsurance", 'DEDUCTIBLE');
  const [selectedBabySeat, setSelectedBabySeat] = useSessionState("selectedBabySeat", 'NONE');
  const [travelLocation, setTravelLocation] = useSessionState("travelLocation", null);
  const [selectedGasTank, setSelectedGasTank] = useSessionState("selectedGasTank", 'FULL');

  const clearRentalData = () => {
  const keys = [
    "daysBooked", "pickupLocation", "returnLocation", "pickupDate", "pickupTime",
    "returnDate", "returnTime", "carData", "totalPrice", "pricePerDay",
    "selectedInsurance", "selectedBabySeat", "travelLocation", "selectedGasTank"
  ];
  keys.forEach(key => sessionStorage.removeItem(key));
};

  return (
    <AppContext.Provider
      value={{
        daysBooked, setDaysBooked,
        pickupLocation, setPickupLocation,
        returnLocation, setReturnLocation,
        pickupDate, setPickupDate,
        pickupTime, setPickupTime,
        returnDate, setReturnDate,
        returnTime, setReturnTime,
        carData, setCarData,
        totalPrice, setTotalPrice,
        pricePerDay, setPricePerDay,
        selectedInsurance, setSelectedInsurance,
        selectedBabySeat, setSelectedBabySeat,
        travelLocation, setTravelLocation,
        selectedGasTank, setSelectedGasTank,
        clearRentalData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
