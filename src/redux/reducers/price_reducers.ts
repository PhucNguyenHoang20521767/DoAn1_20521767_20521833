import { createReducer, createAction } from '@reduxjs/toolkit'
import { stat } from 'fs';

interface IPriceState {
    currentPage: any,
}
const initialState = { 
    currentPage: null,
} as IPriceState;

// Actions
export const caculater = createAction<IPriceState>("CACULATER");
export const removeCaculater = createAction("REMOVECACULATER");

// Reducer
const priceReducer = createReducer(
    initialState, 
    (builder) => {
    builder
    .addCase(caculater, (state, action) => {
        state.currentPage = action.payload;
    })
    .addCase(removeCaculater, (state) => {
        state.currentPage = null;
    });
});

export default priceReducer;