import { createAction } from "@reduxjs/toolkit";

/* An example of an action creator */
const action = createAction("bugUpdated");
/* will return below */
console.log(action()); /* {type: "bugUpdated", payload: undefined} */
// console.log(action({ id: 2 })); /* {type: "bugUpdated", payload: {id: 2}} */

// Action types
const BUG_ADDED = "BUG_ADDED";
const BUG_REMOVED = "BUG_REMOVED";
const BUG_RESOLVED = "BUG_RESOLVED";

// Action creators
export const bugAdded = createAction(BUG_ADDED);
export const bugRemoved = createAction(BUG_REMOVED);
export const bugResolved = createAction(BUG_RESOLVED);
console.log(bugAdded);

// Reducers
// export function bugAdded(description) {
//   return {
//     type: BUG_ADDED,
//     payload: {
//       description: description,
//     },
//   };
// }

// export function bugRemoved() {
//   return {
//     type: BUG_REMOVED,
//     payload: {
//       id: 1,
//     },
//   };
// }

// export function bugResolved(id) {
//   return {
//     type: BUG_RESOLVED,
//     payload: {
//       id,
//     },
//   };
// }

// Reducers
let lastId = 0;

function reducer(state = [], action) {
  switch (action.type) {
    case bugAdded.type:
      return [
        ...state, // 1st copy all d bugs in state []/[{...},{...}]
        {
          // add a new one
          id: ++lastId,
          description: action.payload.description,
          resolved: false,
        },
      ];

    case bugRemoved.type:
      // just remove d bug with d id present in payload
      return state.filter((bug) => bug.id !== action.payload.id);

    case bugResolved.type:
      const updatedState = state.map((bug) => {
        // console.log(bug); //{id: 1, description: "", resolved: false}
        if (bug.id !== action.payload.id) {
          return bug;
        }
        return { ...bug, resolved: true };
      });

      return updatedState;

    default:
      return state;
  }
}

export default reducer;
