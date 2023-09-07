import { RNApduError } from '@src/features/ble/RNApduError';
import { RNApduManager } from '@src/features/ble/RNApduManager';
import { DemoView } from '@src/features/components/DemoView';
import { useInitApduEffect } from '@src/features/home/usecases/useCardPairingUseCase';
import { generateRandomPassword } from '@src/features/home/utils/RandomUtils';
import {
    useAppId,
  useDispatchChangeAppInfo,
  useDispatchChangePairedPassword,
  usePairedPassword,
} from '@src/features/store/account/AccountActionHooks';
import { useCardId, useIsConnected } from '@src/features/store/device/DeviceActionHooks';
import { useState } from 'react';

export function RegisterCardContainer(): JSX.Element {
  const cardId = useCardId();
  const appId = useAppId();
  const isConnected = useIsConnected();
  const pairedPassword = usePairedPassword();
  const [pairingPassword, setPairingPassword] = useState(pairedPassword);
  const [isRegistering, setIsRegistering] = useState(false);
  const [log, setLog] = useState('');
  const changeAppInfo = useDispatchChangeAppInfo();
  const changePairedPassword = useDispatchChangePairedPassword();

  useInitApduEffect();

  const registerCard = async () => {
    try {
      setIsRegistering(true);
      const password = pairingPassword || generateRandomPassword();
      setLog(`REGISTRATION BEGIN, PLEASE PRESS THE CARD TO CONTINUE`);
      const appId = await RNApduManager.getInstance().registerDevice(cardId, password);
      changeAppInfo(cardId, appId, password);
      changePairedPassword(cardId, password);
      setLog(`REGISTERED SUCCESS`);
    } catch (e) {
      const error = e as RNApduError;
      if (error?.errorCode === '6985') {
        setLog(
          'PAIRING DEVICE DENIED, PLEASE INSERT THE PAIRING PASSWORD AND REGISTER AGAIN.\n\nYOU CAN GET THE PAIRING PASSWORD FROM ANY DEVICE YOU HAVE PAIRED',
        );
        return;
      }
      setLog(`REGISTERED FAILED >>> ${e}`);
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <DemoView
      log={log}
      input={pairingPassword}
      isBtnLoading={isRegistering}
      textBoxBody={appId}
      showCopy={false}
      onPressBtn={registerCard}
      isBtnDisable={!isConnected}
      inputPlaceHolder="Pairing Password"
      btnText="Register"
      onInputChanged={setPairingPassword}
    />
  );
}
