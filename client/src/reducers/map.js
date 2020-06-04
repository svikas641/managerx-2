import { GET_MAP_DATA, MAP_DATA_ERROR } from "../actions/types";

const initialState = {
	mapData: [],
	loading: true,
	error: {},
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_MAP_DATA:
			return {
				...state,
				mapData: payload,
				loading: false,
			};
		case MAP_DATA_ERROR:
			return {
				...state,
				error: payload,
				loading: false,
			};
		default:
			return state;
	}
}
