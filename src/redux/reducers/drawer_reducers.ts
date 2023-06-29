import { createReducer, createAction } from '@reduxjs/toolkit'
import { stat } from 'fs';

// State
interface IDrawerState {
    isDrawerOpen: boolean;
    pageDrawer: boolean;
    widthDrawer: number;
}
const initialState = { 
    isDrawerOpen: false,
    pageDrawer: false,
    widthDrawer: 250,
} as IDrawerState;

// Actions
export const openCart = createAction("CART");
export const openFavourite = createAction("FAVOURITE");
export const closeDrawer = createAction("CLOSEDRAWER");
// Reducer
const drawerReducer = createReducer(
    initialState, 
    (builder) => {
    builder
    .addCase(openCart, (state) => {
        state.isDrawerOpen = true;
        state.pageDrawer = true;
        state.widthDrawer = 380;
    })
    .addCase(openFavourite, (state) => {
        state.isDrawerOpen = true;
        state.pageDrawer = false;
        state.widthDrawer = 380;
    })
    .addCase(closeDrawer, (state) => {
        state.isDrawerOpen = false;
        state.pageDrawer = false;
        state.widthDrawer = 0;
    });
});

export default drawerReducer;