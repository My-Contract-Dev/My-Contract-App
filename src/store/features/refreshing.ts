import { createSlice } from '@reduxjs/toolkit';

export interface RefreshingState {
  refreshing: boolean;
}

const initialState: RefreshingState = {
  refreshing: false,
};

const refrefshingSlice = createSlice({
  initialState,
  name: 'refreshing',
  reducers: {
    startRefreshing: (state) => {
      state.refreshing = true;
    },
    stopRefreshing: (state) => {
      state.refreshing = false;
    },
  },
});

export const { startRefreshing, stopRefreshing } = refrefshingSlice.actions;

export default refrefshingSlice.reducer;
