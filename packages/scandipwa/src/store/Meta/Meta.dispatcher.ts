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
import { Dispatch } from 'redux';

import { CategoryTree } from 'Query/Category.type';
import { BaseProductItem } from 'Query/ProductList.type';
import { updateMeta } from 'Store/Meta/Meta.action';
import { appendWithStoreCode } from 'Util/Url';

import { PageMeta } from './Meta.type';

/**
 * Meta Dispatcher
 * @class MetaDispatcher
 * @namespace Store/Meta/Dispatcher */
export class MetaDispatcher {
    /**
     * Set meta for category
     * @param {Object} category
     * @param {Function} dispatch
     * @memberof MetaDispatcher
     */
    updateWithCategory(category: Partial<CategoryTree>, dispatch: Dispatch): void {
        const meta = this._getCategoryMeta(category);
        dispatch(updateMeta(meta));
    }

    /**
     * Set meta for product
     * @param {Object} product
     * @param {Function} dispatch
     * @memberof MetaDispatcher
     */
    updateWithProduct(product: Partial<BaseProductItem>, dispatch: Dispatch): void {
        const meta = this._getProductMeta(product);
        dispatch(updateMeta(meta));
    }

    /**
     * Get meta for product
     * @param {Object} product
     * @return {Object} Meta object
     * @memberof MetaDispatcher
     */
    _getProductMeta(product: Partial<BaseProductItem>): Partial<PageMeta> {
        const {
            name,
            meta_title,
            meta_keyword,
            canonical_url = '',
            meta_description
        } = product;

        return {
            description: meta_description,
            keywords: meta_keyword,
            title: meta_title || name,
            canonical_url: `${window.location.origin}${appendWithStoreCode(canonical_url)}`
        };
    }

    /**
     * Get meta for category
     * @param {Object} category
     * @return {Object} Meta object
     * @memberof MetaDispatcher
     */
    _getCategoryMeta(category: Partial<CategoryTree>): Partial<PageMeta> {
        const {
            description,
            name,
            canonical_url = '',
            meta_title,
            meta_keywords,
            meta_description
        } = category;
        const meta_robots = 'follow, index';

        return {
            description: meta_description || description,
            title: meta_title || name,
            keywords: meta_keywords,
            canonical_url: `${window.location.origin}${appendWithStoreCode(canonical_url)}`,
            robots: meta_robots
        };
    }
}

export default new MetaDispatcher();
