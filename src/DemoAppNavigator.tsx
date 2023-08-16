import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BluetoothSettingsContainer } from '@src/features/ble/BluetoothSettingsContainer';
import { DemoAppHomeContainer } from '@src/features/home/DemoAppHomeContainer';
import { RouteName } from '@src/routes/type';

export type DemoAppParamList = {
  [RouteName.DEMO_HOME]: undefined;
  [RouteName.BLUETOOTH_SETTINGS]: undefined;
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
      <Stack.Screen name={RouteName.BLUETOOTH_SETTINGS} component={BluetoothSettingsContainer} />
    </Stack.Navigator>
  );
}
