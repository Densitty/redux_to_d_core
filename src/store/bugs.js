// Action types
const BUG_ADDED = "BUG_ADDED";
const BUG_REMOVED = "BUG_REMOVED";
const BUG_RESOLVED = "BUG_RESOLVED";

// Action creators
export function bugAdded(description) {
  return {
    type: BUG_ADDED,
    payload: {
      description: description,
    },
  };
}

export function bugRemoved() {
  return {
    type: BUG_REMOVED,
    payload: {
      id: 1,
    },
  };
}

export function bugResolved(id) {
  return {
    type: BUG_RESOLVED,
    payload: {
      id,
    },
  };
}

// Reducers
let lastId = 0;

function reducer(state = [], action) {
  switch (action.type) {
    case BUG_ADDED:
      return [
        ...state, // 1st copy all d bugs in state []/[{...},{...}]
        {
          // add a new one
          id: ++lastId,
          description: action.payload.description,
          resolved: false,
        },
      ];

    case BUG_REMOVED:
      // just remove d bug with d id present in payload
      return state.filter((bug) => bug.id !== action.payload.id);

    case BUG_RESOLVED:
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
