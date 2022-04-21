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
    assignBugToUser: (state, action) => {
      // since we want to give a user a bug to handle, we need to get the id of both user and bug, and these 2 should be in the action payload
      const { bugId, userId } = action.payload;
      // find the index of the bug first
      const bugIndex = state.findIndex((bug) => bug.id === bugId);
      state[bugIndex].userId = userId;
    },
  },
});

// console.log(slice);
export const { bugAdded, bugResolved, bugRemoved, assignBugToUser } =
  slice.actions;

// getUnresolvedBugs is a selector function
// Selector fxn => takes a state & returns computed state
export const getUnresolvedBugs = (state) => {
  return state.entities.bugs.filter((bug) => !bug.resolved);
};

export const getCachedUnresolvedBugs = createSelector(
  (state) => state.entities.bugs,
  (state) => {
    return state.entities.projects;
  },
  (bugs, projects) => bugs.filter((bug) => !bug.resolved)
);

// to create a selector for getting bugs by a user
export const getBugsByUser = (userId) =>
  createSelector(
    (state) => state.entities.bugs,
    (bugs) => bugs.filter((bug) => bug.userId === userId)
  );

export default slice.reducer;
