import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BluetoothScanContainer } from '@src/features/ble/BluetoothScanContainer';
import { DemoAppHomeContainer } from '@src/features/home/DemoAppHomeContainer';
import { RouteName } from '@src/routes/type';
import { EIP1559CoinTx } from '@src/features/tx/EIP1559CoinTx';
import { EIP1559TokenTx } from '@src/features/tx/EIP1559TokenTx';
import { TokenApporve } from '@src/features/tx/TokenApprove';
import { PersonalSign } from '@src/features/tx/PersonalSign';
import { SignTypedData } from '@src/features/tx/SignTypedData';
import { DemoView } from '@src/features/components/DemoView';
import { ResetCardContainer } from '@src/features/cardPairing/ResetCardContainer';
import { RegisterCardContainer } from '@src/features/cardPairing/RegisterCardContainer';

export type DemoAppParamList = {
  [RouteName.DEMO_HOME]: undefined;
  [RouteName.BLUETOOTH_SCAN]: undefined;
  [RouteName.RESET_CARD]: undefined;
  [RouteName.REGISTER_CARD]: undefined;
  [RouteName.RECOVER_MNEMONIC]: undefined;
  [RouteName.REFRESH_PAIRING_PASSWORD]: undefined;
  [RouteName.EIP1559_COIN]: undefined;
  [RouteName.EIP1559_TOKEN]: undefined;
  [RouteName.TOKEN_APPROVE]: undefined;
  [RouteName.PERSONAL_SIGN]: undefined;
  [RouteName.SIGN_TYPED_DATA]: undefined;
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
      <Stack.Screen name={RouteName.REGISTER_CARD} component={RegisterCardContainer} options={{ headerBackTitleVisible: false }} />
      <Stack.Screen name={RouteName.CREATE_MNEMONIC} component={DemoView} options={{ headerBackTitleVisible: false }} />
      <Stack.Screen name={RouteName.RECOVER_MNEMONIC} component={DemoView} options={{ headerBackTitleVisible: false }} />
      <Stack.Screen name={RouteName.REFRESH_PAIRING_PASSWORD} component={DemoView} options={{ headerBackTitleVisible: false }} />
      <Stack.Screen name={RouteName.EIP1559_COIN} component={EIP1559CoinTx} options={{ headerBackTitleVisible: false }} />
      <Stack.Screen name={RouteName.EIP1559_TOKEN} component={EIP1559TokenTx} options={{ headerBackTitleVisible: false }} />
      <Stack.Screen name={RouteName.TOKEN_APPROVE} component={TokenApporve} options={{ headerBackTitleVisible: false }} />
      <Stack.Screen name={RouteName.PERSONAL_SIGN} component={PersonalSign} options={{ headerBackTitleVisible: false }} />
      <Stack.Screen name={RouteName.SIGN_TYPED_DATA} component={SignTypedData} options={{ headerBackTitleVisible: false }} />
    </Stack.Navigator>
  );
}
