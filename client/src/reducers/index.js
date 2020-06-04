import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import profile from "./profile";
import lead from "./lead";

export default combineReducers({
	alert,
	auth,
	profile,
	lead,
});
