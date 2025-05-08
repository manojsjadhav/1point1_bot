import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CreateContactGroupPayload } from "../../types";
import { createContactGroupApi } from "../../services/contactGroupsServices";

export const createContactGroup = createAsyncThunk(
  "contactGroup/create",
  async (payload: CreateContactGroupPayload, { rejectWithValue }) => {
    try {
      return await createContactGroupApi(payload);
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

const contactGroupSlice = createSlice({
  name: "contactGroup",
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
      .addCase(createContactGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createContactGroup.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createContactGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetContactGroupState } = contactGroupSlice.actions;
export default contactGroupSlice.reducer;
