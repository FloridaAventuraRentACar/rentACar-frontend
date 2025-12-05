import { Field, ErrorMessage, FieldArray, useFormikContext } from "formik";
import styles from "../../../styles/admin/adminRentalForm/ClientsForm.module.css";

const renderDriverFields = (prefix) => (
  <>
    <div className={styles.fieldGroup}>
      <label className={styles.label}>Nombre</label>
      <Field className={styles.input} name={`${prefix}.name`} />
      <ErrorMessage
        className={styles.error}
        name={`${prefix}.name`}
        component="div"
      />
    </div>

    <div className={styles.fieldGroup}>
      <label className={styles.label}>Apellido</label>
      <Field className={styles.input} name={`${prefix}.surname`} />
      <ErrorMessage
        className={styles.error}
        name={`${prefix}.surname`}
        component="div"
      />
    </div>

    <div className={styles.fieldGroup}>
      <label className={styles.label}>Email</label>
      <Field className={styles.input} type="email" name={`${prefix}.email`} />
      <ErrorMessage
        className={styles.error}
        name={`${prefix}.email`}
        component="div"
      />
    </div>

    <div className={styles.fieldGroup}>
      <label className={styles.label}>Numero de telefono</label>
      <Field className={styles.input} name={`${prefix}.phone`} />
      <ErrorMessage
        className={styles.error}
        name={`${prefix}.phone`}
        component="div"
      />
    </div>

    <div className={styles.fieldGroup}>
      <label className={styles.label}>Numero de licencia de conducir</label>
      <Field className={styles.input} name={`${prefix}.licenseNumber`} />
      <ErrorMessage
        className={styles.error}
        name={`${prefix}.licenseNumber`}
        component="div"
      />
    </div>

    <div className={styles.fieldGroup}>
      <label className={styles.label}>Fecha de nacimiento</label>
      <Field
        className={styles.input}
        type="date"
        name={`${prefix}.bornDate`}
      />
      <ErrorMessage
        className={styles.error}
        name={`${prefix}.bornDate`}
        component="div"
      />
    </div>

    <div className={styles.fieldGroup}>
      <label className={styles.label}>
        Nombre completo en licencia de conducir
      </label>
      <Field className={styles.input} name={`${prefix}.licenseName`} />
      <ErrorMessage
        className={styles.error}
        name={`${prefix}.licenseName`}
        component="div"
      />
    </div>

    <div className={styles.fieldGroup}>
      <label className={styles.label}>
        Direccion en licencia de conducir
      </label>
      <Field className={styles.input} name={`${prefix}.licenseAddress`} />
      <ErrorMessage
        className={styles.error}
        name={`${prefix}.licenseAddress`}
        component="div"
      />
    </div>

    <div className={styles.fieldGroup}>
      <label className={styles.label}>
        Fecha de expiracion de licencia de conducir
      </label>
      <Field
        className={styles.input}
        type="date"
        name={`${prefix}.licenseExpirationDate`}
      />
      <ErrorMessage
        className={styles.error}
        name={`${prefix}.licenseExpirationDate`}
        component="div"
      />
    </div>
    <div className={styles.fieldGroup}>
      <label className={styles.label}>
        Numero de vuelo
      </label>
      <Field
        className={styles.input}
        placeholder="AA907"
        name={`${prefix}.flightNumber`}
      />
      <ErrorMessage
        className={styles.error}
        name={`${prefix}.flightNumber`}
        component="div"
      />
    </div>
    <div className={styles.checkbox}>
      <Field
        type="checkbox"
        name={`${prefix}.ageCheckbox`}
        className={styles.ageCheckbox}
      />
      <label className={styles.label}>Tengo mas de 25 años</label>
      <ErrorMessage
        className={styles.error}
        name={`${prefix}.ageCheckbox`}
        component="div"
      />
    </div>
  </>
);

const ClientsForm = () => {
  const { values } = useFormikContext();

  return (
    <>
      {/* Formulario de Clientes */}
      <h3 className={styles.sectionTitle}>Conductor principal</h3>
      {renderDriverFields("driver", styles)}
      <div className={styles.addDriverTitle}>
        <h3 className={styles.sectionTitle}>
          Conductores adicionales
        </h3>
        <span className={styles.include}>
          Hasta un conductor adicional incluido en el precio
        </span>
      </div>
      <FieldArray name="additionalDrivers">
        {({ push, remove }) => (
          <div>
            {values.additionalDrivers.map((_, index) => (
              <div key={index} className={styles.driverBox}>
                <h4 className={styles.sectionTitle}>
                  Conductor adicional {index + 1}
                </h4>
                {renderDriverFields(`additionalDrivers[${index}]`, styles)}
                <button
                  type="button"
                  className={`${styles.button} ${styles.removeButton}`}
                  onClick={() => remove(index)}
                >
                  Remover
                </button>
              </div>
            ))}
            <button
              type="button"
              className={`${styles.button} ${styles.addButton}`}
              onClick={() => {
                push({
                  name: "",
                  surname: "",
                  email: "",
                  phone: "",
                  licenseNumber: "",
                  bornDate: "",
                  licenseName: "",
                  licenseAddress: "",
                  licenseExpirationDate: "",
                  flightNumber: "",
                  ageCheckbox: false,
                });
              }}
            >
              Agregar conductor adicional
            </button>
          </div>
        )}
      </FieldArray>
    </>
  );
};

export default ClientsForm;

