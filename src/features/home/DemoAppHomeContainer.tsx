import React from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DemoAppParamList } from '@src/DemoAppNavigator';
import { RouteName } from '@src/routes/type';
import { useBluetoothInfo } from '@src/features/store/device/DeviceActionHooks';
import { ConnectCardView } from '@src/features/home/ConnectCardView';
import { useConnectBleUseCase, useSubscribeConnectionEffect, useDisconnectAllEffect } from '@src/features/ble/usecases/useConnectBleUseCase';

export const DemoAppHomeContainer = () => {
  const bleInfo = useBluetoothInfo();
  useSubscribeConnectionEffect(bleInfo);
  useDisconnectAllEffect();

  const isConnected = !!bleInfo?.isConnected;
  const { disconnect } = useConnectBleUseCase();

  const navigation = useNavigation<NavigationProp<DemoAppParamList>>();
  const OnPressButton = () => {
    if (!isConnected) return navigation.navigate(RouteName.BLUETOOTH_SCAN);
    disconnect(bleInfo.deviceId);
  };

  return (
    <SafeAreaView>
      <View style={styles.homeTitle}>
        <Text style={{ fontSize: 32, fontWeight: '500' }}>CoolWallet Demo App</Text>
        <ConnectCardView cardId={bleInfo?.localName} isConnected={isConnected} onPress={OnPressButton} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  homeTitle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
