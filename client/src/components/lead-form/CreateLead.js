import React, { Fragment, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createLead } from "../../actions/lead";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

const CreateLead = ({ createLead, history }) => {
  const initialState = {
    companyName: "",
    clientName: "",
    clientEmail: "",
    clientPhoneNumber: "",
    pincode: "",
  };
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });
  const [formData, setFormData] = useState(initialState);

  const {
    companyName,
    clientName,
    clientEmail,
    clientPhoneNumber,
    pincode,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    const clientAddress = value;
    setAddress(clientAddress);
    setCoordinates(latLng);
    setFormData({ ...formData, latLng, clientAddress });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createLead(formData, history);
    setFormData(initialState);
    setAddress("");
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
          <PlacesAutocomplete
            name="clientAddress"
            value={address}
            onChange={setAddress}
            onSelect={handleSelect}
            required
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading,
            }) => (
              <div>
                <input {...getInputProps({ placeholder: "Client Address" })} />

                <div>
                  {loading ? <div>...loading</div> : null}

                  {suggestions.map((suggestion) => {
                    const style = {
                      backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                    };

                    return (
                      <div {...getSuggestionItemProps(suggestion, { style })}>
                        {suggestion.description}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
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
