import { Text } from 'native-base';
import React from 'react';
import { StyleSheet, ScrollView, ViewStyle } from 'react-native';

interface Props {
  style?: ViewStyle;
  log?: string;
}
export function LogBox({ style, log = 'LogBox' }: Props) {
  return (
    <ScrollView style={[style, { width: '100%' }]}>
      <Text style={styles.log}>{log}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  log: {
    backgroundColor: '#ffffff',
    height: 200,
    padding: 8,
    color: '#403E3E',
    borderRadius: 8,
    borderColor: '#807a7a',
    borderWidth: 0.4,
  },
});
