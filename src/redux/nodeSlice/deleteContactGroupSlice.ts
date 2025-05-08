import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteContactGroup } from "../../services/contactGroupsServices";
import { Group } from "../../types";

interface ContactGroupState {
  groups: Group[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: ContactGroupState = {
  groups: [],
  loading: false,
  error: null,
};
export const deleteGroup = createAsyncThunk(
  "contactGroups/deleteGroup",
  async (groupId: string | number, { rejectWithValue }) => {
    try {
      await deleteContactGroup(groupId);
      return groupId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to delete group");
    }
  }
);

const contactGroupSlice = createSlice({
  name: "deleteContactGroups",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteGroup.fulfilled, (state, action) => {
        state.loading = false;
        state.groups = state.groups.filter(
          (group) => group.id !== action.payload
        );
      })
      .addCase(deleteGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default contactGroupSlice.reducer;
