import * as crypto from 'crypto';
import { utils, config } from '@coolwallet/core';
import { loadAppKeyPair } from '@src/features/ble/utils/StorageUtils';
import { AppPrivacy } from '@src/features/sdk/data/AppPrivacy';
import { RawData } from '@src/features/sdk/data/RawData';
import { Transport } from '@coolwallet/core';

export enum WordLength {
  WORD_12 = 12,
  WORD_18 = 18,
  WORD_24 = 24,
}
interface SdkAdapter {
  setAppId(appId: string): void;
  setTransport(transport: Transport): void;
  signData(rawData: RawData, confirmingCallback: () => void, authorizedCallback: () => void): Promise<string>;
  getAddress(index: number): Promise<string>;
  createMnemonic(worldLength?: WordLength): Promise<string>;
  createMnemonic(worldLength?: WordLength): Promise<string>;
  recoverWallet(mnemonic: string): Promise<void>;
  getAppPrivacy(): Promise<AppPrivacy>;
}

export abstract class BaseSdkAdapter implements SdkAdapter {
  private transport?: Transport;
  private appId?: string;

  abstract getAddress(index: number): Promise<string>;
  abstract signData(rawData: RawData, confirmingCallback: () => void, authorizedCallback: () => void): Promise<string>;

  setAppId(appId: string): void {
    this.appId = appId;
    console.log('BaseSdkAdapter.setAppId >>> appId = ', appId);
  }

  getAppId(): string {
    if (!this.appId) throw new Error(`BaseSdkAdapter.getAppId >>> appId is invalid.`);
    return this.appId;
  }

  setTransport(transport: Transport): void {
    this.transport = transport;
    console.log('BaseSdkAdapter.transport >>> transport = ', transport);
  }

  getTransport(): Transport {
    if (!this.transport) throw new Error(`BaseSdkAdapter.getTransport >>> transport is invalid.`);
    return this.transport;
  }

  async getAppPrivacy(): Promise<AppPrivacy> {
    const { privateKey } = await loadAppKeyPair();
    return { privateKey, appId: this.getAppId() };
  }

  mapKeyIdToIndex(keyId?: string): number {
    if (!keyId) return -1;
    return parseInt(keyId.slice(keyId.length - 4), 16);
  }

  createMnemonic(worldLength = WordLength.WORD_12): Promise<string> {
    return utils.createSeedByApp(worldLength, crypto.randomBytes);
  }

  private async getSEPublicKey(): Promise<string> {
    return await config.getSEPublicKey(this.getTransport());
  }

  async recoverWallet(mnemonic: string): Promise<void> {
    const appKeyPair = await this.getAppPrivacy();
    const { privateKey, appId } = appKeyPair;
    const sePublicKey = await this.getSEPublicKey();
    console.log('recoverWallet >>> appId=', appId);
    console.log('recoverWallet >>> privateKey=', privateKey);
    console.log('recoverWallet >>> sePublicKey=', sePublicKey);
    return await utils.createWalletByMnemonic(this.getTransport(), appId, privateKey, mnemonic, sePublicKey);
  }
}
