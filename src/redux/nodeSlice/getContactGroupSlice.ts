import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  getGroups,
  searchContactGroups,
} from "../../services/contactGroupsServices";
import { Group } from "../../types";

interface GroupState {
  groups: Group[];
  searchResults: Group[];
  isFetchingGroups: boolean;
  isSearchingGroups: boolean;
  error: string | null;
}

const initialState: GroupState = {
  groups: [],
  searchResults: [],
  isFetchingGroups: false,
  isSearchingGroups: false,
  error: null,
};

// 1. Fetch all groups
export const fetchGroups = createAsyncThunk(
  "groups/fetchGroups",
  async (user_id: string, { rejectWithValue }) => {
    try {
      const data = await getGroups(user_id);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// 2. Search groups (separate API)
export const searchGroups = createAsyncThunk(
  "groups/searchGroups",
  async (
    { user_id, query }: { user_id: string; query: string },
    { rejectWithValue }
  ) => {
    try {
      const data = await searchContactGroups(user_id, query);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Search failed");
    }
  }
);

const contactGroupReducer = createSlice({
  name: "groups",
  initialState,
  reducers: {
    resetGroupsState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // fetchGroups
      .addCase(fetchGroups.pending, (state) => {
        state.isFetchingGroups = true;
        state.error = null;
      })
      .addCase(
        fetchGroups.fulfilled,
        (state, action: PayloadAction<Group[]>) => {
          state.isFetchingGroups = false;
          state.groups = action.payload;
        }
      )
      .addCase(fetchGroups.rejected, (state, action) => {
        state.isFetchingGroups = false;
        state.error = action.payload as string;
      })

      // searchGroups
      .addCase(searchGroups.pending, (state) => {
        state.isSearchingGroups = true;
        state.error = null;
      })
      .addCase(
        searchGroups.fulfilled,
        (state, action: PayloadAction<Group[]>) => {
          state.isSearchingGroups = false;
          state.searchResults = action.payload;
        }
      )
      .addCase(searchGroups.rejected, (state, action) => {
        state.isSearchingGroups = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetGroupsState } = contactGroupReducer.actions;
export default contactGroupReducer.reducer;
