import Evm from '@coolwallet/evm';
import { BaseSdkAdapter } from '@src/features/sdk/SdkAdapter';
import { RawData } from '@src/features/sdk/data/RawData';
import { isHex, numberToHex } from '@src/features/sdk/evm/EthersUtils';
import { evmChainIdToSdk } from '@src/features/sdk/evm/EvmChain';
import { isChainIdSupported } from '@src/features/sdk/evm/EvmChainUtils';
import { EthFee } from '@src/features/sdk/evm/data/EthFee';
import { EthDataType, EthRawData } from '@src/features/sdk/evm/data/EthRawData';
import { EvmTransactionMapper } from '@src/features/sdk/evm/map/EvmTransactionMapper';
import ObjectUtils from '@src/features/utils/ObjectUtils';

export class EthereumSdkAdapter extends BaseSdkAdapter {
  readonly sdk: Evm;
  readonly chainId: number;

  constructor(appId: string, chainId: number) {
    super(appId);
    this.chainId = chainId;
    this.sdk = this.sdkFactory(chainId);
  }

  private sdkFactory(chainId: number): Evm {
    const chainProps = evmChainIdToSdk[chainId];
    if (!isChainIdSupported(chainId) || !chainProps)
      throw new Error(`EthereumSdkAdapter.sdkFactory >>> unrecognized chainId:${chainId}`);
    return new Evm(chainProps);
  }

  async getAddress(index: number): Promise<string> {
    const { privateKey, appId } = await this.getAppPrivacy();
    return await this.sdk.getAddress(this.transport, privateKey, appId, index);
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
    const { fee, toAddress, amount, data, index: nullableIndex, symbol, decimals } = rawData as EthRawData;
    const index = ObjectUtils.checkNotNull(nullableIndex, 'EthereumSdkAdapter.signSmartContract >>> index is invalid.');
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

    if (this.hasEIP1559MaxFee(ethFee)) {
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
        this.transport,
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
        this.transport,
        appPrivacy,
        index,
        legacyTx,
        confirmingCallback,
        authorizedCallback,
      );
      return await this.sdk.signTransaction(legacyTransaction);
    }
  }

  private hasEIP1559MaxFee = (fee: EthFee) => {
    const { maxFeePerGas, maxPriorityFeePerGas } = fee;
    return isHex(maxFeePerGas) && isHex(maxPriorityFeePerGas);
  };

  private async signMessage(rawData: RawData, confirmingCallback: () => void, authorizedCallback: () => void): Promise<string> {
    const { index: nullableIndex, data } = rawData as EthRawData;
    const index = ObjectUtils.checkNotNull(nullableIndex, 'EthereumSdkAdapter.signMessage >>> index is invalid.');
    const appPrivacy = await this.getAppPrivacy();
    const msgTransaction = EvmTransactionMapper.mapMessageTransaction(
      this.transport,
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
    const index = ObjectUtils.checkNotNull(nullableIndex, 'EthereumSdkAdapter.signTypedData >>> index is invalid.');
    const appPrivacy = await this.getAppPrivacy();
    const typedDataObj: Object = JSON.parse(data || '');
    const typedDataTransaction = EvmTransactionMapper.mapTypedDataTransaction(
      this.transport,
      appPrivacy,
      index,
      typedDataObj,
      confirmingCallback,
      authorizedCallback,
    );
    return await this.sdk.signTypedData(typedDataTransaction);
  }
}
