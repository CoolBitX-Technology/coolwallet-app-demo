import React, { useEffect, useState } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
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
import { useLog } from '@src/features/store/log/LogActionHooks';
import { AppKeyPair, loadAppKeyPair } from '@src/features/ble/utils/StorageUtils';


export function useAppKeyPair() {
  const [appKeyPair, setAppKeyPair] = useState<AppKeyPair>();
  useEffect(() => {
    loadAppKeyPair().then(setAppKeyPair);
  }, []);
  return appKeyPair;
}

export const DemoAppHomeContainer = () => {
  const bleInfo = useBluetoothInfo();
  const isConnected = useIsConnected();
  useSubscribeConnectionEffect();
  useDisconnectAllEffect();

  const { disconnect } = useConnectBleUseCase();

  const navigation = useNavigation<NavigationProp<DemoAppParamList>>();
  const OnPressButton = () => {
    if (isConnected && bleInfo) return disconnect(bleInfo.deviceId);
    return navigation.navigate(RouteName.BLUETOOTH_SCAN);
  };

  return (
    <>
      <View style={styles.homeContainer}>
        <ConnectCardView cardId={bleInfo?.cardId} onPress={OnPressButton} isConnected={isConnected} />
      </View>
      <TabViewContainer />
    </>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  titleText: { fontSize: 32, fontWeight: '500' },
});
