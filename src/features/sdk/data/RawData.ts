import { Fee } from '@src/features/sdk/data/Fee';

export interface RawData {
  amount: string; // real world unit as 10's number
  fee?: Fee;
  index: number; // index 用於簽交易所需
  fromAddress: string;
  toAddress: string;
  memoOrTag?: string;
  symbol?: string;
  decimals?: string;
}

export interface TokenInfo {
  name?: string;
  symbol: string;
  unit: string;
  contractAddress: string;
}
