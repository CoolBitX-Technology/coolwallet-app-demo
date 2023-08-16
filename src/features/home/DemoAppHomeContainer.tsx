import React from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Button, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {DemoAppParamList} from '@src/DemoAppNavigator';
import {RouteName} from '@src/routes/type';

export const DemoAppHomeContainer = () => {
  const navigation = useNavigation<NavigationProp<DemoAppParamList>>();
  const buttonOnPress = () => navigation.navigate(RouteName.BLUETOOTH_SETTINGS);
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

const styles = StyleSheet.create({
  homeTitle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
