import { createReducer, createAction } from '@reduxjs/toolkit'
import { stat } from 'fs';

interface IWishlistState {
    isChange: boolean;
}
const initialState = { 
    isChange: false,
} as IWishlistState;

// Actions
export const changeWishlist = createAction("CHANGEWISHLIST");

// Reducer
const wishlistReducer = createReducer(
    initialState, 
    (builder) => {
    builder
    .addCase(changeWishlist, (state) => {
        state.isChange = !state.isChange;
    });
});

export default wishlistReducer;