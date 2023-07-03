import { createReducer, createAction } from '@reduxjs/toolkit'
import { stat } from 'fs';

// State
// interface Product {
//     id: string;
//     discount_id: string;
//     category_id: string;
//     category_slug: string;
//     name: string;
//     description: string;
//     price: number;
//     images: string[];
//     create_at: string | number | Date;
//     update_at: string | number | Date;
//     sold: number;
// }
interface IAllProduct {
    allProduct: any[];
}
const initialState = { 
    allProduct: [],
} as IAllProduct;

// Actions
export const getallproduct = createAction<IAllProduct>("GETALLPRODUCT");
export const removeallproduct = createAction("REMOVEALLPRODUCT");

// Reducer
const allProductReducer = createReducer(
    initialState, 
    (builder) => {
    builder
    .addCase(getallproduct, (state, action) => {
        state.allProduct = action.payload.allProduct;
    })
    .addCase(removeallproduct, (state) => {
        state.allProduct = [];
    });
});

export default allProductReducer;