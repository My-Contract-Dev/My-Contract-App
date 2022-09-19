import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PaywallState {
  visible: boolean;
  label?: string;
}

const initialState: PaywallState = {
  visible: false,
};

const paywallSlice = createSlice({
  initialState,
  name: 'paywall',
  reducers: {
    showPaywall: (state, action: PayloadAction<string>) => {
      state.visible = true;
      state.label = action.payload;
    },
    hidePaywall: (state) => {
      state.visible = false;
      state.label = undefined;
    },
  },
});

export const { showPaywall, hidePaywall } = paywallSlice.actions;

export default paywallSlice.reducer;
