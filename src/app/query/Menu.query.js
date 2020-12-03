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

import { Field } from 'Util/Query';
/**
 * Menu Query
 * @class MenuQuery
 * @namespace Query/Menu
 */
export class MenuQuery {
    /**
     * get Menu query
     * @param  {{identifier: String}} options A object containing different aspects of query, each item can be omitted
     * @return {Field} Menu query
     * @memberof MenuQuery
     */
    getQuery({ identifier }) {
        return new Field('scandiwebMenu')
            .addArgument('identifier', 'String!', identifier)
            .addFieldList(this._getMenuFields())
            .setAlias('menu');
    }

    _getMenuFields() {
        return [
            'menu_id', 'is_active', 'css_class', this._getMenuItemsField()
        ];
    }

    _getMenuItemsField() {
        return new Field('items')
            .addFieldList(this._getMenuItemFields());
    }

    _getMenuItemFields() {
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
