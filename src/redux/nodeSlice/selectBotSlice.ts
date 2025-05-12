import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  selectedBot: "",
};

const selectBot = createSlice({
  name: "selectedBot",
  initialState,
  reducers: {
    setSelectedBotName: (state, action: PayloadAction<any>) => {
      state.selectedBot = action.payload;
    },
    clearSelectedBotName: (state) => {
      state.selectedBot = "";
    },
  },
});

export const { setSelectedBotName, clearSelectedBotName } = selectBot.actions;
export default selectBot.reducer;
