import {
  GET_CLIENTS,
  CLIENTS_ERROR,
  ADD_CLIENT,
  ADD_CLIENT_ERROR,
} from "../actions/types";

const initialState = {
  clients: [],
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
    case CLIENTS_ERROR:
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
