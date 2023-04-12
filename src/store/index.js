import { configureStore, createSlice } from '@reduxjs/toolkit';

const initAuthState = {
  email: 'James@Band.com',
  token: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'authentication',
  initialState: initAuthState,
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.token = null;
      state.email = null;
      state.isLoggedIn = false;
    },
  },
});

const store = configureStore({
  reducer: authSlice.reducer,
});

export const authActions = authSlice.actions;
export default store;
