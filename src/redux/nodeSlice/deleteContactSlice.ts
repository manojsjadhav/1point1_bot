import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteContacts } from "../../services/contactGroupsServices";
import { Group } from "../../types";

interface ContactsState {
  contacts: Group[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: ContactsState = {
  contacts: [],
  loading: false,
  error: null,
};

export const deleteContact = createAsyncThunk(
  "contactGroups/deleteContact",
  async (groupId: string | number, { rejectWithValue }) => {
    try {
      await deleteContacts(groupId);
      return groupId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to delete group");
    }
  }
);

const contactGroupSlice = createSlice({
  name: "deleteContact",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = state.contacts.filter(
          (contact) => contact.id !== action.payload
        );
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default contactGroupSlice.reducer;
