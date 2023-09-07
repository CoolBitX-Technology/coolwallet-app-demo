import { RNApduManager } from '@src/features/ble/RNApduManager';
import { DemoView } from '@src/features/components/DemoView';

import { useDispatchClearAppId } from '@src/features/store/account/AccountActionHooks';
import { useBluetoothInfo, useIsConnected } from '@src/features/store/device/DeviceActionHooks';
import { useDispatchLogChange } from '@src/features/store/log/LogActionHooks';
import { useState } from 'react';

export function ResetCardContainer() {
  const bleInfo = useBluetoothInfo();
  const updateLog = useDispatchLogChange();
  const clearAppInfo = useDispatchClearAppId();

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

  return (
    <DemoView
      btnText="Reset"
      showCopy={false}
      isBtnLoading={isReseting}
      onPressBtn={() => resetCard(bleInfo?.cardId)}
      showInput={false}
      showTextBox={false}
    />
  );
}
