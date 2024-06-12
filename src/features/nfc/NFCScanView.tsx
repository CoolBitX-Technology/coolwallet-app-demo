import React from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import { LogBox } from '@src/features/components/LogBox';
import { ButtonLayout, StyledButton } from '@src/features/httpScan/HttpScanView';

interface Props {
  command: string;
  setCommand: (command: string) => void;
  log?: string;
  onWritePressed: () => void;
  onGoBcakPressed: () => void;
}
export function NFCScanView({ command, setCommand, log, onWritePressed, onGoBcakPressed }: Props): JSX.Element {
  return (
    <View style={styles.container}>
      <View style={{ height: '60%' }}>
        <LogBox style={{ margin: 24 }} log={log} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputDesc}>Please enter the Command sent to the card: </Text>
        <TextInput style={styles.input} value={command} onChangeText={setCommand} placeholder="Enter data to write" />
      </View>
      <ButtonLayout style={styles.buttonLayout}>
        <StyledButton onPress={onGoBcakPressed}>Back</StyledButton>
        <StyledButton onPress={onWritePressed}>Write</StyledButton>
      </ButtonLayout>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    marginHorizontal: 28,
  },
  inputDesc: {
    color: 'black',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    color: 'black',
  },
  buttonLayout: {
    marginTop: 32,
  },
});
