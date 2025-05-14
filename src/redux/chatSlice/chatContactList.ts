import { createSlice } from "@reduxjs/toolkit";
import {
  fetchChatContact,
  getAgentChatConstct,
} from "../../services/chatServices";

// Define the state type
interface ChatContactState {
  loading: boolean;
  chatContact: any[]; // Replace `any` with a proper contact type if available
  error: string | null;
}

const initialState: ChatContactState = {
  loading: false,
  chatContact: [],
  error: null,
};

const chatContactSlice = createSlice({
  name: "chatContact",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChatContact.fulfilled, (state, action: any) => {
        state.loading = false;
        state.chatContact = action.payload;
      })
      .addCase(fetchChatContact.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getAgentChatConstct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAgentChatConstct.fulfilled, (state, action: any) => {
        state.loading = false;
        state.chatContact = action.payload;
      })
      .addCase(getAgentChatConstct.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default chatContactSlice.reducer;
