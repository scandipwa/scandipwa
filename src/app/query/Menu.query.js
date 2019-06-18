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
 */
class MenuQuery {
    /**
     * get Menu query
     * @param  {{menuId: String}} options A object containing different aspects of query, each item can be omitted
     * @return {Field} Menu query
     * @memberof MenuQuery
     */
    getQuery(options) {
        const { menuId } = options;

        const items = new Field('items')
            .addFieldList([
                'item_id', 'is_active',
                'parent_id', 'position', 'title',
                'item_class', 'url', 'url_type',
                'cms_page_identifier', 'category_id'
            ]);

        return new Field('scandiwebMenu')
            .addArgument('id', 'ID!', menuId)
            .addFieldList(['menu_id', 'is_active', 'css_class'])
            .addField(items)
            .setAlias('menu');
    }
}

export { MenuQuery };

export default new MenuQuery();
