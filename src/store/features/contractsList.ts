import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ContractInterface } from '../../models';

export interface ContractsListState {
  contracts: ContractInterface[];
}

const initialState: ContractsListState = {
  contracts: [
    {
      address: '0x961f9b1d87f44e5956cbf2cf5e8495b8c391e646',
      name: 'TransferSafe_Router',
      chainId: 9001,
    },
    { address: '0xb5b9e3fefb86255e6a7e04fd8e2fc98757a4aa4f', chainId: 9001 },
    {
      address: '0x720035b1417f9f9dea4097b578d30c373cd3dd04',
      chainId: 9001,
    },
    {
      address: '0x11D13d3778930fC0Dd5098940C00b24FC0dB608A',
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
          contract.address !== action.payload.address ||
          contract.chainId !== action.payload.chainId
      );
    },
  },
});

export default contractsListSlice.reducer;

export const { addContract, removeContract } = contractsListSlice.actions;
