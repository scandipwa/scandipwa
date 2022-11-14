/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

import { Dispatch } from 'redux';

import { RootState } from 'Util/Store/Store.type';

import getStore from '.';

/** @namespace Util/Store/SimpleDispatcher */
export abstract class SimpleDispatcher {
    protected dispatch: Dispatch = getStore().dispatch;

    protected storeState: RootState = getStore().getState() as RootState;
}
