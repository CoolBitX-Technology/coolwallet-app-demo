import React from 'react';
import {Pressable, Text} from 'react-native';
import styled from 'styled-components/native';
import {SignalIcon, useSignalLevel} from '@src/features/components/SignalIcon';

interface LayoutProps {
  isSelected: boolean;
}
const Button = styled(Pressable)<LayoutProps>`
  width: 100%;
  height: 54px;
  flex-direction: row;
  align-items: center;
  padding-horizontal: 16px;
  background-color: ${props => (props.isSelected ? 'skyblue' : 'transparent')};
`;

const Title = styled(Text)`
  margin-start: 4px;
  align-self: center;
`;

const PairedStatusText = styled(Text)`
  font-weight: bold;
  color: black;
`;

interface Props {
  index: number;
  deviceName: string;
  rssi: number;
  isConnected: boolean;
  isSelected: boolean;
  onSelected?: (index: number) => void;
}
export function BluetoothItem({
  index,
  deviceName,
  rssi,
  isConnected,
  isSelected,
  onSelected,
}: Props): JSX.Element {
  const signalLevel = useSignalLevel(rssi);
  return (
    <Button isSelected={isSelected} onPress={() => onSelected?.(index)}>
      <SignalIcon isConnected={isConnected} signalLevel={signalLevel} />
      <Title>{deviceName}</Title>
      {isConnected && <PairedStatusText>{` - Paired`}</PairedStatusText>}
    </Button>
  );
}
