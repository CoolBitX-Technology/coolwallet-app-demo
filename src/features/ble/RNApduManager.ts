import { Transport, config, info, setting, wallet } from '@coolwallet/core';
import { AppKeyPair } from '@src/features/ble/utils/StorageUtils';
import { SDKError } from '@coolwallet/core/lib/error';
import { RNApduError } from '@src/features/ble/RNApduError';
import { PairedApp } from '@src/features/ble/data/PairedApp';
import { CardInfo } from '@src/features/ble/data/CardInfo';
import { SEUpdateInfo } from '@coolwallet/core/lib/apdu/ota/types';
import { UpdateInfo } from '@coolwallet/core/lib/apdu/mcu/types';

interface ApduManager {
  init(transport: Transport, appKeyPair: AppKeyPair): void;
  isInitialize(): boolean;
  getCardInfo(): Promise<CardInfo>;
  resetDevice(): Promise<boolean>;
  registerDevice(name: string, password: string): Promise<string>;
  getPairPassword(appId: string): Promise<string>;
  getPairedApps(appId: string): Promise<PairedApp[]>;
  removePairedDevice(appId: string, pairedAppId: string): Promise<void>;
}

export class RNApduManager implements ApduManager {
  private static instance: RNApduManager;
  private transport?: Transport;
  private appKeyPair?: AppKeyPair;

  constructor() {}

  static getInstance() {
    if (!this.instance) this.instance = new RNApduManager();
    return this.instance;
  }

  init(transport: Transport, appKeyPair: AppKeyPair): void {
    this.transport = transport;
    this.appKeyPair = appKeyPair;
  }

  isInitialize(): boolean {
    return !!this.transport && !!this.appKeyPair;
  }

  private getTransport() {
    if (!this.isInitialize()) throw new SDKError('NOT_INITIALIZE', 'RNApduManager is not initialzie');
    return this.transport as Transport;
  }

  private getAppKeyPair() {
    if (!this.isInitialize()) throw new SDKError('NOT_INITIALIZE', 'RNApduManager is not initialzie');
    return this.appKeyPair as AppKeyPair;
  }

  private async getSEPublicKey(): Promise<string> {
    if (!this.isInitialize()) throw new SDKError('NOT_INITIALIZE', 'RNApduManager is not initialzie');
    return await config.getSEPublicKey(this.getTransport());
  }

  async getCardInfo(): Promise<CardInfo> {
    try {
      return await info.getCardInfo(this.getTransport());
    } catch (e) {
      throw RNApduError.parseError(e as Error);
    }
  }

  async registerDevice(name: string, password: string): Promise<string> {
    const appKeyPair = this.getAppKeyPair();
    const { publicKey } = appKeyPair;
    const sePublicKey = await this.getSEPublicKey();
    try {
      return await wallet.client.register(this.getTransport(), publicKey, password, name, sePublicKey);
    } catch (e) {
      throw RNApduError.parseError(e as Error);
    }
  }

  async getPairedApps(appId: string): Promise<PairedApp[]> {
    const appKeyPair = this.getAppKeyPair();
    const { privateKey } = appKeyPair;
    try {
      return await wallet.client.getPairedApps(this.getTransport(), appId, privateKey);
    } catch (e) {
      throw RNApduError.parseError(e as Error);
    }
  }

  async removePairedDevice(appId: string, pairedAppId: string): Promise<void> {
    const appKeyPair = this.getAppKeyPair();
    const { privateKey } = appKeyPair;
    try {
      return await wallet.client.removePairedDevice(this.getTransport(), appId, privateKey, pairedAppId);
    } catch (e) {
      throw RNApduError.parseError(e as Error);
    }
  }

  async resetDevice(): Promise<boolean> {
    try {
      const status = await setting.card.resetCard(this.getTransport());
      return status;
    } catch (e) {
      throw RNApduError.parseError(e as Error);
    }
  }

  async getPairPassword(appId: string): Promise<string> {
    const appKeyPair = this.getAppKeyPair();
    const { privateKey } = appKeyPair;
    try {
      return await wallet.client.getPairingPassword(this.getTransport(), appId, privateKey);
    } catch (e) {
      throw RNApduError.parseError(e as Error);
    }
  }

  async checkSEUpdate(): Promise<SEUpdateInfo> {
    try {
      return await apdu.ota.checkUpdate(this.getTransport());
    } catch (e) {
      throw RNApduError.parseError(e as Error);
    }
  }

  async updateSE(
    cardId: string,
    appId: string,
    progressCallback: (progress: number) => void,
    updateMCU?: boolean,
  ): Promise<number> {
    const appKeyPair = this.getAppKeyPair();
    const { privateKey } = appKeyPair;
    try {
      return await apdu.ota.updateSE(this.getTransport(), cardId, appId, privateKey, progressCallback, fetch, updateMCU);
    } catch (e) {
      throw RNApduError.parseError(e as Error);
    }
  }

  async checkMCUUpdate(): Promise<UpdateInfo> {
    try {
      return await apdu.mcu.dfu.checkUpdate(this.getTransport());
    } catch (e) {
      throw RNApduError.parseError(e as Error);
    }
  }

  async updateMCU(progressCallback: (progress: number) => void, updateSE?: boolean): Promise<string> {
    try {
      return await apdu.mcu.dfu.updateMCU(this.getTransport(), progressCallback, updateSE);
    } catch (e) {
      throw RNApduError.parseError(e as Error);
    }
  }

  async powerOff() {
    try {
      return await apdu.mcu.control.powerOff(this.getTransport());
    } catch (e) {
      throw RNApduError.parseError(e as Error);
    }
  }

  async createSeedByCard(appId: string, strength: 12 | 18 | 24) {
    const appKeyPair = this.getAppKeyPair();
    const { privateKey } = appKeyPair;
    try {
      return await wallet.secret.creation.createSeedByCard(this.getTransport(), appId, privateKey, strength);
    } catch (e) {
      throw RNApduError.parseError(e as Error);
    }
  }
}
