# Informe: Análisis de Estados Globales en el Proyecto RentACar Frontend

## 1. Resumen General

El proyecto **Florida Aventura RentACar** es una aplicación React (con Vite) que gestiona el alquiler de autos. La gestión de estados globales se realiza **exclusivamente mediante React Context API**, sin utilizar ninguna librería externa de estado (ni Redux, ni Zustand, ni Jotai, etc.).

Existen **2 contextos** definidos en la carpeta `src/context/`:

| Archivo           | Contexto      | Propósito                        |
| ----------------- | ------------- | -------------------------------- |
| `AppContext.jsx`  | `AppContext`  | Estado del flujo de alquiler     |
| `AuthContext.jsx` | `AuthContext` | Autenticación del panel de admin |

---

## 2. Estructura de Providers en el Árbol de Componentes

En `src/components/main.jsx` los providers se montan así:

```jsx
<StrictMode>
  <AuthProvider>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </AuthProvider>
</StrictMode>
```

**Observación clave:** Ambos providers envuelven **TODA** la aplicación. Esto significa que el `AppContext` (datos de alquiler) está disponible incluso en las páginas de administración (`/admin/*`) y el Login, donde no se necesita. De la misma forma, `AuthContext` está disponible en las páginas públicas donde nunca se usa.

---

## 3. Análisis Detallado de `AppContext.jsx`

### 3.1 States que gestiona (14 states)

Todos los estados usan un custom hook `useSessionState` que sincroniza el valor con `sessionStorage`:

```jsx
const [daysBooked, setDaysBooked] = useSessionState("daysBooked", 0);
const [pickupLocation, setPickupLocation] = useSessionState(
  "pickupLocation",
  "",
);
const [returnLocation, setReturnLocation] = useSessionState(
  "returnLocation",
  "",
);
const [pickupDate, setPickupDate] = useSessionState("pickupDate", "");
const [pickupTime, setPickupTime] = useSessionState("pickupTime", "");
const [returnDate, setReturnDate] = useSessionState("returnDate", "");
const [returnTime, setReturnTime] = useSessionState("returnTime", "");
const [carData, setCarData] = useSessionState("carData", {});
const [pricePerDay, setPricePerDay] = useSessionState("pricePerDay", 100);
const [selectedInsurance, setSelectedInsurance] = useSessionState(
  "selectedInsurance",
  "DEDUCTIBLE",
);
const [selectedBabySeat, setSelectedBabySeat] = useSessionState(
  "selectedBabySeat",
  "NONE",
);
const [travelLocation, setTravelLocation] = useSessionState(
  "travelLocation",
  null,
);
const [selectedGasTank, setSelectedGasTank] = useSessionState(
  "selectedGasTank",
  "FULL",
);
const [additionalDriversCount, setAdditionalDriversCount] = useSessionState(
  "additionalDriversCount",
  0,
);
```

### 3.2 Valores derivados / computados (5 useMemo)

```jsx
const additionalDriverCharge = useMemo(() => {
  return additionalDriversCount > 1
    ? (additionalDriversCount - 1) * (5 * daysBooked)
    : 0;
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
  return (
    basePrice +
    insuranceCharge +
    babySeatCharge +
    travelLocationPrice +
    gasTankCharge +
    additionalDriverCharge
  );
}, [
  carData,
  daysBooked,
  insuranceCharge,
  babySeatCharge,
  travelLocationPrice,
  gasTankCharge,
  additionalDriverCharge,
]);
```

### 3.3 Funciones auxiliares

```jsx
const clearRentalData = () => {
  const keys = [
    "daysBooked",
    "pickupLocation",
    "returnLocation",
    "pickupDate",
    "pickupTime",
    "returnDate",
    "returnTime",
    "carData",
    "totalPrice",
    "pricePerDay",
    "selectedInsurance",
    "selectedBabySeat",
    "travelLocation",
    "selectedGasTank",
  ];
  keys.forEach((key) => sessionStorage.removeItem(key));
};
```

**Observación:** `clearRentalData` solo limpia el `sessionStorage` pero **NO** resetea los estados de React (`setState`) asociados. Los componentes mantienen el valor viejo en memoria hasta que se desmontan o re-renderizan.

### 3.4 Value del Provider (lo que se expone)

Se exponen **TODOS** los 14 states, sus **14 setters**, 1 valor computado (`totalPrice`), y 1 función (`clearRentalData`). En total: **30 propiedades** en un solo objeto de valor.

```jsx
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
```

**Observación:** Los valores computados intermedios (`insuranceCharge`, `babySeatCharge`, `travelLocationPrice`, `gasTankCharge`, `additionalDriverCharge`) NO se exponen; solo se expone el `totalPrice` final. Sin embargo, el componente `CarRentalPage.jsx` recalcula `travelLocationPrice` localmente con un `useState` propio, duplicando lógica.

### 3.5 El objeto `value` se crea nuevo en cada render

El objeto literal `{{ ... }}` dentro del Provider se crea como un nuevo objeto en cada render, lo que provoca re-renders innecesarios en todos los consumidores. No se usa `useMemo` para memoizar el valor del provider.

---

## 4. Análisis Detallado de `AuthContext.jsx`

### 4.1 States que gestiona (2 states)

```jsx
const [user, setUser] = useState(null);
const [authChecked, setAuthChecked] = useState(false);
```

### 4.2 Funciones

```jsx
const login = (token) => {
  localStorage.setItem("token", token);
  const payload = JSON.parse(atob(token.split(".")[1]));
  setUser(payload);
};

const logout = () => {
  localStorage.removeItem("token");
  setUser(null);
  window.location.href = "/admin/login"; // Navegación imperativa fuera de React Router
};

const checkAuth = () => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (payload.exp * 1000 < Date.now()) {
        logout();
      } else {
        setUser(payload);
      }
    } catch {
      logout();
    }
  }
  setAuthChecked(true);
};
```

### 4.3 Value del Provider

```jsx
value={{ user, login, logout, authChecked }}
```

**Observaciones:**

- `logout()` usa `window.location.href` en vez de React Router (`useNavigate`), forzando una recarga completa de la página.
- `login()` decodifica el JWT con `atob()` manualmente. No hay validación de firma del token.
- El `checkAuth()` se ejecuta solo al montaje (`useEffect(() => { checkAuth(); }, [])`), pero no hay mecanismo para re-verificar expiración mientras el usuario está navegando.
- Al igual que `AppContext`, el objeto `value` no se memoiza.

---

## 5. Custom Hook: `useSessionState.js`

```jsx
export function useSessionState(key, initialValue) {
  const [state, setState] = useState(() => {
    try {
      const stored = sessionStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      sessionStorage.setItem(key, JSON.stringify(state));
    } catch (error) {}
  }, [key, state]);

  return [state, setState];
}
```

**Observaciones:**

- Persiste TODOS los estados del flujo de alquiler en `sessionStorage`.
- El `useEffect` se ejecuta en cada cambio de `state`, lo que genera escrituras frecuentes al `sessionStorage`.
- Los errores del `catch` se ignoran silenciosamente (bloques catch vacíos).

---

## 6. Mapa de Consumo de Contextos por Componente

### 6.1 AppContext — Consumidores (7 componentes)

| Componente          | Propiedades que consume del AppContext                                                                                                                                                                                                     |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `HomePage.jsx`      | `clearRentalData`                                                                                                                                                                                                                          |
| `HomeRentInput.jsx` | `pickupLocation`, `setPickupLocation`, `returnLocation`, `setReturnLocation`, `pickupDate`, `setPickupDate`, `pickupTime`, `setPickupTime`, `returnDate`, `setReturnDate`, `returnTime`, `setReturnTime`, `setDaysBooked`                  |
| `ShowCarsPage.jsx`  | `pickupDate`, `pickupTime`, `returnDate`, `returnTime`                                                                                                                                                                                     |
| `CarCard.jsx`       | `setCarData`                                                                                                                                                                                                                               |
| `CarRentalPage.jsx` | `daysBooked`, `pickupDate`, `returnDate`, `carData`, `totalPrice`, `selectedInsurance`, `setSelectedInsurance`, `selectedBabySeat`, `setSelectedBabySeat`, `travelLocation`, `setTravelLocation`, `selectedGasTank`, `setSelectedGasTank`  |
| `RentalDetails.jsx` | `carData`, `daysBooked`, `pickupLocation`, `pickupDate`, `pickupTime`, `returnLocation`, `returnDate`, `returnTime`, `totalPrice`, `selectedInsurance`, `selectedBabySeat`, `travelLocation`                                               |
| `DriverForm.jsx`    | `carData`, `pickupLocation`, `returnLocation`, `pickupDate`, `pickupTime`, `returnDate`, `returnTime`, `selectedInsurance`, `selectedBabySeat`, `travelLocation`, `selectedGasTank`, `additionalDriversCount`, `setAdditionalDriversCount` |

### 6.2 AuthContext — Consumidores (2 componentes)

| Componente           | Propiedades que consume del AuthContext |
| -------------------- | --------------------------------------- |
| `Login.jsx`          | `login`                                 |
| `ProtectedRoute.jsx` | `user`, `authChecked`                   |

---

## 7. El State `pricePerDay` no se usa

El state `pricePerDay` (con valor inicial 100) se declara en `AppContext` y se expone con su setter `setPricePerDay`, pero **ningún componente lo consume**. El precio por día se lee directamente de `carData.pricePerDay` en todos los componentes. Es código muerto.

---

## 8. Problemas de Lógica Duplicada

### 8.1 `travelLocationPrice` duplicado

En `AppContext.jsx` se calcula `travelLocationPrice` como un `useMemo`:

```jsx
const travelLocationPrice = useMemo(() => {
  return travelLocation ? locationPrices[travelLocation] : 0;
}, [travelLocation]);
```

Pero en `CarRentalPage.jsx` se crea un **estado local separado** para lo mismo:

```jsx
const [travelLocationPrice, setTravelLocationPrice] = useState(0);
// ...
const handleTravelLocationChange = (event) => {
  const newLocation = event.target.value;
  const newLocationPrice = locationPrices[newLocation];
  setTravelLocation(newLocation);
  setTravelLocationPrice(newLocationPrice);
};
```

Esto es redundante y potencialmente problemático: la fuente de verdad está en dos lugares.

### 8.2 `clearRentalData` no resetea los React states

La función `clearRentalData()` limpia `sessionStorage` pero no llama a los setters para resetear el estado en memoria. Si un componente monta después de llamar a `clearRentalData()` sin recargar la página, los valores viejos pueden seguir presentes.

### 8.3 `setAdditionalDriversCount` dentro del render

En `DriverForm.jsx` (líneas 203-207), se llama a un setter del contexto **dentro del cuerpo del render** de Formik:

```jsx
{
  ({ values }) => {
    if (values.additionalDrivers.length !== additionalDriversCount) {
      setAdditionalDriversCount(values.additionalDrivers.length); // ⚠️ setState durante render
    }
    return <Form>...</Form>;
  };
}
```

Esto puede generar warnings de React y re-renders infinitos en algunos casos.

---

## 9. Resumen de lo Expuesto vs. lo Consumido

### AppContext: 30 propiedades expuestas

| Propiedad                                              | ¿Se consume en algún componente?          |
| ------------------------------------------------------ | ----------------------------------------- |
| `daysBooked` / `setDaysBooked`                         | ✅ Sí                                     |
| `pickupLocation` / `setPickupLocation`                 | ✅ Sí                                     |
| `returnLocation` / `setReturnLocation`                 | ✅ Sí                                     |
| `pickupDate` / `setPickupDate`                         | ✅ Sí                                     |
| `pickupTime` / `setPickupTime`                         | ✅ Sí                                     |
| `returnDate` / `setReturnDate`                         | ✅ Sí                                     |
| `returnTime` / `setReturnTime`                         | ✅ Sí                                     |
| `carData` / `setCarData`                               | ✅ Sí                                     |
| `totalPrice`                                           | ✅ Sí                                     |
| `pricePerDay` / `setPricePerDay`                       | ❌ **No se consume en ningún componente** |
| `selectedInsurance` / `setSelectedInsurance`           | ✅ Sí                                     |
| `selectedBabySeat` / `setSelectedBabySeat`             | ✅ Sí                                     |
| `travelLocation` / `setTravelLocation`                 | ✅ Sí                                     |
| `selectedGasTank` / `setSelectedGasTank`               | ✅ Sí                                     |
| `additionalDriversCount` / `setAdditionalDriversCount` | ✅ Sí                                     |
| `clearRentalData`                                      | ✅ Sí                                     |

---

## 10. Flujo de Datos del Proceso de Alquiler

```
HomePage                       → clearRentalData()
  └─ HomeRentInput             → setPickupLocation, setReturnLocation, setPickupDate, setPickupTime,
                                  setReturnDate, setReturnTime, setDaysBooked
     └─ ShowCarsPage           → lee pickupDate, pickupTime, returnDate, returnTime
        └─ CarCard             → setCarData
           └─ CarRentalPage    → lee carData, daysBooked, totalPrice
                                  setSelectedInsurance, setSelectedBabySeat, setTravelLocation, setSelectedGasTank
              └─ DriverForm    → lee carData, pickupLocation, returnLocation, pickupDate, pickupTime,
                                  returnDate, returnTime, selectedInsurance, selectedBabySeat, travelLocation,
                                  selectedGasTank, additionalDriversCount, setAdditionalDriversCount
                 └─ RentalDetails → lee carData, daysBooked, pickupLocation, pickupDate, pickupTime,
                                    returnLocation, returnDate, returnTime, totalPrice, selectedInsurance,
                                    selectedBabySeat, travelLocation
```

---

## 11. Tecnologías y Dependencias Relacionadas

| Aspecto                 | Tecnología                                           |
| ----------------------- | ---------------------------------------------------- |
| Framework UI            | React (con Vite)                                     |
| Manejo de estado global | React Context API (built-in)                         |
| Persistencia de estados | `sessionStorage` (via hook custom `useSessionState`) |
| Persistencia de auth    | `localStorage`                                       |
| Routing                 | React Router v6 (`react-router-dom`)                 |
| Formularios             | Formik + Yup                                         |
| Componentes UI          | MUI Material (`@mui/material`) + Lucide React        |

---

## 12. Listado de Problemas Identificados (para que la IA receptora analice)

1. **Un solo contexto gigante (`AppContext`)** con 14 states, 5 memos, 1 función, 30 propiedades expuestas. Cualquier cambio en cualquier propiedad re-renderiza todos los consumidores.

2. **El objeto `value` del Provider no está memoizado**, se recrea en cada render.

3. **Los dos providers envuelven toda la app**, incluyendo rutas donde no se necesitan (admin no necesita AppContext, public no necesita AuthContext).

4. **State `pricePerDay` es código muerto** — se declara pero nunca se consume.

5. **Lógica duplicada de `travelLocationPrice`** entre `AppContext` (useMemo) y `CarRentalPage` (useState local).

6. **`clearRentalData` solo limpia sessionStorage** pero no resetea los estados de React.

7. **`setAdditionalDriversCount` se llama dentro del render** en DriverForm.jsx (anti-pattern).

8. **`logout()` usa `window.location.href`** en vez de navegación de React Router, causando recarga completa.

9. **No existe un custom hook `useAppContext()` o `useAuth()`** que encapsule el `useContext(AppContext)` para simplificar el consumo y mejorar el manejo de errores (e.g., lanzar error si se usa fuera del provider).

10. **No hay tipado** (TypeScript) para los valores del contexto, lo que dificulta el mantenimiento y el autocompletado.

11. **Los bloques `catch` están vacíos** en `useSessionState`, `saveRental`, y otros — los errores se silencian.

12. **JWT se decodifica manualmente con `atob()`** sin validar estructura o firma.

13. **No hay separación entre estado de "búsqueda/fechas/ubicaciones" y estado de "auto seleccionado/opciones de alquiler"**, todo vive junto en un solo contexto plano.

---

## 13. Estructura de Archivos Relevante

```
src/
├── context/
│   ├── AppContext.jsx          ← 89 líneas, 14 states + 5 memos + 1 función
│   └── AuthContext.jsx         ← 48 líneas, 2 states + 3 funciones
├── hooks/
│   ├── useSessionState.js      ← 22 líneas, hook custom de persistencia en sessionStorage
│   └── useEmailJs.js           ← Hook para envío de emails
├── components/
│   ├── main.jsx                ← Entry point, monta providers y router
│   ├── home/
│   │   ├── HomePage.jsx        ← Consume: clearRentalData
│   │   └── HomeRentInput.jsx   ← Consume: 7 states + 6 setters + setDaysBooked
│   ├── rental/
│   │   ├── cars/
│   │   │   ├── ShowCarsPage.jsx ← Consume: 4 states (fechas/hora)
│   │   │   └── CarCard.jsx      ← Consume: setCarData
│   │   └── booking/
│   │       ├── CarRentalPage.jsx ← Consume: 10 propiedades del contexto + lógica duplicada
│   │       ├── DriverForm.jsx    ← Consume: 12 propiedades + setState during render
│   │       └── RentalDetails.jsx ← Consume: 12 propiedades (solo lectura)
│   └── admin/
│       └── auth/
│           ├── Login.jsx         ← Consume AuthContext: login
│           └── ProtectedRoute.jsx ← Consume AuthContext: user, authChecked
└── utilities/
    └── prices/
        ├── locationPrices.js   ← Importado en AppContext para cálculos
        └── gasTankPrices.js    ← Importado en AppContext para cálculos
```

---

_Este informe fue generado el 18 de febrero de 2026 a partir del análisis estático del código fuente del proyecto._
