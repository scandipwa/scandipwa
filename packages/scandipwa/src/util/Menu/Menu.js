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

export const TYPE_CUSTOM_URL = 0;
export const TYPE_CMS_PAGE = 1;
export const TYPE_CATEGORY = 2;

/**
 * Given an array of menu items, returns a copy of the array, sorted by their parent ID, then by their sort order (position)
 *
 * @param unsortedItems an array of items to be sorted
 * @returns {array} the sorted array
 * @namespace Util/Menu/getSortedItems
 */
export const getSortedItems = (unsortedItems) => Array.from(unsortedItems).sort((
    { parent_id: PID, position: P },
    { parent_id: prevPID, position: prevP }
) => (PID - prevPID) || (P - prevP));

/** @namespace Util/Menu */
// eslint-disable-next-line @scandipwa/scandipwa-guidelines/derived-class-names
export class Menu {
    getMenuUrl({ url, url_type, category_id }) {
        switch (url_type) {
        case TYPE_CATEGORY:
            return {
                pathname: url,
                search: '',
                state: { category: category_id }
            };
        case TYPE_CMS_PAGE:
            return {
                pathname: url,
                search: '',
                state: { page: true }
            };
        default:
            return url;
        }
    }

    getMenuData({
        cms_page_identifier,
        url,
        url_type,
        category_id,
        ...item
    }) {
        return {
            ...item,
            url: this.getMenuUrl({ url, url_type, category_id }),
            children: {}
        };
    }

    setToValue(obj, path, value) {
        // eslint-disable-next-line fp/no-let
        let i;
        path = path.split('.');
        // eslint-disable-next-line fp/no-loops
        for (i = 0; i < path.length - 1; i++) {
            obj = obj[path[i]];
        }
        obj[path[i]] = value;
    }

    createItem(data) {
        const { parent_id, item_id } = data;

        if (parent_id === 0) {
            this.menuPositionReference[item_id] = [];
            this.menu[item_id] = this.getMenuData(data);
        } else if (this.menuPositionReference[parent_id] !== undefined) {
            this.menuPositionReference[item_id] = [
                ...this.menuPositionReference[parent_id],
                parent_id
            ];

            this.setToValue(
                this.menu,
                `${this.menuPositionReference[item_id].join('.children.')}.children.${item_id}`,
                this.getMenuData(data)
            );
        }
    }

    reduce({ items: unsortedItems }) {
        this.menu = {};
        this.menuPositionReference = {};

        getSortedItems(unsortedItems).forEach((realMenuItem) => {
            this.createItem(realMenuItem);
        });

        return this.menu;
    }
}

export default new Menu();
