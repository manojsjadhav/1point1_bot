import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Contact } from "../../types";
import {
  getContacts,
  searchContactDetail,
} from "../../services/contactGroupsServices";

interface ContactState {
  contactsDeatails: Contact[];
  loading: boolean;
  error: string | null;
}

const initialState: ContactState = {
  contactsDeatails: [],
  loading: false,
  error: null,
};

export const fetchContactDetails = createAsyncThunk(
  "groups/fetchContacts",
  async (userId: string, { rejectWithValue }) => {
    try {
      const data = await getContacts(userId);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const searchContact = createAsyncThunk(
  "groups/searchContact",
  async ({ query }: { query: string }, { rejectWithValue }) => {
    try {
      const data = await searchContactDetail(query);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Search failed");
    }
  }
);

const contactDetailReducer = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContactDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchContactDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.contactsDeatails = action.payload;
      })
      .addCase(fetchContactDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch contacts";
      })
      .addCase(searchContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchContact.fulfilled, (state, action) => {
        state.loading = false;
        state.contactsDeatails = action.payload;
      })
      .addCase(searchContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default contactDetailReducer.reducer;
