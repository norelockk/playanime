import { CustomStorageData } from '../../typings/interfaces';
import { LogLevel } from '../../typings/enums';
import { logger } from '.';
import Environment from '../../env';

/**
 * Represents a storage manager responsible for interacting with the local storage.
 */
export default class HydraStorage {
  private readonly STORAGE_DEFAULTS: CustomStorageData = {
    clientLanguage: null,
    // clientAccessToken: null,
    clientPlayerMuted: false,
    clientPlayerVolume: 1,
    clientPrivacyAccept: false
  };

  private storage: Storage | undefined = window.localStorage instanceof Storage ? window.localStorage : undefined;

  /**
   * Constructs a new instance of StorageManager.
   * Initializes the storage and sets default values if it doesn't exist.
   * Throws an error if localStorage cannot be resolved.
   */
  constructor() {
    if (!this.storage) throw new Error('Unable to resolve localStorage.');

    const store = this.storage.getItem(Environment.DATA.STORAGE_NAME);

    if (!store) {
      this.storage.setItem(Environment.DATA.STORAGE_NAME, JSON.stringify(this.STORAGE_DEFAULTS));
      logger.log(LogLevel.Info, 'Default data has been set', this.STORAGE_DEFAULTS);
    }

    logger.log(LogLevel.Info, 'Initialized storage');
  }

  /**
   * Retrieves a value from storage based on the specified key.
   * @param key The key of the value to retrieve.
   * @returns The value corresponding to the provided key.
   * @throws Throws an error if the store cannot be resolved or if JSON data is malformed.
   */
  public getStorageData(key: keyof CustomStorageData): any {
    const store = this.storage!.getItem(Environment.DATA.STORAGE_NAME);
    if (!store) {
      throw new Error('Unable to resolve store');
    }

    let json: any = null;

    try {
      json = JSON.parse(store);
    } catch {
      throw new Error('JSON data in storage is malformed');
    } finally {
      if (json && typeof json === 'object' && key in json) {
        logger.log(LogLevel.Info, 'Storage data get from', key);
        return json[key];
      }

      return null;
    }
  }

  /**
   * Clears the storage by removing all stored data and resetting to defaults.
   */
  public clearStorage(): void {
    this.storage!.removeItem(Environment.DATA.STORAGE_NAME);
    this.storage!.setItem(Environment.DATA.STORAGE_NAME, JSON.stringify(this.STORAGE_DEFAULTS));

    logger.log(LogLevel.Info, 'Storage has been cleared');
  }

  /**
   * Sets a value in storage for the specified key.
   * @param key The key to set the value for.
   * @param value The value to set.
   * @throws Throws an error if the store cannot be resolved or if JSON data is malformed.
   */
  public setStorageData(key: keyof CustomStorageData, value: any): void {
    const store = this.storage!.getItem(Environment.DATA.STORAGE_NAME);
    if (!store) {
      throw new Error('Unable to resolve store');
    }

    let json: any = null;

    try {
      json = JSON.parse(store);
    } catch {
      throw new Error('JSON data in storage is malformed');
    } finally {
      if (json && typeof json === 'object') {
        if (key in json) {
          if (json[key] !== value) {
            json[key] = value;
          }
        } else {
          json[key] = value;
        }

        logger.log(LogLevel.Info, 'Storage data set to', key);

        this.storage!.setItem(Environment.DATA.STORAGE_NAME, JSON.stringify(json));
      }
    }
  }

  /**
   * Removes a value from storage corresponding to the specified key.
   * @param key The key of the value to remove.
   * @throws Throws an error if the store cannot be resolved or if JSON data is malformed.
   */
  public removeStorageData(key: keyof CustomStorageData): void {
    const store = this.storage!.getItem(Environment.DATA.STORAGE_NAME);
    if (!store) {
      throw new Error('Unable to resolve store');
    }

    let json: any = null;

    try {
      json = JSON.parse(store);
    } catch {
      throw new Error('JSON data in storage is malformed');
    } finally {
      if (json && typeof json === 'object' && key in json) {
        if (!(key in this.STORAGE_DEFAULTS)) {
          delete json[key];
        }

        logger.log(LogLevel.Info, 'Storage data removed at', key);

        this.storage!.setItem(Environment.DATA.STORAGE_NAME, JSON.stringify(json));
      }
    }
  }
}
