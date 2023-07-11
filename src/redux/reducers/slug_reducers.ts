import { createReducer, createAction } from '@reduxjs/toolkit'
import { stat } from 'fs';

interface ISlugState {
    slugId: string;
    slugCategoryName: string;
    slugCategorySlug: string;
}
const initialState = { 
    slugId: "",
    slugCategoryName: "Tất cả sản phẩm",
    slugCategorySlug: "Tất cả sản phẩm",
} as ISlugState;

// Actions
export const product = createAction<ISlugState>("PRODUCT");
export const notProduct = createAction("NOTPRODUCT");

// Reducer
const authReducer = createReducer(
    initialState, 
    (builder) => {
    builder
    .addCase(product, (state, action) => {
        state.slugId = action.payload.slugId;
        state.slugCategoryName = action.payload.slugCategoryName;
        state.slugCategorySlug = action.payload.slugCategorySlug;
    })
    .addCase(notProduct, (state) => {
        state.slugId = "";
        state.slugCategoryName = "Tất cả sản phẩm";
        state.slugCategorySlug = "Tất cả sản phẩm";
    });
});

export default authReducer;