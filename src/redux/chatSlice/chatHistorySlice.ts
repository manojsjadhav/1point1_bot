import { createSlice } from "@reduxjs/toolkit";
import {
  fetchChatHistory,
  getChatHistoryByContact,
} from "../../services/chatServices";

const chatHistorySlice = createSlice({
  name: "chatHistory",
  initialState: {
    loading: false,
    data: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(fetchChatHistory.pending, (state: any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChatHistory.fulfilled, (state: any, action: any) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchChatHistory.rejected, (state: any, action: any) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getChatHistoryByContact.pending, (state: any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getChatHistoryByContact.fulfilled, (state: any, action: any) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getChatHistoryByContact.rejected, (state: any, action: any) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default chatHistorySlice.reducer;
