import axios from "axios";
import { setAlert } from "./alert";

import {
  GET_LEADS,
  LEAD_ERROR,
  ADD_LEAD,
  GET_LEAD,
  ADD_VISIT,
  REMOVE_VISIT,
} from "./types";

// Get Leads
export const getLeads = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/lead");

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

// Get Pending Leads
export const getPendingLeads = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/lead/pending");

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

// Create a Lead
export const createLead = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("/api/lead", formData, config);
    dispatch({
      type: ADD_LEAD,
      payload: res.data,
    });

    dispatch(setAlert("Lead Created", "success"));
    history.push("/create-lead");
  } catch (err) {
    dispatch({
      type: LEAD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get single lead
export const getLead = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/lead/${id}`);

    dispatch({
      type: GET_LEAD,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: LEAD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add visit
export const addVisit = (leadId, formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post(
      `/api/lead/feedback/${leadId}`,
      formData,
      config
    );

    dispatch({
      type: ADD_VISIT,
      payload: res.data,
    });

    dispatch(setAlert("Feedback Added", "success"));
  } catch (err) {
    dispatch({
      type: LEAD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// remove feedback
export const deleteVisit = (leadId, visitId) => async (dispatch) => {
  try {
    const res = await axios.delete(`api/lead/feedback/${leadId}/${visitId}`);
    dispatch({
      type: REMOVE_VISIT,
      payload: visitId,
    });

    dispatch(setAlert("Feedback Removed", "success"));
  } catch (err) {
    dispatch({
      type: LEAD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
