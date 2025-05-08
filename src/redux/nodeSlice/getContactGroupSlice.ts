import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getGroups } from "../../services/contactGroupsServices";
import { Group } from "../../types";

interface GroupState {
  groups: Group[];
  loading: boolean;
  error: string | null;
}

const initialState: GroupState = {
  groups: [],
  loading: false,
  error: null,
};

export const fetchGroups = createAsyncThunk(
  "groups/fetchGroups",
  async (userId: string, { rejectWithValue }) => {
    try {
      const data = await getGroups(userId);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

const contactGroupReducer = createSlice({
  name: "groups",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroups.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.loading = false;
        state.groups = action.payload;
      })
      .addCase(fetchGroups.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch converstion";
      });
  },
});

export default contactGroupReducer.reducer;
