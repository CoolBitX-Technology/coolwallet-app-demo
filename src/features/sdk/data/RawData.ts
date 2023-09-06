import { Fee } from '@src/features/sdk/data/Fee';

export interface RawData {
  amount: string; // real world unit as 10's number
  fee?: Fee;
  fromAddress: string;
  index?: number; // fromAddress 的 index 用於簽交易所需
  toAddress: string;
  memoOrTag?: string;
  tokenInfo?: TokenInfo;
}

export interface TokenInfo {
  decimals: string;
  contractAddress: string;
}
