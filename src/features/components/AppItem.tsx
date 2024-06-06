import { PairedApp } from '@src/features/ble/RNApduManager';
import { AppIcon } from '@src/features/components/AppIcon';
import { StarIcon } from '@src/features/components/StarIcon';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import styled from 'styled-components/native';

interface LayoutProps {
  isPaired: boolean;
  isSelected: boolean;
}
const Button = styled(Pressable)<LayoutProps>`
  width: 100%;
  height: 54px;
  flex-direction: row;
  align-items: center;
  padding-horizontal: 16px;
  background-color: ${(props) => (props.isSelected ? 'skyblue' : 'transparent')};
  padding-start: ${(props) => (props.isPaired ? 8 : 28)}px;
  padding-end: 8px;
`;

const ColumnLayout = styled(View)`
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 4px;
`;

const ContentText = styled(Text)`
  padding-end: 8px;
`;

interface Props {
  index: number;
  app: PairedApp;
  isSelected: boolean;
  isPaired: boolean;
  onSelected?: (index: number) => void;
}
export function AppItem({ index, app, isSelected, isPaired, onSelected }: Props): JSX.Element {
  const { deviceName, appId } = app;
  return (
    <Button isPaired={isPaired} isSelected={isSelected} onPress={() => onSelected?.(index)}>
      {isPaired && <StarIcon size={20} fillColor="#00BBFF" />}
      <AppIcon size={32} />
      <ColumnLayout>
        <Text numberOfLines={1}>{deviceName}</Text>
        <ContentText numberOfLines={1}>{appId}</ContentText>
      </ColumnLayout>
    </Button>
  );
}
