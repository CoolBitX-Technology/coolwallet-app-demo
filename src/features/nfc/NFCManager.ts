import NfcManager, { NfcTech, Ndef, TagEvent, NfcEvents } from 'react-native-nfc-manager';

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
  
  async getTag() {
    return await NfcManager.getTag();
  }

  async requestNdefTechnology() {
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);
      console.log('NfcTech.Ndef requested successfully');
    } catch (error) {
      console.error('Failed to request NfcTech.Ndef:', error);
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

  async writeData(data: string) {
    try {
      const bytes = Ndef.encodeMessage([Ndef.textRecord(data)]);
      if (bytes) {
        await NfcManager.ndefHandler.writeNdefMessage(bytes);
        console.log('NFC data written successfully');
      }
    } catch (error) {
      console.error('Failed to write NFC data:', error);
      throw error;
    }
  }

  setTagDiscoveredListener(listener: (tag: TagEvent) => void) {
    try {
      NfcManager.setEventListener(NfcEvents.DiscoverTag, listener);
      console.log('Tag discovered listener set successfully');
    } catch (error) {
      console.error('Failed to set tag discovered listener:', error);
    }
  }

  removeTagDiscoveredListener() {
    try {
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
      console.log('Tag discovered listener removed successfully');
    } catch (error) {
      console.error('Failed to remove tag discovered listener:', error);
    }
  }
}

export default new NFCManager();
