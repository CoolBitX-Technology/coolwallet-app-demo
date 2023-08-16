import React from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components/native';
import {SignalIcon, useSignalLevel} from '@src/features/components/SignalIcon';

const Layout = styled(View)`
  flex-direction: row;
  flex: 1;
`;

interface Props {
  deviceId: string;
  deviceName: string;
  rssi: number;
  isPaired: boolean;
  isSelected: boolean;
}
export function BluetoothItem({
  deviceId,
  deviceName,
  rssi,
  isPaired,
  isSelected,
}: Props): JSX.Element {
  const signalLevel = useSignalLevel(rssi);
  const title = useTitle(deviceId, deviceName);
  console.log('title = ',title);
  return (
    <Layout style={{ backgroundColor: isSelected ? 'gray' : 'blue' }}>
      <SignalIcon signalLevel={signalLevel} />
      {/* <Text>{title}</Text>
      {isPaired && <Text>{` - 已配對`}</Text>} */}
    </Layout>
  );
}

function useTitle(deviceId: string, deviceName: string): string {
  return `${deviceName} ${deviceId}`;
}
