import { RNApduManager } from '@src/features/ble/RNApduManager';
import { DemoView } from '@src/features/components/DemoView';
import { useInitApduEffect } from '@src/features/home/usecases/useCardPairingUseCase';
import { useAppId, useDispatchChangePairedPassword, usePairedPassword } from '@src/features/store/account/AccountActionHooks';
import { useBluetoothInfo, useIsConnected } from '@src/features/store/device/DeviceActionHooks';
import { useState } from 'react';

export function RefreshPairingPasswordContainer() {
  const bleInfo = useBluetoothInfo();
  const isConnected = useIsConnected();
  const changePairedPassword = useDispatchChangePairedPassword();
  const pairPassword = usePairedPassword();
  const appId = useAppId();
  const [log, setLog] = useState('');
  const [isRefreshing, setIsRefereshing] = useState(false);

  useInitApduEffect();

  const refreshPairPassword = async (cardId?: string) => {
    if (!appId) return;
    setIsRefereshing(true);
    setLog('REFRESHING....');
    const newPairedPassword = await RNApduManager.getInstance().getPairPassword(appId);
    if (!cardId) return;
    setIsRefereshing(false);
    setLog('REFRESHED SUCCESS');
    changePairedPassword(cardId, newPairedPassword);
  };

  return (
    <DemoView
      btnText="Refresh"
      log={log}
      isBtnDisable={!isConnected || !pairPassword}
      onPressBtn={() => refreshPairPassword(bleInfo?.cardId)}
      textBoxBody={pairPassword}
      textBoxPlaceHolder="Your Pairing Password"
      isBtnLoading={isRefreshing}
      showInput={false}
      showCopy={false}
    />
  );
}
