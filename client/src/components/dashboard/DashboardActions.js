import React from "react";
import { Link } from "react-router-dom";

const DashboardActions = () => {
  return (
    <div className="dash-buttons">
      <Link to="/checkin-feedback" className="btn btn-light">
        <i className="fas fa-laptop text-primary" /> Check-in & Feedback
      </Link>
      {/* <Link to="/create-lead" className="btn btn-light">
        <i className="fas fa-plus-circle text-primary" /> Add New Lead
      </Link> */}
      <Link to="/leads-log" className="btn btn-light">
        <i className="fas fa-database text-primary" /> Leads Log
      </Link>
      <Link to="/reminder" className="btn btn-light">
        <i className="fas fa-stopwatch text-primary" /> Reminders
      </Link>
    </div>
  );
};

export default DashboardActions;
