import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {DemoAppNavigator} from '@src/DemoAppNavigator';
import {store} from '@src/features/store/store';
import {Provider} from 'react-redux';

export const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <DemoAppNavigator />
      </NavigationContainer>
    </Provider>
  );
};
