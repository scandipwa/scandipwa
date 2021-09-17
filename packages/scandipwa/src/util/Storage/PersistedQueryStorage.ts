import { Storage } from './Storage';

export const persistedQueryStorage = new Storage(
    'persisted-query',
    'cache'
);
