// groupSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  modalName: null as string | null,
};

const modalNameSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setSelectedModalName: (state, action: PayloadAction<string>) => {
      state.modalName = action.payload;
    },
    clearSelectedModalName: (state) => {
      state.modalName = null;
    },
  },
});

export const { setSelectedModalName, clearSelectedModalName } =
  modalNameSlice.actions;
export default modalNameSlice.reducer;
