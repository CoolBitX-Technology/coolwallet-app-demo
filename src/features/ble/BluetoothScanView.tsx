import React from 'react';
import { ViewStyle, View, ScrollView, RefreshControl, Platform } from 'react-native';
import styled from 'styled-components/native';
import { BluetoothItem } from '@src/features/components/BluetoothItem';
import { Device as BluetoothDevice } from 'react-native-ble-plx';
import { Button, Text } from 'native-base';

const StyledButton = styled(Button)`
  width: 90px;
  height: 40px;
`;

const ItemSeparator = styled(View)`
  height: 0.5px;
  background-color: gray;
`;

interface ListProps {
  isScaning: boolean;
}
const ListView = styled(ScrollView)<ListProps>`
  padding-top: ${(props) => (props.isScaning && Platform.OS === 'android' ? 84 : 0)}px;
`;

const ButtonLayout = styled(View)`
  width: 100%;
  height: 40px;
  margin-top: 24px;
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
  connectedId?: string;
  selectedIndex: number;
  isScaning?: boolean;
  isConnecting?: boolean;
  errorText?: string;
  onStartScan?: () => void;
  onSelected?: (index: number) => void;
  onStartConnect?: (item: BluetoothDevice) => void;
  onCanceled?: () => void;
}
export function BluetoothScanView({
  style,
  items,
  isScaning = false,
  isConnecting = false,
  connectedId,
  selectedIndex = -1,
  errorText,
  onStartScan,
  onCanceled,
  onStartConnect,
  onSelected,
}: Props): JSX.Element {
  const notSelected = selectedIndex === -1;
  return (
    <View style={style}>
      <ListView isScaning={isScaning} refreshControl={<RefreshControl refreshing={isScaning} onRefresh={onStartScan} />}>
        {items.map((item, index) => {
          return (
            <View key={item.id}>
              <ItemSeparator />
              <BluetoothItem
                index={index}
                rssi={item.rssi || -90}
                deviceName={item?.localName || ''}
                isConnected={item.id === connectedId}
                isSelected={selectedIndex === index}
                onSelected={onSelected}
              />
            </View>
          );
        })}
      </ListView>
      {items.length > 0 && <ItemSeparator />}
      <ButtonLayout>
        <StyledButton onPress={onCanceled}>{'取消'}</StyledButton>
        <StyledButton
          opacity={notSelected ? 0.5 : 1}
          isLoading={isConnecting}
          disabled={notSelected}
          onPress={() => selectedIndex > -1 && onStartConnect?.(items?.[selectedIndex])}
        >
          {'開始配對'}
        </StyledButton>
      </ButtonLayout>
      {errorText ? <EmptyText>{errorText}</EmptyText> : undefined}
    </View>
  );
}
