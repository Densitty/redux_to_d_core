import { configureStore } from "@reduxjs/toolkit";
/* separate reducers */
// import reducer from "./bugs";
// import reducer from "./projects";
/* ***************** */
// combined reducers which conbine reducers for both bugs and projects
import reducer from "./reducer";

export default function configureAppStore() {
  const store = configureStore({
    reducer,
  });
  return store;
}
