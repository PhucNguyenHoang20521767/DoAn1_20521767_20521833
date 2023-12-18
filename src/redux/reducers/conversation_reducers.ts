import { createReducer, createAction } from "@reduxjs/toolkit";

export interface IConversationState {
  _id: string;
  customerId: string;
}

const initialState = {
  _id: "",
  customerId: "",
} as IConversationState;

// Actions
export const loadConversation =
  createAction<IConversationState>("LOADCONVERSATION");

// Reducer
const conversationReducer = createReducer(initialState, (builder) => {
  builder.addCase(loadConversation, (state, action) => {
    state._id = action.payload._id;
    state.customerId = action.payload.customerId;
  });
});

export default conversationReducer;
