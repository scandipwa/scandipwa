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

/* eslint-disable no-param-reassign */
import {
    UPDATE_MENU,
    TOGGLE_HEADER_AND_FOOTER,
    GET_COUNTRY_LIST
} from './HeaderAndFooter.action';

const initialState = {
    menu: {},
    isHeaderAndFooterVisible: true,
    countries: []
};

const HeaderAndFooterReducer = (state = initialState, action) => {
    const { countries } = action;

    const resultingCountries = countries && countries.map(country => ({
        id: country.id,
        label: country.full_name_locale,
        available_regions: country.available_regions
    }));

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

    case TOGGLE_HEADER_AND_FOOTER:
        const { isHeaderAndFooterVisible } = action;

        return {
            ...state,
            isHeaderAndFooterVisible
        };

    case GET_COUNTRY_LIST:
        return {
            ...state,
            countries: resultingCountries
        };


    default:
        return state;
    }
};

export default HeaderAndFooterReducer;
