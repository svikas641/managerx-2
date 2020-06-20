import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getClients } from "../../actions/client";
import Spinner from "../layout/Spinner";
import { getUsers } from "../../actions/auth";
import ClientDuty from "./ClientDuty";
import ProspectDuty from "./ProspectDuty";

const AssignDuty = ({
  getClients,
  getUsers,
  client: { clients, loading },
  users,
}) => {
  useEffect(() => {
    getClients();
    getUsers();
  }, [getClients, getUsers]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <ClientDuty clients={clients} users={users} />
      <ProspectDuty clients={clients} users={users} />
    </Fragment>
  );
};

AssignDuty.propTypes = {
  getClients: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  client: state.client,
  users: state.auth.users,
});

export default connect(mapStateToProps, { getClients, getUsers })(AssignDuty);
