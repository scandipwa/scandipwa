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

import { Menu as MenuData, MenuItem } from 'Query/Menu.type';

import { FormattedMenuItem, MenuItemType, MenuLocation } from './Menu.type';

/**
 * Given an array of menu items, returns a copy of the array, sorted by their parent ID, then by their sort order (position)
 *
 * @param unsortedItems an array of items to be sorted
 * @returns {array} the sorted array
 * @namespace Util/Menu/getSortedItems
 */
export const getSortedItems = <T extends MenuItem | FormattedMenuItem>(
    unsortedItems: T[]
): T[] => Array.from(unsortedItems).sort((
        { parent_id: PID, position: P },
        { parent_id: prevPID, position: prevP }
    ) => (PID - prevPID) || (P - prevP));

/** @namespace Util/Menu */
export class Menu {
    menu: Record<string, FormattedMenuItem> = {};

    menuPositionReference: Record<string, number[]> = {};

    getMenuUrl(
        { url, url_type, category_id }: Pick<MenuItem, 'url' | 'url_type' | 'category_id'>
    ): MenuLocation | string {
        switch (url_type) {
        case MenuItemType.TYPE_CATEGORY:
            return {
                pathname: url,
                search: '',
                state: { category: category_id }
            };
        case MenuItemType.TYPE_CMS_PAGE:
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
    }: MenuItem): FormattedMenuItem {
        return {
            ...item,
            url: this.getMenuUrl({ url, url_type, category_id }),
            children: {}
        };
    }

    setToValue(obj: Record<string, FormattedMenuItem>, path: string, value: FormattedMenuItem): void {
        // eslint-disable-next-line fp/no-let
        let i;

        const pathArray = path.split('.');

        // eslint-disable-next-line fp/no-let, @typescript-eslint/no-explicit-any
        let tmpObj: Record<string, any> = obj;

        // eslint-disable-next-line fp/no-loops
        for (i = 0; i < pathArray.length - 1; i++) {
            tmpObj = tmpObj[pathArray[i]];
        }

        tmpObj[pathArray[i]] = value;
    }

    createItem(data: MenuItem): void {
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

    reduce({ items: unsortedItems }: MenuData): Record<string, FormattedMenuItem> {
        this.menu = {};
        this.menuPositionReference = {};

        getSortedItems(unsortedItems).forEach((realMenuItem) => {
            this.createItem(realMenuItem);
        });

        return this.menu;
    }
}

export default new Menu();
