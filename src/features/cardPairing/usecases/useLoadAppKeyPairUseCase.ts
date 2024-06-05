import { AppKeyPair, loadAppKeyPair } from '@src/features/ble/utils/StorageUtils';
import { useLogUseCase } from '@src/features/home/usecases/useLogUseCase';
import { useDispatchClearAppInfo } from '@src/features/store/account/AccountActionHooks';
import { useCardId } from '@src/features/store/device/DeviceActionHooks';
import { useEffect, useState } from 'react';

interface loadAppKeyPairOutput {
  log?: string;
  isReseting: boolean;
  appKeyPair?: AppKeyPair;
  resetAppKeyPair: () => void;
}
export function useLoadAppKeyPairUseCase(): loadAppKeyPairOutput {
  const { log, addLog } = useLogUseCase();
  const [appKeyPair, setAppKeyPair] = useState<AppKeyPair>();
  const [isReseting, setIsReseting] = useState(false);
  const cardId = useCardId();
  const clearAppInfo = useDispatchClearAppInfo();

  useEffect(() => {
    loadAppKeyPair().then(setAppKeyPair);
  }, []);

  const resetAppKeyPair = () => {
    setIsReseting(true);
    addLog('REFRESHING ....');
    loadAppKeyPair(true)
      .then((newAppKeyPair) => {
        setAppKeyPair(newAppKeyPair);
        clearAppInfo(cardId);
        addLog(`REFRESHED KEYPAIR: ${JSON.stringify(newAppKeyPair)}`);
        addLog(`AND CLEARED APP INFO`);
        addLog(`PLEASE REGISTER CARD AGAIN`);
      })
      .finally(() => setIsReseting(false));
  };

  return {
    log,
    appKeyPair,
    isReseting,
    resetAppKeyPair,
  };
}
