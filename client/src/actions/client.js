import axios from "axios";
import {
  GET_CLIENTS,
  CLIENTS_ERROR,
  ADD_DUTY,
  DUTY_ERROR,
  ADD_CLIENT,
  ADD_CLIENT_ERROR,
} from "./types";

import { toast } from "react-toastify";

// Add new CLient
export const createClient = (data, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("/api/client/addClient", data, config);
    dispatch({
      type: ADD_CLIENT,
      payload: res.data,
    });

    toast.success("Client Created");

    history.push("/addClients");
  } catch (err) {
    dispatch({
      type: ADD_CLIENT_ERROR,
      payload: { msg: err.response, status: err.response },
    });
  }
};

// Get All Clients
export const getClients = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/client");

    dispatch({
      type: GET_CLIENTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CLIENTS_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

export const createDuty = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("/api/duties/assignDuty", formData, config);
    dispatch({
      type: ADD_DUTY,
      payload: res.data,
    });

    toast.success("Duty Assigned");
    history.push("/assignDuties");
  } catch (err) {
    dispatch({
      type: DUTY_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
