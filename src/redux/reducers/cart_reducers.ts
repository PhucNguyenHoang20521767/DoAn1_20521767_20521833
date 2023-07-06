import { createReducer, createAction } from '@reduxjs/toolkit'
import { stat } from 'fs';

interface ICartState {
    _id: string;
    customerId: string;
    cartStatus: string;
}

const initialState = { 
    _id: "",
    customerId: "",
    cartStatus: ""
} as ICartState;

// Actions
export const loadcart = createAction<ICartState>("LOADCART");

// Reducer
const cartReducer = createReducer(
    initialState, 
    (builder) => {
    builder
    .addCase(loadcart, (state, action) => {
        state._id = action.payload._id;
        state.customerId = action.payload.customerId;
        state.cartStatus = action.payload.cartStatus;
    })
});

export default cartReducer;