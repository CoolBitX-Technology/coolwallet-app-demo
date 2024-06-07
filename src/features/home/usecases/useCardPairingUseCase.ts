import { Transport } from '@coolwallet/core';
import { RNApduManager } from '@src/features/ble/RNApduManager';
import { useBleTransport } from '@src/features/ble/usecases/useConnectBleUseCase';
import { useLoadAppKeyPairUseCase } from '@src/features/cardPairing/usecases/useLoadAppKeyPairUseCase';
import { useTransportType } from '@src/features/store/device/DeviceActionHooks';
import { TransportType } from '@src/features/store/device/DeviceTypes';
import { useEffect } from 'react';

export function useInitApduEffect() {
  const { appKeyPair } = useLoadAppKeyPairUseCase();
  const transport = useTransport();
  useEffect(() => {
    if (!appKeyPair || !transport) return;
    RNApduManager.getInstance().init(transport, appKeyPair);
  }, [transport, appKeyPair]);
}

export function useTransport(): Transport | undefined {
  const bleTransport = useBleTransport();
  const type = useTransportType();
  // const httpTransport = useHttpTransport();
  if (type === TransportType.Bluetooth) return bleTransport;
  // if (type === TransportType.Http) return httpTransport;
}
