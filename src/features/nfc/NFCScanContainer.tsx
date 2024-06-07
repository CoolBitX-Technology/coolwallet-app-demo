import React, { useState } from 'react';
import { View, StyleSheet, Text, Button, TextInput, ScrollView } from 'react-native';
import RNNfcTransport from './RNNfcTransport';

const NFCScanContainer = () => {
  const [nfcData, setNfcData] = useState<string | null>(null);
  const [inputData, setInputData] = useState<string>('');
  const [log, setLog] = useState<string[]>([]);

  const addLog = (entry: string) => {
    setLog((prevLog) => [...prevLog, entry]);
  };

  const handleReadData = async () => {
    try {
      await RNNfcTransport.connect();
      const data = await RNNfcTransport.readData();
      if (data) {
        setNfcData(data.join(', '));
        addLog(`>> read: ${data.join(', ')}`);
      }
    } catch (error) {
      console.error('Failed to read NFC data:', error);
    } finally {
      await RNNfcTransport.disconnect();
    }
  };

  const handleWriteData = async () => {
    try {
      await RNNfcTransport.connect();
      await RNNfcTransport.writeData(inputData);
      addLog(`>> write: ${inputData}`);
      setInputData('');
    } catch (error) {
      console.error('Failed to write NFC data:', error);
    } finally {
      await RNNfcTransport.disconnect();
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.logContainer}>
        {log.map((entry, index) => (
          <Text key={index} style={styles.logEntry}>
            {entry}
          </Text>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <View style={styles.buttonContainer}>
          <Button title="Read" onPress={handleReadData} />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Enter data to write"
          value={inputData}
          onChangeText={setInputData}
          onSubmitEditing={handleWriteData}
        />
        <View style={styles.buttonContainer}>
          <Button title="Write" onPress={handleWriteData} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  logContainer: {
    flex: 1,
    width: '100%',
    marginBottom: 16,
  },
  logEntry: {
    fontSize: 16,
    marginVertical: 4,
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginHorizontal: 8,
  },
  buttonContainer: {
    marginHorizontal: 4,
  },
});

export default NFCScanContainer;
