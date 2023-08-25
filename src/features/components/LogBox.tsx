import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

export function LogBox({ log }: { log: string | undefined }) {
  return (
    <View style={{ paddingHorizontal: 16, width: '100%' }}>
      <TextInput style={styles.log} editable={false} multiline={true} placeholder="Log Box" value={log} />
    </View>
  );
}

const styles = StyleSheet.create({
  log: {
    backgroundColor: '#ffffff',
    height: 80,
    padding: 8,
    color: '#403E3E',
    borderRadius: 8,
    borderColor: '#807a7a',
    borderWidth: 0.4,
  },
});
