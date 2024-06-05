import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { DemoAppNavigator } from '@src/DemoAppNavigator';
import { getPersistor, store } from '@src/features/store/store';
import { Provider } from 'react-redux';
import { NativeBaseProvider } from 'native-base';
import { PersistGate } from 'redux-persist/integration/react';

export const App = () => {
  return (
    <NativeBaseProvider>
      <Provider store={store}>
        <PersistGate persistor={getPersistor()}>
          <NavigationContainer>
            <DemoAppNavigator />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </NativeBaseProvider>
  );
};
