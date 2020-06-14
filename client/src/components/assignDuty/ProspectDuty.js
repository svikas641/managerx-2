import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { assignProspect } from "../../actions/duty";
import Select from "react-select";
import makeAnimated from "react-select/animated";
const animatedComponents = makeAnimated();

const ProspectDuty = ({ prospects, users, assignProspect, history }) => {
  const initialState = {
    salesPerson: "",
  };

  const [prospect, setProspect] = useState([]);

  const [formData, setFormData] = useState(initialState);

  const { salesPerson } = formData;

  const options = prospects.map((element) => ({
    label: element.prospectName,
    value: element._id,
  }));

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value, prospect });

  const onSubmit = (e) => {
    e.preventDefault();
    assignProspect(formData, history);
    console.log(formData);
    setFormData(initialState);
  };

  return (
    <Fragment>
      <div className="post-form">
        <div className="bg-primary p">
          <h3>For Prospect Visit</h3>
        </div>
        <form className="form my-1" onSubmit={onSubmit}>
          <Select
            name="prospect"
            className="form-group"
            onChange={setProspect}
            isMulti
            options={options}
            placeholder="Select Prospect"
            components={animatedComponents}
          />
          <select
            className="form-group"
            name="salesPerson"
            value={salesPerson}
            onChange={onChange}
          >
            <option value="0">* Select Sales Person</option>
            {users.map((user) => (
              <option key={user._id} value={user.name}>
                {user.name}
              </option>
            ))}
          </select>
          <input type="submit" className="btn btn-dark my-1" value="Submit" />
          <Link className="btn btn-light my-1" to="/dashboard">
            Go Back
          </Link>
        </form>
      </div>
    </Fragment>
  );
};

ProspectDuty.propTypes = {
  assignProspect: PropTypes.func.isRequired,
};

export default connect(null, { assignProspect })(ProspectDuty);
