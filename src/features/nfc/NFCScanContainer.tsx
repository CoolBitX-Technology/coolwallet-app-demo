import React from 'react';
import { View, StyleSheet } from 'react-native';
import NFCScanView from '@src/features/nfc/NFCScanView';

const NFCScanContainer = () => {
  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <NFCScanView />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '80%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
});

export default NFCScanContainer;
