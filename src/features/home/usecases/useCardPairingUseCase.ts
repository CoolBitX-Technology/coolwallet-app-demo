import { RNApduManager } from '@src/features/ble/RNApduManager';
import { useBleTransport } from '@src/features/ble/usecases/useConnectBleUseCase';
import { useAppKeyPair } from '@src/features/home/DemoAppHomeContainer';
import { useEffect } from 'react';

export function useInitApduEffect() {
  const appKeyPair = useAppKeyPair();
  const transport = useBleTransport();
  useEffect(() => {
    if (!transport || !appKeyPair) return;
    RNApduManager.getInstance().init(transport, appKeyPair);
  }, [transport, appKeyPair]);
}
