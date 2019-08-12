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

const CHILDREN_DEPTH = 0;

/**
 * Category Query
 * @class CategoryQuery
 */
class CategoryQuery {
    /**
     * get Category query
     * @param  {{ childrenDepth: Number }} options A object containing different aspects of query, each item can be omitted
     * @return {Field} Category query
     * @memberof CategoryQuery
     */
    getQuery(options = {}) {
        const { categoryUrlPath, categoryIds, childrenDepth } = options;
        const category = new Field('category');

        if (categoryUrlPath) {
            category.addArgument('url_path', 'String!', categoryUrlPath); // TODO: When config is available get value from config
        } else if (categoryIds) {
            category.addArgument('id', 'Int!', categoryIds);
        } else {
            throw new Error(__('Can not query category without ID/URL_PATH not specified.'));
        }

        this.childrenDepth = childrenDepth || CHILDREN_DEPTH;

        this._addDefaultFields(category);
        this._addChildrenFields(category);

        return category;
    }

    /**
     * Rewrite this function to get additional data from category
     * @param { Field } field Field on top of which new field should be added
     */
    _addCustomField() {}

    _addChildrenFields(field, depth = 0) {
        const children = new Field('children');

        this._addDefaultFields(children);

        if (depth < this.childrenDepth) {
            this._addChildrenFields(children, depth + 1);
        }

        field.addField(children);
    }

    _addDefaultFields(field) {
        const breadcrumbs = new Field('breadcrumbs')
            .addFieldList(['category_name', 'category_url_key', 'category_level']);

        const childrenFieldList = [
            'id',
            'name',
            'description',
            'url_path',
            'image',
            'url_key',
            'product_count',
            'meta_title',
            'meta_description',
            'canonical_url',
            breadcrumbs
        ];

        this._addCustomField(field);

        field.addFieldList(childrenFieldList);
    }
}

export { CategoryQuery };

export default new CategoryQuery();
