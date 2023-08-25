export interface AccountState {
  mnemonic: string;
  accounts: Record<
    string,
    {
      appId: string;
      password: string;
    } | null
  >;
}
