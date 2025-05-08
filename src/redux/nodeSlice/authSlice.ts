import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  response: any | null;
  token: string | null;
  loading: boolean;
}

const savedToken = localStorage.getItem("logintoken");

const initialState: AuthState = {
  response: null,
  token: savedToken ? JSON.parse(savedToken) : null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthResponse: (state, action: PayloadAction<any>) => {
      const token = action.payload?.active_token;
      state.response = action.payload;
      state.token = token;
      if (token) {
        localStorage.setItem("logintoken", JSON.stringify(token));
      }
      state.loading = false;
    },
    logout: (state) => {
      state.response = null;
      state.token = null;
      localStorage.removeItem("logintoken");
      state.loading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setAuthResponse, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;
