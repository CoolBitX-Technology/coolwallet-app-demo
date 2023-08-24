import React from 'react';
import { Button, Input, HStack } from 'native-base';

interface CardInfo {
  cardId?: string;
  onPress: () => void;
}
export const ConnectCardView = (props: CardInfo) => {
  const { cardId = '', onPress } = props;
  return (
    <HStack space={2} style={{ marginTop: 24, marginBottom: 8 }}>
      <Input editable={false} w={'65%'} size="xl" mr="4px">
        {cardId}
      </Input>
      <Button onPress={onPress} size="md">
        {!cardId ? 'Disconnect' : 'Connect'}
      </Button>
    </HStack>
  );
};
