import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [daysBooked, setDaysBooked] = useState(0);

  return (
    <AppContext.Provider value={{ daysBooked, setDaysBooked }}>
      {children}
    </AppContext.Provider>
  );
};