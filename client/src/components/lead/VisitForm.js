import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addVisit } from "../../actions/lead";
import Spinner from "../layout/Spinner";
import useGeolocation from "react-hook-geolocation";

const initialState = {
  status: "",
  email: "",
  commentBox: "",
};

const VisitForm = ({ leadId, addVisit, lead: { lead, loading } }) => {
  const geolocation = useGeolocation();

  const [formData, setFormData] = useState(initialState);
  const { status, email, commentBox } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    const coords = {
      lat: geolocation.latitude,
      lng: geolocation.longitude,
    };
    const newData = { ...formData, ...coords };
    e.preventDefault();
    addVisit(leadId, newData);
    setFormData(initialState);
  };
  return loading || lead === null ? (
    <Spinner />
  ) : (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Add a Visit</h3>
      </div>
      <form className="form my-1" onSubmit={onSubmit}>
        <select name="status" value={status} onChange={onChange}>
          <option value="0">* Select Lead Status</option>
          <option value="Met">Met</option>
          <option value="Not_met">Not met</option>
          <option value="Close_Lead">Close Lead</option>
          <option value="Done">Done</option>
        </select>
        <div className="form-group">
          <select
            className="form-group"
            name="email"
            value={email}
            onChange={onChange}
          >
            <option value="0">* Select Person</option>
            {lead.personDetails.map((person) => (
              <option key={person._id} value={person.email}>
                {person.name}
              </option>
            ))}
          </select>
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

const mapStateToProps = (state) => ({
  auth: state.auth,
  lead: state.lead,
});

VisitForm.propTypes = {
  addVisit: PropTypes.func.isRequired,
  lead: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { addVisit })(VisitForm);
