import NfcManager, { NfcTech, Ndef, NfcEvents } from 'react-native-nfc-manager';

class NFCManager {
  async start() {
    await NfcManager.start();
  }

  async requestNdefTechnology() {
    try {
      await NfcManager.requestTechnology([NfcTech.Ndef]);
      const tag = await NfcManager.getTag();
      return tag;
    } catch (err) {
      console.error(err);
    } finally {
      NfcManager.cancelTechnologyRequest();
    }
  }

  async stop() {
    NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
  }

  async connect() {
    return await this.requestNdefTechnology();
  }

  async disconnect() {
    await NfcManager.cancelTechnologyRequest();
  }

  async readData() {
    try {
      await this.requestNdefTechnology();
      const tag = await NfcManager.getTag();
      if (tag && tag.ndefMessage) {
        const ndefRecords = tag.ndefMessage;
        return ndefRecords.map(record => {
          const payload = record.payload instanceof Uint8Array ? record.payload : new Uint8Array(record.payload);
          return Ndef.text.decodePayload(payload);
        });
      }
      return null;
    } catch (error) {
      console.error('Failed to read NFC:', error);
      throw error;
    } finally {
      await NfcManager.cancelTechnologyRequest();
    }
  }

  async writeData(data: string) {
    try {
      await this.requestNdefTechnology();
      const bytes = Ndef.encodeMessage([Ndef.textRecord(data)]);
      if (bytes) {
        await NfcManager.ndefHandler.writeNdefMessage(bytes); 
      }
    } catch (error) {
      console.error('Failed to write NFC:', error);
      throw error;
    } finally {
      await NfcManager.cancelTechnologyRequest();
    }
  }

  startScan(callback: (data: any) => void) {
    NfcManager.setEventListener(NfcEvents.DiscoverTag, callback);
    NfcManager.requestTechnology([NfcTech.Ndef]).catch(() => {});
  }

  stopScan() {
    NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
    NfcManager.cancelTechnologyRequest().catch(() => {});
  }
}

export default new NFCManager();
