import { RNApduManager } from '@src/features/ble/RNApduManager';
import { useBleTransport } from '@src/features/ble/usecases/useConnectBleUseCase';
import { useLoadAppKeyPairUseCase } from '@src/features/cardPairing/usecases/useLoadAppKeyPairUseCase';
import { useEffect } from 'react';

export function useInitApduEffect() {
  const { appKeyPair } = useLoadAppKeyPairUseCase();
  const transport = useBleTransport();
  useEffect(() => {
    if (!transport || !appKeyPair) return;
    RNApduManager.getInstance().init(transport, appKeyPair);
  }, [transport, appKeyPair]);
}
