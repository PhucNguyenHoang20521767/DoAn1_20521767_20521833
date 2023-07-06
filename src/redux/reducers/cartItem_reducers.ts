import { createReducer, createAction } from '@reduxjs/toolkit'
import { stat } from 'fs';

interface CartItem {
    _id: string;
    productId: string;
    productColorId: string;
    productQuantity: number;
    cartId: number;
    productPrice: number;
    productDiscount: number;
    productSalePrice: number;
}

interface ICartState {
    cartItems: CartItem[];
    isDeleted: boolean;
}

const initialState = { 
    cartItems: [],
    isDeleted: false,
} as ICartState;

// Actions
export const loadCartItems = createAction<ICartState>("LOADCARTITEM");
export const removeCartItems = createAction("REMOVECARTITEM");

// Reducer
const cartItemReducer = createReducer(
    initialState, 
    (builder) => {
    builder
    .addCase(loadCartItems, (state, action) => {
        state.cartItems = action.payload.cartItems;
        state.isDeleted = false;
    })
    .addCase(removeCartItems, (state) => {
        state.cartItems = [];
        state.isDeleted = true;
    });
});

export default cartItemReducer;