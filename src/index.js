import store from "./store";
import { bugAdded, bugRemoved, bugResolved } from "./actionCreators";

// store.subscribe() is what gives update on the ui concerning what is happening; we need to store it so that if we navigate to another page, like if the remove bug is on another page, the "add bug" will be removed/not logged
const unsubscribe = store.subscribe(() => {
  console.log({
    status: "Store Changed",
    state: store.getState(),
  });
});
// supposing we click on the "Add Bug" button on the UI, the corresponding action has to be dispatched (called)
store.dispatch(bugAdded("Bug 1"));
store.dispatch(bugAdded("Bug 2"));

store.dispatch(bugResolved(1));
// to see what is inside our store
console.log(store.getState());
// liken the unsubscribe as "remove event handler"
unsubscribe();
// supposing the remove button is clicked on, then the corresponding action also need to be dispatched
store.dispatch(bugRemoved());
