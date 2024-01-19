import { createReducer, createAction } from "@reduxjs/toolkit";
import { CartItem } from "@/pages/Order/cartOrder";
import { VoucherInter } from "@/pages/Order/cartOrder";

// {
//   "customerId": "string",
//   "orderCode": "string",
//   "orderStatus": "string",
//   "orderNote": "string",
//   "orderAddress": "string",
//   "paymentMethod": "string",
//   "orderShippingFee": 0,
//   "voucherId": "string"
// }

interface IOrderInforState {
  customerId?: string;
  orderCode?: string;
  orderStatus?: string;
  orderNote?: string;
  orderAddress?: IAddress;
  paymentMethod?: string;
  orderShippingFee?: number;
  createdAt?: string;
  updatedAt?: string;
  cartItems: CartItem[];
  totalPrice?: number;
  voucherId?: string;
  voucher?: VoucherInter | null;
}

interface IAddress {
  _id: string;
  customerId: string;
  receiverFirstName: string;
  receiverLastName: string;
  receiverPhone: string;
  receiverAddress: string;
  receiverWard: string;
  receiverDistrict: string;
  receiverCity: string;
  isDefault: boolean;
}

interface IAllOrderState {
  orderInfor: IOrderInforState;
}

const initialState = {
  orderInfor: {},
} as IAllOrderState;

// Actions
export const updateConfirmOrder = createAction<IAllOrderState>(
  "UPDATE_ORDER_CONFIRM"
);
export const removeConfirmOrder = createAction<IAllOrderState>(
  "REMOVE_ORDER_CONFIRM"
);

// Reducer
const orderConfirmReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(updateConfirmOrder, (state, action) => {
      state.orderInfor = action.payload.orderInfor;
    })
    .addCase(removeConfirmOrder, (state) => {
      state.orderInfor = {
        customerId: "",
        orderCode: "",
        orderStatus: "",
        orderNote: "",
        paymentMethod: "",
        orderShippingFee: 0,
        createdAt: "",
        updatedAt: "",
        cartItems: [],
      };
    });
});

export default orderConfirmReducer;
