import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getClients, getProspects } from "../../actions/client";
import Spinner from "../layout/Spinner";
import { getUsers } from "../../actions/auth";
import ClientDuty from "./ClientDuty";
import ProspectDuty from "./ProspectDuty";

const AssignDuty = ({
  getClients,
  getUsers,
  getProspects,
  client: { clients, prospects, loading },
  users,
}) => {
  useEffect(() => {
    getClients();
    getProspects();
    getUsers();
  }, [getClients, getProspects, getUsers]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <ClientDuty clients={clients} users={users} />
      <ProspectDuty prospects={prospects} users={users} />
    </Fragment>
  );
};

AssignDuty.propTypes = {
  getClients: PropTypes.func.isRequired,
  getProspects: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  client: state.client,
  users: state.auth.users,
});

export default connect(mapStateToProps, { getClients, getProspects, getUsers })(
  AssignDuty
);
