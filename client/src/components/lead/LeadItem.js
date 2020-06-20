import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";

const LeadItem = ({
  auth,
  lead: { clientName, clientAddress, type, finalStatus, date },
  fullContent,
}) => (
  <div>
    <li className="list-group-item">{clientName}</li>
    <li className="list-group-item">Client Name : {clientName}</li>
    <li className="list-group-item">Client Address : {clientAddress}</li>
    <li className="list-group-item">Type : {type}</li>
    <li className="list-group-item">Status : {finalStatus}</li>
    <li className="list-group-item">
      Created on : <Moment format="DD/MM/YYYY">{date}</Moment>
    </li>
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
