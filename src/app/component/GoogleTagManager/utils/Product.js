/* eslint-disable no-restricted-globals */
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
import GoogleTagManager, { EVENT_GENERAL } from 'Component/GoogleTagManager/GoogleTagManager.component';

export const PRODUCT_COLOR = 'variant';
export const GROUPED_PRODUCT_PRICE = 'metric1';
export const PRODUCT_SIZE = 'dimension1';
export const PRODUCT_TYPE = 'dimension2';
export const PRODUCT_VARIANT_SKU = 'dimension3';

export const NOT_APPLICABLE = 'N/A';

/**
 * Product helper, contain all related to product data prepare methods
 */
export default class Product {
    static DEFAULT_BRAND = 'ScandiPWA';

    /**
     * Get product listing category string
     *
     * @param product
     * @return {string|string}
     */
    // eslint-disable-next-line no-unused-vars
    static getList() {
        const meta = GoogleTagManager.getEvent(EVENT_GENERAL).currentMeta.metaObject || {};

        return meta.name
            || meta.title
            || document.title.split('|').pop()
            || '';
    }

    /**
     * Get product Quantity from product object
     *
     * @param product
     * @return {number|string}
     */
    static getQuantity({ qty }) {
        return parseInt(qty, 10) || 0;
    }

    /**
     * Get product brand from product object
     *
     * @param product
     * @return {string|string}
     */
    static getBrand(selectedVariant) {
        const { attributes = {} } = selectedVariant;
        const { brand: { attribute_value = '' } = {} } = attributes;
        return attribute_value;
    }

    static getSelectedVariant(product) {
        const { sku, variants } = product;
        return variants.find(({ sku: variantSku }) => sku === variantSku);
    }

    static getSelectedVariantIndex(product, sku) {
        const { variants = [] } = product;
        return variants.findIndex(({ sku: variantSku = '' }) => sku === variantSku);
    }

    /**
     * Get product sku
     *
     * @param product
     * @return {string}
     */
    static getSku(product) {
        const { variants = [], configurableVariantIndex = -1 } = product;
        const { sku = '' } = variants[configurableVariantIndex] || product;
        return sku;
    }

    /**
     * Get item data as object
     *
     * @param product
     *
     * @return {{quantity: number, price: number, name: string, variant: string, id: string, availability: boolean, list: string, category: string, brand: string}}
     */
    static getItemData(item, isVariantPassed = false) {
        if (item && Object.values(item).length) {
            const { product = {}, sku = '' } = item;
            const configurableVariantIndex = this.getSelectedVariantIndex(product, sku);

            return this.getProductData({ ...product, configurableVariantIndex }, isVariantPassed);
        }

        return {};
    }

    static getCategory(categories = []) {
        const { url_path = '' } = categories.slice(-1)[0] || {};
        return url_path;
    }

    static getPrice(variant, type_id) {
        const {
            price: {
                minimalPrice: {
                    amount: {
                        value: discountValue = null
                    } = {}
                } = {},
                regularPrice: {
                    amount: {
                        value = 0
                    } = {}
                } = {}
            } = {}
        } = variant;

        return type_id !== 'grouped'
            ? +roundPrice(discountValue || value) || 0
            : 0;
    }

    /**
     * @param { [sku]: { data: {}, items: [childSku1, childSku2], groupedProductPrice: int } }
     */
    static addGroupedProduct(groupedProductData, product, groupedProductPrice) {
        const GTMInstance = GoogleTagManager.getInstance();
        const groupedProducts = GTMInstance.getGroupedProducts();
        const { sku, items } = product;
        const existingGroupedProduct = groupedProducts[sku];

        if (existingGroupedProduct) {
            const { data: { [GROUPED_PRODUCT_PRICE]: oldPrice } } = existingGroupedProduct;
            groupedProducts[sku].data[GROUPED_PRODUCT_PRICE] = groupedProductPrice + oldPrice;
        } else {
            groupedProducts[sku] = {
                data: groupedProductData,
                items: this.getArrayOfGroupedProductChildrenSku(items)
            };
        }

        GTMInstance.setGroupedProducts(groupedProducts);
    }

    static getArrayOfGroupedProductChildrenSku(items) {
        return items.reduce((acc, { product: { sku } }) => [...acc, sku], []);
    }

    static updateGroupedProduct(childSku, price) {
        const GTMInstance = GoogleTagManager.getInstance();
        const groupedProducts = GTMInstance.getGroupedProducts();
        const skuOfProductToUpdate = Object.keys(groupedProducts).find((sku) => {
            const { items } = groupedProducts[sku];
            return items.includes(childSku);
        });

        if (skuOfProductToUpdate) {
            const { [GROUPED_PRODUCT_PRICE]: prevPrice } = groupedProducts[skuOfProductToUpdate].data;

            // 0 price metric form grouped product indicates that no more children products are left in cart
            if (prevPrice + price === 0) {
                const productToDelete = groupedProducts[skuOfProductToUpdate];
                // eslint-disable-next-line fp/no-delete
                delete groupedProducts[skuOfProductToUpdate];

                GTMInstance.setGroupedProducts(groupedProducts);
                return productToDelete;
            }

            groupedProducts[skuOfProductToUpdate].data[GROUPED_PRODUCT_PRICE] += price;
            GTMInstance.setGroupedProducts(groupedProducts);
        }

        return null;
    }

    static mergeGroupedProducts(groupedProducts1, groupedProducts2) {
        if (!groupedProducts1) return groupedProducts2;
        if (!groupedProducts2) return groupedProducts1;

        const result = Object.assign({}, groupedProducts2);

        Object.keys(groupedProducts1).forEach((key) => {
            if (groupedProducts2[key]) {
                result[key].data[GROUPED_PRODUCT_PRICE] += groupedProducts1[key].data[GROUPED_PRODUCT_PRICE];
            } else {
                result[key] = groupedProducts1[key];
            }
        });

        return result;
    }

    /**
     * varian: color
     * dimension1: size
     * dimension2: simple/grouped
     * dimension3: variantSKU
     * metric1: total for grouped product
     */

    static getVariantSku(sku, variantSku, isVariantPassed) {
        return (variantSku === sku && !isVariantPassed)
            ? NOT_APPLICABLE
            : variantSku;
    }

    static getGroupedProductPrice(product) {
        const { groupedProductPrice = 0 } = product;
        return groupedProductPrice;
    }

    static getAttribute(variant, parentAttributes, attributeName) {
        const { attribute_value = '' } = variant.attributes[attributeName] || {};
        const { attribute_options = {} } = parentAttributes[attributeName] || {};
        const { label = NOT_APPLICABLE } = attribute_options[attribute_value] || {};

        return label || NOT_APPLICABLE;
    }

    /**
     * Get product data as object
     *
     * @param product
     *
     * @return {{quantity: number, price: number, name: string, variant: string, id: string, availability: boolean, list: string, category: string, brand: string}}
     */
    static getProductData(product, isVariantPassed = false) {
        const {
            sku,
            name,
            type_id,
            category = NOT_APPLICABLE,
            variants = [],
            categories = [],
            attributes = {},
            configurableVariantIndex = this.getSelectedVariantIndex(product, sku)
        } = product;
        const selectedVariant = variants[configurableVariantIndex] || product;
        const { sku: variantSku } = selectedVariant;

        return {
            id: sku,
            name,
            price: this.getPrice(selectedVariant, type_id),
            brand: this.getBrand(selectedVariant) || this.DEFAULT_BRAND,
            category: this.getCategory(categories) || category,
            [PRODUCT_COLOR]: this.getAttribute(selectedVariant, attributes, 'color'),
            [PRODUCT_SIZE]: this.getAttribute(selectedVariant, attributes, 'size'),
            [PRODUCT_TYPE]: type_id,
            [PRODUCT_VARIANT_SKU]: this.getVariantSku(sku, variantSku, isVariantPassed),
            [GROUPED_PRODUCT_PRICE]: this.getGroupedProductPrice(product)
        };
    }
}
