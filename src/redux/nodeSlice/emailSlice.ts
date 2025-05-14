import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { EmailConversation } from "../../types";
import {
  getEmailByTickectIdConversations,
  getEmailConversations,
  searchEmailByParams,
} from "../../services/emailBotServices";

interface EmailConversationState {
  allConversations: EmailConversation[]; // full list
  conversations: EmailConversation[];    // filtered/search result
  conversationsById: EmailConversation[];
  isLoading: boolean;
  error: string | null;
}

const initialState: EmailConversationState = {
  allConversations: [],
  conversations: [],
  conversationsById: [],
  isLoading: false,
  error: null,
};

interface SearchFilter {
  user_id: number;
  agent_name: string;
  keyword: string;
  from_date: string;
  to_date: string;
}

// Fetch all conversations
export const fetchEmailConversations = createAsyncThunk(
  "emails/fetchAllConversations",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getEmailConversations();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch emails");
    }
  }
);

// Fetch by ticket ID
export const fetchEmailByTikectIdConversations = createAsyncThunk(
  "emails/fetchByTicketId",
  async (ticket_id: string, { rejectWithValue }) => {
    try {
      const data = await getEmailByTickectIdConversations(ticket_id);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch emails");
    }
  }
);

// Search by params
export const fetchSearchEmailByParams = createAsyncThunk(
  "emails/fetchByParams",
  async (payLoad: SearchFilter, { rejectWithValue }) => {
    try {
      const data = await searchEmailByParams(payLoad);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch emails");
    }
  }
);

const emailConversationSlice = createSlice({
  name: "emailConversations",
  initialState,
  reducers: {
    resetEmailState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchEmailConversations.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchEmailConversations.fulfilled,
        (state, action: PayloadAction<EmailConversation[]>) => {
          state.isLoading = false;
          state.allConversations = action.payload;
          state.conversations = action.payload; // default filtered = all
        }
      )
      .addCase(fetchEmailConversations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Fetch by ticket ID
      .addCase(fetchEmailByTikectIdConversations.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchEmailByTikectIdConversations.fulfilled,
        (state, action: PayloadAction<EmailConversation[]>) => {
          state.isLoading = false;
          state.conversationsById = action.payload;
        }
      )
      .addCase(fetchEmailByTikectIdConversations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Search by params
      .addCase(
        fetchSearchEmailByParams.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.conversations = action.payload;
        }
      );
  },
});

export const { resetEmailState } = emailConversationSlice.actions;
export default emailConversationSlice.reducer;
