import { createReducer, createAction } from '@reduxjs/toolkit'
import { stat } from 'fs';

// State
interface IAuthState {
    currentUser: string;
    id: string;
    customerIdToken: string;
    isLogin: boolean;
}
const initialState = { 
    currentUser: "",
    id: "",
    customerIdToken: "",
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
        state.customerIdToken = action.payload.customerIdToken;
        state.isLogin = true;
    })
    .addCase(logout, (state) => {
        state.currentUser = "";
        state.id = "";
        state.customerIdToken = "";
        state.isLogin = false;
    });
});

export default authReducer;