import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  selectedGroup: null as any,
};

const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    setSelectedGroup: (state, action: PayloadAction<any>) => {
      state.selectedGroup = action.payload;
    },
    clearSelectedGroup: (state) => {
      state.selectedGroup = null;
    },
  },
});

export const { setSelectedGroup, clearSelectedGroup } = groupSlice.actions;
export default groupSlice.reducer;
