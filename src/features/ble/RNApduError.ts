export enum RNApduErrorCode {
  NOT_INITIALIZE = 1,
  REGISTER_FAIL = 2,
  NOT_REGISTER = 3,
  RESET_FAIL = 4,
  CREATE_MNEMONIC_FAIL = 5,
  RECOVER_WALLET_FAIL = 6,
}

export class RNApduError extends Error {
  errorCode: RNApduErrorCode;
  constructor(errorCode: RNApduErrorCode, message: string) {
    super(message);
    this.errorCode = errorCode;
  }
}
