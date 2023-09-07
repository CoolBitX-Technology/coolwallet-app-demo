import Evm from '@coolwallet/evm';
import { BaseSdkAdapter } from '@src/features/sdk/SdkAdapter';
import { RawData } from '@src/features/sdk/data/RawData';
import { numberToHex } from '@src/features/sdk/evm/utils/EthersUtils';
import { EthFee } from '@src/features/sdk/evm/data/EthFee';
import { EthDataType, EthRawData } from '@src/features/sdk/evm/data/EthRawData';
import { EvmTransactionMapper } from '@src/features/sdk/evm/map/EvmTransactionMapper';
import ObjectUtils from '@src/features/utils/ObjectUtils';
import { sdkFactory } from '@src/features/sdk/evm/utils/EvmChainUtils';
import { hasEIP1559Fee } from '@src/features/sdk/evm/utils/TxUtils';

export class EthereumSdkAdapter extends BaseSdkAdapter {
  readonly sdk: Evm;
  readonly chainId: number;

  constructor(chainId: number) {
    super();
    this.chainId = chainId;
    this.sdk = sdkFactory(chainId);
  }

  async getAddress(index: number): Promise<string> {
    const { privateKey, appId } = await this.getAppPrivacy();
    return await this.sdk.getAddress(this.getTransport(), privateKey, appId, index);
  }

  async signData(rawData: RawData, confirmingCallback: () => void, authorizedCallback: () => void): Promise<string> {
    const { dataType } = rawData as EthRawData;
    switch (dataType) {
      case EthDataType.SmartContract:
      case EthDataType.Transfer:
        return await this.signSmartContract(rawData, confirmingCallback, authorizedCallback);
      case EthDataType.Message:
        return await this.signMessage(rawData, confirmingCallback, authorizedCallback);
      case EthDataType.TypedData:
        return await this.signTypedData(rawData, confirmingCallback, authorizedCallback);
      default:
        throw new Error(`EthereumSdkAdapter.signData unsupported dataType:${dataType}`);
    }
  }

  private async signSmartContract(
    rawData: RawData,
    confirmingCallback: () => void,
    authorizedCallback: () => void,
  ): Promise<string> {
    const {
      fee,
      toAddress,
      amount,
      data,
      index: nullableIndex,
      symbol: nullableSymbol,
      decimals: nullableDecimals,
    } = rawData as EthRawData;
    if (!ObjectUtils.isNumeric(nullableIndex)) throw new Error(`EthereumSdkAdapter.signSmartContract >>> index is invalid.`);
    const index = nullableIndex as number;
    const ethFee = fee as EthFee;
    const {
      nonce: nullableNonce,
      gasLimit: nullableGasLimit,
      gasPrice: nullableGasPrice,
      maxFeePerGas: nullableMaxFeePerGas,
      maxPriorityFeePerGas: nullableMaxPriorityFeePerGas,
    } = ethFee;
    const nonce = ObjectUtils.checkNotNull(nullableNonce, 'EthereumSdkAdapter.signSmartContract >>> nonce is invalid.');
    ObjectUtils.checkNotNull(nullableGasLimit, 'EthereumSdkAdapter.signSmartContract >>> gasLimit is invalid.');
    const gasLimit = numberToHex(nullableGasLimit); // wei
    const appPrivacy = await this.getAppPrivacy();
    const symbol = ObjectUtils.checkNotNull(nullableSymbol, 'EthereumSdkAdapter.signSmartContract >>> symbol is invalid');
    const decimals = ObjectUtils.checkNotNull(nullableDecimals, 'EthereumSdkAdapter.signSmartContract >>> decimals is invalid');

    if (hasEIP1559Fee(ethFee)) {
      ObjectUtils.checkNotNull(nullableMaxFeePerGas, 'EthereumSdkAdapter.signEIP1559Transaction >>> maxFeePerGas is invalid.');
      const maxFeePerGas = numberToHex(nullableMaxFeePerGas);
      ObjectUtils.checkNotNull(
        nullableMaxPriorityFeePerGas,
        'EthereumSdkAdapter.signEIP1559Transaction >>> maxPriorityFeePerGas is invalid.',
      );
      const maxPriorityFeePerGas = numberToHex(nullableMaxPriorityFeePerGas);
      const eip1559Tx = EvmTransactionMapper.mapEIP1559Tx(
        toAddress,
        amount,
        nonce,
        gasLimit,
        maxFeePerGas,
        maxPriorityFeePerGas,
        symbol,
        decimals,
        data,
      );
      const eip1559Transaction = EvmTransactionMapper.mapEIP1559Transaction(
        this.getTransport(),
        appPrivacy,
        index,
        eip1559Tx,
        confirmingCallback,
        authorizedCallback,
      );
      return await this.sdk.signEIP1559Transaction(eip1559Transaction);
    } else {
      ObjectUtils.checkNotNull(nullableGasPrice, 'EthereumSdkAdapter.signLegacyTransaction >>> gasPrice is invalid.');
      const gasPrice = numberToHex(nullableGasPrice); // wei
      const legacyTx = EvmTransactionMapper.mapLegacyTx(toAddress, amount, nonce, gasLimit, gasPrice, symbol, decimals, data);
      const legacyTransaction = EvmTransactionMapper.mapLegacyTransaction(
        this.getTransport(),
        appPrivacy,
        index,
        legacyTx,
        confirmingCallback,
        authorizedCallback,
      );
      return await this.sdk.signTransaction(legacyTransaction);
    }
  }

  private async signMessage(rawData: RawData, confirmingCallback: () => void, authorizedCallback: () => void): Promise<string> {
    const { index: nullableIndex, data } = rawData as EthRawData;
    if (!ObjectUtils.isNumeric(nullableIndex)) throw new Error(`EthereumSdkAdapter.signSmartContract >>> index is invalid.`);
    const index = nullableIndex as number;
    const appPrivacy = await this.getAppPrivacy();
    const msgTransaction = EvmTransactionMapper.mapMessageTransaction(
      this.getTransport(),
      appPrivacy,
      index,
      data || '',
      confirmingCallback,
      authorizedCallback,
    );
    return await this.sdk.signMessage(msgTransaction);
  }

  private async signTypedData(rawData: RawData, confirmingCallback: () => void, authorizedCallback: () => void): Promise<string> {
    const { data, index: nullableIndex } = rawData as EthRawData;
    if (!ObjectUtils.isNumeric(nullableIndex)) throw new Error(`EthereumSdkAdapter.signSmartContract >>> index is invalid.`);
    const index = nullableIndex as number;
    const appPrivacy = await this.getAppPrivacy();
    const typedDataObj: Object = JSON.parse(data || '');
    const typedDataTransaction = EvmTransactionMapper.mapTypedDataTransaction(
      this.getTransport(),
      appPrivacy,
      index,
      typedDataObj,
      confirmingCallback,
      authorizedCallback,
    );
    return await this.sdk.signTypedData(typedDataTransaction);
  }
}
