import {
  ADD_ASSIGN_CLIENT,
  ASSIGN_CLIENT_ERROR,
  ADD_ASSIGN_PROSPECT,
  ASSIGN_PROSPECT_ERROR,
} from "../actions/types";

const initialState = {
  prospect: null,
  client: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_ASSIGN_CLIENT:
      return {
        ...state,
        client: payload,
        loading: false,
      };
    case ADD_ASSIGN_PROSPECT:
      return {
        ...state,
        prospect: payload,
        loading: false,
      };
    case ASSIGN_CLIENT_ERROR:
    case ASSIGN_PROSPECT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
