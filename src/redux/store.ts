import { configureStore } from "@reduxjs/toolkit";
import { reposAPI } from "../api/api";
import authReducer from "./auth";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [reposAPI.reducerPath]: reposAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(reposAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
