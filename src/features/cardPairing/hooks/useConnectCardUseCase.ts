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
  const nfcManager = NFCManager.getInstance();

  const connect = async () => {
    await nfcManager.requestTechnology();
  };

  const disconnect = async () => {
    await nfcManager.cancelTechnologyRequest();
  };

  return { connect, disconnect };
}
