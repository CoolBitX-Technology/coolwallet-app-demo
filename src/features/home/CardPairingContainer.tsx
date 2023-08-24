import { ActionItemProps } from '@src/features/components/ActionItem';
import { KeyboardAwareView } from '@src/features/components/KeyboardAwareView';
import { CardPairingView } from '@src/features/home/CardPairingView';
import { useCardPairingUseCase } from '@src/features/home/usecases/useCardPairingUseCase';
import { useRecoverWalletUseCase } from '@src/features/home/usecases/useRecoverWalletUseCase';
import { useBluetoothInfo, useIsConnected } from '@src/features/store/device/DeviceActionHooks';
import { useMemo, useState } from 'react';

function useActionItems(): Array<ActionItemProps> {
  const bleInfo = useBluetoothInfo();
  const isConnected = useIsConnected();
  const { registerCard, resetCard, refreshPairPassword, appId, pairPassword, isPaired, isRegistering, isReseting } = useCardPairingUseCase();
  const { createWallet, recoverWallet, mnemonic, isRecovering } = useRecoverWalletUseCase();
  const [ recoverMnmonic, setRecoverMnemonic] = useState('');
  return useMemo(()=>[
    {
      title: 'Reset Card',
      buttonText: 'Reset',
      disableButton: !isConnected,
      isLoading: isReseting,
      onPressButton: () => resetCard(bleInfo?.cardId),
    },
    {
      title: 'Register Card',
      buttonText: 'Register',
      input: appId,
      isLoading: isRegistering,
      shouldDisplayInput: true,
      disableButton: !isConnected || isPaired,
      onPressButton: () => registerCard(bleInfo?.cardId),
    },
    {
      title: 'Create Mnemonic',
      buttonText: 'Create',
      input: mnemonic,
      disableButton: !isConnected,
      onPressButton: () => createWallet(),
      shouldDisplayInput: true,
    },
    {
      title: 'Recover Mnemonic',
      buttonText: 'Recover',
      onPressButton: () => recoverWallet(recoverMnmonic),
      isEditable: true,
      shouldDisplayInput: true,
      disableButton: !isConnected || !isPaired,
      input: recoverMnmonic,
      isLoading: isRecovering,
      onInputChanged: (mnemonic) => setRecoverMnemonic(mnemonic),
    },
    {
      title: 'Refresh Pairing Password',
      buttonText: 'Refresh',
      disableButton: !isConnected || !isPaired,
      onPressButton: () => refreshPairPassword(bleInfo?.cardId),
      input: pairPassword,
      shouldDisplayInput: true,
    },
  ], [bleInfo, isPaired, isConnected, pairPassword, recoverMnmonic, appId, isRegistering, isReseting, isRecovering]);
}

export function CardPairingContainer() {
  const actionItems = useActionItems();
  return (
    <KeyboardAwareView>
      <CardPairingView actionItems={actionItems} />
    </KeyboardAwareView>
  );
}
