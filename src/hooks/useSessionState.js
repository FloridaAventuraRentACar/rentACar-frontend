import { useState, useEffect } from "react";

export function useSessionState(key, initialValue) {
  const [state, setState] = useState(() => {
    try {
      const stored = sessionStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initialValue;
    } catch (error) {
      console.warn(`Error leyendo sessionStorage[${key}]`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      sessionStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.warn(`Error guardando en sessionStorage[${key}]`, error);
    }
  }, [key, state]);

  return [state, setState];
}
