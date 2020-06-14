import axios from "axios";
import { setAlert } from "./alert";

import {
  ADD_ASSIGN_CLIENT,
  ASSIGN_CLIENT_ERROR,
  ADD_ASSIGN_PROSPECT,
  ASSIGN_PROSPECT_ERROR,
  GET_LEADS,
  LEAD_ERROR,
} from "./types";

export const assignClient = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("/api/duties/assignDuty", formData, config);
    dispatch({
      type: ADD_ASSIGN_CLIENT,
      payload: res.data,
    });

    dispatch(setAlert("Client Duty Assigned", "success"));
    history.push("/assignDuty");
  } catch (err) {
    dispatch({
      type: ASSIGN_CLIENT_ERROR,
      payload: {
        msg: err.response,
        status: err.response,
      },
    });
  }
};

export const populateLeadData = () => async (dispatch) => {
  try {
    const res = await axios.get("api/lead/populateData");

    dispatch({
      type: GET_LEADS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: LEAD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const assignProspect = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("/api/duties/assignDuty", formData, config);
    dispatch({
      type: ADD_ASSIGN_PROSPECT,
      payload: res.data,
    });

    dispatch(setAlert("Prospect Duty Assigned", "success"));
    history.push("/assignDuty");
  } catch (err) {
    dispatch({
      type: ASSIGN_PROSPECT_ERROR,
      payload: {
        msg: err.response,
        status: err.response,
      },
    });
  }
};
