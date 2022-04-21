import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import logger2 from "./middleware/logger";
import toast from "./middleware/toast";
import api from "./middleware/api";
/* separate reducers */
/* ***************** */
// combined reducers which conbine reducers for both bugs and projects
import reducer from "./reducer";

export default function configureAppStore() {
  const store = configureStore({
    reducer,
    // func is our own written middleware function
    middleware: [...getDefaultMiddleware(), logger2("console"), toast, api],
  });
  return store;
}
