// src/features/nfc/RNNfcTransport.ts
import { TagEvent } from 'react-native-nfc-manager';
import NfcManager from './NFCManager';
import RNNfcError from './RNNfcError';

class RNNfcTransport {
  
  async connect(onTagDiscovered: (tag: TagEvent) => void) {
    try {
      console.log('execute connect..')
      await NfcManager.start();
      await NfcManager.requestNdefTechnology();
      const tag = await NfcManager.getTag();
      if(tag)onTagDiscovered(tag); 
    } catch (e) {
      const errorMsg = `Failed to connect to NFC tag: ${JSON.stringify(e)}`;
      console.error(errorMsg);
      throw new RNNfcError(errorMsg);
    }
  }

  async disconnect() {
    try {
      console.log('execute disconnect..')
      await NfcManager.cancelTechnologyRequest();
      NfcManager.removeTagDiscoveredListener();
      console.log('Disconnected from NFC tag successfully');
    } catch (e) {
      const errorMsg=`Failed to disconnect from NFC tag: ${JSON.stringify(e)}`;
      console.error(errorMsg);
      throw new RNNfcError(errorMsg);
    }
  }

 
  async readData(tag: TagEvent): Promise<string | null> {
    try {
      const data = await NfcManager.readData(tag);
      console.log('NFC data read successfully:', data);
      return data;
    } catch (e) {
      const errorMsg = `Failed to read NFC data: ${JSON.stringify(e)}`;
      console.error(errorMsg);
      throw new RNNfcError(errorMsg);
    } finally {
      // await this.disconnect(); 
    }
  }

  async writeData(data: string) {
    try {
      await NfcManager.writeData(data);
    } catch (e) {
      const errorMsg = `Failed to write NFC data: ${JSON.stringify(e)}`;
      console.error(errorMsg);
      throw new RNNfcError(errorMsg);
    } finally {
      // await this.disconnect();
    }
  }
}

export default new RNNfcTransport();
