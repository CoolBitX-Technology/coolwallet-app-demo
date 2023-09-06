import BigNumber from 'bignumber.js';
import { EthFee } from '@src/features/sdk/evm/data/EthFee';
import { isHex } from '@src/features/sdk/evm/utils/EthersUtils';

export function hasEIP1559Fee(fee: EthFee): boolean {
  const { maxFeePerGas, maxPriorityFeePerGas } = fee;
  return isHex(maxFeePerGas) && isHex(maxPriorityFeePerGas);
}

export function hasLegacyFee(fee: EthFee): boolean {
  const { gasPrice } = fee;
  return isHex(gasPrice);
}

export const calculateFeeToETH = (gasLimit: string, gasPrice?: string) => {
  if (!gasPrice) return '0';
  return new BigNumber(gasLimit).multipliedBy(new BigNumber(gasPrice)).shiftedBy(-18).toFixed();
};

export const calculateFeeAmount = (feeData: Partial<EthFee>, gasLimit: string): string => {
  const { gasPrice, maxFeePerGas, maxPriorityFeePerGas } = feeData;
  const defaultGasPrice = gasPrice || maxFeePerGas;
  // Check whether transaction contains EIP1559 transaction information.
  if (maxFeePerGas && maxPriorityFeePerGas) {
    return calculateFeeToETH(gasLimit, maxFeePerGas);
  }
  return calculateFeeToETH(gasLimit, defaultGasPrice);
};
