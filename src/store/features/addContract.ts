import { createSlice } from '@reduxjs/toolkit';

export interface AddContractState {
  visible: boolean;
  address: string;
}

const initialState: AddContractState = {
  visible: false,
  address: '',
};

const addContractSlice = createSlice({
  initialState,
  name: 'addContract',
  reducers: {
    showAddContract(state) {
      state.visible = true;
    },
    hideAddContract(state) {
      state.visible = false;
    },
  },
});

export const { showAddContract, hideAddContract } = addContractSlice.actions;

export default addContractSlice.reducer;
