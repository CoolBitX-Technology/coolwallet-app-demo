import { BlueButton } from '@src/features/components/BlueButton';
import { LogBox } from '@src/features/components/LogBox';
import { TextView } from '@src/features/components/TextView';
import { useLoadAppKeyPairUseCase } from '@src/features/home/usecases/useLoadAppKeyPairUseCase';
import { useLogUseCase } from '@src/features/home/usecases/useLogUseCase';
import { VStack } from 'native-base';
import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

const Layout = styled(View)`
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-top: 24px;
  padding-horizontal: 20px;
  padding-bottom: 100px;
`;

const Button = styled(BlueButton)`
  margin-top: 8px;
`;

export function RefreshAppKeyPairContainer(): JSX.Element {
  const { appKeyPair, isReseting, log, resetAppKeyPair } = useLoadAppKeyPairUseCase();
  return (
    <Layout>
      <VStack space={2} justifyContent="center" alignContent="flex-start" w={'100%'}>
        <LogBox log={log} />
        {appKeyPair && <TextView text={appKeyPair.publicKey} />}
        <Button text={'Refresh KeyPair'} isLoading={isReseting} disabled={isReseting} onClicked={resetAppKeyPair} />
      </VStack>
    </Layout>
  );
}
