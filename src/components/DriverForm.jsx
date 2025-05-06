import React from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';

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
      <div><label>First Name:</label><Field name={`${prefix}.firstName`} /><ErrorMessage name={`${prefix}.firstName`} component="div" /></div>
      <div><label>Last Name:</label><Field name={`${prefix}.lastName`} /><ErrorMessage name={`${prefix}.lastName`} component="div" /></div>
      <div><label>Email:</label><Field name={`${prefix}.email`} type="email" /><ErrorMessage name={`${prefix}.email`} component="div" /></div>
      <div><label>Phone Number:</label><Field name={`${prefix}.phone`} /><ErrorMessage name={`${prefix}.phone`} component="div" /></div>
      <div><label>Driver’s License Number:</label><Field name={`${prefix}.licenseNumber`} /><ErrorMessage name={`${prefix}.licenseNumber`} component="div" /></div>
      <div><label>Date of Birth:</label><Field name={`${prefix}.birthDate`} type="date" /><ErrorMessage name={`${prefix}.birthDate`} component="div" /></div>
      <div><label>Name on License:</label><Field name={`${prefix}.nameOnLicense`} /><ErrorMessage name={`${prefix}.nameOnLicense`} component="div" /></div>
      <div><label>Address on License:</label><Field name={`${prefix}.addressOnLicense`} /><ErrorMessage name={`${prefix}.addressOnLicense`} component="div" /></div>
      <div><label>License Expiry Date:</label><Field name={`${prefix}.licenseExpiry`} type="date" /><ErrorMessage name={`${prefix}.licenseExpiry`} component="div" /></div>
    </>
  );

  return (
    <div>
      <h2>Driver Form</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        // onSubmit={(values) => {
        //   console.log('Form submitted:', values);
        // }}
      >
        {({ values }) => (
          <Form>
            <h3>Main Driver</h3>
            {renderFields('driver')}

            <h3>Additional Drivers</h3>
            <FieldArray name="additionalDrivers">
              {({ push, remove }) => (
                <div>
                  {values.additionalDrivers.map((_, index) => (
                    <div key={index} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
                      <h4>Additional Driver {index + 1}</h4>
                      {renderFields(`additionalDrivers[${index}]`)}
                      <button type="button" onClick={() => remove(index)}>Remove</button>
                    </div>
                  ))}
                  <button type="button" onClick={() => push({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    licenseNumber: '',
                    birthDate: '',
                    nameOnLicense: '',
                    addressOnLicense: '',
                    licenseExpiry: '',
                  })}>
                    Add Additional Driver
                  </button>
                </div>
              )}
            </FieldArray>

            <br />
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DriverForm;
