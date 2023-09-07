import { ChainProps } from '@coolwallet/evm/lib/chain/types';
import { CHAIN } from '@coolwallet/evm';

export enum EvmChainId {
  ETHEREUM_GOERLI_TESTNET = 5,
  POLYGON_MAINNET = 137,
}

export interface EvmChain {
  symbol: string;
  name: string;
  rpc_url: string;
  explorer_url: string;
}

export const EVM_CHAIN_MAP: Record<string, EvmChain> = {
  [EvmChainId.ETHEREUM_GOERLI_TESTNET]: {
    symbol: 'ETH',
    name: 'Goerli',
    rpc_url: 'https://goerli.infura.io/v3/55c881399fe442bfb09d327b53dc5fdb',
    explorer_url: 'https://goerli.etherscan.io/tx/',
  },
  [EvmChainId.POLYGON_MAINNET]: {
    symbol: 'MATIC',
    name: 'Polygon',
    rpc_url: 'https://matic-mainnet.chainstacklabs.com',
    explorer_url: 'https://polygonscan.com/tx/',
  },
};

export const evmChainIdToSdk: Record<number, ChainProps> = {
  [EvmChainId.POLYGON_MAINNET]: CHAIN.POLYGON,
  [EvmChainId.ETHEREUM_GOERLI_TESTNET]: CHAIN.GORELI,
};
