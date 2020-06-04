import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";

const LeadItem = ({
  auth,
  lead: {
    _id,
    companyName,
    clientName,
    finalStatus,
    clientEmail,
    clientPhoneNumber,
    clientAddress,
    pincode,
    salesPerson,
    date,
  },
  fullContent,
}) => (
  <div>
    <li className="list-group-item">
      {companyName} - Created on <Moment format="DD/MM/YYYY">{date}</Moment>{" "}
    </li>
    <li className="list-group-item">Client Name : {clientName}</li>
    <li className="list-group-item">Client Email : {clientEmail}</li>
    <li className="list-group-item">
      Client Phone Number : {clientPhoneNumber}
    </li>
    <li className="list-group-item">Client Address : {clientAddress}</li>
    <li className="list-group-item">Pincode : {pincode}</li>
    <li className="list-group-item">Status : {finalStatus}</li>
    <li className="list-group-item">Lead created by : {salesPerson}</li>
  </div>
);

LeadItem.defaultProps = {
  fullContent: false,
};

LeadItem.propTypes = {
  lead: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(LeadItem);
