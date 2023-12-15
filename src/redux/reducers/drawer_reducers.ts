import { createReducer, createAction } from "@reduxjs/toolkit";
import { stat } from "fs";

// State
interface IDrawerState {
  isDrawerOpen: boolean;
  pageDrawer: string;
  widthDrawer: number;
}
const initialState = {
  isDrawerOpen: false,
  pageDrawer: "",
  widthDrawer: 250,
} as IDrawerState;

// Actions
export const openCart = createAction("CART");
export const openFavourite = createAction("FAVOURITE");
export const openChat = createAction("CHAT");
export const closeDrawer = createAction("CLOSEDRAWER");
// Reducer
const drawerReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(openCart, (state) => {
      state.isDrawerOpen = true;
      state.pageDrawer = "cart";
      state.widthDrawer = 380;
    })
    .addCase(openFavourite, (state) => {
      state.isDrawerOpen = true;
      state.pageDrawer = "favourite";
      state.widthDrawer = 380;
    })
    .addCase(openChat, (state) => {
      state.isDrawerOpen = true;
      state.pageDrawer = "chat";
      state.widthDrawer = 380;
    })
    .addCase(closeDrawer, (state) => {
      state.isDrawerOpen = false;
      state.pageDrawer = "";
      state.widthDrawer = 0;
    });
});

export default drawerReducer;
