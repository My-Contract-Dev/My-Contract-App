import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ContractInterface } from '../../models';

export interface ContractsListState {
  contracts: ContractInterface[];
}

const initialState: ContractsListState = {
  contracts: [],
};

const contractsListSlice = createSlice({
  name: 'contractsList',
  initialState,
  reducers: {
    addContract: (state, action: PayloadAction<ContractInterface>) => {
      if (
        !state.contracts.find(
          (c) =>
            c.address === action.payload.address &&
            c.chainId === action.payload.chainId
        )
      ) {
        state.contracts.push(action.payload);
      }
    },
    removeContract: (state, action: PayloadAction<ContractInterface>) => {
      state.contracts = state.contracts.filter(
        (contract) =>
          contract.address !== action.payload.address ||
          contract.chainId !== action.payload.chainId
      );
    },
    updateContractName: (
      state,
      action: PayloadAction<{ contract: ContractInterface; name: string }>
    ) => {
      state.contracts = state.contracts.map((c) => {
        if (
          c.address === action.payload.contract.address &&
          c.chainId === action.payload.contract.chainId
        ) {
          return {
            ...c,
            name: action.payload.name,
          };
        }
        return c;
      });
    },
  },
});

export default contractsListSlice.reducer;

export const { addContract, removeContract, updateContractName } =
  contractsListSlice.actions;
