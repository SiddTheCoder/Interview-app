import { configureStore } from "@reduxjs/toolkit";
import localStateReducer from "./features/localState/localStateSlice";

export const store = configureStore({
  reducer: {
    localState: localStateReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

// Types for use in hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
