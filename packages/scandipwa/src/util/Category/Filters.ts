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

import { FilterPriceRange, ProductAttributeFilterOptions } from 'Query/ProductList.type';
import { GQLCurrencyEnum } from 'Type/Graphql.type';
import history from 'Util/History';
import { formatPrice } from 'Util/Price';
import getStore from 'Util/Store';
import { getQueryParam } from 'Util/Url';

/** @namespace Util/Category/Filters/getPriceFilterLabel */
export const getPriceFilterLabel = (
    from: number | string,
    to: number | string,
    currencyCode: GQLCurrencyEnum,
): string => {
    const priceFrom = formatPrice(Number(from), currencyCode);
    const priceTo = formatPrice(Number(to), currencyCode);

    if (from === '*') {
        return __('Up to %s', priceTo);
    }

    if (to === '*') {
        return __('From %s', priceFrom);
    }

    return __('From %s to %s', priceFrom, priceTo);
};

/** @namespace Util/Category/Filters/getFiltersCount */
export const getFiltersCount = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    filters: Record<string, any[]>,
): number => Object.values(filters).reduce((prev: number, next) => prev + next.length, 0);

/** @namespace Util/Category/Filters/getSelectedFiltersFromUrl */
export const getSelectedFiltersFromUrl = (): Record<string, string[]> => {
    const { location } = history;
    const selectedFiltersString = (getQueryParam('customFilters', location) || '').split(';');

    return selectedFiltersString.reduce((acc, filter) => {
        if (!filter) {
            return acc;
        }
        const [key, value] = filter.split(':');

        return { ...acc, [ key ]: value.split(',') };
    }, {});
};

/** @namespace Util/Category/Filters/getSelectedPriceRangeFromUrl */
export const getSelectedPriceRangeFromUrl = (): FilterPriceRange => {
    const { location } = history;
    const min = +getQueryParam('priceMin', location);
    const max = +getQueryParam('priceMax', location);

    return { min, max };
};

/** @namespace Util/Category/Filters/getFilter */
export const getFilter = (): ProductAttributeFilterOptions => {
    const { categoryIds } = (getStore().getState()).CategoryReducer;
    const customFilters = getSelectedFiltersFromUrl();
    const priceRange = getSelectedPriceRangeFromUrl();

    if (categoryIds === -1) {
        return {
            priceRange,
            customFilters,
        };
    }

    return {
        priceRange,
        customFilters,
        categoryIds,
    };
};
