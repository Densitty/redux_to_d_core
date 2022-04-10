import * as actions from "./actionTypes";

// initialize an id
let lastId = 0;

function reducer(state = [], action) {
  switch (action.type) {
    case actions.BUG_ADDED:
      return [
        ...state, // 1st copy all d bugs in state []/[{...},{...}]
        {
          // add a new one
          id: ++lastId,
          description: action.payload.description,
          resolved: false,
        },
      ];

    case actions.BUG_REMOVED:
      // just remove d bug with d id present in payload
      return state.filter((bug) => bug.id !== action.payload.id);

    case actions.BUG_RESOLVED:
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
