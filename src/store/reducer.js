import { combineReducers } from "redux";
// import the separate reducers
import bugsReducer from "./bugs";
import projectsReducer from "./projects";

// combine these reducers into one
export default combineReducers({
  bugs: bugsReducer,
  projects: projectsReducer,
});
