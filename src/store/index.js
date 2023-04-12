import { configureStore, createSlice } from '@reduxjs/toolkit';

const initAuthState = {
  email: null,
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

const uiSlice = createSlice({
  name: 'ui',
  initialState: { type: 'success', msg: 'Login success', show: true },
  reducers: {
    showSuccess(state) {
      state.show = true;
    },
    showError() {},
  },
});

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    ui: uiSlice.reducer,
  },
});

export const uiActions = uiSlice.actions;
export const authActions = authSlice.actions;
export default store;
