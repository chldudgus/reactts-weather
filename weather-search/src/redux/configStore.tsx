import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import weather from "./modules/weather";
const store = configureStore({
  reducer: { weather },
});
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>(); // Export a hook that can be reused to resolve types

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelect: TypedUseSelectorHook<RootState> = useSelector;

export default store;