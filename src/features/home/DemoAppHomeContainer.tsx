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
import { useBluetoothInfo, useIsConnected } from '@src/features/store/device/DeviceActionHooks';
import { TabViewContainer } from '@src/features/home/TabViewContainer';
import { TransportSelectorContainer, TransportType } from '@src/features/home/TransportSelectorContainer';

export const DemoAppHomeContainer = () => {
  const bleInfo = useBluetoothInfo();
  const isConnected = useIsConnected();
  useSubscribeConnectionEffect();
  useDisconnectAllEffect();

  const { disconnect } = useConnectBleUseCase();
  const disconnectByDeviceId = () => disconnect(bleInfo?.deviceId);

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
