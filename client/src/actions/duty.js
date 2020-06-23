import axios from "axios";
import { toast } from "react-toastify";

import { ASSIGN_DUTY, ASSIGN_DUTY_ERROR, GET_LEADS, LEAD_ERROR } from "./types";

export const assignDuty = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("/api/duties/assignDuty", formData, config);
    dispatch({
      type: ASSIGN_DUTY,
      payload: res.data,
    });

    toast.info("Checking Duty Assignment");
    toast.success(`${res.data}`);

    history.push("/assignDuty");
  } catch (err) {
    dispatch({
      type: ASSIGN_DUTY_ERROR,
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
