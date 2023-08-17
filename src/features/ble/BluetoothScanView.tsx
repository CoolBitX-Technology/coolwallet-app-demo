import React from 'react';
import { FlatList, ViewStyle, View, Button, RefreshControl } from 'react-native';
import styled from 'styled-components/native';
import { BluetoothItem } from '@src/features/components/BluetoothItem';

const ItemSeparator = styled(View)`
  height: 0.5px;
  background-color: gray;
`;

const ButtonLayout = styled(View)`
  width: 100%;
  height: 40px;
  margin-top: 16px;
  align-items: space-around;
  justify-content: space-around;
  flex-direction: row;
`;

interface Props {
  style?: ViewStyle;
  items: Array<string>;
  pairedItem?: string;
  selectedItem?: string;
  isScaning?: boolean;
  onStartScan?: () => void;
  onSelected?: (item: string) => void;
  onConnected?: (item: string) => void;
  onCanceled?: () => void;
}
export function BluetoothScanView({
  style,
  items,
  isScaning = false,
  pairedItem,
  selectedItem,
  onStartScan,
  onCanceled,
  onConnected,
  onSelected,
}: Props): JSX.Element {
  return (
    <View style={style}>
      <FlatList
        refreshControl={<RefreshControl refreshing={isScaning} onRefresh={onStartScan} />}
        data={items}
        ItemSeparatorComponent={() => <ItemSeparator />}
        renderItem={({ item, index }) => {
          return (
            <BluetoothItem
              index={index}
              rssi={-50}
              deviceId={`CWP06525${item}`}
              deviceName="CoolWallet"
              isPaired={item === pairedItem}
              isSelected={item === selectedItem}
              onSelected={onSelected}
            />
          );
        }}
      />
      <ItemSeparator />
      <ButtonLayout>
        <Button title="取消" onPress={onCanceled} />
        <Button
          disabled={!selectedItem}
          title="開始配對"
          onPress={() => selectedItem && onConnected?.(`CWP06525${selectedItem}`)}
        />
      </ButtonLayout>
    </View>
  );
}
