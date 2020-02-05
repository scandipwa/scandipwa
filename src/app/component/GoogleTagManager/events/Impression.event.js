/* eslint-disable import/no-cycle */
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

import {
    Event,
    EVENT_GTM_IMPRESSIONS_SEARCH, EVENT_GTM_IMPRESSIONS_HOME, EVENT_GTM_IMPRESSIONS_CROSS_SELL,
    EVENT_GTM_IMPRESSIONS_PLP, EVENT_GTM_IMPRESSIONS_WISHLIST, EVENT_GTM_IMPRESSIONS_LINKED,
    EVENT_GTM_GENERAL_INIT
} from 'Util/Event';
import BaseEvent from 'Component/GoogleTagManager/events/BaseEvent.event';
// eslint-disable-next-line import/no-cycle
import { Product as ProductHelper } from 'Component/GoogleTagManager/utils';
import { getVariantsIndexes } from 'Util/Product';

/**
 * Website places, from where was received event data
 *
 * @type {string}
 */
export const PLP_IMPRESSIONS = 'catalog';
export const HOME_IMPRESSIONS = 'home';
export const WISHLIST_IMPRESSIONS = 'wishlist';
export const CHECKOUT_CROSS_SELL_IMPRESSIONS = 'checkout_cross_sell';
export const SEARCH_IMPRESSIONS = 'search';
export const RECOMMENDED_IMPRESSIONS = 'recommended';

/**
 * Constants
 *
 * @type {number}
 */
export const SPAM_PROTECTION_DELAY = 4000;
export const PRODUCT_IMPRESSION_COUNT = 36;
export const PRODUCT_IMPRESSION_CHUNK_SIZE = 4;
export const EVENT_HANDLE_DELAY = 700;

/**
 * GTM PWA Impression Event
 *
 * Called when customer see product list
 * On: Home, PLP, WishList, Up-Sell, Cross-Sell, Accessories(related things on PDP)
 */
class Impression extends BaseEvent {
    /**
     * Set base event call delay
     *
     * @type {number}
     */
    eventHandleDelay = EVENT_HANDLE_DELAY;

    /**
     * Bind PWA event handling
     */
    bindEvent() {
        // PLP
        Event.observer(EVENT_GTM_IMPRESSIONS_PLP, ({ items, filters }) => {
            this.handle(PLP_IMPRESSIONS, items, filters);
        });

        // Home
        Event.observer(EVENT_GTM_IMPRESSIONS_HOME, ({ items, filters }) => {
            this.handle(HOME_IMPRESSIONS, items, filters);
        });

        // Checkout Cross-sell
        Event.observer(EVENT_GTM_IMPRESSIONS_CROSS_SELL, ({ items }) => {
            this.handle(CHECKOUT_CROSS_SELL_IMPRESSIONS, items);
        });

        // Wishlist
        Event.observer(EVENT_GTM_IMPRESSIONS_WISHLIST, ({ items }) => {
            this.handle(WISHLIST_IMPRESSIONS, items);
        });

        // Search
        Event.observer(EVENT_GTM_IMPRESSIONS_SEARCH, ({ items }) => {
            this.handle(SEARCH_IMPRESSIONS, items);
        });

        // Recomended
        Event.observer(EVENT_GTM_IMPRESSIONS_LINKED, ({ items }) => {
            this.handle(RECOMMENDED_IMPRESSIONS, items);
        });

        Event.observer(EVENT_GTM_GENERAL_INIT, () => {
            this.cleanStorage();
        });
    }

    // TODO: move to Product utils. Also use it in ProductCard
    // check if ProductCard does not break if configurable index is -1, but no 0 as it is there now.

    _getCurrentVariantIndex(product = {}, selectedFilters = {}) {
        if (!Object.keys(selectedFilters).length) return undefined;
        const { index } = this._getConfigurableParameters(product, selectedFilters);
        return index >= 0 ? index : -1;
    }

    _getConfigurableParameters(product = {}, selectedFilters = {}) {
        const { variants = [] } = product;
        const filterKeys = Object.keys(selectedFilters);

        if (filterKeys.length < 0) return { indexes: [], parameters: {} };

        const indexes = getVariantsIndexes(variants, selectedFilters);
        const [index] = indexes;

        if (!variants[index]) return { indexes: [], parameters: {} };
        const { attributes } = variants[index];

        const parameters = Object.entries(attributes)
            .reduce((parameters, [key, { attribute_value }]) => {
                if (filterKeys.includes(key)) return { ...parameters, [key]: attribute_value };
                return parameters;
            }, {});

        return { indexes, index, parameters };
    }

    /**
     * Handle Impressions
     *
     * @param productCollectionType product event type
     * @param products Product list
     * @param filters Category filters
     */
    handler(productCollectionType = PLP_IMPRESSIONS, products = [], filters = {}) {
        const impressions = this.getImpressions(productCollectionType, products, filters);
        const storage = this.getStorage();
        const impressionUID = this.getImpressionUID(impressions);

        if (!impressions
            || Object.values(impressions).length === 0
            || this.spamProtection(SPAM_PROTECTION_DELAY, `${productCollectionType}_${impressionUID}`)
        ) {
            return;
        }

        if (!storage.impressions) {
            storage.impressions = [];
        }
        storage.impressions.push(...impressions);
        this.setStorage(storage);

        // Chunk data to small parts
        // eslint-disable-next-line fp/no-loops, fp/no-let
        for (let offset = 0; offset < impressions.length; offset += PRODUCT_IMPRESSION_CHUNK_SIZE) {
            this.pushEventData({
                ecommerce: {
                    currencyCode: this.getCurrencyCode(),
                    impressions: impressions.slice(offset, offset + PRODUCT_IMPRESSION_CHUNK_SIZE)
                }
            });
        }
    }

    /**
     * Get impressions
     *
     * @param productCollectionType
     * @param products
     * @param filters
     *
     * @return {{price: string, name: string, variant: string, id: string, position: number, list: string, category: string, brand: string}[]}
     */
    getImpressions(productCollectionType = PLP_IMPRESSIONS, products, filters) {
        const productCollection = this.getProductCollection(productCollectionType, products);
        const productCount = Object.values(productCollection || []).length;
        const offset = PRODUCT_IMPRESSION_COUNT - productCount < 0
            ? Math.abs(PRODUCT_IMPRESSION_COUNT - productCount)
            : 0;

        return Object.values(productCollection || [])
            .slice(-PRODUCT_IMPRESSION_COUNT) // Last from list
            .filter(product => Object.values(product).length)
            .map((product, index) => {
                const configurableVariantIndex = this._getCurrentVariantIndex(product, filters);
                return {
                    ...ProductHelper.getProductData({ ...product, configurableVariantIndex }),
                    position: offset + index + 1,
                    list: this.getProductCollectionList(productCollectionType, product)
                };
            });
    }

    /**
     * Get collection of products
     *
     * @param productCollectionType
     * @param params
     *
     * @return {Array}
     */
    getProductCollection(productCollectionType = PLP_IMPRESSIONS, products) {
        switch (productCollectionType) {
        case PLP_IMPRESSIONS:
        case WISHLIST_IMPRESSIONS:
        case HOME_IMPRESSIONS:
        case SEARCH_IMPRESSIONS:
        case RECOMMENDED_IMPRESSIONS:
        case CHECKOUT_CROSS_SELL_IMPRESSIONS:
            return products || [];
        default:
            return [];
        }
    }

    /**
     * Get product collection list name
     *
     * @param productCollectionType
     * @param product
     *
     * @return {string}
     */
    getProductCollectionList(productCollectionType = PLP_IMPRESSIONS, product) {
        switch (productCollectionType) {
        case HOME_IMPRESSIONS:
            return 'Homepage';
        case RECOMMENDED_IMPRESSIONS:
            return 'Recommended';
        case SEARCH_IMPRESSIONS:
            return 'Search results';
        case WISHLIST_IMPRESSIONS:
            return 'wishlist';
        case CHECKOUT_CROSS_SELL_IMPRESSIONS:
            return 'Cross sell impressions';
        case PLP_IMPRESSIONS:
            return 'PLP';
        default:
            return ProductHelper.getList(product);
        }
    }

    /**
     * Get provided impression UID
     *
     * @param impression
     * @return {string}
     */
    getImpressionUID(impression = []) {
        return impression.reduce((acc, { id }) => `${acc}_${id}`, '');
    }
}

export default Impression;
