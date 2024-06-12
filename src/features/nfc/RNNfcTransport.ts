// src/features/nfc/RNNfcTransport.ts
import { NfcEvents, TagEvent } from 'react-native-nfc-manager';
import NfcManager from './NFCManager';
import RNNfcError from './RNNfcError';

class RNNfcTransport {
  isNdefTechnologyRequested: boolean;
  isIsoDepTechnologyRequested: boolean;
  constructor() {
    this.isNdefTechnologyRequested = false;
    this.isIsoDepTechnologyRequested = false
  }

  async startNfc() {
    try {
      return await NfcManager.isEnabled();
    } catch (e) {
      const errorMsg = `Failed to start NFC: ${JSON.stringify(e)}`;
      console.error(errorMsg);
      return false;
    }
  }

  async connect(onTagDiscovered: (tag: TagEvent) => void) {
    try {
      console.log('execute connect..')
      await NfcManager.start();
      if (!this.isNdefTechnologyRequested) {
        await NfcManager.requestNdefTechnology();
        this.isNdefTechnologyRequested = true;
      }
      NfcManager.registerTagEvent(onTagDiscovered);
      const tag = await NfcManager.getTag();
      if(tag)
        onTagDiscovered(tag); 
    } catch (e) {
      const errorMsg = `Failed to connect to NFC tag: ${JSON.stringify(e)}`;
      console.error(errorMsg);
      throw new RNNfcError(errorMsg);
    }
  }

  async disconnect(removeListener = false) {
    try {
      console.log('execute disconnect..')
      await NfcManager.cancelTechnologyRequest();
      this.isNdefTechnologyRequested = false;
      NfcManager.unregisterTagEvent();
      console.log('NFC listener removed');
      console.log('Disconnected from NFC tag successfully');
    } catch (e) {
      const errorMsg=`Failed to disconnect from NFC tag: ${JSON.stringify(e)}`;
      console.error(errorMsg);
      throw new RNNfcError(errorMsg);
    }
  }
 
  async readData(tag: TagEvent, onTagDiscovered: (tag: TagEvent) => void): Promise<string | null> {
    try {
      console.log('execute readData..')
      const data = await NfcManager.readData(tag);
      console.log('NFC data read successfully:', data);
      return data;
    } catch (e) {
      const errorMsg = `Failed to read NFC data: ${JSON.stringify(e)}`;
      console.error(errorMsg);
      throw new RNNfcError(errorMsg);
    } finally {
     // Reconnect after a short delay to avoid race conditions
     await this.disconnect(true);
    //  setTimeout(async () => {
    //    await this.connect(onTagDiscovered);
    //  }, 1000); 
    }
  }

  async writeData(data: string, onTagDiscovered: (tag: TagEvent) => void) {
    try {
      console.log('execute writeData..')
      await NfcManager.start();
      if(!this.isIsoDepTechnologyRequested){
        await NfcManager.requestIsoDepTechnology();
        this.isIsoDepTechnologyRequested = true;
      }
      return await NfcManager.writeData(data);
    } catch (e) {
      const errorMsg = `Failed to write NFC data: ${JSON.stringify(e)}`;
      console.error(errorMsg);
      throw new RNNfcError(errorMsg);
    } finally {
      // Reconnect after a short delay to avoid race conditions
      // await this.disconnect(true);
      // await this.connect(onTagDiscovered);
      // setTimeout(async () => {
      //   await this.connect(onTagDiscovered);
      // }, 1000); 
    }
  }
}

export default new RNNfcTransport();
