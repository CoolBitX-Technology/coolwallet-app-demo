import { NFCManager } from '@src/features/nfcScan/utils/NfcManager';
import { useTransportType } from '@src/features/store/device/DeviceActionHooks';
import { TransportType } from '@src/features/store/device/DeviceTypes';
import { useRef } from 'react';

interface Output {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}
export function useConnectCardUseCase(): Output {
  const transportType = useTransportType();

  const nfcConnection = useNfcConnection();

  if (transportType === TransportType.NFC) {
    return nfcConnection;
  }

  return {
    connect: async () => {
      console.log(`Not Implemented Connection by transportType=${transportType}.`);
    },
    disconnect: async () => {
      console.log(`Not Implemented Connection by transportType=${transportType}.`);
    },
  };
}

function useNfcConnection() {
  const nfcManagerRef = useRef(new NFCManager());

  const connect = async () => {
    await nfcManagerRef.current.requestTechnology();
  };

  const disconnect = async () => {
    await nfcManagerRef.current.cancelTechnologyRequest();
  };

  return { connect, disconnect };
}
