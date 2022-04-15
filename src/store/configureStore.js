import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import func from "./middleware/func";
import logger2 from "./middleware/logger";
import logger from "./middleware/logger";
import toast from "./middleware/toast";
/* separate reducers */
// import reducer from "./bugs";
// import reducer from "./projects";
/* ***************** */
// combined reducers which conbine reducers for both bugs and projects
import reducer from "./reducer";

export default function configureAppStore() {
  const store = configureStore({
    reducer,
    // func is our own written middleware function
    // middleware: [logger2("console"), func],
    // redux toolkit has function middlewares made available for us
    middleware: [...getDefaultMiddleware(), logger2("console"), toast],
  });
  return store;
}
