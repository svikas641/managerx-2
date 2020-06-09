import React, { Fragment, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createLead } from "../../actions/lead";

const CreateLead = ({ createLead, history }) => {
  const initialState = {
    companyName: "",
    clientName: "",
    clientEmail: "",
    clientPhoneNumber: "",
    clientAddress: "",
    pincode: "",
  };
  const [formData, setFormData] = useState(initialState);

  const {
    companyName,
    clientName,
    clientEmail,
    clientPhoneNumber,
    clientAddress,
    pincode,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createLead(formData, history);
    setFormData(initialState);
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Create New Lead</h1>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Company Name"
            name="companyName"
            value={companyName}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Client Name"
            name="clientName"
            value={clientName}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Client Email"
            name="clientEmail"
            value={clientEmail}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            placeholder="Client Phone Number"
            name="clientPhoneNumber"
            value={clientPhoneNumber}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Client Address"
            name="clientAddress"
            value={clientAddress}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            placeholder="Enter Pincode"
            name="pincode"
            value={pincode}
            onChange={(e) => onChange(e)}
            required
          />
        </div>

        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

CreateLead.propTypes = {
  createLead: PropTypes.func.isRequired,
};

export default connect(null, { createLead })(withRouter(CreateLead));
