/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

export * from './ContactForm.action';
export { default as ContactFormReducer } from './ContactForm.reducer';
export {
    default as ContactFormDispatcher, ContactFormDispatcher as ContactFormDispatcherClass
} from './ContactForm.dispatcher';
