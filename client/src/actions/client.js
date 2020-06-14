import axios from "axios";
import {
  GET_CLIENTS,
  CLIENTS_ERROR,
  GET_PROSPECTS,
  PROSPECTS_ERROR,
  ADD_DUTY,
  DUTY_ERROR,
  ADD_CLIENT,
  ADD_CLIENT_ERROR,
  ADD_PROSPECT,
  ADD_PROSPECT_ERROR,
} from "./types";

import { setAlert } from "./alert";

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

    dispatch(setAlert("Client Created", "success"));
    history.push("/addClients");
  } catch (err) {
    dispatch({
      type: ADD_CLIENT_ERROR,
      payload: { msg: err.response, status: err.response },
    });
  }
};

// Add new Prospect
export const createProspect = (data, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("/api/client/addProspect", data, config);
    dispatch({
      type: ADD_PROSPECT,
      payload: res.data,
    });

    dispatch(setAlert("Prospect Created", "success"));
    history.push("/addProspects");
  } catch (err) {
    dispatch({
      type: ADD_PROSPECT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
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

// Get All Prospects
export const getProspects = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/client/getProspect");

    dispatch({
      type: GET_PROSPECTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROSPECTS_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

//
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

    dispatch(setAlert("Duty Assigned", "success"));
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
