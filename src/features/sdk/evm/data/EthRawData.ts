import { RawData } from '@src/features/sdk/data/RawData';

export enum EthDataType {
  SmartContract = 'SmartContract',
  Transfer = 'Transfer',
  Message = 'Message',
  TypedData = 'TypedData',
}

export interface EthRawData extends RawData {
  data?: string;
  dataType: EthDataType;
  index: number;
  gasMultiplier?: number;
}
