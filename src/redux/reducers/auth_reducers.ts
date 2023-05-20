import { createReducer, createAction } from '@reduxjs/toolkit'
import { stat } from 'fs';

// State
interface IAuthState {
    currentUser: string;
    id: string;
    isLogin: boolean;
}
const initialState = { 
    currentUser: "",
    id: "",
    isLogin: false,
} as IAuthState;

// Actions
export const login = createAction<IAuthState>("LOGIN");
export const logout = createAction("LOGOUT");

// Reducer
const authReducer = createReducer(
    initialState, 
    (builder) => {
    builder
    .addCase(login, (state, action) => {
        state.currentUser = action.payload.currentUser;
        state.id = action.payload.id;
        const user = action.payload.currentUser;
        console.log('user', user)
        state.isLogin = true;
    })
    .addCase(logout, (state) => {
        state.currentUser = "";
        state.id = "";
        state.isLogin = false;
    });
});

export default authReducer;