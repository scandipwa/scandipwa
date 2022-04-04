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

import { Field, Query } from '@tilework/opus';

import { GQLItem, GQLMenu } from 'Type/Graphql.type';

import { CommonField } from './Query.type';
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
    getQuery({ identifier }: { identifier: string }): Query<'menu', GQLMenu> {
        return new Query<'scandiwebMenu', GQLMenu>('scandiwebMenu')
            .addArgument('identifier', 'String!', identifier)
            .addFieldList(this._getMenuFields())
            .setAlias('menu');
    }

    _getMenuFields(): CommonField[] {
        return [
            'menu_id', 'is_active', 'css_class', this._getMenuItemsField()
        ];
    }

    _getMenuItemsField(): Field<'items', GQLItem, true> {
        return new Field<'items', GQLItem, true>('items', true)
            .addFieldList(this._getMenuItemFields());
    }

    _getMenuItemFields(): string[] {
        return [
            'url',
            'icon',
            'title',
            'item_id',
            'position',
            'url_type',
            'parent_id',
            'is_active',
            'item_class',
            'category_id',
            'cms_page_identifier'
        ];
    }
}

export default new MenuQuery();
