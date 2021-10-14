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

import { DataType } from '@tilework/opus';
import { StoreEnhancer } from 'redux';

import { ValidationData } from 'Util/Validator';

declare global {
    interface Window {
        '__REACT_DEVTOOLS_GLOBAL_HOOK__'?: Record<string, unknown>
        '__REDUX_DEVTOOLS_EXTENSION__'?: (options: unknown) => StoreEnhancer<unknown, unknown>
        storeRegexText: string
        actionName?: {
            type?: string
        }
        secure_base_media_url?: string
        // dataCache?: Record<number, DataType<any>>
    }

    function __(message: string, ...args: any[]): string

    namespace React {

        interface Component {
            __construct?(props: unknown): void
        }

        interface ClassAttributes<T> {
            block?: string
            elem?: string
            mods?: Record<string, unknown>
            mix?: Record<string, unknown>
        }
    }

    interface HTMLElementEventMap {
        validate: ValidationData
    }
}
