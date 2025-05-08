import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Contact } from "../../types";
import { getContacts } from "../../services/contactGroupsServices";

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
        state.error = action.error.message || "Failed to fetch converstion";
      });
  },
});

export default contactDetailReducer.reducer;
