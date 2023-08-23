import crypto from 'crypto';
import { Transport, apdu, config, utils } from '@coolwallet/core';
import { AppKeyPair } from '@src/features/ble/utils/StorageUtils';
import { RNApduError, RNApduErrorCode } from '@src/features/ble/RNApduError';

interface ApduManager {
  init(transport: Transport, appKeyPair: AppKeyPair): void;
  isInitialize(): boolean;
  registerDevice(name: string, password: string): Promise<string>;
  getPairPassword(appId: string): Promise<string>;
  resetDevice(): Promise<boolean>;
  createMnemonic(): Promise<string>;
  recoverWallet(appId: string, mnemonic: string): Promise<void>;
  sign(appId: string, message: string): Promise<string>;
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
    if (!this.isInitialize()) throw new RNApduError(RNApduErrorCode.NOT_INITIALIZE, 'RNApduManager is not initialzie');
    return this.transport as Transport;
  }

  private getAppKeyPair() {
    if (!this.isInitialize()) throw new RNApduError(RNApduErrorCode.NOT_INITIALIZE, 'RNApduManager is not initialzie');
    return this.appKeyPair as AppKeyPair;
  }

  private async getSEPublicKey(): Promise<string> {
    if (!this.isInitialize()) throw new RNApduError(RNApduErrorCode.NOT_INITIALIZE, 'RNApduManager is not initialzie');
    return await config.getSEPublicKey(this.getTransport());
  }

  async registerDevice(name: string, password: string): Promise<string> {
    const appKeyPair = this.getAppKeyPair();
    const { publicKey } = appKeyPair;
    const sePublicKey = await this.getSEPublicKey();
    try {
      return await apdu.pair.register(this.getTransport(), publicKey, password, name, sePublicKey);
    } catch (e) {
      throw new RNApduError(RNApduErrorCode.REGISTER_FAIL, `Register device failed, error: ${e}`);
    }
  }

  async resetDevice(): Promise<boolean> {
    try {
      const status = await apdu.general.resetCard(this.getTransport());
      return status;
    } catch (e) {
      throw new RNApduError(RNApduErrorCode.RESET_FAIL, `Reset device failed, error: ${e}`);
    }
  }

  async getPairPassword(appId: string): Promise<string> {
    const appKeyPair = this.getAppKeyPair();
    const { privateKey } = appKeyPair;
    try {
      return await apdu.pair.getPairingPassword(this.getTransport(), appId, privateKey);
    } catch (e) {
      throw new RNApduError(RNApduErrorCode.NOT_REGISTER, `Get device's paired password failed, error: ${e}`);
    }
  }

  async createMnemonic(worldLength = WordLength.WORD_12): Promise<string> {
    try {
      return await utils.createSeedByApp(worldLength, crypto.randomBytes);
    } catch (e) {
      throw new RNApduError(RNApduErrorCode.CREATE_MNEMONIC_FAIL, `Create mnemonic failed, error: ${e}`);
    }
  }

  async recoverWallet(appId: string, mnemonic: string): Promise<void> {
    const appKeyPair = this.getAppKeyPair();
    const { privateKey } = appKeyPair;
    const sePublicKey = await this.getSEPublicKey();
    try {
      return await utils.createWalletByMnemonic(this.getTransport(), appId, privateKey, mnemonic, sePublicKey);
    } catch (e) {
      throw new RNApduError(RNApduErrorCode.RECOVER_WALLET_FAIL, `Recover wallet failed, error: ${e}`);
    }
  }

  sign(appId: string, message: string): Promise<string> {
    const appKeyPair = this.getAppKeyPair();
    const { privateKey } = appKeyPair;
    throw new Error('Method not implemented.');
  }
}

export enum WordLength {
  WORD_12 = 12,
  WORD_18 = 18,
  WORD_24 = 24,
}
