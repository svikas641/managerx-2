import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";

const LeadItem = ({
  auth,
  lead: { _id, companyName, companyAddress, finalStatus, date },
  fullContent,
}) => (
  <div>
    <li className="list-group-item">
      {companyName} - Created on <Moment format="DD/MM/YYYY">{date}</Moment>{" "}
    </li>
    <li className="list-group-item">Client Name : {companyName}</li>
    <li className="list-group-item">Client Address : {companyAddress}</li>
    <li className="list-group-item">Status : {finalStatus}</li>
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
