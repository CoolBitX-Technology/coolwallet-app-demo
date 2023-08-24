import { RNApduManager } from '@src/features/ble/RNApduManager';
import { useBleTransport } from '@src/features/ble/usecases/useConnectBleUseCase';
import { useAppKeyPair } from '@src/features/home/DemoAppHomeContainer';
import { generateRandomPassword } from '@src/features/home/utils/RandomUtils';
import {
  useAppId,
  useDispatchChangeAppInfo,
  useDispatchChangePairedPassword,
  useDispatchClearAppId,
  usePairedPassword,
} from '@src/features/store/account/AccountActionHooks';
import { useDispatchLogChange } from '@src/features/store/log/LogActionHooks';
import { useEffect, useState } from 'react';

interface CardPairingOutput {
  appId: string;
  isPaired: boolean;
  isRegistering: boolean;
  isReseting: boolean;
  pairPassword: string;
  registerCard: (cardId?: string) => Promise<void>;
  resetCard: (cardId?: string) => Promise<void>;
  refreshPairPassword: (cardId?: string) => Promise<void>;
}
export function useCardPairingUseCase(): CardPairingOutput {
  const updateLog = useDispatchLogChange();
  const changeAppInfo = useDispatchChangeAppInfo();
  const clearAppInfo = useDispatchClearAppId();
  const changePairedPassword = useDispatchChangePairedPassword();
  const appId = useAppId();
  const pairPassword = usePairedPassword();

  useInitApduEffect();

  const [isRegistering, setIsRegistering] = useState(false);
  const registerCard = async (cardId?: string) => {
    if (!cardId) return;
    setIsRegistering(true);
    const password = generateRandomPassword();
    console.log('cardId >>> ' + cardId);
    console.log('password >>> ' + password);
    try {
      updateLog(``);
      const appId = await RNApduManager.getInstance().registerDevice(cardId, password);
      changeAppInfo(cardId, appId, password);
      updateLog(`REGISTER SUCCESS`);
    } catch (e) {
      updateLog(`REGISTER FAILED >>> ${e}`);
    } finally {
      setIsRegistering(false);
    }
  };

  const [isReseting, setIsResting] = useState(false);
  const resetCard = async (cardId?: string) => {
    if (!cardId) return;
    setIsResting(true);
    try {
      updateLog(``);
      await RNApduManager.getInstance().resetDevice();
      clearAppInfo(cardId);
      updateLog('RESET SUCCESS');
    } catch (e) {
      updateLog(`RESET FAILED >>> ${e}`);
    } finally {
      setIsResting(false);
    }
  };

  const refreshPairPassword = async (cardId?: string) => {
    if (!appId) return;
    const newPairedPassword = await RNApduManager.getInstance().getPairPassword(appId);
    if (!cardId) return;
    changePairedPassword(cardId, newPairedPassword);
  };

  return {
    appId,
    pairPassword,
    isReseting,
    isRegistering,
    isPaired: !!pairPassword,
    registerCard,
    resetCard,
    refreshPairPassword,
  };
}

export function useInitApduEffect() {
  const appKeyPair = useAppKeyPair();
  const transport = useBleTransport();
  useEffect(() => {
    if (!transport || !appKeyPair) return;
    RNApduManager.getInstance().init(transport, appKeyPair);
  }, [transport, appKeyPair]);
}
