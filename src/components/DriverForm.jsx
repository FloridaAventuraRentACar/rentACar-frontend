import React from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';

import styles from '../styles/DriverForm.module.css';

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
        <label className={styles.label}>First Name:</label>
        <Field className={styles.input} name={`${prefix}.firstName`} />
        <ErrorMessage className={styles.error} name={`${prefix}.firstName`} component="div" />
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label}>Last Name:</label>
        <Field className={styles.input} name={`${prefix}.lastName`} />
        <ErrorMessage className={styles.error} name={`${prefix}.lastName`} component="div" />
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label}>Email:</label>
        <Field className={styles.input} type="email" name={`${prefix}.email`} />
        <ErrorMessage className={styles.error} name={`${prefix}.email`} component="div" />
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label}>Phone Number:</label>
        <Field className={styles.input} name={`${prefix}.phone`} />
        <ErrorMessage className={styles.error} name={`${prefix}.phone`} component="div" />
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label}>Driver’s License Number:</label>
        <Field className={styles.input} name={`${prefix}.licenseNumber`} />
        <ErrorMessage className={styles.error} name={`${prefix}.licenseNumber`} component="div" />
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label}>Date of Birth:</label>
        <Field className={styles.input} type="date" name={`${prefix}.birthDate`} />
        <ErrorMessage className={styles.error} name={`${prefix}.birthDate`} component="div" />
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label}>Name on License:</label>
        <Field className={styles.input} name={`${prefix}.nameOnLicense`} />
        <ErrorMessage className={styles.error} name={`${prefix}.nameOnLicense`} component="div" />
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label}>Address on License:</label>
        <Field className={styles.input} name={`${prefix}.addressOnLicense`} />
        <ErrorMessage className={styles.error} name={`${prefix}.addressOnLicense`} component="div" />
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label}>License Expiry Date:</label>
        <Field className={styles.input} type="date" name={`${prefix}.licenseExpiry`} />
        <ErrorMessage className={styles.error} name={`${prefix}.licenseExpiry`} component="div" />
      </div>
    </>
  );

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>Driver Form</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {({ values }) => (
          <Form>
            <h3 className={styles.sectionTitle}>Main Driver</h3>
            {renderFields('driver')}

            <h3 className={styles.sectionTitle}>Additional Drivers</h3>
            <FieldArray name="additionalDrivers">
              {({ push, remove }) => (
                <div>
                  {values.additionalDrivers.map((_, index) => (
                    <div key={index} className={styles.driverBox}>
                      <h4 className={styles.sectionTitle}>Additional Driver {index + 1}</h4>
                      {renderFields(`additionalDrivers[${index}]`)}
                      <button
                        type="button"
                        className={styles.formButton}
                        onClick={() => remove(index)}
                      >
                        Remove
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
                    Add Additional Driver
                  </button>
                </div>
              )}
            </FieldArray>

            <br />
            <button type="submit" className={styles.submitButton}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DriverForm;
