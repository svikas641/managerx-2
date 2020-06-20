import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { assignDuty } from "../../actions/duty";
import Select from "react-select";
import makeAnimated from "react-select/animated";
const animatedComponents = makeAnimated();

const ClientDuty = ({ clients, users, assignDuty, history }) => {
  const initialState = {
    salesPerson: "",
  };
  const [duty, setDuty] = useState([]);

  const [formData, setFormData] = useState(initialState);

  const { salesPerson } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value, duty });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    assignDuty(formData, history);
    setFormData(initialState);
  };

  const filtered = clients.filter((element) => element.type === "client");

  const options = filtered.map((element) => ({
    label: element.clientName,
    value: element._id,
  }));

  return (
    <Fragment>
      <div className="post-form">
        <div className="bg-primary p">
          <h3>For Client Visit</h3>
        </div>
        <form className="form my-1" onSubmit={onSubmit}>
          <Select
            name="duty"
            className="form-group"
            onChange={setDuty}
            isMulti
            options={options}
            placeholder="Select Client"
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
              <option key={user._id} value={user._id}>
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

ClientDuty.propTypes = {
  assignDuty: PropTypes.func.isRequired,
};

export default connect(null, { assignDuty })(ClientDuty);
