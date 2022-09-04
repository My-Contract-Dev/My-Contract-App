import AsyncStorage from '@react-native-async-storage/async-storage';
import { AsyncStorageTypes, IAsyncStorage } from 'keyvaluestorage/dist/cjs/react-native/types';

export class AppAsyncStorage implements IAsyncStorage {
    store: Map<string, any>;

    constructor() {
        this.store = new Map();
    }

    size(): number {
        return 0;
    }

    getStore(): Map<string, any> {
        return new Map();
    }
    async getItem(k: string, cb?: AsyncStorageTypes.ErrBack<any>): Promise<any> {
        try {
            const value = await AsyncStorage.getItem(k);
            const item = value ? JSON.parse(value) : null;
            cb?.(null, item);
        } catch (err) {
            cb?.(err as any);
            throw err;
        }
    }
    async setItem(k: string, v: any, cb?: AsyncStorageTypes.ErrBack<any>): Promise<void> {
        try {
            await AsyncStorage.setItem(k, JSON.stringify(v));
            cb?.(null);
        } catch (err) {
            cb?.(err as any);
            throw err;
        }
    }
    async removeItem(k: string, cb?: AsyncStorageTypes.ErrBack<any>): Promise<void> {
        try {
            await AsyncStorage.removeItem(k);
            cb?.(null);
        } catch (err) {
            cb?.(err as any);
            throw err;
        }
    }
    async clear(cb?: AsyncStorageTypes.ErrBack<any>): Promise<void> {
        try {
            await AsyncStorage.clear();
            cb?.(null);
        } catch (err) {
            cb?.(err as any);
            throw err;
        }
    }
    async getAllKeys(cb?: AsyncStorageTypes.ErrBack<string[]>): Promise<string[]> {
        try {
            const keys = await AsyncStorage.getAllKeys();
            cb?.(null);
            return keys.map(k => k.toString());
        } catch (err) {
            cb?.(err as any);
            throw err;
        }
    }
    async multiGet(keys: string[], cb?: AsyncStorageTypes.ErrBack<AsyncStorageTypes.Entries<string, any>>): Promise<AsyncStorageTypes.Entries<string, any>> {
        try {
            const values = await AsyncStorage.multiGet(keys);
            const items = values.map(([key, value]) => [key, value ? JSON.parse(value) : null] as [string, any]);
            cb?.(null);
            return items;
        } catch (err) {
            cb?.(err as any);
            throw err;
        }
    }
    async multiSet(entries: AsyncStorageTypes.Entries<string, any>, cb?: AsyncStorageTypes.ErrBack<any>): Promise<void> {
        try {
            await AsyncStorage.multiSet(entries.map(([key, value]) => [key, JSON.stringify(value)]));
            cb?.(null);
        } catch (err) {
            cb?.(err as any);
            throw err;
        }
    }
    async multiRemove(keys: string[], cb?: AsyncStorageTypes.ErrBack<any>): Promise<void> {
        try {
            const values = await AsyncStorage.multiRemove(keys);
            cb?.(null);
        } catch (err) {
            cb?.(err as any);
            throw err;
        }
    }
    mergeItem(key: string, value: string, cb?: AsyncStorageTypes.ErrBack<string>): Promise<void> {
        throw new Error('Method not implemented.');
    }
    multiMerge(entries: AsyncStorageTypes.Entries<string, string>, cb?: AsyncStorageTypes.ArrErrBack<string>): Promise<void> {
        throw new Error('Method not implemented.');
    }
    flushGetRequests() {
        throw new Error('Method not implemented.');
    }
    
}
