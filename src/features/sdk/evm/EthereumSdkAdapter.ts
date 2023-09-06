import Evm from '@coolwallet/evm';
import { BaseSdkAdapter } from '@src/features/sdk/SdkAdapter';
import { RawData } from '@src/features/sdk/data/RawData';
import { evmChainIdToSdk } from '@src/features/sdk/evm/EvmChain';
import { isChainIdSupported } from '@src/features/sdk/evm/EvmChainUtils';

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

  getAddress(index: number): Promise<string> {
    throw new Error('Method not implemented.');
  }
  signData(rawData: RawData, confirmingCallback: () => void, authorizedCallback: () => void): Promise<string> {
    throw new Error('Method not implemented.');
  }

  // async signData(signRequest: SignRequest): Promise<string> {
  //   const { rawData } = signRequest;
  //   const { dataType } = rawData as EthRawData;
  //   switch (dataType) {
  //     case EthDataType.SmartContract:
  //     case EthDataType.Transfer:
  //       return await this.signSmartContract(signRequest);
  //     case EthDataType.Message:
  //       return await this.signMessage(signRequest);
  //     case EthDataType.TypedData:
  //       return await this.signTypedData(signRequest);
  //     default:
  //       throw new Error(`EthereumSdkAdapter.signData unsupported dataType:${dataType}`);
  //   }
  // }

  // private async signSmartContract(signRequest: SignRequest): Promise<string> {
  //   const { rawData, confirmingCallback, authorizedCallback } = signRequest;
  //   const { fromAddress, fee, toAddress, amount, data } = rawData as EthRawData;
  //   const {
  //     gasLimit: nullableGasLimit,
  //     gasPrice: nullableGasPrice,
  //     nonce: nullableNonce,
  //     maxFeePerGas: nullableMaxFeePerGas,
  //     maxPriorityFeePerGas: nullableMaxPriorityFeePerGas,
  //   } = fee as EthFee;

  //   const keyId = await this.getFromAddressKeyId(fromAddress);
  //   const weiAmount = ethers.BigNumber.from(ethToWei(amount)).toHexString();
  //   const defaultData = data || '';
  //   const nonce = ObjectUtils.checkNotNull(nullableNonce, 'EthereumSdkAdapter.signData >>> nonce is invalid.');

  //   let gasLimit = ObjectUtils.checkNotNull(nullableGasLimit, 'EthereumSdkAdapter.signData >>> gasLimit is invalid.');
  //   gasLimit = numberStringToHex(gasLimit); // wei
  //   const gasPrice = numberStringToHex(nullableGasPrice); // wei
  //   const maxFeePerGas = numberStringToHex(nullableMaxFeePerGas);
  //   const maxPriorityFeePerGas = numberStringToHex(nullableMaxPriorityFeePerGas);

  //   const txData: SignTransactionDataType = {
  //     from: fromAddress,
  //     keyId,
  //     to: toAddress,
  //     value: weiAmount,
  //     gas: gasLimit,
  //     gasPrice,
  //     maxFeePerGas,
  //     maxPriorityFeePerGas,
  //     data: defaultData,
  //     nonce,
  //   };
  //   return await this.getSdkPro().signTransaction(txData, confirmingCallback, authorizedCallback);
  // }

  // private async signMessage(signRequest: SignRequest): Promise<string> {
  //   const { rawData, confirmingCallback, authorizedCallback } = signRequest;
  //   const { fromAddress, data: message } = rawData as EthRawData;
  //   const keyId = await this.getFromAddressKeyId(fromAddress);
  //   const defaultMessage = message || '';
  //   const txData: SignMessageDataType = {
  //     keyId,
  //     message: defaultMessage,
  //   };
  //   return await this.getSdkPro().signMessage(txData, confirmingCallback, authorizedCallback);
  // }

  // private async signTypedData(signRequest: SignRequest): Promise<string> {
  //   const { rawData, confirmingCallback, authorizedCallback } = signRequest;
  //   const { fromAddress, data } = rawData as EthRawData;
  //   const defaultTypedData = data || '';
  //   const keyId = await this.getFromAddressKeyId(fromAddress);
  //   const typedDataObj: Object = JSON.parse(defaultTypedData);
  //   const txData: SignTypedDataDataType = {
  //     keyId,
  //     typedData: typedDataObj,
  //   };
  //   return await this.getSdkPro().signTypedData(txData, confirmingCallback, authorizedCallback);
  // }
}
