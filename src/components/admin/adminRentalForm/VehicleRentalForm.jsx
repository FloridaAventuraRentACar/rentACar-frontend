import { Field, ErrorMessage, useFormikContext } from "formik";
import styles from "../../../styles/admin/adminRentalForm/VehicleRentalForm.module.css";
import insuranceNames from "../../../utilities/names/insuranceNames.js";
import babySeatNames from "../../../utilities/names/babySeatNames.js";
import { gasTankNames } from "../../../utilities/names/gasTankNames.js";
import locationNames from "../../../utilities/names/locationNames.js";
import travelLocationNames from "../../../utilities/names/travelLocationNames.js";
import roundToNearestHalfHour from "../../../utilities/functions/roundToNearestHalfHour.js";

const VehicleRentalForm = ({ cars, values }) => {
  const { setFieldValue } = useFormikContext();

  const handleDateTimeChange = (fieldName, value) => {
    if (!value) {
      setFieldValue(fieldName, value);
      return;
    }

    // El formato de datetime-local es "YYYY-MM-DDTHH:mm"
    const [date, time] = value.split("T");
    
    if (date && time) {
      const roundedTime = roundToNearestHalfHour(time);
      const roundedDateTime = `${date}T${roundedTime}`;
      setFieldValue(fieldName, roundedDateTime);
    } else {
      setFieldValue(fieldName, value);
    }
  };
  return (
    <>
      {/* Información del Alquiler */}
      <h3 className={styles.sectionTitle}>Información del Alquiler</h3>

      <div className={styles.fieldGroup}>
        <label className={styles.label}>Vehículo</label>
        <Field as="select" className={styles.input} name="carId">
          <option value="">Seleccione un vehículo</option>
          {Object.entries(cars).map(([id, name]) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </Field>
        <ErrorMessage
          className={styles.error}
          name="carId"
          component="div"
        />
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label}>Fecha y hora de entrega</label>
        <Field
          className={styles.input}
          type="datetime-local"
          name="startDateTime"
          onChange={(e) => {
            handleDateTimeChange("startDateTime", e.target.value);
          }}
        />
        <ErrorMessage
          className={styles.error}
          name="startDateTime"
          component="div"
        />
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label}>Fecha y hora de devolución</label>
        <Field
          className={styles.input}
          type="datetime-local"
          name="endDateTime"
          min={values.startDateTime || undefined}
          onChange={(e) => {
            handleDateTimeChange("endDateTime", e.target.value);
          }}
        />
        <ErrorMessage
          className={styles.error}
          name="endDateTime"
          component="div"
        />
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label}>Lugar de entrega</label>
        <Field as="select" className={styles.input} name="pickupLocation">
          <option value="">Seleccione un lugar</option>
          {Object.entries(locationNames).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </Field>
        <ErrorMessage
          className={styles.error}
          name="pickupLocation"
          component="div"
        />
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label}>Lugar de devolución</label>
        <Field as="select" className={styles.input} name="returnLocation">
          <option value="">Seleccione un lugar</option>
          {Object.entries(locationNames).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </Field>
        <ErrorMessage
          className={styles.error}
          name="returnLocation"
          component="div"
        />
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label}>Destino de viaje (Opcional)</label>
        <Field as="select" className={styles.input} name="travelLocation">
          <option value="">Ninguno</option>
          {Object.entries(travelLocationNames).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </Field>
        <ErrorMessage
          className={styles.error}
          name="travelLocation"
          component="div"
        />
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label}>Seguro</label>
        <Field as="select" className={styles.input} name="insurance">
          <option value="">Seleccione un seguro</option>
          {Object.entries(insuranceNames).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </Field>
        <ErrorMessage
          className={styles.error}
          name="insurance"
          component="div"
        />
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label}>Asiento de bebé</label>
        <Field as="select" className={styles.input} name="babySeat">
          <option value="">Seleccione una opción</option>
          {Object.entries(babySeatNames).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </Field>
        <ErrorMessage
          className={styles.error}
          name="babySeat"
          component="div"
        />
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label}>Tanque de gasolina</label>
        <Field as="select" className={styles.input} name="gasTank">
          <option value="">Seleccione una opción</option>
          {Object.entries(gasTankNames).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </Field>
        <ErrorMessage
          className={styles.error}
          name="gasTank"
          component="div"
        />
      </div>

      <div className={styles.fieldGroup}>
        <div className={styles.priceContainer}>
          <div className={styles.priceInputWrapper}>
            <label className={styles.label}>Precio Total</label>
            <Field
              className={`${styles.input} ${styles.priceInput}`}
              type="number"
              name="totalPrice"
              step="0.01"
              disabled={values.calculateTotal}
            />
            <ErrorMessage
              className={styles.error}
              name="totalPrice"
              component="div"
            />
          </div>
          <div className={styles.checkboxContainer}>
            <Field
              type="checkbox"
              name="calculateTotal"
              className={styles.calculateCheckbox}
              id="calculateTotal"
            />
            <label htmlFor="calculateTotal" className={styles.checkboxLabel}>
              Calcular total
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default VehicleRentalForm;

