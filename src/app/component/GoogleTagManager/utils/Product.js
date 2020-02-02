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

import { roundPrice } from 'Util/Price';
import { convertKeyValuesToQueryString } from 'Util/Url';
import GoogleTagManager, { EVENT_GENERAL } from 'Component/GoogleTagManager/GoogleTagManager.component';

/**
 * Product helper, contain all related to product data prepare methods
 */
class Product {
    /**
     * Get product variant product
     *
     * @param type_id
     * @param variants
     * @param configurableVariantIndex
     * @return {{}}
     */
    static getVariantObject({ type_id, variants, configurableVariantIndex } = {}) {
        if (type_id === 'configurable' && variants) {
            return variants && variants[configurableVariantIndex]
            && typeof variants[configurableVariantIndex].product !== 'undefined'
                ? variants[configurableVariantIndex].product
                : variants[configurableVariantIndex];
        }

        return null;
    }

    /**
     * Get product listing category string
     *
     * @param product
     * @return {string|null}
     */
    // eslint-disable-next-line no-unused-vars
    static getList(product) {
        const meta = GoogleTagManager.getEvent(EVENT_GENERAL).currentMeta.metaObject || {};

        return meta.name
            || meta.title
            || document.title.split('|').pop();
    }

    /**
     * Get Product category from product object
     *
     * @param categories
     * @return {string|null}
     */
    static getCategory({ categories } = {}) {
        if (!categories) return '';

        const lastCategory = categories.slice(-1).pop();
        const { url_path = '' } = lastCategory;

        return url_path;
    }

    /**
     * Get product brand from product object
     *
     * @param product
     * @return {string|null}
     */
    static getBrand(selectedVariant) {
        const { attributes } = selectedVariant;
        const { brand: { attribute_value = '' } = {} } = attributes;
        return attribute_value;
    }

    /**
     * Get product name from product object
     *
     * @param product
     * @return {string|null}
     */
    static getName({ name }) {
        return name || '';
    }

    /**
     * Get Product Availability from product object
     *
     * @param product
     * @return {boolean|string}
     */
    static getAvailability({ stock_status } = {}) {
        return stock_status === 'IN_STOCK';
    }

    /**
     * Get product url
     *
     * @param item
     * @return {string|null}
     */
    static getUrl(product, selectedVariant) {
        const { url_key, configurable_options } = product;
        const { attributes } = selectedVariant;

        const keyValueAttributes = Object.keys(configurable_options).reduce((acc, key) => {
            if (key in attributes) {
                const { attribute_value } = attributes[key];
                return { ...acc, [key]: attribute_value };
            }

            return acc;
        }, {});

        const queryString = `?${convertKeyValuesToQueryString(keyValueAttributes)}`;

        return `/${ url_key }${queryString.length === 1 ? '' : queryString }`;
    }

    static getSelectedVariant(item) {
        const { sku, product: { variants } } = item;
        return variants.find(({ sku: variantSku }) => sku === variantSku);
    }

    /**
     * Get product data as object
     *
     * @param product
     *
     * @return {{quantity: number, price: number, name: string, variant: string, id: string, availability: boolean, list: string, category: string, brand: string}}
     */
    static getProductData(item) {
        if (item && Object.values(item).length) {
            const {
                qty, row_total,
                tax_amount, product
            } = item;
            const { sku } = product;

            const selectedVariant = this.getSelectedVariant(item) || product;
            const { name, sku: variantSku } = selectedVariant;

            return {
                id: sku,
                url: this.getUrl(product, selectedVariant),
                name,
                price: roundPrice(row_total + tax_amount),
                brand: this.getBrand(selectedVariant),
                variant: variantSku,
                category: this.getCategory(product),
                quantity: qty,
                availability: this.getAvailability(product)
            };
        }

        return {};
    }
}

export default Product;
