import { configureStore } from "@reduxjs/toolkit";
import { reposAPI } from "../api/api";

const store = configureStore({
  reducer: {
    [reposAPI.reducerPath]: reposAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(reposAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
