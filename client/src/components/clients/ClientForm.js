import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Formik, Field, Form, FieldArray } from "formik";
import { createClient } from "../../actions/client";

const ClientForm = ({ createClient, history }) => {
  return (
    <div>
      <h1 className="large text-primary">Create Client</h1>
      <Formik
        initialValues={{
          clientName: "",
          clientAddress: "",
          personDetails: [
            { id: Math.random(), name: "", email: "", phoneNumber: "" },
          ],
        }}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);
          createClient(data, history);
          console.log("submit: ", data);
          setSubmitting(false);
        }}
      >
        {({ values, isSubmitting }) => (
          <Form className="form">
            <div className="form-group">
              <Field type="text" name="clientName" placeholder="Client Name" />
            </div>
            <div className="form-group">
              <Field
                type="text"
                name="clientAddress"
                placeholder="Client Address"
              />
            </div>
            <FieldArray name="personDetails">
              {(arrayHelpers) => (
                <div>
                  <button
                    className="btn btn-primary my-1"
                    type="button"
                    onClick={() =>
                      arrayHelpers.push({
                        name: "",
                        email: "",
                        phoneNumber: "",
                        id: Math.random(),
                      })
                    }
                  >
                    Add Person
                  </button>
                  {values.personDetails.map((personDetail, index) => {
                    return (
                      <div key={personDetail.id}>
                        <div className="form-group">
                          <Field
                            type="text"
                            name={`personDetails.${index}.name`}
                            placeholder="Name"
                          />
                        </div>
                        <div className="form-group">
                          <Field
                            type="email"
                            name={`personDetails.${index}.email`}
                            placeholder="Email"
                          />
                        </div>
                        <div className="form-group">
                          <Field
                            type="number"
                            name={`personDetails.${index}.phoneNumber`}
                            placeholder="Phone Number"
                          />
                        </div>
                        <button
                          className="btn btn-primary my-1 "
                          type="button"
                          onClick={() => arrayHelpers.remove(index)}
                        >
                          Remove
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </FieldArray>
            <input
              type="submit"
              className="btn btn-primary my-1"
              disabled={isSubmitting}
            />
            <Link className="btn btn-light my-1" to="/dashboard">
              Go Back
            </Link>
          </Form>
        )}
      </Formik>
    </div>
  );
};

ClientForm.propTypes = {
  createClient: PropTypes.func.isRequired,
};

export default connect(null, { createClient })(withRouter(ClientForm));
