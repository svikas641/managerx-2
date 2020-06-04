import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';

const VisitItem = ({
  leadId,
  visit: { _id, status, commentBox, clientName, clientEmail, clientPhoneNumber, date },
  auth
}) => (
    <div>
      <div className='visit bg-white p-1 my-1'>
      <div>
      <ul className="list-group list-group-flush">
          <li> Status : {status}</li>
          <li> Comment : {commentBox}</li>
          <li>Client Name : {clientName}</li>
          <li>Client Email :  {clientEmail}</li>
          <li>Client Phone Number : {clientPhoneNumber}</li>
          <li>
        Visited on <Moment format='DD/MM/YYYY'>{date}</Moment>
      </li>
    </ul>
      </div>
  </div>
  </div>
);

VisitItem.propTypes = {
  leadId: PropTypes.string.isRequired,
  visit: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps 
)(VisitItem);