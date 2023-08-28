import { RNApduErrorCode } from '@src/features/ble/RNApduError';
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
  isRefreshing: boolean;
  pairPassword: string;
  registerCard: (cardId?: string, pairingPassword?: string) => Promise<void>;
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
  const registerCard = async (cardId?: string, pairingPassword?: string) => {
    if (!cardId) return;
    setIsRegistering(true);
    const password = pairingPassword || generateRandomPassword();
    console.log('cardId >>> ' + cardId);
    console.log('password >>> ' + password);
    try {
      updateLog(`REGISTRATION BEGIN, PLEASE PRESS THE CARD TO CONTINUE`);
      const appId = await RNApduManager.getInstance().registerDevice(cardId, password);
      changeAppInfo(cardId, appId, password);
      changePairedPassword(cardId, pairPassword);
      updateLog(`REGISTERED SUCCESS`);
    } catch (e) {
      if (e.errorCode === RNApduErrorCode.REGISTER_FAIL) {
        updateLog(
          'PAIRING DEVICE DENIED, PLEASE INSERT THE PAIRING PASSWORD AND REGISTER AGAIN. YOU CAN GET THE PAIRING PASSWORD FROM ANY DEVICE YOU HAVE PAIRED',
        );
        return;
      }
      updateLog(`REGISTERED FAILED >>> ${e}`);
    } finally {
      setIsRegistering(false);
    }
  };

  const [isReseting, setIsResting] = useState(false);
  const resetCard = async (cardId?: string) => {
    if (!cardId) return;
    setIsResting(true);
    try {
      updateLog(`PLEASE PRESS THE CARD TO RESET`);
      await RNApduManager.getInstance().resetDevice();
      clearAppInfo(cardId);
      updateLog('RESET SUCCESS');
    } catch (e) {
      updateLog(`RESET FAILED >>> ${e}`);
    } finally {
      setIsResting(false);
    }
  };

  const [isRefreshing, setIsRefereshing] = useState(false);
  const refreshPairPassword = async (cardId?: string) => {
    if (!appId) return;
    setIsRefereshing(true);
    updateLog('REFRESHING....');
    const newPairedPassword = await RNApduManager.getInstance().getPairPassword(appId);
    if (!cardId) return;
    setIsRefereshing(false);
    updateLog('REFRESHED SUCCESS');
    changePairedPassword(cardId, newPairedPassword);
  };

  return {
    appId,
    pairPassword,
    isReseting,
    isRefreshing,
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
