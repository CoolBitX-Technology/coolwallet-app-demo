import React from 'react';
import { ViewStyle, View, ScrollView, RefreshControl, Platform } from 'react-native';
import styled from 'styled-components/native';
import { Button, Text, VStack } from 'native-base';
import { AppItem } from '@src/features/components/AppItem';
import { LogBox, getDefaultLog } from '@src/features/components/LogBox';
import { PairedApp } from '@src/features/ble/data/PairedApp';

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
  margin-vertical: 16px;
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
  log?: string;
  items: Array<PairedApp>;
  selectedIndex: number;
  pairedAppId?: string;
  isFetching?: boolean;
  isRemoving?: boolean;
  isConnected?: boolean;
  errorText?: string;
  onFetch?: () => void;
  onSelected?: (index: number) => void;
  onCanceled?: () => void;
  onRemoved?: (appId: string) => void;
}
export function PairedAppsView({
  style,
  items,
  pairedAppId,
  log = getDefaultLog(),
  isFetching = false,
  isRemoving = false,
  isConnected = false,
  selectedIndex = -1,
  errorText,
  onFetch,
  onCanceled,
  onSelected,
  onRemoved,
}: Props): JSX.Element {
  const notSelected = selectedIndex === -1;
  const selectedItem = items?.[selectedIndex];
  const onRemove = () => {
    if (notSelected || !selectedItem) return;
    onRemoved?.(selectedItem.appId);
  };
  return (
    <View style={style}>
      <VStack space={1} justifyContent="center" alignContent="flex-start" w={'100%'}>
        <LogBox style={{ margin: 16 }} size={0.4} log={log} />
      </VStack>
      <ListView isScaning={isFetching} refreshControl={<RefreshControl refreshing={isFetching} onRefresh={onFetch} />}>
        {items.map((item, index) => {
          return (
            <View key={item.appId}>
              <ItemSeparator />
              <AppItem
                index={index}
                app={item}
                isSelected={selectedIndex === index}
                isPaired={pairedAppId === item.appId}
                onSelected={onSelected}
              />
            </View>
          );
        })}
      </ListView>
      {items.length > 0 && <ItemSeparator />}
      <ButtonLayout>
        <StyledButton onPress={onCanceled}>{'Cancel'}</StyledButton>
        <StyledButton
          opacity={notSelected ? 0.5 : 1}
          disabled={!isConnected || notSelected || isFetching}
          isLoading={isRemoving}
          onPress={onRemove}
        >
          {'Remove'}
        </StyledButton>
      </ButtonLayout>
      {errorText ? <EmptyText>{errorText}</EmptyText> : undefined}
    </View>
  );
}
