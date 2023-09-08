import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BluetoothScanContainer } from '@src/features/ble/BluetoothScanContainer';
import { DemoAppHomeContainer } from '@src/features/home/DemoAppHomeContainer';
import { RouteName } from '@src/routes/type';
import { DemoView } from '@src/features/components/DemoView';
import { ResetCardContainer } from '@src/features/cardPairing/ResetCardContainer';
import { RegisterCardContainer } from '@src/features/cardPairing/RegisterCardContainer';
import { GenerateMnemonicContainer } from '@src/features/cardPairing/GenerateMnemonicContainer';
import { RecoverWalletContainer } from '@src/features/cardPairing/RecoverWalletContainer';
import { RefreshPairingPasswordContainer } from '@src/features/cardPairing/RefreshPairingPasswordContainer';
import { PersonalSignContainer } from '@src/features/tx/PersonalSignContainer';
import { RecoverAddressContainer } from '@src/features/cardPairing/RecoverAddressContainer';
import { SignTypedDataContainer } from '@src/features/tx/SignTypedDataContainer';
import { SendHexContainer } from '@src/features/tx/SendHexContainer';
import { EIP1559CoinTx } from '@src/features/tx/EIP1559CoinTx';

export type DemoAppParamList = {
  [RouteName.DEMO_HOME]: undefined;
  [RouteName.BLUETOOTH_SCAN]: undefined;
  [RouteName.RESET_CARD]: undefined;
  [RouteName.REGISTER_CARD]: undefined;
  [RouteName.RECOVER_MNEMONIC]: undefined;
  [RouteName.CREATE_MNEMONIC]: undefined;
  [RouteName.RECOVER_ADDRESS]: undefined;
  [RouteName.REFRESH_PAIRING_PASSWORD]: undefined;
  [RouteName.EIP1559_COIN]: undefined;
  [RouteName.EIP1559_TOKEN]: undefined;
  [RouteName.PERSONAL_SIGN]: undefined;
  [RouteName.SIGN_TYPED_DATA]: undefined;
  [RouteName.SEND_HEX]: undefined;
};

export type RootNavigationProp = NavigationProp<DemoAppParamList>;

export function useRootNavigation() {
  return useNavigation<RootNavigationProp>();
}

/**
 * type ScreenRouteType = ReturnType<typeof useRoute<RouteProp<SoftwareWalletParamList, RROUTE_NAME>>>
 * type ScreenRouteParamsType = ScreenRouteType['params']
 */
export function useTypedRouteParams<RROUTE_NAME extends keyof DemoAppParamList>(): ReturnType<
  typeof useRoute<RouteProp<DemoAppParamList, RROUTE_NAME>>
>['params'] {
  return useRoute<RouteProp<DemoAppParamList, RROUTE_NAME>>().params;
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
      <Stack.Screen name={RouteName.RESET_CARD} component={ResetCardContainer} options={{ headerBackTitleVisible: false }} />
      <Stack.Screen
        name={RouteName.REGISTER_CARD}
        component={RegisterCardContainer}
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
        name={RouteName.REFRESH_PAIRING_PASSWORD}
        component={RefreshPairingPasswordContainer}
        options={{ headerBackTitleVisible: false }}
      />
      <Stack.Screen name={RouteName.EIP1559_COIN} component={EIP1559CoinTx} options={{ headerBackTitleVisible: false }} />
      <Stack.Screen name={RouteName.EIP1559_TOKEN} component={DemoView} options={{ headerBackTitleVisible: false }} />
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
      <Stack.Screen name={RouteName.SEND_HEX} component={SendHexContainer} options={{ headerBackTitleVisible: false }} />
    </Stack.Navigator>
  );
}
