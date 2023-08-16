import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

export const BluetoothSettingsContainer = () => {
  return (
    <SafeAreaView>
      <View style={styles.homeTitle}>
        <Text>CoolWallet Demo App Bluetooth Settings </Text>
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
