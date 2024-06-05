import { PairedApp } from '@src/features/ble/RNApduManager';
import { AppIcon } from '@src/features/components/AppIcon';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import styled from 'styled-components/native';

interface LayoutProps {
  isSelected: boolean;
}
const Button = styled(Pressable)<LayoutProps>`
  width: 100%;
  height: 54px;
  flex-direction: row;
  align-items: center;
  padding-horizontal: 16px;
  background-color: ${(props) => (props.isSelected ? 'skyblue' : 'transparent')};
`;

const ColumnLayout = styled(View)`
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 4px;
`;

interface Props {
  index: number;
  app: PairedApp;
  isSelected: boolean;
  onSelected?: (index: number) => void;
}
export function AppItem({ index, app, isSelected, onSelected }: Props): JSX.Element {
  const { deviceName, appId } = app;
  return (
    <Button isSelected={isSelected} onPress={() => onSelected?.(index)}>
      <AppIcon size={32} />
      <ColumnLayout>
        <Text>{deviceName}</Text>
        <Text>{appId}</Text>
      </ColumnLayout>
    </Button>
  );
}
