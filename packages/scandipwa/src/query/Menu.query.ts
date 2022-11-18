/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa-theme
 * @link https://github.com/scandipwa/scandipwa-theme
 */

import { Field, Query } from '@tilework/opus';

import { MenuItem } from './Menu.type';
/**
 * Menu Query
 * @class MenuQuery
 * @namespace Query/Menu/Query */
export class MenuQuery {
    /**
     * get Menu query
     * @return {Field} Menu query
     * @memberof MenuQuery
     */
    getQuery(): Query<'menu', MenuItem, true> {
        return new Query<'menuItems', MenuItem, true>('menuItems', true)
            .addFieldList(this._getMenuItemFields())
            .setAlias('menu');
    }

    _getMenuItemFields(): Array<
    Field<'url', string>
    | Field<'title', string>
    | Field<'item_id', string>
    | Field<'position', number>
    | Field<'parent_id', number>
    | Field<'category_id', number>
    > {
        return [
            new Field<'url', string>('url'),
            new Field<'title', string>('title'),
            new Field<'item_id', string>('item_id'),
            new Field<'position', number>('position'),
            new Field<'parent_id', number>('parent_id'),
            new Field<'category_id', number>('category_id'),
        ];
    }
}

export default new MenuQuery();
