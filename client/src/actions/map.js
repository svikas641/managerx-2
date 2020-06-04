import axios from "axios";

import { GET_MAP_DATA, MAP_DATA_ERROR } from "./types";

// Get Map Data
export const getMapData = (origin, destination) => async (dispatch) => {
	const mapData = {
		origin,
		destination,
	};
	try {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const res = await axios.post("/api/map/coordinates", mapData, config);

		dispatch({
			type: GET_MAP_DATA,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: MAP_DATA_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		});
	}
};
