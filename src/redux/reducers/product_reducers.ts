import { createReducer, createAction } from '@reduxjs/toolkit'
import { stat } from 'fs';

interface IProductState {
    currentProduct: any;
}
const initialState = { 
    currentProduct: null,
} as IProductState;

// Actions
export const moveToProduct = createAction<IProductState>("PRODUCT");
export const outProduct = createAction("NOTPRODUCT");
// Reducer
const productReducer = createReducer(
    initialState, 
    (builder) => {
    builder
    .addCase(moveToProduct, (state, action) => {
        state.currentProduct = action.payload;
    })
    .addCase(outProduct, (state) => {
        state.currentProduct = null;
    });
});

export default productReducer;