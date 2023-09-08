import { EVM_CHAIN_MAP } from '@src/features/sdk/evm/EvmChain';
import { ethers } from 'ethers';
import { TokenInfo } from '@src/features/sdk/data/RawData';
import { ERC20_ABI } from '@src/features/sdk/evm/data/ERC20_ABI';
import { EthFee } from '@src/features/sdk/evm/data/EthFee';
import ObjectUtils from '@src/features/utils/ObjectUtils';

export function providerFactory(chainId: number): ethers.JsonRpcProvider {
  const jsonRpcEndpoint = EVM_CHAIN_MAP[chainId].rpc_url;
  return new ethers.JsonRpcProvider(jsonRpcEndpoint);
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

export function moveDecimal(amount?: string, decimals = '18'): string {
  if (!amount) return '0';
  if (!ObjectUtils.isNumeric(decimals)) return amount;
  return ethers.parseUnits(amount, Number.parseInt(decimals)).toString();
}

export function isHex(str?: string) {
  return ethers.isHexString(str);
}

export function getErc20Contract(contractAddress: string, provider: ethers.Provider): ethers.Contract {
  const jsonInterface = ERC20_ABI as Array<any>;
  return new ethers.Contract(contractAddress, jsonInterface, provider);
}

export async function fetchErc20TokenInfo(contractAddress: string, provider: ethers.Provider): Promise<TokenInfo> {
  const contract = getErc20Contract(contractAddress, provider);
  const symbol = await contract.symbol();
  const decimals = await contract.decimals();
  return {
    symbol,
    unit: decimals,
    contractAddress,
  };
}

export async function fetchFeeData(provider: ethers.JsonRpcProvider): Promise<Partial<EthFee>> {
  const fetchedFeeData = await provider.getFeeData();
  return {
    gasPrice: fetchedFeeData.gasPrice?.toString(),
    maxFeePerGas: fetchedFeeData.maxFeePerGas?.toString(),
    maxPriorityFeePerGas: fetchedFeeData.maxPriorityFeePerGas?.toString(),
  };
}

export async function fetchNonce(provider: ethers.JsonRpcProvider, fromAddress: string): Promise<string> {
  const nonce = await provider.getTransactionCount(fromAddress);
  return numberToHex(nonce);
}

export async function encodeTokenTransfer(
  provider: ethers.JsonRpcProvider,
  toAddress: string,
  amount: string,
  contractAddress: string,
): Promise<string> {
  const contract = await getErc20Contract(contractAddress, provider);
  const decimals = await contract.decimals();
  const tokenAmount = moveDecimal(amount, decimals);
  return contract.interface.encodeFunctionData('transfer', [toAddress, tokenAmount]);
}

export async function encodeApprove(
  provider: ethers.JsonRpcProvider,
  contractAddress: string,
  spenderAddress: string,
  value: string,
): Promise<string> {
  const contract = await getErc20Contract(contractAddress, provider);
  const decimals = await contract.decimals();
  const allowanceAmount = moveDecimal(value, decimals);
  return contract.interface.encodeFunctionData('approve', [spenderAddress, allowanceAmount]);
}
