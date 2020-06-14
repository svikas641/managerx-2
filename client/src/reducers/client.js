import {
  GET_CLIENTS,
  CLIENTS_ERROR,
  GET_PROSPECTS,
  PROSPECTS_ERROR,
  ADD_CLIENT,
  ADD_CLIENT_ERROR,
  ADD_PROSPECT,
  ADD_PROSPECT_ERROR,
} from "../actions/types";

const initialState = {
  clients: [],
  prospects: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CLIENTS:
      return {
        ...state,
        clients: payload,
        loading: false,
      };
    case GET_PROSPECTS:
      return {
        ...state,
        prospects: payload,
        loading: false,
      };
    case CLIENTS_ERROR:
    case PROSPECTS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case ADD_CLIENT:
      return {
        ...state,
        clients: [payload, ...state.clients],
        loading: false,
      };
    case ADD_PROSPECT:
      return {
        ...state,
        prospects: [payload, ...state.prospects],
        loading: false,
      };
    case ADD_PROSPECT_ERROR:
    case ADD_CLIENT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
