import { Transport } from '@coolwallet/core';
import {
  EIP1559Transaction,
  EIP712MessageTransaction,
  EIP712TypedDataTransaction,
  LegacyTransaction,
  Option,
} from '@coolwallet/evm/lib/transaction/types';
import { AppPrivacy } from '@src/features/sdk/data/AppPrivacy';
import { toWei } from '@src/features/sdk/evm/utils/EthersUtils';
import { EIP1559Tx, LegacyTx } from '@src/features/sdk/evm/data/EthTransaction';

export class EvmTransactionMapper {
  static mapLegacyTx(
    toAddress: string,
    amount: string,
    nonce: string,
    gasLimit: string,
    gasPrice: string,
    symbol: string,
    decimals: string,
    data?: string,
  ): LegacyTx {
    const option = this.mapOption(symbol, decimals);
    return {
      nonce,
      gasPrice,
      gasLimit,
      to: toAddress,
      value: toWei(amount),
      data: data || '',
      option,
    };
  }

  static mapLegacyTransaction(
    transport: Transport,
    appPrivacy: AppPrivacy,
    index: number,
    transaction: LegacyTx,
    confirmingCallback: () => void,
    authorizedCallback: () => void,
  ): LegacyTransaction {
    const { appId, privateKey } = appPrivacy;
    return {
      transport,
      appPrivateKey: privateKey,
      transaction,
      appId,
      addressIndex: index,
      confirmCB: confirmingCallback,
      authorizedCB: authorizedCallback,
    };
  }

  static mapEIP1559Tx(
    toAddress: string,
    amount: string,
    nonce: string,
    gasLimit: string,
    maxFeePerGas: string,
    maxPriorityFeePerGas: string,
    symbol: string,
    decimals: string,
    data?: string,
  ): EIP1559Tx {
    const option = this.mapOption(symbol, decimals);
    return {
      nonce,
      gasTipCap: maxPriorityFeePerGas!,
      gasFeeCap: maxFeePerGas!,
      gasLimit,
      to: toAddress,
      value: toWei(amount),
      data: data || '',
      option,
    };
  }

  static mapEIP1559Transaction(
    transport: Transport,
    appPrivacy: AppPrivacy,
    index: number,
    transaction: EIP1559Tx,
    confirmingCallback: () => void,
    authorizedCallback: () => void,
  ): EIP1559Transaction {
    const { appId, privateKey } = appPrivacy;
    return {
      transport,
      appPrivateKey: privateKey,
      transaction,
      appId,
      addressIndex: index,
      confirmCB: confirmingCallback,
      authorizedCB: authorizedCallback,
    };
  }

  static mapMessageTransaction(
    transport: Transport,
    appPrivacy: AppPrivacy,
    index: number,
    message: string,
    confirmingCallback: () => void,
    authorizedCallback: () => void,
  ): EIP712MessageTransaction {
    const { appId, privateKey } = appPrivacy;
    return {
      transport,
      appPrivateKey: privateKey,
      message,
      appId,
      addressIndex: index,
      confirmCB: confirmingCallback,
      authorizedCB: authorizedCallback,
    };
  }

  static mapTypedDataTransaction(
    transport: Transport,
    appPrivacy: AppPrivacy,
    index: number,
    typedData: any,
    confirmingCallback: () => void,
    authorizedCallback: () => void,
  ): EIP712TypedDataTransaction {
    const { appId, privateKey } = appPrivacy;
    return {
      transport,
      appPrivateKey: privateKey,
      typedData,
      appId,
      addressIndex: index,
      confirmCB: confirmingCallback,
      authorizedCB: authorizedCallback,
    };
  }

  static mapOption(symbol = '', decimals = ''): Option {
    const option: Option = {
      info: {
        symbol,
        decimals,
      },
    };
    return option;
  }
}
