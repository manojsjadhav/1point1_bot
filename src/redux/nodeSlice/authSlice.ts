
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  response: any | null;
}

const initialState: AuthState = {
  response: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthResponse: (state, action: PayloadAction<any>) => {
      state.response = action.payload;
      const token = action.payload?.active_token;
      if (token) {
        localStorage.setItem("logintoken", JSON.stringify(token));
      }
    },
    logout: (state) => {
      state.response = null;
      localStorage.removeItem('token');
    },
  },
});

export const { setAuthResponse, logout } = authSlice.actions;
export default authSlice.reducer;
