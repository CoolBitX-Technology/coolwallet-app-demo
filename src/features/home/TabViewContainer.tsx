import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { InitializeWalletView } from '@src/features/home/InitailizeWalletView';
import { TxSimulationView } from '@src/features/home/TxSimulationView';

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
          tabBarLabelStyle: { fontSize: 12,  },
          tabBarStyle: { backgroundColor: 'transparent' , marginHorizontal:16},
          tabBarIndicatorStyle: { backgroundColor: '#06B6D4' },
          tabBarAndroidRipple: { color: 'transparent' },
        }}
      >
        <Tab.Screen name={TabTitle.CARD_PAIRING} component={InitializeWalletView} />
        <Tab.Screen name={TabTitle.TX_TESTER} component={TxSimulationView} />
      </Tab.Navigator>
    </>
  );
}
