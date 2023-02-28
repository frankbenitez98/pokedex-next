import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "../slices/uiSlice";
import dataReducer from "../slices/dataSlice";

export function makeStore() {
  return configureStore({
    reducer: {
      ui: uiReducer,
      data: dataReducer,
    },
  });
}

export const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
