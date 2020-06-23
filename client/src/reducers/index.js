import { combineReducers } from "redux";
import auth from "./auth";
import profile from "./profile";
import lead from "./lead";
import client from "./client";
import duty from "./duty";

export default combineReducers({
  auth,
  profile,
  lead,
  client,
  duty,
});
