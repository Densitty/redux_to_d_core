import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

let lastId = 0;
const initialState = [];

// Redux toolkit has a function that combines actions and reducers - createSlice
const slice = createSlice({
  name: "bugs",
  initialState,
  reducers: {
    // actions => action handlers
    bugAdded: (state, action) => {
      state.push({
        id: ++lastId,
        description: action.payload.description,
        resolved: false,
      });
    },
    bugResolved: (bugs, action) => {
      const index = bugs.findIndex((bug) => bug.id === action.payload.id);
      bugs[index].resolved = true;
    },
    bugRemoved: (state, action) => {
      return state.filter((bug) => bug.id !== action.payload.id);
    },
  },
});

// console.log(slice);
export const { bugAdded, bugResolved, bugRemoved } = slice.actions;

// getUnresolvedBugs is a selector function
// Selector fxn => takes a state & returns computed state
export const getUnresolvedBugs = (state) => {
  return state.entities.bugs.filter((bug) => !bug.resolved);
};

export const getCachedUnresolvedBugs = createSelector(
  (state) => state.entities.bugs,
  (state) => state.entities.projects,
  (bugs, projects) => bugs.filter((bug) => !bug.resolved)
);

export default slice.reducer;
