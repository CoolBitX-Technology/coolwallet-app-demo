import { RNApduError } from '@src/features/ble/RNApduError';
import { useGetCardInfoUseCase } from '@src/features/cardPairing/usecases/useGetCardInfoUseCase';
import { BlueButton } from '@src/features/components/BlueButton';
import { LogBox } from '@src/features/components/LogBox';
import { TextView } from '@src/features/components/TextView';
import { useLogUseCase } from '@src/features/home/usecases/useLogUseCase';
import { useCardId, useIsConnected } from '@src/features/store/device/DeviceActionHooks';
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

const ButtonLayout = styled(View)`
  flex-direction: row;
  justify-content: space-between;
`;

const Button = styled(BlueButton)`
  margin-top: 8px;
`;

export function GetCardInfoContainer(): JSX.Element {
  const cardId = useCardId();
  const isConnected = useIsConnected();
  const { getCardInfo, isQuerying } = useGetCardInfoUseCase();
  const isBtnDisable = !isConnected || isQuerying;
  const { log, addLog, resetLog } = useLogUseCase();

  const onClick = () => {
    resetLog();
    addLog('QUERYING....');
    getCardInfo()
      .then((cardInfo) => {
        addLog('QUERIED SUCCESS');
        addLog(`paired: ${cardInfo.paired}\r\n// Indicates whether the card has been paired before.`);
        addLog(
          `locked: ${cardInfo.locked}\r\n// Indicates whether the card has been locked due to too many incorrect password attempts.`,
        );
        addLog(
          `walletCreated: ${cardInfo.walletCreated}\r\n// Indicates whether a wallet has been created by restoring from a seed.`,
        );
        addLog(
          `showDetail: ${cardInfo.showDetail}\r\n// Indicates whether the counterparty's address is displayed during card transactions.`,
        );
        addLog(
          `pairRemainTimes: ${cardInfo.pairRemainTimes}\r\n// Indicates the number of remaining pairing attempts allowed, with a maximum of 5 attempts.`,
        );
        addLog(
          `accountDigest: ${cardInfo.accountDigest}\r\n// Indicates the first 10 digits of the card's seed. Restoring with the same mnemonic will yield the same result.`,
        );
        if (cardInfo.accountDigest20)
          addLog(
            `accountDigest20: ${cardInfo.accountDigest20}\r\n// Similar to accountDigest, but displays the first 20 digits of the card's seed.`,
          );
        addLog(`cardanoSeed: ${cardInfo.cardanoSeed}\r\n// Indicates whether the Cardano seed has been imported.`);
      })
      .catch((e) => {
        const error = e as RNApduError;
        addLog('QUERIED FAILED >>> ERROR=' + error);
      });
  };
  return (
    <Layout>
      <VStack space={3} justifyContent="center" alignContent="flex-start" w={'100%'}>
        <LogBox log={log} size={0.6} />
        <TextView text={cardId} placeholder="Card Id" />
        <ButtonLayout>
          <Button isLoading={isQuerying} disabled={isBtnDisable} onClicked={onClick} text={'Get Card Info'} />
        </ButtonLayout>
      </VStack>
    </Layout>
  );
}
