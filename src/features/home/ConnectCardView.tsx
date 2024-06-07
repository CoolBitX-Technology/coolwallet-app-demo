import React from 'react';
import { Button, Input, HStack } from 'native-base';
import { StyleSheet } from 'react-native';

interface CardInfo {
  isConnected: boolean;
  cardId?: string;
  onConnectPressed: () => void;
  onDisconnectPressed: () => void;
}
export const ConnectCardView = (props: CardInfo) => {
  const { cardId = '', onConnectPressed, onDisconnectPressed, isConnected } = props;
  return (
    <HStack space={2} style={styles.homeContainer}>
      <Input editable={false} w={'65%'} size="xl" mr="4px">
        {isConnected ? cardId : ''}
      </Input>
      <Button onPress={isConnected ? onDisconnectPressed : onConnectPressed} size="md">
        {isConnected ? 'Disconnect' : 'Connect'}
      </Button>
    </HStack>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 24,
    marginBottom: 8,
  },
});
