import { createReducer, createAction } from '@reduxjs/toolkit'
import { stat } from 'fs';

// interface IOrderItemState {
//     _id: string;
//     customerId: string;
//     staffId: string | null;
//     orderCode: string;
//     orderStatus: string;
//     orderNote: string;
//     orderAddress: string;
//     paymentMethod: string;
//     orderShippingFee: number;
//     createdAt: string;
//     updatedAt: string;
//     productId: string;
//     productColorId: string;
//     productQuantity: number;
//     productPrice: number;
// }

interface IOrderState {
    order: any[];
}

const initialState = { 
    order: [],
} as IOrderState;

// Actions
export const updateOrder = createAction<IOrderState>("UPDATE_ORDER");
export const removeOrder = createAction<IOrderState>("REMOVE_ORDER");

// Reducer
const orderReducer = createReducer(
    initialState, 
    (builder) => {
    builder
    .addCase(updateOrder, (state, action) => {
        state.order = action.payload.order;
    })
    .addCase(removeOrder, (state) => {
        state.order = [];
    })
});

export default orderReducer;