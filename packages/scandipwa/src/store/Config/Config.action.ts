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

import {
    ConfigActionType,
    ConfigStore,
    UpdateConfigStateAction,
} from './Config.type';

export const UPDATE_CONFIG_STATE = 'UPDATE_CONFIG_STATE';

/** @namespace Store/Config/Action/updateConfigState */
export const updateConfigState = (state: Partial<ConfigStore>): UpdateConfigStateAction => ({
    type: ConfigActionType.UPDATE_CONFIG_STATE,
    state,
});
