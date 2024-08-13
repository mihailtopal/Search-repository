import {
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from "react-redux";
import type { RootState, AppDispatch } from "./store";
// Обертка для useDispatch с типизацией для Dispatch из Redux store
export const useDispatch = () => useReduxDispatch<AppDispatch>();

// Обертка для useSelector с типизацией для состояния из Redux store
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
