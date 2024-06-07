import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import NfcManager, { NfcTech, TagEvent } from 'react-native-nfc-manager';

const NFCScanView = () => {
  const [tag, setTag] = useState<TagEvent | null>(null);

  const scanTag = async () => {
    await NfcManager.start();
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const scannedTag = await NfcManager.getTag();
      if (scannedTag) {
        setTag(scannedTag);
      }
    } catch (error) {
      console.warn(error);
    } finally {
      NfcManager.cancelTechnologyRequest();
    }
  };

  return (
    <View>
      <Button title="Scan NFC Tag" onPress={scanTag} />
      {tag && <Text>{`Tag ID: ${tag.id}`}</Text>}
    </View>
  );
};

export default NFCScanView;
