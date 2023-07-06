import { createReducer, createAction } from '@reduxjs/toolkit'
import { stat } from 'fs';

// State
interface IGoogleState {
    customer: any
}
const initialState = { 
    customer: null,
} as IGoogleState;

// Actions
export const glogin = createAction<IGoogleState>("LOGIN");
export const glogout = createAction("LOGOUT");

// Reducer
const googleReducer = createReducer(
    initialState, 
    (builder) => {
    builder
    .addCase(glogin, (state, action) => {
        state.customer = action.payload;
    })
    .addCase(glogout, (state) => {
        state.customer = null;
    })
});

export default googleReducer;