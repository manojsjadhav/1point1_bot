import { createSlice } from "@reduxjs/toolkit";
import { getChatbotAgent } from "../../services/chatServices";

interface ChatbotUserState {
  loading: boolean;
  chatAgent: any;
  error: string | null;
}

const initialState: ChatbotUserState = {
  loading: false,
  chatAgent: [],
  error: null,
};

const chatAgentSlice = createSlice({
  name: "chatbotAgent",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getChatbotAgent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getChatbotAgent.fulfilled, (state, action: any) => {
        state.loading = false;
        state.chatAgent = action.payload;
      })
      .addCase(getChatbotAgent.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default chatAgentSlice.reducer;
