import { NavigationProp, useNavigation } from '@react-navigation/native';
import { DemoAppParamList } from '@src/DemoAppNavigator';
import { RouteItem, RouteListView } from '@src/features/components/RouteListView';
import { RouteName } from '@src/routes/type';

function useRouteItems() {
  const navigation = useNavigation<NavigationProp<DemoAppParamList>>();
  const routeItems: Array<RouteItem> = [
    {
      routeName: RouteName.RESET_CARD,
      onButtonPress: () => navigation.navigate(RouteName.RESET_CARD),
    },
    {
      routeName: RouteName.REGISTER_CARD,
      onButtonPress: () => navigation.navigate(RouteName.REGISTER_CARD),
    },
    {
      routeName: RouteName.REFRESH_PAIRING_PASSWORD,
      onButtonPress: () => navigation.navigate(RouteName.REFRESH_PAIRING_PASSWORD),
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
      routeName: RouteName.RECOVER_ADDRESS,
      onButtonPress: () => navigation.navigate(RouteName.RECOVER_ADDRESS),
    },
  ];
  return routeItems;
}

export function CardPairingContainer() {
  const routeItems = useRouteItems();
  return <RouteListView title={'Initialize your CoolWallet Pro'} items={routeItems} />;
}
