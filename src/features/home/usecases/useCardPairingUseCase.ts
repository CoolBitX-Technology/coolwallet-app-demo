import { RNApduManager } from '@src/features/ble/RNApduManager';
import { useBleTransport } from '@src/features/ble/usecases/useConnectBleUseCase';
import { useLoadAppKeyPairUseCase } from '@src/features/cardPairing/usecases/useLoadAppKeyPairUseCase';
import { useTransportType } from '@src/features/store/device/DeviceActionHooks';
import { TransportType } from '@src/features/store/device/DeviceTypes';
import { useEffect } from 'react';

export function useInitApduEffect() {
  const { appKeyPair } = useLoadAppKeyPairUseCase();
  const bleTransport = useBleTransport();
  // const httpTransport = useHttpTransport();
  const type = useTransportType();
  useEffect(() => {
    if (!appKeyPair) return;
    if (type === TransportType.Bluetooth && bleTransport) RNApduManager.getInstance().init(bleTransport, appKeyPair);
    // if (type === TransportType.Http && httpTransport) RNApduManager.getInstance().init(httpTransport, appKeyPair);
  }, [type, bleTransport, appKeyPair]);
}
