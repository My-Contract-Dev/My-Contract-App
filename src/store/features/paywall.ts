import { createSlice } from '@reduxjs/toolkit';

export interface PaywallState {
  visible: boolean;
}

const initialState: PaywallState = {
  visible: false,
};

const paywallSlice = createSlice({
  initialState,
  name: 'paywall',
  reducers: {
    showPaywall: (state) => {
      state.visible = true;
    },
    hidePaywall: (state) => {
      state.visible = false;
    },
  },
});

export const { showPaywall, hidePaywall } = paywallSlice.actions;

export default paywallSlice.reducer;
