// src/features/nfc/RNNfcTransport.ts
import { NfcEvents, TagEvent } from 'react-native-nfc-manager';
import NfcManager from './NFCManager';
import RNNfcError from './RNNfcError';

class RNNfcTransport {

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
      await NfcManager.requestNdefTechnology();
      NfcManager.setTagDiscoveredListener(onTagDiscovered);
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

      if (removeListener) {
        NfcManager.removeTagDiscoveredListener();
        console.log('NFC listener removed');
      }      

      console.log('Disconnected from NFC tag successfully');
    } catch (e) {
      const errorMsg=`Failed to disconnect from NFC tag: ${JSON.stringify(e)}`;
      console.error(errorMsg);
      throw new RNNfcError(errorMsg);
    }
  }

 
  async readData(tag: TagEvent): Promise<string | null> {
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
      NfcManager.cancelTechnologyRequest();
    }
  }

  async writeData(data: string) {
    try {
      console.log('execute writeData..')
      await NfcManager.writeData(data);
    } catch (e) {
      const errorMsg = `Failed to write NFC data: ${JSON.stringify(e)}`;
      console.error(errorMsg);
      throw new RNNfcError(errorMsg);
    } finally {
      NfcManager.cancelTechnologyRequest();
    }
  }
}

export default new RNNfcTransport();
