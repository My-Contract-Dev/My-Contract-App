import { ContractInterface } from './contract.interface';

export interface RichContract extends ContractInterface {
  valueInUsd?: number;
  label?: {
    text: string;
    color: string;
  };
}
