import Evm from '@coolwallet/evm';
import { EVM_CHAIN_MAP, EvmChainId, evmChainIdToSdk } from '@src/features/sdk/evm/EvmChain';
import { Voidable } from '@src/features/store/types';

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

export const sdkFactory = (chainId: number): Evm => {
  const chainProps = evmChainIdToSdk[chainId];
  if (!isChainIdSupported(chainId) || !chainProps)
    throw new Error(`EvmChainUtils.sdkFactory >>> unrecognized chainId:${chainId}`);
  return new Evm(chainProps);
};

export const getSymbolByChainId = (chainId: number): string => {
  const chainProps = evmChainIdToSdk[chainId];
  if (!isChainIdSupported(chainId) || !chainProps)
    throw new Error(`EvmChainUtils.getSymbolByChainId >>> unrecognized chainId:${chainId}`);
  return chainProps.symbol;
};
