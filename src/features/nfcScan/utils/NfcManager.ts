import NfcManager, { NfcTech, TagEvent } from 'react-native-nfc-manager';

export class NFCManager {
  private static instance: NFCManager;

  private isRequested: boolean = false;

  private constructor() {
    this.start();
  }

  static getInstance() {
    if (!this.instance) this.instance = new NFCManager();
    return this.instance;
  }

  private async start(): Promise<void> {
    try {
      await NfcManager.start(); // Pre-step, call this before any NFC operations, ref: https://github.com/revtel/react-native-nfc-manager
      console.log('NFCManager.start is ok.');
    } catch (e) {
      console.error(`NFCManager.start is failed. e=${e}`);
    }
  }

  async isEnabled(): Promise<boolean> {
    try {
      const isEnabled = await NfcManager.isEnabled();
      console.log(`NFCManager.isEnabled is ok. isEnabled=${isEnabled}`);
      return isEnabled;
    } catch (e) {
      console.error(`NFCManager.isEnabled is failed. e=${e}`);
      return false;
    }
  }

  async isSupported(): Promise<boolean> {
    try {
      const isSupported = await NfcManager.isSupported();
      console.log(`NFCManager.isSupported is ok. isSupported=${isSupported}`);
      return isSupported;
    } catch (e) {
      console.error(`NFCManager.isSupported is failed. e=${e}`);
      return false;
    }
  }

  async getTags(): Promise<TagEvent | undefined> {
    try {
      const tags = await NfcManager.getTag();
      console.log(`NFCManager.getTags is ok. tags=${JSON.stringify(tags)}`);

      if (tags) return tags;
    } catch (e) {
      console.error(`NFCManager.getTags is failed. e=${e}`);
    }
  }

  async requestTechnology(nfcTech: NfcTech = NfcTech.IsoDep): Promise<void> {
    if (this.isRequested) return;

    this.isRequested = true;

    try {
      await NfcManager.requestTechnology(nfcTech);
      console.log(`NFCManager.requestTechnology is ok.`);
    } catch (e) {
      console.error(`NFCManager.requestTechnology is failed. e=${e}`);
    }
  }

  async cancelTechnologyRequest(): Promise<void> {
    if (!this.isRequested) return;

    this.isRequested = false;

    try {
      await NfcManager.cancelTechnologyRequest();
      console.log(`NFCManager.cancelTechnologyRequest is ok.`);
    } catch (e) {
      console.error(`NFCManager.cancelTechnologyRequest is failed. e=${e}`);
    }
  }
}
