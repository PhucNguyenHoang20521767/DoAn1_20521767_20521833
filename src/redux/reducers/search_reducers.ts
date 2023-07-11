import { createReducer, createAction } from '@reduxjs/toolkit'
import { stat } from 'fs';

interface ISearchState {
    value: string;
}
const initialState = { 
    value: "",
} as ISearchState;

// Actions
export const setSearch = createAction<ISearchState>("SETSEARCH");
export const removeSearch = createAction("REMOVESEARCH");

// Reducer
const searchReducer = createReducer(
    initialState, 
    (builder) => {
    builder
    .addCase(setSearch, (state, action) => {
        state.value = action.payload.value;
    })
    .addCase(removeSearch, (state) => {
        state.value = "";
    });
});

export default searchReducer;