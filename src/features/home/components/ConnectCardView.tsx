import React from 'react';
import { TextInput, Button, StyleSheet, Text, View, Pressable } from 'react-native';

interface CardInfo {
  cardId: string | null;
  isConnected: boolean;
  onPress: () => void;
}
export const ConnectCardView = (props: CardInfo) => {
  const { isConnected, cardId, onPress } = props;
  return (
    <View style={styles.cardConnectView}>
      <TextInput
        editable={false}
        style={{
          borderColor: '#007aff',
          borderWidth: 1,
          borderBottomLeftRadius: 8,
          borderTopLeftRadius: 8,
          width: '50%',
          fontSize: 24,
        }}
      >
        {cardId}
      </TextInput>
      <Pressable
        onPress={onPress}
        style={{
          backgroundColor: '#007aff',
          paddingVertical: 4,
          paddingHorizontal: 8,
          borderBottomRightRadius: 8,
          borderTopRightRadius: 8,
          borderWidth: 0,
        }}
      >
        <Text style={{ color: '#ffffff', fontSize: 20 }}>{isConnected ? 'Disconnect' : 'Connect'}</Text>
      </Pressable>
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
