/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENCE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

/* eslint-disable no-param-reassign */
import {
    UPDATE_MENU
} from './HeaderAndFooter.action';

const initialState = {
    menu: {}
};

const HeaderAndFooterReducer = (state = initialState, action) => {
    switch (action.type) {
    case UPDATE_MENU:
        const { menu: { items } } = action;

        const menu = {};
        const menuPositionReference = {};

        const setToValue = (obj, path, value) => {
            let i;
            path = path.split('.');
            for (i = 0; i < path.length - 1; i++) obj = obj[path[i]];
            obj[path[i]] = value;
        };

        const createItem = (data) => {
            const { parent_id, item_id } = data;

            if (parent_id === 0) {
                menuPositionReference[item_id] = [];
                menu[item_id] = {
                    ...data,
                    children: {}
                };
            } else {
                menuPositionReference[item_id] = [...menuPositionReference[parent_id], parent_id];
                const position = menuPositionReference[item_id];
                const dotSeparatedPath = `${position.join('.children.')}.children.${item_id}`;

                setToValue(menu, dotSeparatedPath, {
                    ...data,
                    children: {}
                });
            }
        };

        items.forEach((realMenuItem) => {
            createItem(realMenuItem);
        });

        return {
            ...state,
            menu
        };

    default:
        return state;
    }
};

export default HeaderAndFooterReducer;
