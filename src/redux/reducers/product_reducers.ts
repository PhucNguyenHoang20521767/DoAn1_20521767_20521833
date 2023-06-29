import { createReducer, createAction } from '@reduxjs/toolkit'
import { stat } from 'fs';

interface IProductState {
    currentProduct: string;
}
const initialState = { 
    currentProduct: "",
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
        state.currentProduct = action.payload.currentProduct;
    })
    .addCase(outProduct, (state) => {
        state.currentProduct = "";
    });
});

export default productReducer;