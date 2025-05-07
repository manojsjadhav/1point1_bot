import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AddNewContactType } from "../../types";
import { addNewContactApi } from "../../services/contactGroupsServices";

export const addNewContact = createAsyncThunk(
  "addContact/create",
  async (payload: AddNewContactType, { rejectWithValue }) => {
    try {
      return await addNewContactApi(payload);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create contact group"
      );
    }
  }
);

interface ContactGroupState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: ContactGroupState = {
  loading: false,
  error: null,
  success: false,
};

const addNewContactSlice = createSlice({
  name: "addNewContact",
  initialState,
  reducers: {
    resetContactGroupState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addNewContact.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addNewContact.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(addNewContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetContactGroupState } = addNewContactSlice.actions;
export default addNewContactSlice.reducer;
