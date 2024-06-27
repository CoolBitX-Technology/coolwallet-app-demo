export interface FirmwareInfo extends VersionInfo {
  isNeedSEUpdate: boolean;
  newSEVersion: string;
  isNeedMcuUpdate: boolean;
  newMcuVersion: string;
}

export interface VersionInfo {
  curSEVersion: string;
  curMcuVersion: string;
}
