import { createSlice } from "@reduxjs/toolkit";

// Интерфейс для состояния аутентификации
export interface IAuth {
  hasToken: boolean; // Наличие токена
}

let initialState: IAuth = {
  hasToken: false, // Начальное состояние: токен отсутствует
};

const authSlice = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    setToken: (state) => {
      state.hasToken = true; // Установка флага наличия токена
    },
    removeToken: (state) => {
      state.hasToken = false; // Удаление токена
    },
  },
});
// Экспорт действий и редюсеров для использования в приложении
export const { setToken, removeToken } = authSlice.actions;
export default authSlice.reducer;
