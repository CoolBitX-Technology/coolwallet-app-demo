class RNNfcError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RNNfcError';
  }
}

export default RNNfcError;
