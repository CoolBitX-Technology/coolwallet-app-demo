import { NavigationProp, useNavigation } from '@react-navigation/native';
import { DemoAppParamList } from '@src/DemoAppNavigator';
import { RouteListView } from '@src/features/components/RouteListView';
import { RouteName } from '@src/routes/type';

function useRouteItems() {
  const navigation = useNavigation<NavigationProp<DemoAppParamList>>();
  return [
    {
      routeName: RouteName.GET_CARD_INFO,
      onButtonPress: () => navigation.navigate(RouteName.GET_CARD_INFO),
    },
    {
      routeName: RouteName.RESET_CARD,
      onButtonPress: () => navigation.navigate(RouteName.RESET_CARD),
    },
    {
      routeName: RouteName.REGISTER_CARD,
      onButtonPress: () => navigation.navigate(RouteName.REGISTER_CARD),
    },
    {
      routeName: RouteName.FIRMWARE_UPGRADE,
      onButtonPress: () => navigation.navigate(RouteName.FIRMWARE_UPGRADE),
    },
    {
      routeName: RouteName.GET_PAIRING_PASSWORD,
      onButtonPress: () => navigation.navigate(RouteName.GET_PAIRING_PASSWORD),
    },
    {
      routeName: RouteName.REFRESH_APP_KEY_PAIR,
      onButtonPress: () => navigation.navigate(RouteName.REFRESH_APP_KEY_PAIR),
    },
    {
      routeName: RouteName.GET_PAIRED_APPS,
      onButtonPress: () => navigation.navigate(RouteName.GET_PAIRED_APPS),
    },
    {
      routeName: RouteName.CREATE_MNEMONIC,
      onButtonPress: () => navigation.navigate(RouteName.CREATE_MNEMONIC),
    },
    {
      routeName: RouteName.RECOVER_MNEMONIC,
      onButtonPress: () => navigation.navigate(RouteName.RECOVER_MNEMONIC),
    },
    {
      routeName: RouteName.CREATE_MASTER_KEY,
      onButtonPress: () => navigation.navigate(RouteName.CREATE_MASTER_KEY),
    },
    {
      routeName: RouteName.RECOVER_ADDRESS,
      onButtonPress: () => navigation.navigate(RouteName.RECOVER_ADDRESS),
    },
  ];
}

export function CardPairingContainer() {
  const routeItems = useRouteItems();
  return <RouteListView title={'Initialize your CoolWallet Pro'} items={routeItems} />;
}
