import { createAction, createReducer } from "@reduxjs/toolkit";

const action = createAction("bugUpdated");
console.log(action());
// Action types
const BUG_ADDED = "BUG_ADDED";
const BUG_REMOVED = "BUG_REMOVED";
const BUG_RESOLVED = "BUG_RESOLVED";

// Action creators
export const bugAdded = createAction(BUG_ADDED);
export const bugRemoved = createAction(BUG_REMOVED);
export const bugResolved = createAction(BUG_RESOLVED);
console.log(bugAdded());

// Reducers
let lastId = 0;
const initialState = [];

export default createReducer(initialState, {
  // key: value
  // actions: function(evt => evt handler)
  BUG_ADDED: (state, action) => {
    state.push({
      id: ++lastId,
      description: action.payload.description,
      resolved: false,
    });
  },
  BUG_RESOLVED: (bugs, action) => {
    const index = bugs.findIndex((bug) => bug.id === action.payload.id);
    bugs[index].resolved = true;
  },
  [bugRemoved.type]: (state, action) => {
    const newState = state.filter((bug) => bug.id !== action.payload.id);
    // return { ...newState };
    state = { ...newState };
    return state;
  },
});
