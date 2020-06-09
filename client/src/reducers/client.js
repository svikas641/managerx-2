import {
  GET_CLIENTS,
  CLIENTS_ERROR,
  GET_PROSPECTS,
  PROSPECTS_ERROR,
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
    default:
      return state;
  }
}
