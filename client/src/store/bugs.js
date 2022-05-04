import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";
import moment from "moment";

const initialState = {
  bugsList: [],
  loading: false,
  lastFetch: null,
};

// Redux toolkit has a function that combines actions and reducers - createSlice
const slice = createSlice({
  name: "bugs",
  initialState,
  reducers: {
    // actions => action handlers
    bugsRequested: (state, action) => {
      state.loading = true;
    },
    bugsRequestedFailed: (state, action) => {
      state.loading = false;
    },
    bugsReceived: (state, action) => {
      /* to get the properties in state (for debugging purpose); 
        JSON.parse(JSON.stringify(state)); 
      */
      state.bugsList = action.payload;
      state.loading = false;
      state.lastFetch = new Date().getTime();
    },
    bugAdded: (state, action) => {
      state.bugsList.push(action.payload);
    },
    bugResolved: (bugs, action) => {
      const index = bugs.bugsList.findIndex(
        (bug) => bug.id === action.payload.id
      );
      bugs.bugsList[index].resolved = true;
    },
    bugRemoved: (state, action) => {
      return state.bugsList.filter((bug) => bug.id !== action.payload.id);
    },
    bugAssignedToUser: (state, action) => {
      // since we want to give a user a bug to handle, we need to get the id of both user and bug, and these 2 should be in the action payload
      const { id: bugId, userId } = action.payload;
      /* when we get the bug from server, the id of a bug is denoted by the 'id' property but we are passing bugId from the payload, hence the need to change/rename id to bugId used in line 47 */
      // find the index of the bug first
      const bugIndex = state.bugsList.findIndex((bug) => bug.id === bugId);
      state.bugsList[bugIndex].userId = userId;
    },
  },
});

// console.log(slice);
const {
  bugAdded,
  bugResolved,
  bugRemoved,
  bugAssignedToUser,
  bugsReceived,
  bugsRequested,
  bugsRequestedFailed,
} = slice.actions;

const url = "/bugs";
// Action Creators
// export const loadBugs = () =>
//   apiCallBegan({
//     url,
//     onStart: bugsRequested.type,
//     onSuccess: bugsReceived.type,
//     onError: bugsRequestedFailed.type,
//   });

// caching data; delay request time to an endpoint if last call is not above 10 mins (for instance)
export const loadBugs = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.bugs;

  // get the time difference in minutes
  const diffInMins = moment().diff(moment(lastFetch), "minutes");

  if (diffInMins < 10) {
    return;
  }

  dispatch(
    apiCallBegan({
      url,
      onStart: bugsRequested.type,
      onSuccess: bugsReceived.type,
      onError: bugsRequestedFailed.type,
    })
  );
};

export const addBug = (bug) =>
  apiCallBegan({
    url,
    method: "post",
    data: bug,
    onSuccess: bugAdded.type,
  });

// action creator to resolve a bug
export const resolveBug = (id) =>
  apiCallBegan({
    url: url + "/" + id,
    method: "patch",
    data: { resolved: true },
    onSuccess: bugResolved.type,
  });

// action creator for assigning a bug to a user
export const assignBugToUser = (bugId, userId) =>
  apiCallBegan({
    url: url + "/" + bugId,
    method: "patch",
    data: { userId },
    onSuccess: bugAssignedToUser.type,
  });

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
