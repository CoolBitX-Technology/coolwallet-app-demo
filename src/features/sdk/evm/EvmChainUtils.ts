import { Voidable } from '@src/features/store/types';
import { EvmChainId, EVM_CHAIN_MAP } from './EvmChain';

export const getEvmNetworkNameFromChainId = (chainId: number): Voidable<string> => {
  return EVM_CHAIN_MAP[chainId]?.name;
};

export const allSupportedChainId = (): Array<number> => {
  return Object.keys(EvmChainId)
    .filter((key) => isNaN(Number(key)) === false)
    .map((chainIdStr) => Number(chainIdStr));
};

export const isChainIdSupported = (chainId: number): boolean => {
  return allSupportedChainId().includes(chainId);
};
