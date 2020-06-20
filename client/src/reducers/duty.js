import { ASSIGN_DUTY, ASSIGN_DUTY_ERROR } from "../actions/types";

const initialState = {
  duty: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ASSIGN_DUTY:
      return {
        ...state,
        duty: payload,
        loading: false,
      };
    case ASSIGN_DUTY_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
