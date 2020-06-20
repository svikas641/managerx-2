import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const LeadItem = ({ auth, lead: { _id, clientName, date } }) => (
  <div>
    <Link
      to={`/leads-log/${_id}`}
      className="list-group-item list-group-item-action"
    >
      {clientName}
    </Link>
  </div>
);

LeadItem.propTypes = {
  lead: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(LeadItem);
