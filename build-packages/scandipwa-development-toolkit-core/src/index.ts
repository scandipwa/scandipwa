import create from './create';
import extend from './extend';
import { getRelativeResourceDirectory } from './extend/fs-interactions';
import createExtension from './extension/create';
import installExtension from './extension/install';

export * from './types';

export {
    create,
    extend,
    createExtension,
    installExtension,
    getRelativeResourceDirectory,
};
