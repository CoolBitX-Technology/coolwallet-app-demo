import { NavigationProp, useNavigation } from '@react-navigation/native';
import { DemoAppParamList } from '@src/DemoAppNavigator';
import { ActionItemProps } from '@src/features/components/ActionItem';
import { KeyboardAwareView } from '@src/features/components/KeyboardAwareView';
import { RouteItem, RouteListView } from '@src/features/components/RouteListView';
import { CardPairingView } from '@src/features/home/CardPairingView';
import { useCardPairingUseCase } from '@src/features/home/usecases/useCardPairingUseCase';
import { useRecoverWalletUseCase } from '@src/features/home/usecases/useRecoverWalletUseCase';
import { useBluetoothInfo, useIsConnected } from '@src/features/store/device/DeviceActionHooks';
import { RouteName } from '@src/routes/type';
import { useMemo, useState } from 'react';

function useRouteItems() {
  const navigation = useNavigation<NavigationProp<DemoAppParamList>>();
  const routeItems: Array<RouteItem> = [
    {
      routeName: RouteName.RESET_CARD,
      onButtonPress: () => navigation.navigate(RouteName.RESET_CARD),
    },
    {
      routeName: RouteName.REGISTER_CARD,
      onButtonPress: () => navigation.navigate(RouteName.REGISTER_CARD),
    },
    {
      routeName: RouteName.CREATE_MNEMONIC,
      onButtonPress: () => navigation.navigate(RouteName.CREATE_MNEMONIC),
    },
    {
      routeName: RouteName.RECOVER_MNEMONIC,
      onButtonPress: () => navigation.navigate(RouteName.RECOVER_MNEMONIC),
    },
    {
      routeName: RouteName.REFRESH_PAIRING_PASSWORD,
      onButtonPress: () => navigation.navigate(RouteName.REFRESH_PAIRING_PASSWORD),
    },
  ];
  return routeItems;
}

function useActionItems(): Array<ActionItemProps> {
  const bleInfo = useBluetoothInfo();
  const isConnected = useIsConnected();
  const { registerCard, resetCard, refreshPairPassword, appId, pairPassword, isPaired, isRegistering, isReseting, isRefreshing } =
    useCardPairingUseCase();
  const { createWallet, recoverWallet, mnemonic, isRecovering } = useRecoverWalletUseCase();
  const [recoverMnmonic, setRecoverMnemonic] = useState('');
  const [pairingPassword, setPairingPassword] = useState('');
  return useMemo(
    () => [
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
        onPressButton: () => registerCard(bleInfo?.cardId, pairingPassword),
        pairingPassword,
        onPairingPasswordChanged: (pairingPassword) => setPairingPassword(pairingPassword),
        shouldShowPairingPasswordInput: true,
      },
      {
        title: 'Create Mnemonic',
        buttonText: 'Create',
        input: mnemonic,
        disableButton: !isConnected,
        onPressButton: () => createWallet(),
        shouldDisplayInput: true,
        shouldShowCopyButton: true,
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
        isLoading: isRefreshing,
      },
    ],
    [
      bleInfo,
      isPaired,
      isConnected,
      pairPassword,
      recoverMnmonic,
      appId,
      isRegistering,
      isReseting,
      isRecovering,
      mnemonic,
      isRefreshing,
      pairingPassword,
    ],
  );
}

export function CardPairingContainer() {
  const routeItems = useRouteItems();
  return (
    <RouteListView title={'Initialize your CoolWallet Pro'} items={routeItems} />
  );
}
