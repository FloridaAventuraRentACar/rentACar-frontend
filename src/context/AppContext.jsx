import { createContext, useMemo } from "react";
import { useSessionState } from "../hooks/useSessionState";
import locationPrices from "../utilities/prices/locationPrices";
import gasTankPrices from "../utilities/prices/gasTankPrices";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [daysBooked, setDaysBooked] = useSessionState("daysBooked", 0);
  const [carData, setCarData] = useSessionState("carData", {});
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

  const travelLocationPrice = useMemo(() => {
    return travelLocation ? locationPrices[travelLocation] : 0;
  }, [travelLocation]);

  const gasTankCharge = useMemo(() => {
    if (selectedGasTank === "EMPTY") {
      return carData.tankPrice || 0;
    }
    return 0;
  }, [selectedGasTank, carData]);

  const totalPrice = useMemo(() => {
    const basePrice = (carData?.pricePerDay || 0) * daysBooked;
    const total = basePrice + insuranceCharge + travelLocationPrice + gasTankCharge + additionalDriverCharge;
    return Math.round(total * 100) / 100;
  }, [carData, daysBooked, insuranceCharge, travelLocationPrice, gasTankCharge, additionalDriverCharge]);

  const clearRentalData = () => {
    const keys = [
      "daysBooked", "carData", "totalPrice",
      "selectedInsurance", "selectedBabySeat", "travelLocation", "selectedGasTank"
    ];
    keys.forEach(key => sessionStorage.removeItem(key));
  };

  return (
    <AppContext.Provider
      value={{
        daysBooked, setDaysBooked,
        carData, setCarData,
        totalPrice,
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
