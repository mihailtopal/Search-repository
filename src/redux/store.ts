import { configureStore } from "@reduxjs/toolkit";
import { reposAPI } from "../api/api";
import authReducer from "./auth";

// Конфигурация Redux store
const store = configureStore({
  reducer: {
    // Редюсер для авторизации
    auth: authReducer,

    // Редюсер для API запросов (сгенерированным RTK Query)
    [reposAPI.reducerPath]: reposAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(reposAPI.middleware),
});
// Типизируем состояние и диспатч для TypeScript
export type RootState = ReturnType<typeof store.getState>; // Тип для состояния всего store
export type AppDispatch = typeof store.dispatch; // Тип для диспатча
export default store;
