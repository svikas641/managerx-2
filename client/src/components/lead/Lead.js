import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import LeadItem from "./LeadItem";
import VisitItem from "./VisitItem";
import VisitForm from "./VisitForm";
import { getLead } from "../../actions/lead";

const Lead = ({ getLead, lead: { lead, loading }, match }) => {
  useEffect(() => {
    getLead(match.params.id);
  }, [getLead, match.params.id]);

  return loading || lead === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to="/leads-log" className="btn btn-dark my-1">
        All Leads
      </Link>
      <Link to="/checkin-feedback" className="btn btn-dark my-1">
        Pending Leads
      </Link>
      <LeadItem lead={lead} fullContent={true} />
      <VisitForm leadId={lead._id} />
      <div className="comments">
        {lead.visits.map((visit) => (
          <VisitItem key={visit._id} visit={visit} leadId={lead._id} />
        ))}
      </div>
    </Fragment>
  );
};

Lead.propTypes = {
  getLead: PropTypes.func.isRequired,
  lead: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  lead: state.lead,
});

export default connect(mapStateToProps, { getLead })(Lead);
