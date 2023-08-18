import React from 'react';
import { Button, Input } from 'native-base';
import { StyleSheet, View } from 'react-native';

interface CardInfo {
  isConnected: boolean;
  cardId?: string;
  onPress: () => void;
}
export const ConnectCardView = (props: CardInfo) => {
  const { isConnected, cardId = '', onPress } = props;
  return (
    <View style={styles.cardConnectView}>
      <Input editable={false} w={'50%'} size="xl">
        {cardId}
      </Input>
      <Button onPress={onPress} size="md">
        {isConnected ? 'Disconnect' : 'Connect'}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  cardConnectView: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 8,
  },
});
