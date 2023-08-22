import { InitializeWalletView } from '@src/features/home/InitailizeWalletView';
import { TxSimulationView } from '@src/features/home/TxSimulationView';
import { Animated, Pressable } from 'react-native';
import { Box } from 'native-base';
import { TabView, SceneMap } from 'react-native-tab-view';
import React, { ReactNode, useState } from 'react';

enum TabTitle {
  CARD_PAIRING = 'Card Pairing',
  TX_TESTER = 'Transcaiton Tester',
}

interface TabRoute {
  key: string;
  title: TabTitle;
}

const renderScene = SceneMap({
  first: () => <InitializeWalletView />,
  second: () => <TxSimulationView />,
});

export function TabViewContainer() {
  const [index, setIndex] = useState(0);
  const [routes] = useState<Array<TabRoute>>([
    { key: 'first', title: TabTitle.CARD_PAIRING },
    { key: 'second', title: TabTitle.TX_TESTER },
  ]);

  const renderTabBar = (props: any): ReactNode => {
    return (
      <Box flexDirection="row">
        {props.navigationState.routes.map((route: TabRoute, i: number) => {
          const color = '#000';
          const borderColor = index === i ? '#06B6D4' : '#E5E7EB';
          return (
            <Box borderBottomWidth="3" borderColor={borderColor} flex={1} alignItems="center" p="3" key={i}>
              <Pressable
                onPress={() => {
                  console.log(i);
                  setIndex(i);
                }}
              >
                <Animated.Text
                  style={{
                    color,
                  }}
                >
                  {route.title}
                </Animated.Text>
              </Pressable>
            </Box>
          );
        })}
      </Box>
    );
  };

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      style={{ width: '100%', paddingHorizontal: 20, height: '100%', marginTop: 16 }}
      renderTabBar={renderTabBar}
    />
  );
}
