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
 * @namespace Query/Category
 */
export class CategoryQuery {
    __construct() {
        super.__construct();
        this.options = {};
    }

    getQuery(options = {}) {
        this.options = options;

        return new Field('category')
            .addArgument(...this._getConditionalArguments())
            .addFieldList(this._getDefaultFields())
            .addField(this._getChildrenFields());
    }

    _getConditionalArguments() {
        const { categoryIds } = this.options;

        if (categoryIds) {
            return ['id', 'Int!', categoryIds];
        }

        throw new Error(__('There was an error requesting the category'));
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
        return [
            'category_name',
            'category_level',
            'category_url',
            'category_is_active'
        ];
    }

    _getCmsBlockFields() {
        return [
            'content',
            'disabled',
            'title',
            'identifier'
        ];
    }

    _getCmsBlockField() {
        return new Field('cms_block')
            .addFieldList(this._getCmsBlockFields());
    }

    _getDefaultFields() {
        return [
            'id',
            'url',
            'name',
            'image',
            'url_key',
            'url_path',
            'is_active',
            'meta_title',
            'description',
            'canonical_url',
            'product_count',
            'meta_keywords',
            'default_sort_by',
            'meta_description',
            'landing_page',
            'display_mode',
            'is_anchor',
            this._getCmsBlockField(),
            this._getBreadcrumbsField()
        ];
    }
}

export default new CategoryQuery();
