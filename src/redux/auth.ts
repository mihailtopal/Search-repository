import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IProfile {
  hasToken: boolean;
}

let initialState: IProfile = {
  hasToken: false,
};

const authSlice = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    setToken: (state) => {
      state.hasToken = true;
    },
    removeToken: (state) => {
      state.hasToken = false;
    },
  },
});
export const { setToken, removeToken } = authSlice.actions;
export default authSlice.reducer;
