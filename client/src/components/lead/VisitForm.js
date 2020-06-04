import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addVisit } from "../../actions/lead";

const initialState = {
  status: "",
  clientName: "",
  clientEmail: "",
  clientPhoneNumber: "",
  commentBox: "",
};

const VisitForm = ({ leadId, addVisit }) => {
  const [formData, setFormData] = useState(initialState);
  const {
    status,
    clientName,
    clientEmail,
    clientPhoneNumber,
    commentBox,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addVisit(leadId, formData);
    setFormData(initialState);
  };
  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Add a Visit</h3>
      </div>
      <form className="form my-1" onSubmit={onSubmit}>
        <select name="status" value={status} onChange={onChange}>
          <option value="0">* Select Lead Status</option>
          <option value="Met">Met</option>
          <option value="Not met">Not met</option>
        </select>
        <div className="form-group">
          <input
            type="text"
            placeholder="Client Name"
            name="clientName"
            value={clientName}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Client Email"
            name="clientEmail"
            value={clientEmail}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            placeholder="Client Phone Number"
            name="clientPhoneNumber"
            value={clientPhoneNumber}
            onChange={onChange}
            required
          />
        </div>
        <textarea
          name="commentBox"
          cols="30"
          rows="5"
          placeholder="Any additional Comment"
          value={commentBox}
          onChange={onChange}
        />
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

VisitForm.propTypes = {
  addVisit: PropTypes.func.isRequired,
};

export default connect(null, { addVisit })(VisitForm);
