import { Transport } from '@coolwallet/core';
import { loadAppKeyPair } from '@src/features/ble/utils/StorageUtils';
import { AppPrivacy } from '@src/features/sdk/data/AppPrivacy';
import { RawData } from '@src/features/sdk/data/RawData';

interface SdkAdapter {
  signData(rawData: RawData, confirmingCallback: () => void, authorizedCallback: () => void): Promise<string>;
  getAddress(index: number): Promise<string>;
}

export abstract class BaseSdkAdapter implements SdkAdapter {
  readonly transport: Transport;
  readonly appId: string;
  constructor(appId: string) {
    this.transport = require('@src/Core/helper/apdu/request.js');
    this.appId = appId;
  }

  abstract getAddress(index: number): Promise<string>;
  abstract signData(rawData: RawData, confirmingCallback: () => void, authorizedCallback: () => void): Promise<string>;

  getAppPrivacy = async (): Promise<AppPrivacy> => {
    const { privateKey } = await loadAppKeyPair();
    return { privateKey, appId: this.appId };
  };

  mapKeyIdToIndex(keyId?: string): number {
    if (!keyId) return -1;
    return parseInt(keyId.slice(keyId.length - 4), 16);
  }
}
