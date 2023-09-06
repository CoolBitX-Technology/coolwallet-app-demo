import { Fee } from '@src/features/sdk/data/Fee';

export interface EthFee extends Fee {
  nonce?: string; // hex number as string. e.g. '1d'
  gasLimit?: string; // will be converted to BigNumber, so it supports hex string or 10's string

  // Legacy
  gasPrice?: string; // like gasLimit

  // EIP1559
  maxFeePerGas?: string;
  maxPriorityFeePerGas?: string;
}
