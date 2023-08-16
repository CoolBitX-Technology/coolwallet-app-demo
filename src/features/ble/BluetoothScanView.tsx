import React from 'react';
import {FlatList, Text, ViewStyle, View} from 'react-native';
import styled from 'styled-components/native';
import {BluetoothItem} from '@src/features/components/BluetoothItem';

const Description = styled(Text)`
  flex: 1;
  justify-content: center;
  text-align: center;
  padding: 16px;
  background: gray;
`;

interface Props {
  style?: ViewStyle;
  items: Array<string>;
  pairedItem?: string;
  selectedItem?: string;
  onSelected?: (item: string) => void;
  onConnected?: (item: string) => void;
  onCanceled?: () => void;
}
export function BluetoothScanView({ style, items, pairedItem, selectedItem }: Props): JSX.Element {
  return (
    <View style={style}>
      <Description>{'CoolWallet Demo App Bluetooth Settings'}</Description>
      <FlatList
        data={items}
        renderItem={({item}) => {
          return (
            <BluetoothItem
              rssi={-50}
              deviceId="CWP065250"
              deviceName="CoolWallet"
              isPaired={false}
              isSelected={false}
            />
          );
        }}></FlatList>
    </View>
  );
}
