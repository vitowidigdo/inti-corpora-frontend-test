import { configureStore } from "@reduxjs/toolkit";
import global from "./global";
// import storage from "redux-persist/lib/storage";
// import { combineReducers } from "redux";

export const store = configureStore({
  reducer: {
    global,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: { warnAfter: 128 },
      serializableCheck: { warnAfter: 128 },
    }),
});
