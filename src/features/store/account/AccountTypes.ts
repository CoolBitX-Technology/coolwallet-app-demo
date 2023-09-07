export interface AccountState {
  mnemonic: string;
  accounts: Record<
    string,
    {
      isWalletRecovered: boolean;
      appId: string;
      password: string;
      currentIndex?: number;
      addresses: Record<number, string>;
    } | null
  >;
}
