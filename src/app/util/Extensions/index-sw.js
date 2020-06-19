/* eslint-disable */
import generateConfig from './generateConfig';

export const extensions = [];
// See config/loaders/extension-import-injector
// * ScandiPWA extension importing magic comment! */

globalThis.plugins = generateConfig(extensions);
