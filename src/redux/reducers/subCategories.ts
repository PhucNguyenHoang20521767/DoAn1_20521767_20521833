import { createReducer, createAction } from '@reduxjs/toolkit'
import { stat } from 'fs';

interface SubCategory {
    id: string;
    name: string;
    slug: string;
}

interface ISubCategoryState {
    currentPage: any,
}
const initialState = { 
    currentPage: null,
} as ISubCategoryState;

// Actions
export const redirectSub = createAction<ISubCategoryState>("REDIRECTSUBCATEGORY");
export const removeSub = createAction("REMOVESUBCATEGORY");

// Reducer
const subCategoryReducer = createReducer(
    initialState, 
    (builder) => {
    builder
    .addCase(redirectSub, (state, action) => {
        state.currentPage = action.payload;
    })
    .addCase(removeSub, (state) => {
        state.currentPage = null;
    });
});

export default subCategoryReducer;