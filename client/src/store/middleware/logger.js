const logger = (store) => (next) => (action) => {
  console.log({ store, next, action });
  next(action);
};

// parameterized middleware, say a middleware to behave differently when in dev & prod environments
const logger2 =
  (param) =>
  ({ getState, dispatch }) =>
  (next) =>
  (action) => {
    console.log({ destination: param });
    next(action);
  };

export default logger2;
