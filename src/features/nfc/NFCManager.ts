import { hexStringToNumberArray, numberArrayToHexString } from '@src/features/nfc/util';
import NfcManager, { NfcTech, TagEvent, NfcEvents, Ndef } from 'react-native-nfc-manager';

class NFCManager {
  constructor() {
     // Pre-step, call this before any NFC operations, ref: https://github.com/revtel/react-native-nfc-manager
    this.start();
  }

  async start() {
    try {
      await NfcManager.start();
      console.log('NfcManager started successfully');
    } catch (error) {
      console.error('Failed to start NfcManager:', error);
    }
  }
  
  async isEnabled():Promise<boolean> {
    try {
      return NfcManager.isEnabled();
    } catch (error) {
      console.error('Failed to check if NfcManager is enabled:', error);
      return false;
    }
  }

  async getTag() {
    return await NfcManager.getTag();
  }

  async requestNdefTechnology() {
    try {
      console.log('await NfcTech.Ndef request...');
      await NfcManager.requestTechnology(NfcTech.Ndef);
      console.log('NfcTech.Ndef requested successfully');
    } catch (error) {
      console.error('Failed to request NfcTech.Ndef:', error);
      throw error;
    }
  }

  async requestIsoDepTechnology() {
    try {
      console.log('await NfcTech.IsoDep request...');
      await NfcManager.requestTechnology(NfcTech.IsoDep ,{
        alertMessage: 'Ready to write NFC tags!'
      });
      console.log('NfcTech.IsoDep requested successfully');
    } catch (error) {
      console.error('Failed to request NfcTech.IsoDep:', error);
      throw error;
    }
  }

  async cancelTechnologyRequest() {
    try {
      await NfcManager.cancelTechnologyRequest();
      console.log('NfcTech request canceled successfully');
    } catch (error) {
      console.error('Failed to cancel NfcTech request:', error);
    }
  }

  async readData(tag: TagEvent): Promise<string | null> {
    try {
      if (tag.ndefMessage) {
        const ndefRecords = tag.ndefMessage;
        return ndefRecords.map(record => {
          const payload = record.payload instanceof Uint8Array ? record.payload : new Uint8Array(record.payload);
          return Ndef.text.decodePayload(payload);
        }).join(' ');
      } else {
        return tag.id!;
      }
    } catch (error) {
      console.error('Failed to read NFC data:', error);
      throw error;
    }
  }

  async writeData(data: string):Promise<string> {
    try {
      const apduCommand = hexStringToNumberArray(data);
      const response = await NfcManager.isoDepHandler.transceive(apduCommand);
      const responseHex = numberArrayToHexString(response)
      console.log('Response from NFC:',responseHex );
      return responseHex;
    } catch (error) {
      console.error('Failed to write NFC data:', error);
      throw error;
    }
  }

  registerTagEvent(listener: (tag: TagEvent) => void) {
    try {
      NfcManager.setEventListener(NfcEvents.DiscoverTag, listener);
      console.log('Register tag listener set successfully');
    } catch (error) {
      console.error('Failed to set tag discovered listener:', error);
    }
  }

  unregisterTagEvent() {
    try {
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
      console.log('Unregister tag event successfully');
    } catch (error) {
      console.error('Failed to remove tag discovered listener:', error);
    }
  }

}

export default new NFCManager();
