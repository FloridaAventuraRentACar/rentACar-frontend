import React from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';

import styles from '../styles/DriverForm.module.css';
import { Divider } from '@mui/material';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
const driverSchema = Yup.object({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  phone: Yup.string().required('Required'),
  licenseNumber: Yup.string().required('Required'),
  birthDate: Yup.date().required('Required'),
  nameOnLicense: Yup.string().required('Required'),
  addressOnLicense: Yup.string().required('Required'),
  licenseExpiry: Yup.date().required('Required'),
  ageCheckbox: Yup.boolean().oneOf([true]).required('Required')
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
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.header}>
          <button className={styles.backButton}>
            <ArrowCircleLeftIcon className={styles.backIcon} />
          </button>
          <h2 className={styles.formTitle}>Volver a los detalles de la reserva</h2>
        </div>
        <Divider />
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
                          className={styles.formButton}
                          onClick={() => remove(index)}
                        >
                          Remover
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      className={styles.formButton}
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
              <button type="submit" className={styles.submitButton}>
                Confirmar reserva
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default DriverForm;
