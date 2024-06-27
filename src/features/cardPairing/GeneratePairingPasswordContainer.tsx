import { RNApduError } from '@src/features/ble/RNApduError';
import { RNApduManager } from '@src/features/ble/RNApduManager';
import { DemoView } from '@src/features/components/DemoView';
import { useInitApduEffect } from '@src/features/home/usecases/useCardPairingUseCase';
import { useLogUseCase } from '@src/features/home/usecases/useLogUseCase';
import { useAppId, usePairedPassword } from '@src/features/store/account/AccountActionHooks';
import { useCardId, useIsConnected } from '@src/features/store/device/DeviceActionHooks';
import { useState } from 'react';

export function GeneratePairingPasswordContainer() {
  const isConnected = useIsConnected();
  const cardId = useCardId();
  const defaultPairPassword = usePairedPassword(cardId);
  const [pairPassword, setPairPassword] = useState(defaultPairPassword);
  const appId = useAppId(cardId);
  const { log, addLog } = useLogUseCase();
  const isBtnDisable = !cardId || !isConnected || !defaultPairPassword;
  const [isRefreshing, setIsRefereshing] = useState(false);

  useInitApduEffect();

  const generatePairPassword = async () => {
    if (!appId || isBtnDisable) return;
    setIsRefereshing(true);
    addLog('GENERATING....');
    RNApduManager.getInstance()
      .getPairPassword(appId)
      .then((newPassword) => {
        setPairPassword(newPassword);
        addLog('GENERATED SUCCESS, PLEASE COPY NEW PAIR PASSWORD AND GO TO REFRESH APP KEY PAIR');
      })
      .catch((e) => {
        const error = e as RNApduError;
        addLog('GENERATED FAILED >>> ERROR=' + error);
      })
      .finally(() => setIsRefereshing(false));
  };

  return (
    <DemoView
      btnText="Generate"
      log={log}
      isBtnDisable={isBtnDisable}
      onPressBtn={() => generatePairPassword()}
      textBoxBody={pairPassword}
      textBoxPlaceHolder="Your Pairing Password"
      isBtnLoading={isRefreshing}
      showInput={false}
      showTextBox={!!pairPassword}
      showCopy={defaultPairPassword !== pairPassword}
    />
  );
}
