import configureAppStore from "./store/configureStore";
import {
  bugAdded,
  bugRemoved,
  bugResolved,
  getUnresolvedBugs,
  getCachedUnresolvedBugs,
} from "./store/bugs";
import { addProject } from "./store/projects";

// call the configureStore() and save it in a store variable
const store = configureAppStore();

// supposing we click on the "Add Bug" button on the UI, the corresponding action has to be dispatched (called)
store.dispatch(bugAdded({ description: "Bug 1" }));
store.dispatch(bugAdded({ description: "Bug 2" }));

store.dispatch(bugResolved({ id: 1 }));
// to see what is inside our store
console.log(store.getState().entities);

store.dispatch(bugRemoved({ id: 1 }));

// console.log(projectsStore.getState());
store.dispatch(addProject({ name: "Create a Blog on Romance Novels" }));

// to compute derived data from redux store; e.g get the number of unresolved bugs
const unresolvedBugs1 = getUnresolvedBugs(store.getState());
const unresolvedBugs2 = getUnresolvedBugs(store.getState());
console.log("Uncached computed data from state");
console.log(unresolvedBugs1 === unresolvedBugs2); // false

// memoized/cached computed state
console.log("Cached computed data from state");
const cachedUnresolvedBugs1 = getCachedUnresolvedBugs(store.getState());
const cachedUnresolvedBugs2 = getCachedUnresolvedBugs(store.getState());
console.log(cachedUnresolvedBugs1 === cachedUnresolvedBugs2);
