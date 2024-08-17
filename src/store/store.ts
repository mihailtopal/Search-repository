import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { ITokenState } from "../types/types";

export const useAuthStore = create<ITokenState>()(
  devtools((set) => ({
    hasToken: false,
    setToken: () => set(() => ({ hasToken: true })),
    removeToken: () => set(() => ({ hasToken: false })),
  }))
);
