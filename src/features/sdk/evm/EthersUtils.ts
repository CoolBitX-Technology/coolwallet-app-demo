import Evm from '@coolwallet/evm';
import { isChainIdSupported } from '@src/features/sdk/evm/EvmChainUtils';
import { evmChainIdToSdk } from '@src/features/sdk/evm/EvmChain';
import { ethers } from 'ethers';

export function sdkFactory(chainId: number): Evm {
  const chainProps = evmChainIdToSdk[chainId];
  if (!isChainIdSupported(chainId) || !chainProps) throw new Error(`/evm/utils sdkFactory unrecognized chainId:${chainId}`);
  return new Evm(chainProps);
}

export function evenHexDigit(hex: string): string {
  return hex.length % 2 !== 0 ? `0${hex}` : hex;
}

export function removeHex0x(hex: string): string {
  return hex.slice(0, 2) === '0x' ? hex.slice(2) : hex;
}

export function addHex0x(hex: string): string {
  return hex.slice(0, 2) == '0x' ? hex : `0x${hex}`;
}

export function handleHex(hex: string): string {
  return evenHexDigit(removeHex0x(hex));
}

export function numberToHex(number?: string | number): string {
  if (!number) return '0';
  const bigInt = ethers.toBigInt(number);
  return ethers.toBeHex(bigInt);
}

export function toWei(amount?: string): string {
  if (!amount) return '0';
  return ethers.parseUnits(amount, 'gwei').toString();
}

export function isHex(str?: string) {
  return ethers.isHexString(str);
}
