import { createReducer, createAction } from '@reduxjs/toolkit'
import { stat } from 'fs';

interface IOrderState {
    _id: string;
    customerId: string;
    staffId: string | null;
    orderCode: string;
    orderStatus: string;
    orderNote: string;
    orderAddress: string;
    paymentMethod: string;
    orderShippingFee: number;
    createdAt: string;
    updatedAt: string;
    orderItems: OrderItem[];
}

interface OrderItem {
    _id: string;
    orderId: string;
    productId: string;
    productColorId: string;
    productQuantity: number;
    productPrice: number;
    productSalePrice: number;
    createdAt: string;
    updatedAt: string;
} 

interface IAllOrderState {
    order: IOrderState[];
}

const initialState = { 
    order: [],
} as IAllOrderState;

// Actions
export const updateOrder = createAction<IAllOrderState>("UPDATE_ORDER");
export const removeOrder = createAction<IAllOrderState>("REMOVE_ORDER");

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