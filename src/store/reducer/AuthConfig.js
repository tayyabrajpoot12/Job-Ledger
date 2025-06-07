import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  token: '',
  isOnBoarding: false,
  notificationCounts: {},
  accountModal: false,
};
export const authConfigsSlice = createSlice({
  name: 'authConfigs',
  initialState: initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
    setOnBoarding(state, action) {
      state.isOnBoarding = action.payload;
    },
    setAccountModal(state, action) {
      state.accountModal = action.payload;
    },
    logout(state, action) {
      state.token = '';
    },
    setNotificationCounts(state, action) {
      state.notificationCounts = action.payload;
    },
  },
});

export const {
  setToken,
  setOnBoarding,
  logout,
  setNotificationCounts,
  setAccountModal,
} = authConfigsSlice.actions;
