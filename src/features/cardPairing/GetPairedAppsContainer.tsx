import { useNavigation } from '@react-navigation/native';
import { RNApduError } from '@src/features/ble/RNApduError';
import { PairedApp, RNApduManager } from '@src/features/ble/RNApduManager';
import { PairedAppsView } from '@src/features/components/PairedAppsView';
import { useInitApduEffect } from '@src/features/home/usecases/useCardPairingUseCase';
import { useLogUseCase } from '@src/features/home/usecases/useLogUseCase';
import { useAppId } from '@src/features/store/account/AccountActionHooks';
import { useCardId, useIsConnected } from '@src/features/store/device/DeviceActionHooks';
import { useEffect, useState } from 'react';

export function GetPairedAppsContainer(): JSX.Element {
  const isConnected = useIsConnected();
  const navigation = useNavigation();
  const cardId = useCardId();
  const appId = useAppId(cardId);
  const isParing = !!appId;
  const [pairedApps, setPairedApps] = useState<Array<PairedApp>>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const { log, addLog } = useLogUseCase();

  useInitApduEffect();

  const getPairedApps = () => {
    setIsFetching(true);
    addLog('FETCHING....');
    RNApduManager.getInstance()
      .getPairedApps(appId)
      .then((apps) => {
        setPairedApps(apps);
        addLog('FETCHED SUCCESS');
      })
      .catch((e) => {
        const error = e as RNApduError;
        addLog('FETCHING FAILED >>> ERROR=' + error);
      })
      .finally(() => setIsFetching(false));
  };

  const onDeleted = (pairedAppId: string) => {
    if (pairedAppId === appId) {
      addLog(`CANNOT REMOVE CURRENT PAIRED ID`);
      return;
    }
    setIsRemoving(true);
    addLog(`BEGIN TO REMOVE OTHER PAIRED ID: ${pairedAppId}`);
    addLog(`PLEASE PRESS THE CARD TO CONTINUE`);
    RNApduManager.getInstance()
      .removePairedDevice(appId, pairedAppId)
      .then(() => {
        addLog(`REMOVED SUCCESS`);
        setIsRemoving(false);
        return getPairedApps();
      })
      .catch((e) => {
        const error = e as RNApduError;
        addLog(`REMOVED FAILED >>> ERROR=` + error);
        setIsRemoving(false);
      });
  };

  const onCanceled = () => navigation.goBack();

  useEffect(() => {
    if (!isConnected || !isParing) return;
    getPairedApps();
  }, []);

  return (
    <PairedAppsView
      style={{ height: '100%', width: '100%' }}
      isFetching={isFetching}
      isConnected={isConnected}
      isRemoving={isRemoving}
      pairedAppId={appId}
      items={pairedApps}
      log={log}
      selectedIndex={selectedIndex}
      onFetch={getPairedApps}
      onCanceled={onCanceled}
      onSelected={setSelectedIndex}
      onRemoved={onDeleted}
    />
  );
}
