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

import { Field, FieldArgument } from 'Util/Query';

import { CategoryQueryOptions } from './Query.type';

/**
 * Category Query
 * @class CategoryQuery
 * @namespace Query/Category/Query
 */
export class CategoryQuery {
    options = {} as CategoryQueryOptions;

    getQuery(options: CategoryQueryOptions = {} as CategoryQueryOptions): Field {
        this.options = options;
        const {
            name,
            type,
            value
        } = this._getConditionalArguments();

        return new Field('category')
            .addArgument(name, type, value)
            .addFieldList(this._getDefaultFields())
            .addField(this._getChildrenFields());
    }

    _getConditionalArguments(): FieldArgument {
        const { categoryIds } = this.options;

        if (categoryIds) {
            // return ['id', 'Int!', categoryIds];
            return {
                name: 'id',
                type: 'Int!',
                value: categoryIds
            };
        }

        throw new Error(__('There was an error requesting the category'));
    }

    _getChildrenFields(): Field {
        return new Field('children')
            .addFieldList(this._getDefaultFields());
    }

    _getBreadcrumbsField(): Field {
        return new Field('breadcrumbs')
            .addFieldList(this._getBreadcrumbFields());
    }

    _getBreadcrumbFields(): string[] {
        return [
            'category_name',
            'category_level',
            'category_url',
            'category_is_active'
        ];
    }

    _getCmsBlockFields(): string[] {
        return [
            'content',
            'disabled',
            'title',
            'identifier'
        ];
    }

    _getCmsBlockField(): Field {
        return new Field('cms_block')
            .addFieldList(this._getCmsBlockFields());
    }

    _getDefaultFields(): Array<string | Field> {
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
