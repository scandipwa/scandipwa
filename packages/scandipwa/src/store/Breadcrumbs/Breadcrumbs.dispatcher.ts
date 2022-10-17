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

import { Dispatch } from 'redux';

import {
    toggleBreadcrumbs,
    updateBreadcrumbs,
} from 'Store/Breadcrumbs/Breadcrumbs.action';

import { Breadcrumb, Category, Product } from './Breadcrumbs.type';

/**
 * Breadcrumbs Dispatcher
 * @class BreadcrumbsDispatcher
 * @namespace Store/Breadcrumbs/Dispatcher
 */
export class BreadcrumbsDispatcher {
    /**
     * Set breadcrumbs
     * @param {Array<Object>} breadcrumbs Breadcrumbs array
     * @param {Function} dispatch
     * @memberof BreadcrumbsDispatcher
     */
    update(breadcrumbs: Breadcrumb[], dispatch: Dispatch): void {
        dispatch(toggleBreadcrumbs(true));
        dispatch(updateBreadcrumbs(breadcrumbs));
    }

    /**
     * Set breadcrumbs for category
     * @param {Array<Object>} category Category breadcumbs items
     * @param {Function} dispatch
     * @memberof BreadcrumbsDispatcher
     */
    updateWithCategory(category: Category, dispatch: Dispatch): void {
        const breadcrumbs = this._getCategoryBreadcrumbs(category);

        dispatch(toggleBreadcrumbs(true));
        dispatch(updateBreadcrumbs(breadcrumbs));
    }

    /**
     * Set breadcrumbs for category
     * @param product
     * @param prevCategoryId
     * @param {Function} dispatch
     * @memberof BreadcrumbsDispatcher
     */
    updateWithProduct(product: Product, prevCategoryId: number, dispatch: Dispatch): void {
        const breadcrumbs = this._getProductBreadcrumbs(product, prevCategoryId);

        dispatch(toggleBreadcrumbs(true));
        dispatch(updateBreadcrumbs(breadcrumbs));
    }

    /**
     * Set breadcrumbs for category
     * @param {Array<Object>} category Category breadcumbs items
     * @param {Function} dispatch
     * @memberof BreadcrumbsDispatcher
     */
    updateWithCmsPage({ title }: { title: string }, dispatch: Dispatch): void {
        const breadcrumbs = title
            ? [
                {
                    url: '',
                    name: title,
                },
            ]
            : [];

        dispatch(updateBreadcrumbs(breadcrumbs));
    }

    /**
     * Get breadcrumbs for category
     * @param {Object} category Category breadcumbs items
     * @return {Array<Object>} Breadcrumbs array
     * @memberof BreadcrumbsDispatcher
     */
    _getCategoryBreadcrumbs(category: Partial<Category>): Breadcrumb[] {
        const { url = '', name = '', breadcrumbs } = category;
        const breadcrumbsList: Breadcrumb[] = [];

        if (breadcrumbs?.length) {
            breadcrumbs
                .sort((a, b) => (a?.category_level || 0) - (b?.category_level || 0))
                .forEach((crumb) => {
                    if (crumb) {
                        const {
                            category_url,
                            category_name,
                            category_is_active,
                        } = crumb;

                        // do not add link to inactive categories
                        if (category_is_active) {
                            breadcrumbsList.push({
                                name: category_name || '',
                                url: {
                                    pathname: category_url || '',
                                    state: { category: true },
                                },
                            });
                        } else {
                            breadcrumbsList.push({
                                url: '',
                                name: category_name || '',
                            });
                        }
                    }
                });
        }

        return [
            { url, name },
            ...breadcrumbsList.reverse(),
        ];
    }

    findCategoryById(categories: Category[], categoryId: number): Category | undefined {
        return categories.find(({ id }) => id === categoryId);
    }

    findLongestBreadcrumbs(categories: Category[]): Partial<Category> {
        const {
            breadcrumbsCategory = {},
        } = categories.reduce((acc, category) => {
            const { longestBreadcrumbsLength } = acc;
            const { breadcrumbs } = category;
            const breadcrumbsLength = (breadcrumbs || []).length;

            if (!breadcrumbsLength && longestBreadcrumbsLength !== 0) {
                return acc;
            }

            if (longestBreadcrumbsLength === 0) {
                return { ...acc, breadcrumbsCategory: category };
            }

            if (breadcrumbsLength <= longestBreadcrumbsLength) {
                return acc;
            }

            return {
                breadcrumbsCategory: category,
                longestBreadcrumbsLength: breadcrumbsLength,
            };
        }, {
            breadcrumbsCategory: {},
            longestBreadcrumbsLength: 0,
        });

        return breadcrumbsCategory;
    }

    /**
     * Get breadcrumbs for product
     *
     * @param {Object} product Product breadcumbs items
     * @param prevCategoryId
     * @return {Array<Object>} Breadcrumbs array
     * @memberof BreadcrumbsDispatcher
     */
    _getProductBreadcrumbs(product: Product, prevCategoryId = 0): Breadcrumb[] {
        const { categories, url, name } = product;

        if (!categories) {
            return [];
        }

        if (!categories.length) {
            return [{ url, name }];
        }

        return [
            { url, name },
            ...this._getCategoryBreadcrumbs(
                this.findCategoryById(categories, prevCategoryId || 0)
                || this.findLongestBreadcrumbs(categories),
            ),
        ];
    }
}

export default new BreadcrumbsDispatcher();
