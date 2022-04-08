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
import { Action } from 'redux';

import { CategoryFragment } from 'Type/Category.type';

import { UPDATE_CURRENT_CATEGORY } from './Category.action';

export type CategoryStore = {
    category: CategoryFragment | Record<string, unknown>;
};

export type CategoryAction = Action<typeof UPDATE_CURRENT_CATEGORY>;

declare module 'Util/Store/type' {
    export interface RootState {
        CategoryReducer: CategoryStore;
    }
}
