import { RNApduError } from '@src/features/ble/RNApduError';
import { RNApduManager } from '@src/features/ble/RNApduManager';
import { useInitApduEffect } from '@src/features/home/usecases/useCardPairingUseCase';
import { useLogUseCase } from '@src/features/home/usecases/useLogUseCase';
import { generateRandomPassword } from '@src/features/home/utils/RandomUtils';
import { useAppId } from '@src/features/store/account/AccountActionHooks';
import { useCardId } from '@src/features/store/device/DeviceActionHooks';
import { useState } from 'react';

export interface RegisterInfo {
  deviceName: string;
  password: string;
  appId: string;
}

interface RegisterDeviceOutput {
  log?: string;
  appId?: string;
  isRegistering: boolean;
  registerDevice: (deviceName?: string, password?: string) => Promise<RegisterInfo | undefined>;
}
export function useRegisterDeviceUseCase(): RegisterDeviceOutput {
  const cardId = useCardId();
  const appId = useAppId(cardId);
  const [isRegistering, setIsRegistering] = useState(false);
  const { log, addLog } = useLogUseCase();

  useInitApduEffect();

  const registerDevice = async (deviceName?: string, pairingPassword?: string) => {
    try {
      setIsRegistering(true);
      const deviceId = deviceName || cardId;
      const password = pairingPassword || generateRandomPassword();
      addLog(`REGISTRATION BEGIN, PLEASE PRESS THE CARD TO CONTINUE`);
      const appId = await RNApduManager.getInstance().registerDevice(deviceId, password);
      addLog(`REGISTERED SUCCESS, PASSWORD: ${password}`);
      return {
        deviceName: deviceId,
        password,
        appId,
      };
    } catch (e) {
      const error = e as RNApduError;
      console.log('error?.errorCode=', error?.errorCode);
      switch (error?.errorCode) {
        case '6985':
          addLog(
            'PAIRING DEVICE DENIED, PLEASE INSERT THE PAIRING PASSWORD AND REGISTER AGAIN.\n\nYOU CAN GET THE PAIRING PASSWORD FROM ANY DEVICE YOU HAVE PAIRED',
          );
          break;
        case '6A84':
          addLog('REACHED THE LIMIT OF 3 DEVICES');
          break;
        case '6A80':
          addLog('THIS DEVICE IS ALREADY REGISTERED');
          break;
        default:
          addLog(`REGISTERED FAILED >>> ${e}`);
          break;
      }
    } finally {
      setIsRegistering(false);
    }
  };

  return {
    log,
    appId,
    isRegistering,
    registerDevice,
  };
}
