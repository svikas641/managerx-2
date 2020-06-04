import React, {Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DashboardActions from './DashboardActions';
import { getCurrentProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';

const Dashboard = ({
  getCurrentProfile,
  auth: { user, loading },
  profile: { profile }
}) => {
	useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

	return loading || user === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome {user && user.name}
      </p>
        <Fragment>
          <DashboardActions />
        </Fragment>
      </Fragment>
  );
};

Dashboard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired

};

const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile
});

export default connect(
	mapStateToProps, { getCurrentProfile }
	)(Dashboard);