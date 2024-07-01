export interface AccountState {
  mnemonic: string;
  masterKey: string;
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
