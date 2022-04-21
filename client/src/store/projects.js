import { createSlice } from "@reduxjs/toolkit";

let lastId = 0;
const initialState = [];

const slice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    addProject: (state, action) => {
      state.push({
        id: ++lastId,
        name: action.payload.name,
      });
    },
  },
});

console.log(slice);
export const { addProject } = slice.actions;
export default slice.reducer;
