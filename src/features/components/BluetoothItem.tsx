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
  deviceId: string;
  deviceName: string;
  rssi: number;
  isPaired: boolean;
  isSelected: boolean;
  onSelected?: (item: string) => void;
}
export function BluetoothItem({
  index,
  deviceId,
  deviceName,
  rssi,
  isPaired,
  isSelected,
  onSelected,
}: Props): JSX.Element {
  const signalLevel = useSignalLevel(rssi);
  const title = useTitle(deviceId, deviceName);
  return (
    <Button isSelected={isSelected} onPress={() => onSelected?.(""+index)}>
      <SignalIcon isPaired={isPaired} signalLevel={signalLevel} />
      <Title>{title}</Title>
      {isPaired && <PairedStatusText>{` - 已配對`}</PairedStatusText>}
    </Button>
  );
}

function useTitle(deviceId: string, deviceName: string): string {
  return `${deviceName} ${deviceId}`;
}
