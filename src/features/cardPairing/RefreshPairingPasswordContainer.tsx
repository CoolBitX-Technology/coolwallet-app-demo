import { RNApduManager } from '@src/features/ble/RNApduManager';
import { DemoView } from '@src/features/components/DemoView';
import { useInitApduEffect } from '@src/features/home/usecases/useCardPairingUseCase';
import { useLogUseCase } from '@src/features/home/usecases/useLogUseCase';
import { useAppId, useDispatchChangePairedPassword, usePairedPassword } from '@src/features/store/account/AccountActionHooks';
import { useCardId, useIsConnected } from '@src/features/store/device/DeviceActionHooks';
import { useState } from 'react';

export function RefreshPairingPasswordContainer() {
  const isConnected = useIsConnected();
  const changePairedPassword = useDispatchChangePairedPassword();
  const pairPassword = usePairedPassword();
  const appId = useAppId();
  const cardId = useCardId();
  const { log, addLog } = useLogUseCase();
  const isBtnDisable = !cardId || !isConnected || !pairPassword;
  const [isRefreshing, setIsRefereshing] = useState(false);

  useInitApduEffect();

  const refreshPairPassword = async () => {
    if (!appId || isBtnDisable) return;
    setIsRefereshing(true);
    addLog('REFRESHING....');
    const newPairedPassword = await RNApduManager.getInstance().getPairPassword(appId);
    setIsRefereshing(false);
    addLog('REFRESHED SUCCESS');
    changePairedPassword(cardId, newPairedPassword);
  };

  return (
    <DemoView
      btnText="Refresh"
      log={log}
      isBtnDisable={isBtnDisable}
      onPressBtn={() => refreshPairPassword()}
      textBoxBody={pairPassword}
      textBoxPlaceHolder="Your Pairing Password"
      isBtnLoading={isRefreshing}
      showInput={false}
      showCopy={false}
    />
  );
}
