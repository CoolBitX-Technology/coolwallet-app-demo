import { Option } from '@coolwallet/evm/lib/transaction/types';

interface BaseTx {
  nonce: string;
  gasLimit: string;
  to?: string;
  value: string;
  data: string;
  option?: Option;
}

export interface LegacyTx extends BaseTx {
  gasPrice: string;
}

export interface EIP1559Tx extends BaseTx {
  gasTipCap: string;
  gasFeeCap: string;
}
