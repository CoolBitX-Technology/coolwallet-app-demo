import React from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DemoAppParamList } from '@src/DemoAppNavigator';
import { RouteName } from '@src/routes/type';
import { useCardInfo } from '@src/features/store/device/DeviceActionHooks';
import { ConnectCardView } from '@src/features/home/components/ConnectCardView';

export const DemoAppHomeContainer = () => {
  const navigation = useNavigation<NavigationProp<DemoAppParamList>>();
  const OnPressButton = () => navigation.navigate(RouteName.BLUETOOTH_SETTINGS);
  const cardInfo = useCardInfo();
  const { isConnected, bleInfo } = cardInfo;
  return (
    <SafeAreaView>
      <View style={styles.homeTitle}>
        <Text style={{ fontSize: 32, fontWeight: '500' }}>CoolWallet Demo App</Text>
        <ConnectCardView cardId={bleInfo.localName} isConnected={isConnected} onPress={OnPressButton} />
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
