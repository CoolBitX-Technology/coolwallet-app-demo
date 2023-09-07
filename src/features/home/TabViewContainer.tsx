import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { CardPairingContainer } from '@src/features/home/CardPairingContainer';
import { TxSimulationContainer } from '@src/features/home/TxSimulationContainer';

const Tab = createMaterialTopTabNavigator();

enum TabTitle {
  CARD_PAIRING = 'Card Pairing',
  TX_TESTER = 'Transaction Tester',
}

export function TabViewContainer() {
  return (
    <>
      <Tab.Navigator
        style={{ flex: 1 }}
        screenOptions={{
          tabBarLabelStyle: { fontSize: 12 },
          tabBarStyle: { backgroundColor: 'transparent', marginHorizontal: 16 },
          tabBarIndicatorStyle: { backgroundColor: '#06B6D4' },
          tabBarAndroidRipple: { color: 'transparent' },
        }}
      >
        <Tab.Screen name={TabTitle.CARD_PAIRING} component={CardPairingContainer} />
        <Tab.Screen name={TabTitle.TX_TESTER} component={TxSimulationContainer} />
      </Tab.Navigator>
    </>
  );
}
