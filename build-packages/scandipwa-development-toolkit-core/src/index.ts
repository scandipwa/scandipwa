export * from './types';

import create from './create';
import extend from './extend';

import createExtension from './extension/create';
import installExtension from './extension/install';

import { getRelativeResourceDirectory } from './extend/fs-interactions';

export { 
    create,
    extend,
    createExtension,
    installExtension,
    getRelativeResourceDirectory
};
