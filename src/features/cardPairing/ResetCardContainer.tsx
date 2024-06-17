import { RNApduManager } from '@src/features/ble/RNApduManager';
import { useConnectCardUseCase } from '@src/features/cardPairing/hooks/useConnectCardUseCase';
import { DemoView } from '@src/features/components/DemoView';
import { useInitApduEffect } from '@src/features/home/usecases/useCardPairingUseCase';
import { useLogUseCase } from '@src/features/home/usecases/useLogUseCase';
import { NFCManager } from '@src/features/nfcScan/utils/NfcManager';
import { useDispatchClearAppId } from '@src/features/store/account/AccountActionHooks';
import { useCardId, useIsConnected } from '@src/features/store/device/DeviceActionHooks';
import { useState } from 'react';

export function ResetCardContainer() {
  const isConneted = useIsConnected();
  const cardId = useCardId();
  const { log, addLog } = useLogUseCase();
  const [isReseting, setIsResting] = useState(false);
  const clearAppInfo = useDispatchClearAppId();
  const { connect, disconnect } = useConnectCardUseCase();

  useInitApduEffect();

  const resetCard = async () => {
    if (!cardId) return;
    setIsResting(true);

    await connect();

    try {
      addLog(`PLEASE PRESS THE CARD TO RESET`);
      await RNApduManager.getInstance().resetDevice();
      clearAppInfo(cardId);
      addLog('RESET SUCCESS');
    } catch (e) {
      addLog(`RESET FAILED >>> ${e}`);
    } finally {
      setIsResting(false);
      await disconnect();
    }
  };

  return (
    <DemoView
      isBtnDisable={!isConneted}
      btnText="Reset"
      showCopy={false}
      isBtnLoading={isReseting}
      onPressBtn={resetCard}
      showInput={false}
      showTextBox={false}
      log={log}
    />
  );
}
