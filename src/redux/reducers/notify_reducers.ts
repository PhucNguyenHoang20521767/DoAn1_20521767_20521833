import { createReducer, createAction } from "@reduxjs/toolkit";
import { stat } from "fs";

interface INotifyState {
  isSuccess: boolean;
  isError: boolean;
  isInfo: boolean;
  message: string;
}

const initialState = {
  isSuccess: false,
  isError: false,
  isInfo: false,
  message: "",
} as INotifyState;

// Actions
export const notify = createAction<INotifyState>("NOTIFY");
export const notifySuccess = createAction<string>("NOTIFY_SUCCESS");
export const notifyError = createAction<string>("NOTIFY_ERROR");
export const notifyInfo = createAction<string>("NOTIFY_INFO");
export const clear = createAction("CLEAR");

// Reducer
const notifyReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(notify, (state, action) => {
      state.isSuccess = action.payload.isSuccess;
      state.isError = action.payload.isError;
      state.isInfo = action.payload.isInfo;
      state.message = action.payload.message;
    })
    .addCase(notifySuccess, (state, action) => {
      state.isSuccess = true;
      state.isError = false;
      state.isInfo = false;
      state.message = action.payload;
    })
    .addCase(notifyError, (state, action) => {
      state.isSuccess = false;
      state.isError = true;
      state.isInfo = false;
      state.message = action.payload;
    })
    .addCase(notifyInfo, (state, action) => {
      state.isSuccess = false;
      state.isError = false;
      state.isInfo = true;
      state.message = action.payload;
    })
    .addCase(clear, (state) => {
      state.isSuccess = false;
      state.isError = false;
      state.isInfo = false;
      state.message = "";
    });
});

export default notifyReducer;
