import { Storage } from './Storage';

export const persistedQueryStorage = new Storage()
    .setDatabaseName('persisted-query')
    .init();

export const CACHE_TABLE = 'cache';
