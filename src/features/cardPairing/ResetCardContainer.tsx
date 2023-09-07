import { RNApduManager } from '@src/features/ble/RNApduManager';
import { DemoView } from '@src/features/components/DemoView';
import { useInitApduEffect } from '@src/features/home/usecases/useCardPairingUseCase';
import { useLogUseCase } from '@src/features/home/usecases/useLogUseCase';
import { useDispatchClearAppId } from '@src/features/store/account/AccountActionHooks';
import { useCardId, useIsConnected } from '@src/features/store/device/DeviceActionHooks';
import { useState } from 'react';

export function ResetCardContainer() {
  const isConneted = useIsConnected();
  const cardId = useCardId();
  const { log, addLog } = useLogUseCase();
  const [isReseting, setIsResting] = useState(false);
  const clearAppInfo = useDispatchClearAppId();

  useInitApduEffect();

  const resetCard = async () => {
    if (!cardId) return;
    setIsResting(true);
    try {
      addLog(`PLEASE PRESS THE CARD TO RESET`);
      await RNApduManager.getInstance().resetDevice();
      clearAppInfo(cardId);
      addLog('RESET SUCCESS');
    } catch (e) {
      addLog(`RESET FAILED >>> ${e}`);
    } finally {
      setIsResting(false);
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
