import { useConnectBleUseCase } from '@src/features/ble/usecases/useConnectBleUseCase';
import { useCardPairingUseCase } from '@src/features/cardPairing /usecases/useCardPairingUseCase';
import { ActionItemProps } from '@src/features/components/ActionItem';
import { KeyboardAwareView } from '@src/features/components/KeyboardAwareView';
import { InitializeWalletView } from '@src/features/home/InitailizeWalletView';
import { KeyboardAvoidingView } from 'native-base';
import { useState } from 'react';
import { View } from 'react-native';

export function CardPairingContainer() {
  const { transport } = useConnectBleUseCase();
  const { registerCard, resetCard, createWallet, recoverWallet } = useCardPairingUseCase();
  const [pairingPassword, setPairingPassword] = useState('');
  const [mnemonic, setMnmonic] = useState('');
  const actionItemData: Array<ActionItemProps> = [
    {
      title: 'Reset Card',
      buttonText: 'Reset',
      onPressButton: () => resetCard(),
    },
    {
      title: 'Register Card',
      buttonText: 'Register',
      onPressButton: () => registerCard(transport),
    },
    {
      title: 'Create Mnemonic',
      buttonText: 'Create',
      onPressButton: () => createWallet(),
      shouldDisplayInput: true,
    },
    {
      title: 'Recover Mnemonic',
      buttonText: 'Recover',
      onPressButton: () => recoverWallet(mnemonic),
      isEditable: true,
      shouldDisplayInput: true,
      input: mnemonic,
      onInputChanged: (mnemonic) => setMnmonic(mnemonic),
    },
    {
      title: 'Get Pairing Password',
      buttonText: 'Get',
      onPressButton: () => {},
      shouldDisplayInput: true,
    },
  ];
  return (
    <KeyboardAwareView>
      <InitializeWalletView actionItemData={actionItemData} />
    </KeyboardAwareView>
  );
}
