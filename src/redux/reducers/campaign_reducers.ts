import { createReducer, createAction } from "@reduxjs/toolkit";
import { stat } from "fs";

// State
interface ICampaignState {
  campaignName: string;
  campaignStartDate: string;
  campaignEndDate: string;
}
const initialState = {
  campaignName: "",
  campaignStartDate: "",
  campaignEndDate: "",
} as ICampaignState;

// Actions
export const openCampaign = createAction<ICampaignState>("OPEN_CAMPAIGN");
export const closeCampaign = createAction("CLOSE_CAMPAIGN");
// Reducer
const CampaignReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(openCampaign, (state, action) => {
      state.campaignName = action.payload.campaignName;
      state.campaignStartDate = action.payload.campaignStartDate;
      state.campaignEndDate = action.payload.campaignEndDate;
    })
    .addCase(closeCampaign, (state) => {
      state.campaignName = "";
      state.campaignStartDate = "";
      state.campaignEndDate = "";
    });
});

export default CampaignReducer;
