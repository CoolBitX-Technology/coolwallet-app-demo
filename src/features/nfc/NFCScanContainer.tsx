import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Button, TextInput, ScrollView } from 'react-native';
import RNNfcTransport from './RNNfcTransport';
import { TagEvent } from 'react-native-nfc-manager';

const NFCScanContainer = () => {
  const [nfcData, setNfcData] = useState<string | null>(null);
  //GetCardInfo 80660000
  //SelectApplet
  const [inputData, setInputData] = useState('00a404000d436f6f6c57616c6c657450524f');
  const [log, setLog] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const addLog = (entry: string) => {
    setLog((prevLog) => [...prevLog, entry]);
  };

  const handleTagDiscovered = async (tag: TagEvent) => {
    console.log('onTagDiscovered', tag);
    try {
      const data = await RNNfcTransport.readData(tag, handleTagDiscovered);
      if (data) {
        setNfcData(data);
        addLog(`>> read: ${data}`);
      }
    } catch (err) {
      setError(`Failed to read NFC data: ${err}`);
    }
  };

  useEffect(() => {
    const checkNfc = async () => {
      const enabled = await RNNfcTransport.startNfc();
      if (!enabled) {
        console.error('NFC is not enabled on this device')
      }
    };

    checkNfc();

    const connectNfc = async () => {
      try {
        await RNNfcTransport.connect(handleTagDiscovered);
        setIsConnected(true);
      } catch (err) {
        setError(`Failed to connect to NFC tag: ${err}`);
      }
    };

    connectNfc();

    return () => {
      const disconnectNfc = async () => {
        try {
          await RNNfcTransport.disconnect(true);
        } catch (err) {
          console.warn('Failed to disconnect NFC:', err);
        } finally {
          setIsConnected(false);
        }
      };

      disconnectNfc();
    };
  }, []);

  const handleWriteData = async () => {
    try {
      const response = await RNNfcTransport.writeData(inputData, handleTagDiscovered);
      setNfcData(`Wrote: ${inputData}`);
      addLog(`>> write: ${inputData}`);
      addLog(`>> return: ${response}`);
    } catch (e: any) {
      console.error('Failed to write NFC data:', e);
      addLog(`>> write error: ${e.message}`);
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
        <TextInput
          style={styles.input}
          placeholder="Enter data to write"
          value={inputData}
          onChangeText={setInputData}
        />
        <Button title="Write" onPress={() => {
          if (isConnected) {
            handleWriteData()
          }
        }} />
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
