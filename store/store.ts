import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "../slices/uiSlice";

export function makeStore() {
  return configureStore({
    reducer: {
      ui: uiReducer,
    },
  });
}

export const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
