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

import { SimpleDispatcher } from 'Util/Store/SimpleDispatcher';
import { appendWithStoreCode } from 'Util/Url';

import { updateMetaStore } from './Meta.action';
import { Category, PageMeta, ProductMeta } from './Meta.type';

export const updateEveryTime: Array<keyof PageMeta> = [
    'title',
    'description',
    'keywords',
    'canonical_url',
    'robots',
    'status_code',
];

/**
 * Meta Dispatcher
 * @class MetaDispatcher
 * @namespace Store/Meta/Dispatcher */
export class MetaDispatcher extends SimpleDispatcher {
    filterData(data: Partial<PageMeta>): Partial<PageMeta> {
        const updated = updateEveryTime.reduce((acc: Partial<PageMeta>, key) => {
            acc[key] = data[key];

            return acc;
        }, {});

        return { ...data, ...updated };
    }

    /**
     * Set meta for category
     * @param {Object} category
     * @param {Function} dispatch
     * @memberof MetaDispatcher
     */
    updateWithCategory(category: Category): void {
        const meta = this._getCategoryMeta(category);

        this.dispatch(updateMetaStore(this.filterData(meta)));
    }

    /**
     * Set meta for product
     * @param {Object} product
     * @param {Function} dispatch
     * @memberof MetaDispatcher
     */
    updateWithProduct(product: ProductMeta): void {
        const meta = this._getProductMeta(product);

        this.dispatch(updateMetaStore(this.filterData(meta)));
    }

    /**
     * Get meta for product
     * @param {Object} product
     * @return {Object} Meta object
     * @memberof MetaDispatcher
     */
    _getProductMeta(product: ProductMeta): Partial<PageMeta> {
        const {
            name,
            meta_title,
            meta_keyword,
            canonical_url = '',
            meta_description,
        } = product;

        return {
            description: meta_description,
            keywords: meta_keyword,
            title: meta_title || name,
            canonical_url: `${window.location.origin}${appendWithStoreCode(canonical_url)}`,
        };
    }

    /**
     * Get meta for category
     * @param {Object} category
     * @return {Object} Meta object
     * @memberof MetaDispatcher
     */
    _getCategoryMeta(category: Category): Partial<PageMeta> {
        const {
            description,
            name,
            canonical_url = '',
            meta_title,
            meta_keywords,
            meta_description,
            meta_robots = 'follow, index',
        } = category;

        return {
            description: meta_description || description,
            title: meta_title || name,
            keywords: meta_keywords,
            canonical_url: `${window.location.origin}${appendWithStoreCode(canonical_url)}`,
            robots: meta_robots,
        };
    }
}

export default new MetaDispatcher();
