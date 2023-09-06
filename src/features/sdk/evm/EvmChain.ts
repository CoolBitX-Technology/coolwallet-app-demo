import { ChainProps } from '@coolwallet/evm/lib/chain/types';
import { CHAIN } from '@coolwallet/evm';

export enum EvmChainId {
  ETHEREUM_MAINNET = 1,
  ETHEREUM_GOERLI_TESTNET = 5,
  POLYGON_MAINNET = 137,
}

export interface EvmChain {
  symbol: string;
  name: string;
}

export const EVM_CHAIN_MAP: Record<string, EvmChain> = {
  [EvmChainId.ETHEREUM_MAINNET]: {
    symbol: 'ETH',
    name: 'Ethereum',
  },
  [EvmChainId.ETHEREUM_GOERLI_TESTNET]: {
    symbol: 'ETH',
    name: 'Goerli',
  },
};

export const evmChainIdToSdk: Record<number, ChainProps> = {
  [EvmChainId.POLYGON_MAINNET]: CHAIN.POLYGON,
  [EvmChainId.ETHEREUM_GOERLI_TESTNET]: CHAIN.GORELI,
};
