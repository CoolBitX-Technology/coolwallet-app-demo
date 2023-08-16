import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {DemoAppNavigator} from '@src/DemoAppNavigator';

export const App = () => {
  return (
    <NavigationContainer>
      <DemoAppNavigator />
    </NavigationContainer>
  );
};
