import axios from "axios";
import {
	GET_CLIENTS,
	CLIENTS_ERROR,
	GET_PROSPECTS,
	PROSPECTS_ERROR,
	ADD_DUTY,
	DUTY_ERROR,
} from "./types";

import { setAlert } from "./alert";

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

		const res = await axios.post(
			"/api/duties/assignDuty",
			formData,
			config
		);
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
