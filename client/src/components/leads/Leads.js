import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getLeads } from '../../actions/lead';
import Spinner from '../layout/Spinner';
import LeadItem from './LeadItem';


const Leads = ({ getLeads, lead: { leads, loading } }) => {
	useEffect(() => {
    getLeads();
  }, [getLeads]);


	return loading ? (<Spinner />) : (
		<Fragment>
      <h1 className="large text-primary">All Leads</h1>
      <Link to="/dashboard" className="btn btn-dark my-1">
        Back To Dashboard
      </Link>
      {' '}
      <div className="posts">
        {leads.map((lead) => (
          <LeadItem key={lead._id} lead={lead} />
          ))}
      </div>
    </Fragment>
	)
}

Leads.propTypes = {
	getLeads: PropTypes.func.isRequired,
    lead: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  lead: state.lead
});

export default connect(mapStateToProps, { getLeads })(Leads);