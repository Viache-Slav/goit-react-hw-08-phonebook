// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userInitialState = { email: '', token: null };

const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    login(state, action) {
      const { email, token } = action.payload;
      state.email = email;
      state.token = token;
    },
    logout(state) {
      state.email = '';
      state.token = null;
    },
    register(state, action) {
      const { email, token } = action.payload;
      state.email = email;
      state.token = token;
    },
  },
});

export const { login, logout, register } = userSlice.actions;
export const userReducer = userSlice.reducer;
