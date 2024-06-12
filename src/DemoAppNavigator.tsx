import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { BluetoothScanContainer } from '@src/features/ble/BluetoothScanContainer';
import { DemoAppHomeContainer } from '@src/features/home/DemoAppHomeContainer';
import { RouteName } from '@src/routes/type';
import { ResetCardContainer } from '@src/features/cardPairing/ResetCardContainer';
import { RegisterCardContainer } from '@src/features/cardPairing/RegisterCardContainer';
import { GenerateMnemonicContainer } from '@src/features/cardPairing/GenerateMnemonicContainer';
import { RecoverWalletContainer } from '@src/features/cardPairing/RecoverWalletContainer';
import { PersonalSignContainer } from '@src/features/tx/PersonalSignContainer';
import { RecoverAddressContainer } from '@src/features/cardPairing/RecoverAddressContainer';
import { SignTypedDataContainer } from '@src/features/tx/SignTypedDataContainer';
import { EIP1559CoinTransferContainer } from '@src/features/tx/EIP1559CoinTransferContainer';
import { EIP1559TokenTransferContainer } from '@src/features/tx/EIP1559TokenTransferContainer';
import { GetPairedAppsContainer } from '@src/features/cardPairing/GetPairedAppsContainer';
import { RefreshAppKeyPairContainer } from '@src/features/cardPairing/RefreshAppKeyPairContainer';
import { GeneratePairingPasswordContainer } from '@src/features/cardPairing/GeneratePairingPasswordContainer';
import { GetCardInfoContainer } from '@src/features/cardPairing/GetCardInfoContainer';
import { HttpScanContainer } from '@src/features/httpScan/HttpScanContainer';
import NFCScanContainer from "@src/features/nfc/NFCScanContainer";
import { BluetoothScanContainer } from '@src/features/ble/BluetoothScanContainer';

export type DemoAppParamList = {
  [RouteName.DEMO_HOME]: undefined;
  [RouteName.BLUETOOTH_SCAN]: undefined;
  [RouteName.HTTP_SCAN]: undefined;
  [RouteName.REFRESH_APP_KEY_PAIR]: undefined;
  [RouteName.GET_CARD_INFO]: undefined;
  [RouteName.RESET_CARD]: undefined;
  [RouteName.REGISTER_CARD]: undefined;
  [RouteName.RECOVER_MNEMONIC]: undefined;
  [RouteName.CREATE_MNEMONIC]: undefined;
  [RouteName.RECOVER_ADDRESS]: undefined;
  [RouteName.GET_PAIRING_PASSWORD]: undefined;
  [RouteName.GET_PAIRED_APPS]: undefined;
  [RouteName.EIP1559_COIN]: undefined;
  [RouteName.EIP1559_TOKEN]: undefined;
  [RouteName.PERSONAL_SIGN]: undefined;
  [RouteName.SIGN_TYPED_DATA]: undefined;
  [RouteName.SEND_HEX]: undefined;
  [RouteName.NFC_SCAN]: undefined;
};

export type RootNavigationProp = NavigationProp<DemoAppParamList>;

export function useRootNavigation() {
  return useNavigation<RootNavigationProp>();
}

export function useTypedRouteParams<ROUTE_NAME extends keyof DemoAppParamList>(): ReturnType<
  typeof useRoute<RouteProp<DemoAppParamList, ROUTE_NAME>>
>['params'] {
  return useRoute<RouteProp<DemoAppParamList, ROUTE_NAME>>().params;
}

const Stack = createNativeStackNavigator();

export function DemoAppNavigator() {
  return (
    <Stack.Navigator initialRouteName={RouteName.DEMO_HOME}>
      <Stack.Screen name={RouteName.DEMO_HOME} component={DemoAppHomeContainer} />
      <Stack.Screen
        name={RouteName.BLUETOOTH_SCAN}
        component={BluetoothScanContainer}
        options={{ headerBackTitleVisible: false }}
      />
      <Stack.Screen name={RouteName.HTTP_SCAN} component={HttpScanContainer} options={{ headerBackTitleVisible: false }} />
      <Stack.Screen name={RouteName.RESET_CARD} component={ResetCardContainer} options={{ headerBackTitleVisible: false }} />
      <Stack.Screen name={RouteName.GET_CARD_INFO} component={GetCardInfoContainer} options={{ headerBackTitleVisible: false }} />
      <Stack.Screen
        name={RouteName.NFC_SCAN}
        component={NFCScanContainer}
        options={{ headerBackTitleVisible: false }}
      />
      <Stack.Screen
        name={RouteName.REGISTER_CARD}
        component={RegisterCardContainer}
        options={{ headerBackTitleVisible: false }}
      />
      <Stack.Screen
        name={RouteName.GET_PAIRED_APPS}
        component={GetPairedAppsContainer}
        options={{ headerBackTitleVisible: false }}
      />
      <Stack.Screen
        name={RouteName.CREATE_MNEMONIC}
        component={GenerateMnemonicContainer}
        options={{ headerBackTitleVisible: false }}
      />
      <Stack.Screen
        name={RouteName.RECOVER_MNEMONIC}
        component={RecoverWalletContainer}
        options={{ headerBackTitleVisible: false }}
      />
      <Stack.Screen
        name={RouteName.RECOVER_ADDRESS}
        component={RecoverAddressContainer}
        options={{ headerBackTitleVisible: false }}
      />
      <Stack.Screen
        name={RouteName.GET_PAIRING_PASSWORD}
        component={GeneratePairingPasswordContainer}
        options={{ headerBackTitleVisible: false }}
      />
      <Stack.Screen
        name={RouteName.REFRESH_APP_KEY_PAIR}
        component={RefreshAppKeyPairContainer}
        options={{ headerBackTitleVisible: false }}
      />
      <Stack.Screen
        name={RouteName.EIP1559_COIN}
        component={EIP1559CoinTransferContainer}
        options={{ headerBackTitleVisible: false }}
      />
      <Stack.Screen
        name={RouteName.EIP1559_TOKEN}
        component={EIP1559TokenTransferContainer}
        options={{ headerBackTitleVisible: false }}
      />
      <Stack.Screen
        name={RouteName.PERSONAL_SIGN}
        component={PersonalSignContainer}
        options={{ headerBackTitleVisible: false }}
      />
      <Stack.Screen
        name={RouteName.SIGN_TYPED_DATA}
        component={SignTypedDataContainer}
        options={{ headerBackTitleVisible: false }}
      />
    </Stack.Navigator>
  );
}
