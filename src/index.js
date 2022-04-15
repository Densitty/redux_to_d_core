import configureAppStore from "./store/configureStore";
import {
  bugAdded,
  bugRemoved,
  bugResolved,
  getUnresolvedBugs,
  getCachedUnresolvedBugs,
  assignBugToUser,
  getBugsByUser,
} from "./store/bugs";
import { addProject } from "./store/projects";
import { addUser, getCachedProjects, getUsers } from "./store/users";

// call the configureStore() and save it in a store variable
const store = configureAppStore();

// supposing we click on the "Add Bug" button on the UI, the corresponding action has to be dispatched (called)
// store.dispatch(bugAdded({ description: "Bug 1" }));

// function is dispatched when a call is made to an API
store.dispatch((dispatch, getState) => {
  // call an API
  // when the promise is resolved
  dispatch({ type: "bugsReceived", bugs: [1, 2, 3] });
  console.log(getState());
});

store.dispatch({
  type: "error",
  payload: { message: "An error has occurred" },
});
