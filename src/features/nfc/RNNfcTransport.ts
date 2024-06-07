// src/features/nfc/RNNfcTransport.ts
import NfcManager from './NFCManager';
import RNNfcError from './RNNfcError';

class RNNfcTransport {
  async readData() {
    try {
      await this.connect();
      const data = await NfcManager.readData();
      console.log('read NFC',data)
      return data;
    } catch (error) {
      const errorMsg = `Failed to read NFC: ${error}`;
      console.error(errorMsg);
      throw new RNNfcError(errorMsg);
    }
  }

  async writeData(data: string) {
    try {
      await this.connect();
      await NfcManager.writeData(data);
    } catch (error) {
      const errorMsg = `Failed to write NFC: ${error}`;
      console.error(errorMsg);
      throw new RNNfcError(errorMsg);
    }
  }

  async connect() {
    try {
      await NfcManager.connect();
    } catch (error) {
      const errorMsg = `Failed to connect to NFC: ${error}`;
      console.error(errorMsg);
      throw new RNNfcError(errorMsg);
    }
  }

  async disconnect() {
    try {
      await NfcManager.disconnect();
    } catch (error) {
      const errorMsg = `Failed to disconnect from NFC: ${error}`;
      console.error(errorMsg);
      throw new RNNfcError(errorMsg);
    }
  }

  startScan(callback: (data: any) => void) {
    try {
      NfcManager.startScan(callback);
    } catch (error) {
      const errorMsg = `Failed to start NFC scan: ${error}`;
      console.error(errorMsg);
      throw new RNNfcError(errorMsg);
    }
  }

  stopScan() {
    try {
      NfcManager.stopScan();
    } catch (error) {
      const errorMsg = `Failed to stop NFC scan: ${error}`;
      console.error(errorMsg);
      throw new RNNfcError(errorMsg);
    }
  }
}

export default new RNNfcTransport();
