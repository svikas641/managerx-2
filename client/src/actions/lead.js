import axios from "axios";
import { toast } from "react-toastify";

import { GET_LEADS, LEAD_ERROR, ADD_LEAD, GET_LEAD, ADD_VISIT } from "./types";

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

    toast.success("Lead Created");
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
export const addVisit = (leadId, newData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post(
      `/api/lead/feedback/${leadId}`,
      newData,
      config
    );

    dispatch({
      type: ADD_VISIT,
      payload: res.data,
    });

    toast.success("Feedback Added");
  } catch (err) {
    dispatch({
      type: LEAD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
