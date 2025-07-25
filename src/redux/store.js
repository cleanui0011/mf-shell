import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider, useSelector, useDispatch } from "react-redux";

import MenuSlice from "./menuSlice";
import { updateSelectedMenu } from "./menuSlice";

export const rootReducer = {
  menuData: MenuSlice,
};

export const store = configureStore({
  reducer: rootReducer,
});

export function StoreProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}

export function useStore() {
  const menuData = useSelector((state) => state.menuData);
  const dispatch = useDispatch();
  return {
    menuData,
    setMenuSelected: (menuItem) => dispatch(updateSelectedMenu(menuItem)),
  };
}