import configureAppStore from "./store/configureStore";
import { bugAdded, bugRemoved, bugResolved } from "./store/bugs";

// call the configureStore() and save it in a store variable
const store = configureAppStore();

// supposing we click on the "Add Bug" button on the UI, the corresponding action has to be dispatched (called)
store.dispatch(bugAdded({ description: "Bug 1" }));
store.dispatch(bugAdded({ description: "Bug 2" }));

store.dispatch(bugResolved({ id: 1 }));
// to see what is inside our store
console.log(store.getState());

store.dispatch(bugRemoved({ id: 1 }));
