import React from 'react';
import { FlatList, ViewStyle, View, Button, RefreshControl, Text, Platform } from 'react-native';
import styled from 'styled-components/native';
import { BluetoothItem } from '@src/features/components/BluetoothItem';
import { Device as BluetoothDevice } from 'react-native-ble-plx';

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

const EmptyText = styled(Text)`
  color: red;
  width: 100%;
  align-self: center;
  text-align: center;
  padding-vertical: 16px;
`;

interface Props {
  style?: ViewStyle;
  items: Array<BluetoothDevice>;
  pairedDeviceId?: string;
  selectedIndex: number;
  isScaning?: boolean;
  errorText?: string;
  onStartScan?: () => void;
  onSelected?: (index: number) => void;
  onConnected?: (item: BluetoothDevice) => void;
  onCanceled?: () => void;
}
export function BluetoothScanView({
  style,
  items,
  isScaning = false,
  pairedDeviceId,
  selectedIndex = -1,
  errorText,
  onStartScan,
  onCanceled,
  onConnected,
  onSelected,
}: Props): JSX.Element {
  return (
    <View style={style}>
      <FlatList
        contentContainerStyle={{ marginTop: isScaning && Platform.OS === 'android' ? 84 : 0}}
        refreshControl={<RefreshControl refreshing={isScaning} onRefresh={onStartScan} />}
        data={items}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <ItemSeparator />}
        ListEmptyComponent={errorText ? <EmptyText>{errorText}</EmptyText> : undefined}
        renderItem={({ item, index }) => {
          return (
            <BluetoothItem
              index={index}
              rssi={item.rssi || -90}
              deviceName={item?.localName || ''}
              isPaired={item.id === pairedDeviceId}
              isSelected={selectedIndex === index}
              onSelected={onSelected}
            />
          );
        }}
      />
      {items.length > 0 && <ItemSeparator />}
      <ButtonLayout>
        <Button title="取消" onPress={onCanceled} />
        <Button
          disabled={selectedIndex === -1}
          title="開始配對"
          onPress={() => selectedIndex > -1 && onConnected?.(items?.[selectedIndex])}
        />
      </ButtonLayout>
    </View>
  );
}
