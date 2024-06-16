import { Transport, info } from '@coolwallet/core';
import { NfcTransport } from '@coolwallet/transport-react-native-nfc';
import { useLogUseCase } from '@src/features/home/usecases/useLogUseCase';
import { NFCManager } from '@src/features/nfcScan/utils/NfcManager';
import { useDispatchNfcInfo, useNfcInfo } from '@src/features/store/device/DeviceActionHooks';
import { useEffect, useState } from 'react';

export function useCreateNfcTransportUseCase() {
  const [loading, setLoading] = useState(false);
  const changeNfcInfo = useDispatchNfcInfo();

  const { log, addLog } = useLogUseCase();

  const connect = async () => {
    setLoading(true);

    const nfcManager = new NFCManager();

    try {
      const isEnabled = await nfcManager.isEnabled();
      addLog(`Successfully got isEnabled: ${isEnabled}`);

      const isSupported = await nfcManager.isSupported();
      addLog(`Successfully got isSupported: ${isSupported}`);

      addLog(`Waiting for NFC detection...`);
      await nfcManager.requestTechnology();

      const tags = await nfcManager.getTags();
      addLog(`Successfully got tags: ${JSON.stringify(tags, null, 2)}`);

      const transport = new NfcTransport();
      addLog(`Successfully created a transport.`);

      const cardIdHex = await info.getCardId(transport);
      const cardId = Buffer.from(cardIdHex, 'hex').toString();
      addLog(`Successfully got card id: ${cardId}`);

      changeNfcInfo(cardId);
      addLog(`Successfully saved nfc info. Please Go Back.`);
    } catch (e) {
      addLog(`${e}`);
    } finally {
      setLoading(false);
      await nfcManager.cancelTechnologyRequest();
    }
  };

  return {
    connect,
    log,
    loading,
  };
}

export function useNfcTransport() {
  const nfcInfo = useNfcInfo();
  const [transport, setTransport] = useState<Transport>();
  useEffect(() => {
    if (!nfcInfo) return;
    setTransport(new NfcTransport());
  }, [nfcInfo]);
  return transport;
}
