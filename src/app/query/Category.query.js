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
 * Category Query
 * @class CategoryQuery
 */
export class CategoryQuery {
    getQuery(options = {}) {
        this.options = options;

        return new Field('category')
            .addArgument(...this._getConditionalArguments())
            .addFieldList(this._getDefaultFields())
            .addField(this._getChildrenFields());
    }

    _getConditionalArguments() {
        const { categoryUrlPath, categoryIds } = this.options;
        if (categoryUrlPath) return ['url_path', 'String!', categoryUrlPath];
        if (categoryIds) return ['id', 'Int!', categoryIds];
        throw new Error(__('Can not query category without ID/URL_PATH not specified.'));
    }

    _getChildrenFields() {
        return new Field('children')
            .addFieldList(this._getDefaultFields());
    }

    _getBreadcrumbsField() {
        return new Field('breadcrumbs')
            .addFieldList(this._getBreadcrumbFields());
    }

    _getBreadcrumbFields() {
        return ['category_name', 'category_url_key', 'category_level'];
    }

    _getDefaultFields() {
        return [
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
            this._getBreadcrumbsField()
        ];
    }
}

export default new CategoryQuery();
