import React from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Button, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

const Home = () => {
  const navigation = useNavigation();
  const buttonOnPress = () => navigation.navigate('BlueTooth');
  return (
    <SafeAreaView>
      <View style={styles.homeTitle}>
        <Text style={{fontSize: 32, fontWeight: '500'}}>
          CoolWallet Demo App
        </Text>
        <Button title="Go to home page 2" onPress={buttonOnPress} />
      </View>
    </SafeAreaView>
  );
};

const BlueTooth = () => {
  return (
    <SafeAreaView>
      <View style={styles.homeTitle}>
        <Text>CoolWallet Demo App Bluetooth Settings </Text>
      </View>
    </SafeAreaView>
  );
};
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="BlueTooth" component={BlueTooth} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  homeTitle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
