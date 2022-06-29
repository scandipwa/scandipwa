/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/scandipwa
 */

import MenuQuery from 'Query/Menu.query';
import { showNotification } from 'Store/Notification/Notification.action';
import { prepareQuery } from 'Util/Query';
import {
    executeGet
} from 'Util/Request';

import { updateMenuitems } from './Menu.action';

export const ONE_MONTH_IN_SECONDS = 2592000;

/** @namespace Store/Menu/Dispatcher */
export class MenuDispatcher {
    async updateMenuData(dispatch) {
        const query = [MenuQuery.getQuery(this._getMenuOptions())];

        try {
            const { menu } = await executeGet(prepareQuery(query), 'Menu', ONE_MONTH_IN_SECONDS);

            dispatch(updateMenuitems(menu));
        } catch (error) {
            showNotification('error', __('Error fetching Menu!'), error);
        }
    }

    _getMenuOptions() {
        const { header_content: { header_menu } = {} } = window.contentConfiguration;

        return {
            identifier: header_menu || 'new-main-menu'
        };
    }
}

export default new MenuDispatcher();
