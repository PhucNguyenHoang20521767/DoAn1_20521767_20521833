import { createReducer, createAction } from "@reduxjs/toolkit";

interface IAllProduct {
  allProduct: any[];
}
const initialState = {
  allProduct: [],
} as IAllProduct;

// Actions
export const getallproduct = createAction<IAllProduct>("GETALLPRODUCT");
export const removeallproduct = createAction("REMOVEALLPRODUCT");

// export const extraReducers = () => {
//   return async (dispatch: any) => {
//     const allProducts = await useGetAllProduct();
//     if (allProducts === undefined) {
//       return;
//     }
//     dispatch(getallproduct({ allProduct: allProducts }));
//   };
// };

// Reducer
const allProductReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getallproduct, (state, action) => {
      state.allProduct = action.payload.allProduct;
    })
    .addCase(removeallproduct, (state) => {
      state.allProduct = [];
    });
});

export default allProductReducer;
