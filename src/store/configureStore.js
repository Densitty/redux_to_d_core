import { configureStore } from "@reduxjs/toolkit";
import reducer from "./bugs";

export default function configureAppStore() {
  const store = configureStore({
    reducer,
  });
  return store;
}
