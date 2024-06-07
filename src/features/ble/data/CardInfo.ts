export interface CardInfo {
  paired: boolean; // indicates whether the card has been paired before
  locked: boolean; // indicates whether the card has been locked due to too many incorrect password attempts
  walletCreated: boolean; // indicates whether a wallet has been created by restoring from a seed
  showDetail: boolean; // indicates whether the counterparty's address is displayed during card transactions
  pairRemainTimes: number; // indicates the number of remaining pairing attempts allowed, with a maximum of 5 attempts
  accountDigest: string; // indicates the first 10 digits of the card's seed. Restoring with the same mnemonic will yield the same result
  accountDigest20?: string; // similar to accountDigest, but displays the first 20 digits of the card's seed.
  cardanoSeed?: string; // indicates whether the Cardano seed has been imported.
}
