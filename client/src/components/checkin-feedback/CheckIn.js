import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getPendingLeads } from "../../actions/lead";
import Spinner from "../layout/Spinner";
import LeadItem from "../leads/LeadItem";

const CheckIn = ({ getPendingLeads, lead: { leads, loading } }) => {
  useEffect(() => {
    getPendingLeads();
  }, [getPendingLeads]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h3 className="large text-primary">All Pending Leads</h3>
      <Link to="/dashboard" className="btn btn-dark my-1">
        Back To Dashboard
      </Link>{" "}
      <div className="posts">
        {leads.map((lead) => (
          <LeadItem key={lead._id} lead={lead} />
        ))}
      </div>
    </Fragment>
  );
};

CheckIn.propTypes = {
  lead: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  lead: state.lead,
});

export default connect(mapStateToProps, { getPendingLeads })(CheckIn);
