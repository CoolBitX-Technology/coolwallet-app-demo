import { ethers } from 'ethers';
import { fetchErc20TokenInfo, fetchFeeData, fetchNonce, providerFactory, toWei } from '@src/features/sdk/evm/utils/EthersUtils';
import { EthDataType, EthRawData } from '@src/features/sdk/evm/data/EthRawData';
import { RawData, TokenInfo } from '@src/features/sdk/data/RawData';
import { Fee } from '@src/features/sdk/data/Fee';
import { EthFee } from '@src/features/sdk/evm/data/EthFee';
import { EvmChainId } from '@src/features/sdk/evm/EvmChain';
import { getSymbolByChainId } from '@src/features/sdk/evm/utils/EvmChainUtils';
import { calculateFeeAmount, hasEIP1559Fee, hasLegacyFee } from '@src/features/sdk/evm/utils/TxUtils';

export class EthereumApiAdapter {
  private ethersProvider: ethers.JsonRpcProvider;
  private chainId: EvmChainId;

  constructor(chainId: EvmChainId) {
    this.chainId = chainId;
    this.ethersProvider = providerFactory(chainId);
  }

  async estimateTxFee(rawData: Partial<RawData>): Promise<Fee> {
    const { dataType } = rawData as EthRawData;
    switch (dataType) {
      case EthDataType.SmartContract:
      case EthDataType.Transfer:
        return await this.estimateSmartContractTxFee(rawData);
      case EthDataType.Message:
      case EthDataType.TypedData:
        return await this.estimateMessageTxFee();
      default:
        throw new Error(`EthereumApiAdapter.estimateTxFee unsupported dataType:${dataType}`);
    }
  }

  private async fetchDefaultEstimatedGas(rawData: Partial<RawData>, defaultGasLimit?: string): Promise<string> {
    const { amount, toAddress, fromAddress, data, gasMultiplier } = rawData as EthRawData;
    const variables = { from: fromAddress, to: toAddress, value: toWei(amount), data };

    if (defaultGasLimit) {
      return defaultGasLimit;
    }

    const estimatedGasNumber = await this.ethersProvider.estimateGas(variables);
    if (!gasMultiplier) {
      return estimatedGasNumber.toString();
    }
    return (estimatedGasNumber * BigInt(gasMultiplier)).toString();
  }

  private async fetchDefaultFeeData(defaultFee: EthFee): Promise<Partial<EthFee>> {
    if (!defaultFee || (!hasEIP1559Fee(defaultFee) && !hasLegacyFee(defaultFee))) {
      const feeData = await fetchFeeData(this.ethersProvider);
      return feeData;
    }
    return {
      gasPrice: defaultFee.gasPrice,
      maxFeePerGas: defaultFee.maxFeePerGas,
      maxPriorityFeePerGas: defaultFee.maxPriorityFeePerGas,
    };
  }

  private async fetchDefaultNonce(fromAddress: string, nullableNonce?: string) {
    if (nullableNonce) return nullableNonce;
    return await fetchNonce(this.ethersProvider, fromAddress);
  }

  async estimateSmartContractTxFee(rawData: Partial<RawData>): Promise<Fee> {
    const { fromAddress, fee: nullableFee } = rawData as EthRawData;
    const { gasLimit: nullableGasLimit, nonce: nullableNonce } = (nullableFee ?? {}) as EthFee;

    const [nonceHex, gasLimit, feeData] = await Promise.all([
      this.fetchDefaultNonce(fromAddress, nullableNonce),
      this.fetchDefaultEstimatedGas(rawData, nullableGasLimit),
      this.fetchDefaultFeeData(nullableFee as EthFee),
    ]);
    const { gasPrice, maxFeePerGas, maxPriorityFeePerGas } = feeData;

    const feeString: string = calculateFeeAmount(feeData, gasLimit);

    return {
      amount: feeString,
      symbol: getSymbolByChainId(this.chainId),
      nonce: nonceHex,
      gasLimit,
      gasPrice: gasPrice || maxFeePerGas,
      maxFeePerGas,
      maxPriorityFeePerGas,
    } as EthFee;
  }

  async estimateMessageTxFee(): Promise<Fee> {
    const EMPTY_VALUE = '0';
    const symbol = getSymbolByChainId(this.chainId);
    const ethFee: EthFee = {
      amount: EMPTY_VALUE,
      symbol: symbol,
      nonce: EMPTY_VALUE,
      gasLimit: EMPTY_VALUE,
      gasPrice: EMPTY_VALUE,
    };
    return ethFee as Fee;
  }

  async sendTransaction(dataType: EthDataType, signedTx: string): Promise<string> {
    switch (dataType) {
      case EthDataType.SmartContract:
      case EthDataType.Transfer:
        return await this.sendSmartContractTransaction(signedTx);
      case EthDataType.Message:
      case EthDataType.TypedData:
        return this.sendMessageTransaction();
      default:
        throw new Error(`EthereumApiAdapter.sendTransaction unsupported dataType:${dataType}`);
    }
  }

  private async sendSmartContractTransaction(signedTx: string): Promise<string> {
    const response = await this.ethersProvider.broadcastTransaction(signedTx);
    return response.hash;
  }

  private sendMessageTransaction(): string {
    const EMPTY_TX_ID = '';
    return EMPTY_TX_ID;
  }

  async getTokenInfo(contractAddress: string): Promise<TokenInfo> {
    return await fetchErc20TokenInfo(contractAddress, this.ethersProvider);
  }
}
