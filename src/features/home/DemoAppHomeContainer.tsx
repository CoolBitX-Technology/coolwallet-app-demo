import React, { useRef } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { DemoAppParamList } from '@src/DemoAppNavigator';
import { RouteName } from '@src/routes/type';
import { ConnectCardView } from '@src/features/home/ConnectCardView';
import {
  useConnectBleUseCase,
  useSubscribeConnectionEffect,
  useDisconnectAllEffect,
} from '@src/features/ble/usecases/useConnectBleUseCase';
import { useBluetoothInfo, useClearDeviceInfo, useDispatchConnectStatus, useIsConnected, useTransportType } from '@src/features/store/device/DeviceActionHooks';
import { TabViewContainer } from '@src/features/home/TabViewContainer';
import { TransportSelectorContainer } from '@src/features/home/TransportSelectorContainer';
import { TransportType } from '@src/features/store/device/DeviceTypes';

export const DemoAppHomeContainer = () => {
  const type = useTransportType();
  const bleInfo = useBluetoothInfo();
  const isConnected = useIsConnected();
  const clearDeviceInfo = useClearDeviceInfo();
  useSubscribeConnectionEffect();
  useDisconnectAllEffect();

  const { disconnect: disconnectBle } = useConnectBleUseCase();
  const changeConnectStatus = useDispatchConnectStatus();
  const disconnectByDeviceId = () => {
    if (bleInfo) disconnectBle(bleInfo?.deviceId);
    if (isConnected) changeConnectStatus(false);
    if (type) clearDeviceInfo(type);
  };

  const showTransportSelectorRef = useRef(() => {});
  const showTransportSelector = () => showTransportSelectorRef.current();

  const navigation = useNavigation<NavigationProp<DemoAppParamList>>();
  const navigateToScan = (type: TransportType) => {
    if (type === TransportType.Bluetooth) navigation.navigate(RouteName.BLUETOOTH_SCAN);
    else if (type === TransportType.Http) navigation.navigate(RouteName.HTTP_SCAN);
    else throw new Error(`navigateToScan get unknown type: ${type}`);
  };

  return (
    <>
      <ConnectCardView
        cardId={bleInfo?.cardId}
        isConnected={isConnected}
        onConnectPressed={showTransportSelector}
        onDisconnectPressed={disconnectByDeviceId}
      />
      <TabViewContainer />
      <TransportSelectorContainer showRef={showTransportSelectorRef} onSelected={navigateToScan} />
    </>
  );
};
