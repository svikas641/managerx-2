import {
  GET_LEADS,
  LEAD_ERROR,
  ADD_LEAD,
  GET_LEAD,
  ADD_VISIT,
  REMOVE_VISIT
} from '../actions/types';

const initialState = {
  leads: [],
  lead: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_LEADS:
      return {
        ...state,
        leads: payload,
        loading: false
      };
    case GET_LEAD:
      return {
        ...state,
        lead: payload,
        loading: false
      };
    case ADD_LEAD:
      return {
        ...state,
        leads: [payload, ...state.leads],
        loading: false
      };
    case LEAD_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case ADD_VISIT:
      return {
        ...state,
        lead: { ...state.lead, visits: payload },
        loading: false
      };
    case REMOVE_VISIT:
      return {
        ...state,
        lead: {
          ...state.lead,
          visits: state.lead.visits.filter(
            visit => visit._id !== payload
          )
        },
        loading: false
      };
    default:
      return state;
}
}