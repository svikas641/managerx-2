import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import profile from "./profile";
import lead from "./lead";
import map from "./map";

export default combineReducers({
	alert,
	auth,
	profile,
	lead,
	map,
});
