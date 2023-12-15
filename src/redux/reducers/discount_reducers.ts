import { createReducer, createAction } from "@reduxjs/toolkit";
import { IDiscount } from "@/pages/Home/CampaignCarousel";

interface IDiscountState {
  currentDiscount: IDiscount[];
}

const initialState = {
  currentDiscount: [],
} as IDiscountState;

// Actions
export const addDiscount = createAction<IDiscountState>("DISCOUNT");
export const removeDiscount = createAction("REMOVE_DISCOUNT");

// Reducer
const discountReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addDiscount, (state, action) => {
      state.currentDiscount = action.payload.currentDiscount;
    })
    .addCase(removeDiscount, (state) => {
      state.currentDiscount = [];
    });
});

export default discountReducer;
