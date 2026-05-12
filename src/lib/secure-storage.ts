import * as SecureStore from 'expo-secure-store';

const KEY_PREFIX = 'st_secure_';

export async function secureSet(key: string, value: string): Promise<void> {
  await SecureStore.setItemAsync(`${KEY_PREFIX}${key}`, value);
}

export async function secureGet(key: string): Promise<string | null> {
  return SecureStore.getItemAsync(`${KEY_PREFIX}${key}`);
}

export async function secureDelete(key: string): Promise<void> {
  await SecureStore.deleteItemAsync(`${KEY_PREFIX}${key}`);
}
