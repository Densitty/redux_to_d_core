import { createSlice } from "@reduxjs/toolkit";

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
      const newState = state.filter((bug) => bug.id !== action.payload.id);
      // return { ...newState };
      state = { ...newState };
      return state;
    },
  },
});

console.log(slice);
export const { bugAdded, bugResolved, bugRemoved } = slice.actions;
export default slice.reducer;
