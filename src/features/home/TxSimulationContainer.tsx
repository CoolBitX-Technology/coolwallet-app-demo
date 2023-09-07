import { RouteName } from '@src/routes/type';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { DemoAppParamList } from '@src/DemoAppNavigator';
import { RouteItem, RouteListView } from '@src/features/components/RouteListView';

function useRouteItems() {
  const navigation = useNavigation<NavigationProp<DemoAppParamList>>();
  const routeItems: Array<RouteItem> = [
    {
      routeName: RouteName.EIP1559_COIN,
      onButtonPress: () => navigation.navigate(RouteName.EIP1559_COIN),
    },
    {
      routeName: RouteName.EIP1559_TOKEN,
      onButtonPress: () => navigation.navigate(RouteName.EIP1559_TOKEN),
    },
    {
      routeName: RouteName.PERSONAL_SIGN,
      onButtonPress: () => navigation.navigate(RouteName.PERSONAL_SIGN),
    },
    {
      routeName: RouteName.SIGN_TYPED_DATA,
      onButtonPress: () => navigation.navigate(RouteName.SIGN_TYPED_DATA),
    },
  ];
  return routeItems;
}

export function TxSimulationContainer() {
  const routeItems = useRouteItems();
  return (
    <RouteListView title={'Choose your trasaction type'} items={routeItems} />
  );
}
