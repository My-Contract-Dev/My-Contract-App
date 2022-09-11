import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ContractInterface } from '../../models';

export interface ContractsListState {
  contracts: ContractInterface[];
}

const initialState: ContractsListState = {
  contracts: [
    {
      address: '0x961f9b1d87f44e5956cbf2cf5e8495b8c391e646',
      chainId: 9001,
    },
    {
      address: '0x720035b1417f9f9dea4097b578d30c373cd3dd04',
      chainId: 9001,
    },
  ],
};

const contractsListSlice = createSlice({
  name: 'contractsList',
  initialState,
  reducers: {
    addContract: (state, action: PayloadAction<ContractInterface>) => {
      state.contracts.push(action.payload);
    },
    removeContract: (state, action: PayloadAction<ContractInterface>) => {
      state.contracts = state.contracts.filter(
        (contract) =>
          contract.address !== action.payload.address &&
          contract.chainId !== contract.chainId
      );
    },
  },
});

export default contractsListSlice.reducer;

export const { addContract, removeContract } = contractsListSlice.actions;
