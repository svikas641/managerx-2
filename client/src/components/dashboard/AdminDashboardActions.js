import React from "react";
import { Link } from "react-router-dom";

const AdminDashboardActions = () => {
  return (
    <div className="dash-buttons">
      <Link to="/assignDuties" className="btn btn-light">
        <i className="fas fa-laptop text-primary" /> Assign Duties
      </Link>
      <Link to="/addClients" className="btn btn-light">
        <i className="fas fa-laptop text-primary" /> Add Clients
      </Link>
      <Link to="/addProspects" className="btn btn-light">
        <i className="fas fa-laptop text-primary" /> Add Prospects
      </Link>
    </div>
  );
};

export default AdminDashboardActions;