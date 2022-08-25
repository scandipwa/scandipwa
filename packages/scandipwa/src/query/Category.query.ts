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

import { Argument, Field, Query } from '@tilework/opus';

import {
    Breadcrumb,
    Category,
    CategoryQueryOptions,
    CategoryTree,
    CmsBlock
} from './Category.type';

/**
 * Category Query
 * @class CategoryQuery
 * @namespace Query/Category/Query
 */
export class CategoryQuery {
    options: Partial<CategoryQueryOptions> = {};

    getQuery(options: Partial<CategoryQueryOptions> = {}): Query<'category', Category> {
        this.options = options;
        const {
            name,
            type,
            value
        } = this._getConditionalArguments();

        return new Query<'category', Category>('category')
            .addArgument(name, type, value)
            .addFieldList(this._getDefaultFields())
            .addField(this._getChildrenFields());
    }

    _getConditionalArguments(): Argument {
        const { categoryIds } = this.options;

        if (categoryIds) {
            // return ['id', 'Int!', categoryIds];
            return {
                name: 'id',
                type: 'Int!',
                value: String(categoryIds)
            };
        }

        throw new Error(__('There was an error requesting the category'));
    }

    _getChildrenFields(): Field<'children', CategoryTree, true> {
        return new Field<'children', CategoryTree, true>('children')
            .addFieldList(this._getDefaultFields());
    }

    _getBreadcrumbsField(): Field<'breadcrumbs', Breadcrumb, true> {
        return new Field<'breadcrumbs', Breadcrumb, true>('breadcrumbs', true)
            .addFieldList(this._getBreadcrumbFields());
    }

    _getBreadcrumbFields(): Array<
    Field<'category_name', string>
    | Field<'category_level', number>
    | Field<'category_url', string>
    | Field<'category_is_active', boolean>
    > {
        return [
            new Field<'category_name', string>('category_name'),
            new Field<'category_level', number>('category_level'),
            new Field<'category_url', string>('category_url'),
            new Field<'category_is_active', boolean>('category_is_active')
        ];
    }

    _getCmsBlockFields(): Array<
    Field<'content', string>
    | Field<'disabled', boolean>
    | Field<'title', string>
    | Field<'identifier', string>
    > {
        return [
            new Field<'content', string>('content'),
            new Field<'disabled', boolean>('disabled'),
            new Field<'title', string>('title'),
            new Field<'identifier', string>('identifier')
        ];
    }

    _getCmsBlockField(): Field<'cms_block', CmsBlock> {
        return new Field<'cms_block', CmsBlock>('cms_block')
            .addFieldList(this._getCmsBlockFields());
    }

    _getDefaultFields(): Array<
    Field<'id', number>
    | Field<'url', string>
    | Field<'name', string>
    | Field<'image', string>
    | Field<'url_key', string>
    | Field<'url_path', string>
    | Field<'is_active', boolean>
    | Field<'meta_title', string>
    | Field<'description', string>
    | Field<'canonical_url', string>
    | Field<'product_count', number>
    | Field<'meta_keywords', string>
    | Field<'default_sort_by', string>
    | Field<'meta_description', string>
    | Field<'landing_page', number>
    | Field<'display_mode', string>
    | Field<'is_anchor', boolean>
    | Field<'cms_block', CmsBlock>
    | Field<'breadcrumbs', Breadcrumb, true>
    > {
        return [
            new Field<'id', number>('id'),
            new Field<'url', string>('url'),
            new Field<'name', string>('name'),
            new Field<'image', string>('image'),
            new Field<'url_key', string>('url_key'),
            new Field<'url_path', string>('url_path'),
            new Field<'is_active', boolean>('is_active'),
            new Field<'meta_title', string>('meta_title'),
            new Field<'description', string>('description'),
            new Field<'canonical_url', string>('canonical_url'),
            new Field<'product_count', number>('product_count'),
            new Field<'meta_keywords', string>('meta_keywords'),
            new Field<'default_sort_by', string>('default_sort_by'),
            new Field<'meta_description', string>('meta_description'),
            new Field<'landing_page', number>('landing_page'),
            new Field<'display_mode', string>('display_mode'),
            new Field<'is_anchor', boolean>('is_anchor'),
            this._getCmsBlockField(),
            this._getBreadcrumbsField()
        ];
    }
}

export default new CategoryQuery();
