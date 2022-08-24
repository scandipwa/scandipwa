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

import { Field, Query } from '@tilework/opus';

import { Menu, MenuItem } from './Menu.type';
/**
 * Menu Query
 * @class MenuQuery
 * @namespace Query/Menu/Query */
export class MenuQuery {
    /**
     * get Menu query
     * @param  {{identifier: String}} options A object containing different aspects of query, each item can be omitted
     * @return {Field} Menu query
     * @memberof MenuQuery
     */
    getQuery({ identifier }: { identifier: string }): Query<'menu', Menu> {
        return new Query<'scandiwebMenu', Menu>('scandiwebMenu')
            .addArgument('identifier', 'String!', identifier)
            .addFieldList(this._getMenuFields())
            .setAlias('menu');
    }

    _getMenuFields(): Array<
    Field<'menu_id', string>
    | Field<'is_active', boolean>
    | Field<'css_class', string>
    | Field<'items', MenuItem, true>
    > {
        return [
            new Field<'menu_id', string>('menu_id'),
            new Field<'is_active', boolean>('is_active'),
            new Field<'css_class', string>('css_class'),
            this._getMenuItemsField()
        ];
    }

    _getMenuItemsField(): Field<'items', MenuItem, true> {
        return new Field<'items', MenuItem, true>('items', true)
            .addFieldList(this._getMenuItemFields());
    }

    _getMenuItemFields(): Array<
    Field<'url', string>
    | Field<'icon', string>
    | Field<'title', string>
    | Field<'item_id', string>
    | Field<'position', number>
    | Field<'url_type', number>
    | Field<'parent_id', number>
    | Field<'is_active', boolean>
    | Field<'item_class', string>
    | Field<'category_id', number>
    | Field<'cms_page_identifier', string>
    > {
        return [
            new Field<'url', string>('url'),
            new Field<'icon', string>('icon'),
            new Field<'title', string>('title'),
            new Field<'item_id', string>('item_id'),
            new Field<'position', number>('position'),
            new Field<'url_type', number>('url_type'),
            new Field<'parent_id', number>('parent_id'),
            new Field<'is_active', boolean>('is_active'),
            new Field<'item_class', string>('item_class'),
            new Field<'category_id', number>('category_id'),
            new Field<'cms_page_identifier', string>('cms_page_identifier')
        ];
    }
}

export default new MenuQuery();
