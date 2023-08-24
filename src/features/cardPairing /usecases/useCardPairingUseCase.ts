import { Transport } from '@coolwallet/core';
import { RNApduManager } from '@src/features/ble/RNApduManager';
import { CW_APP_KEYPAIR, loadAppKeyPair, loadString, saveObject, saveString } from '@src/features/ble/utils/StorageUtils';
import { useDispatchMnemonicChange } from '@src/features/store/account/AccountActionHooks';
import { useDispatchLogChange } from '@src/features/store/log/LogActionHooks';
import ObjectUtils from '@src/features/utils/ObjectUtils';

const CW_APP_ID = 'cw_appid';

interface UseCardPairingUseCaseOutput {
  initPairingProcess: (transport?: Transport) => void;
  registerCard: (transport?: Transport) => void;
  resetCard: () => void;
  createWallet: () => Promise<string>;
  recoverWallet: (mnemonic: string) => void;
}
export function useCardPairingUseCase(): UseCardPairingUseCaseOutput {
  const updateLog = useDispatchLogChange();
  const updateMnemonic = useDispatchMnemonicChange();

  const getAppKeyPair = async () => {
    const appKeyPair = await loadAppKeyPair();
    saveObject(CW_APP_KEYPAIR, appKeyPair).then;
    return appKeyPair;
  };

  const initPairingProcess = async (transport?: Transport) => {
    if (!transport) return;
    const appKeyPair = await getAppKeyPair();
    RNApduManager.getInstance().init(transport, appKeyPair);
  };

  const registerCard = async (transport?: Transport) => {
    if (!transport) return;
    const username = ObjectUtils.checkNotNull(transport.device.id, 'username for registration is not defined');
    const password = generateRandomPassword();
    console.log('username >>>>> ' + username);
    console.log('password >>>>> ' + password);
    const appId = await RNApduManager.getInstance().registerDevice(username, password);
    await saveString(CW_APP_ID, appId);
    updateLog(appId ? `REGISTER SUCCESS\nAppId >>>>> ${appId}` : 'REGISTER FAILED');
  };

  const resetCard = async () => {
    const resetSatus = await RNApduManager.getInstance().resetDevice();
    updateLog(resetSatus ? 'RESET SUCCESS' : 'RESET FAILED');
  };

  const createWallet = async () => {
    const mnemonic = await RNApduManager.getInstance().createMnemonic();
    updateMnemonic(mnemonic);
    console.log('mnemonic >>>>> ' + mnemonic);

    return mnemonic;
  };

  const recoverWallet = async (mnemonic: string) => {
    const appId = await loadString(CW_APP_ID);
    if (!appId) return;
    await RNApduManager.getInstance().recoverWallet(appId, mnemonic);
  };

  // Generate Register Password
  const generateRandomPassword = (): string => {
    const min = 10000000; // Minimum 8-digit number (10^7)
    const max = 99999999; // Maximum 8-digit number (10^8 - 1)

    // Generate a random decimal number between 0 and 1
    const randomDecimal = Math.random();

    // Scale the random decimal to the range between min and max
    const randomInRange = Math.floor(randomDecimal * (max - min + 1)) + min;

    return randomInRange.toString();
  };

  return {
    initPairingProcess,
    registerCard,
    resetCard,
    createWallet,
    recoverWallet,
  };
}
