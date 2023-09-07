export interface AccountState {
  mnemonic: string;
  accounts: Record<
    string,
    {
      appId: string;
      password: string;
      currentIndex?: number;
      addresses: Record<number, string>;
    } | null
  >;
}
