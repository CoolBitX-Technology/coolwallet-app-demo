import { crypto } from '@coolwallet/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import isEmpty from 'lodash/isEmpty';

export const CW_APP_KEYPAIR = 'cw_app_key_pair';

export async function saveObject(key: string, obj: object) {
  await saveString(key, JSON.stringify(obj));
}

export async function loadObject(key: string) {
  const str = await loadString(key);
  if (!str) return {};
  return JSON.parse(str);
}

export async function saveString(key: string, value: string) {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(`StorageUtils.saveData >>> error:${e}`);
  }
}

export async function loadString(key: string): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    console.log(`StorageUtils.loadData >>> error:${e}`);
    return null;
  }
}

export interface AppKeyPair {
  publicKey: string;
  privateKey: string;
}
export async function loadAppKeyPair(): Promise<AppKeyPair> {
  const nullableKeyPair = await loadObject(CW_APP_KEYPAIR);
  if (isEmpty(nullableKeyPair)) {
    return await crypto.key.generateKeyPair();
  }
  return nullableKeyPair;
}
