import React from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DemoAppParamList } from '@src/DemoAppNavigator';
import { RouteName } from '@src/routes/type';
import { ConnectCardView } from '@src/features/home/ConnectCardView';
import { useConnectBleUseCase, useSubscribeConnectionEffect, useDisconnectAllEffect } from '@src/features/ble/usecases/useConnectBleUseCase';
import { useBluetoothInfo } from '@src/features/store/device/DeviceActionHooks';
import { TabViewContainer } from '@src/features/home/TabViewContainer';

export const DemoAppHomeContainer = () => {
  const bleInfo = useBluetoothInfo();
  useSubscribeConnectionEffect();
  useDisconnectAllEffect();

  const { disconnect, transport } = useConnectBleUseCase();

  console.log('>>> transport = ',transport);

  const navigation = useNavigation<NavigationProp<DemoAppParamList>>();
  const OnPressButton = () => {
    if (!bleInfo) return navigation.navigate(RouteName.BLUETOOTH_SCAN);
    disconnect(bleInfo.deviceId);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.homeContainer}>
          <Text style={styles.titleText}>CoolWallet Demo App</Text>
          <ConnectCardView cardId={bleInfo?.localName} isConnected={isConnected} onPress={OnPressButton} />
          <TabViewContainer />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

function useCardId(deviceName?: string | null) {
  const nameSplits = deviceName?.split(' ');
  return nameSplits?.[1] || '';
}

const styles = StyleSheet.create({
  homeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: Dimensions.get('window').height,
  },
  titleText: { fontSize: 32, fontWeight: '500' },
});
