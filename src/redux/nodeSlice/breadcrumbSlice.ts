// redux/slices/breadcrumbSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type BreadcrumbItem = {
  label: string;
  path?: string;
};

type BreadcrumbState = {
  links: BreadcrumbItem[];
};

const initialState: BreadcrumbState = {
  links: [],
};

const breadcrumbSlice = createSlice({
  name: "breadcrumb",
  initialState,
  reducers: {
    setBreadcrumbs: (state, action: PayloadAction<BreadcrumbItem[]>) => {
      console.log("action alink: ", action.payload);
      state.links = action.payload;
    },
    clearBreadcrumbs: (state) => {
      state.links = [];
    },
  },
});

export const { setBreadcrumbs, clearBreadcrumbs } = breadcrumbSlice.actions;
export default breadcrumbSlice.reducer;
