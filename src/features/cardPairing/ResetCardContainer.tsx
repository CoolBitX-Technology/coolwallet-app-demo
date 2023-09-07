import { RNApduManager } from '@src/features/ble/RNApduManager';
import { DemoView } from '@src/features/components/DemoView';

import { useDispatchClearAppId } from '@src/features/store/account/AccountActionHooks';
import { useBluetoothInfo, useIsConnected } from '@src/features/store/device/DeviceActionHooks';
import { useState } from 'react';

export function ResetCardContainer() {
  const isConneted = useIsConnected();
  const bleInfo = useBluetoothInfo();
  const [log, setLog] = useState('');
  const clearAppInfo = useDispatchClearAppId();

  const [isReseting, setIsResting] = useState(false);
  const resetCard = async (cardId?: string) => {
    if (!cardId) return;
    setIsResting(true);
    try {
      setLog(`PLEASE PRESS THE CARD TO RESET`);
      await RNApduManager.getInstance().resetDevice();
      clearAppInfo(cardId);
      setLog('RESET SUCCESS');
    } catch (e) {
      setLog(`RESET FAILED >>> ${e}`);
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
      onPressBtn={() => resetCard(bleInfo?.cardId)}
      showInput={false}
      showTextBox={false}
      log={log}
    />
  );
}
