import { Platform } from 'react-native';
import { MMKV } from 'react-native-mmkv';

type KeyValueStore = {
  getString(key: string): string | undefined;
  set(key: string, value: string | number | boolean): void;
  delete(key: string): void;
};

class WebMemoryStore implements KeyValueStore {
  private readonly map = new Map<string, string>();

  getString(key: string) {
    return this.map.get(key);
  }

  set(key: string, value: string | number | boolean) {
    this.map.set(key, String(value));
  }

  delete(key: string) {
    this.map.delete(key);
  }
}

let storage: KeyValueStore | null = null;

/** Non-sensitive infra keys only. Web uses an in-memory fallback so `expo start --web` works without native MMKV. */
export function getMmkvStorage(): KeyValueStore {
  if (!storage) {
    storage = Platform.OS === 'web' ? new WebMemoryStore() : new MMKV({ id: 'savings-tracker-infra' });
  }
  return storage;
}
