import React from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';

import styles from '../styles/DriverForm.module.css';
import { Divider } from '@mui/material';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import RentalDetails from './RentalDetails.jsx';

const driverSchema = Yup.object({
  firstName: Yup.string().required('Obligatorio'),
  lastName: Yup.string().required('Obligatorio'),
  email: Yup.string().email('Debes ingresar un formato de mail valido').required('Obligatorio'),
  phone: Yup.string().required('Obligatorio'),
  licenseNumber: Yup.string().required('Obligatorio'),
  birthDate: Yup.date().required('Obligatorio'),
  nameOnLicense: Yup.string().required('Obligatorio'),
  addressOnLicense: Yup.string().required('Obligatorio'),
  licenseExpiry: Yup.date().required('Obligatorio'),
  ageCheckbox: Yup.boolean().oneOf([true], "Debes tener mas de 25 años para manejar un vehiculo").required('Obligatorio')
});

const DriverForm = () => {
  
 
  const initialValues = {
    driver: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      licenseNumber: '',
      birthDate: '',
      nameOnLicense: '',
      addressOnLicense: '',
      licenseExpiry: '',
      ageCheckbox: false
    },
    additionalDrivers: [],
  };

  const validationSchema = Yup.object({
    driver: driverSchema,
    additionalDrivers: Yup.array().of(driverSchema),
  });

  const renderFields = (prefix) => (
    <>
      <div className={styles.fieldGroup}>
        <label className={styles.label}>Nombre</label>
        <Field className={styles.input} name={`${prefix}.firstName`} />
        <ErrorMessage className={styles.error} name={`${prefix}.firstName`} component="div" />
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label}>Apellido</label>
        <Field className={styles.input} name={`${prefix}.lastName`} />
        <ErrorMessage className={styles.error} name={`${prefix}.lastName`} component="div" />
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label}>Email</label>
        <Field className={styles.input} type="email" name={`${prefix}.email`} />
        <ErrorMessage className={styles.error} name={`${prefix}.email`} component="div" />
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label}>Numero de telefono</label>
        <Field className={styles.input} name={`${prefix}.phone`} />
        <ErrorMessage className={styles.error} name={`${prefix}.phone`} component="div" />
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label}>Numero de licencia de conducir</label>
        <Field className={styles.input} name={`${prefix}.licenseNumber`} />
        <ErrorMessage className={styles.error} name={`${prefix}.licenseNumber`} component="div" />
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label}>Fecha de nacimiento</label>
        <Field className={styles.input} type="date" name={`${prefix}.birthDate`} />
        <ErrorMessage className={styles.error} name={`${prefix}.birthDate`} component="div" />
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label}>Nombre en licencia de conducir</label>
        <Field className={styles.input} name={`${prefix}.nameOnLicense`} />
        <ErrorMessage className={styles.error} name={`${prefix}.nameOnLicense`} component="div" />
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label}>Direccion en licencia de conducir</label>
        <Field className={styles.input} name={`${prefix}.addressOnLicense`} />
        <ErrorMessage className={styles.error} name={`${prefix}.addressOnLicense`} component="div" />
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label}>Fecha de expiracion de licencia de conducir</label>
        <Field className={styles.input} type="date" name={`${prefix}.licenseExpiry`} />
        <ErrorMessage className={styles.error} name={`${prefix}.licenseExpiry`} component="div" />
      </div>
      <div className={styles.checkbox}>
        <Field type="checkbox" name={`${prefix}.ageCheckbox`} className={styles.ageCheckbox} />
        <label className={styles.label}>
          Tengo mas de 25 años
        </label>
        <ErrorMessage className={styles.error} name={`${prefix}.ageCheckbox`} component="div" />
      </div>
    </>
  );

  return (
    <div className={styles.background}>
      <div className={styles.header}>

        <button className={styles.backButton}>
          <ArrowCircleLeftIcon className={styles.backIcon} />
        </button>
        <h2 className={styles.formTitle}>Volver a los detalles de la reserva</h2>

      </div>
      <Divider />
      <div className={styles.mainContainer}>

        <div className={styles.formContainer}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
          >
            {({ values }) => (
              <Form>
                <h3 className={styles.sectionTitle}>Conductor principal</h3>
                {renderFields('driver')}

                <h3 className={styles.sectionTitle}>Conductores adicionales</h3>
                <FieldArray name="additionalDrivers">
                  {({ push, remove }) => (
                    <div>
                      {values.additionalDrivers.map((_, index) => (
                        <div key={index} className={styles.driverBox}>
                          <h4 className={styles.sectionTitle}>Conductor adicional {index + 1}</h4>
                          {renderFields(`additionalDrivers[${index}]`)}
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
                        onClick={() =>
                          push({
                            firstName: '',
                            lastName: '',
                            email: '',
                            phone: '',
                            licenseNumber: '',
                            birthDate: '',
                            nameOnLicense: '',
                            addressOnLicense: '',
                            licenseExpiry: '',
                          })
                        }
                      >
                        Agregar conductor adicional
                      </button>
                    </div>
                  )}
                </FieldArray>

                <br />
                <button type="submit" className={`${styles.submitButton} ${styles.button}`}
                >
                  Confirmar reserva
                </button>
              </Form>
            )}
          </Formik>
        </div>
        <div className={styles.rentalDetailsContainer}>
          <RentalDetails />

        </div>
      </div>
    </div>
  );
};

export default DriverForm;
