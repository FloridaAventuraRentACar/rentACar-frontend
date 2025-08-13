import { createContext, useMemo } from "react";
import { useSessionState } from "../hooks/useSessionState"; // ajustá la ruta si es necesario
import locationPrices from "../utilities/locationPrices";
import gasTankPrices from "../utilities/gasTankPrices";

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
  const [pricePerDay, setPricePerDay] = useSessionState("pricePerDay", 100);
  const [selectedInsurance, setSelectedInsurance] = useSessionState("selectedInsurance", 'DEDUCTIBLE');
  const [selectedBabySeat, setSelectedBabySeat] = useSessionState("selectedBabySeat", 'NONE');
  const [travelLocation, setTravelLocation] = useSessionState("travelLocation", null);
  const [selectedGasTank, setSelectedGasTank] = useSessionState("selectedGasTank", 'FULL');
  const [additionalDriversCount, setAdditionalDriversCount] = useSessionState("additionalDriversCount", 0);
  
  const additionalDriverCharge = useMemo(() => {
    return (additionalDriversCount > 1) ? ((additionalDriversCount - 1) * (5 * daysBooked)) : 0;
  }, [additionalDriversCount, daysBooked]);

  const insuranceCharge = useMemo(() => {
    if (selectedInsurance === "DEDUCTIBLE") return 0;
    return 15 * daysBooked;
  }, [selectedInsurance, daysBooked]);

  const babySeatCharge = useMemo(() => {
    if (selectedBabySeat === "NONE") return 0;
    return 3 * daysBooked;
  }, [selectedBabySeat, daysBooked]);

  const travelLocationPrice = useMemo(() => {
    return travelLocation ? locationPrices[travelLocation] : 0;
  }, [travelLocation]);

  const gasTankCharge = useMemo(() => {
    if (!carData?.type) return 0;
    if (selectedGasTank === "EMPTY") {
      return gasTankPrices[carData.type] || 0;
    }
    return 0;
  }, [selectedGasTank, carData]);

  const totalPrice = useMemo(() => {
    const basePrice = (carData?.pricePerDay || 0) * daysBooked;
    return basePrice + insuranceCharge + babySeatCharge + travelLocationPrice + gasTankCharge + additionalDriverCharge;
  }, [carData, daysBooked, insuranceCharge, babySeatCharge, travelLocationPrice, gasTankCharge, additionalDriverCharge]);

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
        totalPrice,
        pricePerDay, setPricePerDay,
        selectedInsurance, setSelectedInsurance,
        selectedBabySeat, setSelectedBabySeat,
        travelLocation, setTravelLocation,
        selectedGasTank, setSelectedGasTank,
        additionalDriversCount, setAdditionalDriversCount,
        clearRentalData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
