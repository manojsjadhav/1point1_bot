import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CallRecord } from "../../types";
import { getCallHistoryByNumber } from "../../services/contactGroupsServices";

interface CallState {
  callDeatails: CallRecord[];
  loading: boolean;
  error: string | null;
}

const initialState: CallState = {
  callDeatails: [],
  loading: false,
  error: null,
};

export const fetchCallDetails = createAsyncThunk(
  "groups/fetchCall",
  async (payload: { number: string; userId: string }, { rejectWithValue }) => {
    try {
      const data = await getCallHistoryByNumber(payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

const callDetailReducer = createSlice({
  name: "callDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCallDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCallDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.callDeatails = action.payload;
      })
      .addCase(fetchCallDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch converstion";
      });
  },
});

export default callDetailReducer.reducer;
