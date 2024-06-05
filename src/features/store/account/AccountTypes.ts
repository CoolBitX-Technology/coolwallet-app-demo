import { AppKeyPair } from '@src/features/ble/utils/KeyPairUtils';

export interface AccountState {
  mnemonic: string;
  accounts: Record<string, AccountInfo | null>;
}

export interface AccountInfo {
  isWalletRecovered: boolean;
  deviceName: string;
  appId: string;
  password: string;
  currentIndex?: number;
  addresses: Record<number, string>;
}
