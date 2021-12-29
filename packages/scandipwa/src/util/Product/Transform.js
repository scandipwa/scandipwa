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

import PRODUCT_TYPE from 'Component/Product/Product.config';
import { formatPrice } from 'Util/Price';

import { ADD_TO_CART } from './Product';

export const PRICE_TYPE_PERCENT = 'PERCENT';

/**
 * Generates correct UID for bundle with changed quantity
 * UID is encoded in base64, original value is bundle/option_id/item_id/quantity
 *
 * @param uid
 * @param quantity
 * @namespace Util/Product/Transform/getEncodedBundleUid
 */
export const getEncodedBundleUid = (uid, quantity) => {
    const decoded = atob(uid);
    const parts = decoded.split('/');
    // eslint-disable-next-line no-magic-numbers
    const newUid = parts.length === 3
        ? `bundle/${parts[1]}/${quantity}`
        : `bundle/${parts[1]}/${parts[2]}/${quantity}`;

    return btoa(newUid);
};

/** @namespace Util/Product/Transform/getBundleOptions */
export const getBundleOptions = (buyRequest) => {
    const { bundle_option = {}, bundle_option_qty = {} } = JSON.parse(buyRequest);

    if (!bundle_option) {
        return [];
    }

    return Object.entries(bundle_option).reduce((prev, [option, variant]) => {
        const qty = bundle_option_qty[option] || 1;

        if (typeof variant === 'string') {
            return [...prev, btoa(`bundle/${option}/${variant}/${qty}`)];
        }

        return [...prev, ...Object.keys(variant).map((id) => btoa(`bundle/${option}/${id}/${qty}`))];
    }, []);
};

/** @namespace Util/Product/Transform/getCustomizableOptions */
export const getCustomizableOptions = (buyRequest) => {
    const { options = {} } = JSON.parse(buyRequest);

    // handle null
    if (!options) {
        return [];
    }

    return Object.entries(options).reduce((prev, [option, variant]) => {
        if (typeof variant === 'string') {
            return [...prev, btoa(`custom-option/${option}/${variant}`)];
        }

        if (Array.isArray(variant)) {
            return [...prev, ...variant.map((id) => btoa(`custom-option/${option}/${id}`))];
        }

        if (typeof variant === 'object' && (variant.date_internal || variant.date)) {
            const { date_internal, date } = variant;
            return [...prev, btoa(`custom-option/${option}/${date_internal || date}`)];
        }

        // Handle case when we need to pass previously uploaded file as selected option
        // Normally files are passed via entered_options, but when customer adds product with attachment from wishlist,
        // we need to reference data of the already uploaded file
        if (typeof variant === 'object' && variant.type === 'application/octet-stream') {
            return [...prev, btoa(`custom-option/${option}/file-${btoa(JSON.stringify(variant))}`)];
        }

        return prev;
    },
    []);
};

/** @namespace Util/Product/Transform/getDownloadableOptions */
export const getDownloadableOptions = (buyRequest) => {
    const { links } = JSON.parse(buyRequest);

    if (!links) {
        return [];
    }

    const linksData = Object.entries(links);

    if (typeof linksData === 'string') {
        return btoa(`downloadable/${links}`);
    }

    return links.map((link) => btoa(`downloadable/${link}`));
};

/** @namespace Util/Product/Transform/getConfigurableOptions */
export const getConfigurableOptions = (buyRequest) => {
    const { super_attribute } = JSON.parse(buyRequest);

    if (!super_attribute) {
        return [];
    }

    return Object.entries(super_attribute).map(([attr, value]) => btoa(`configurable/${attr}/${value}`));
};

/** @namespace Util/Product/Transform/getSelectedOptions */
export const getSelectedOptions = (buyRequest) => [
    ...getBundleOptions(buyRequest),
    ...getCustomizableOptions(buyRequest),
    ...getDownloadableOptions(buyRequest),
    ...getConfigurableOptions(buyRequest)
];

/** @namespace Util/Product/Transform/transformParameters */
export const transformParameters = (parameters = [], attributes = {}) => Object.entries(parameters)
    .map(([attrCode, selectedValue]) => {
        const attrId = attributes[attrCode]?.attribute_id;

        return btoa(`configurable/${attrId}/${selectedValue}`);
    });

/**
 * Generates label for bundle option
 *
 * @param option
 * @param currencyCode
 * @returns {{baseLabel: string, priceLabel: string}}
 * @namespace Util/Product/Transform/bundleOptionToLabel
 */
export const bundleOptionToLabel = (option, currencyCode = 'USD') => {
    const {
        price,
        finalOptionPrice,
        price_type: priceType,
        can_change_quantity: canChangeQuantity,
        quantity,
        label,
        product
    } = option || {};

    const noPrice = price === 0 && finalOptionPrice === 0;
    const priceLabel = noPrice ? '' : `+ ${ formatPrice(finalOptionPrice, currencyCode) }`;
    const percentLabel = (noPrice || priceType !== PRICE_TYPE_PERCENT) ? '' : `(${ price }%)`;
    // Accessing name here, because product may be passed as null - which prevents from assigning its
    // default value, thus resulting in error
    const fallbackLabel = product ? product.name : __('Option');
    const renderLabel = label ?? fallbackLabel;

    return {
        baseLabel: !canChangeQuantity ? `${ quantity } x ${ renderLabel } ` : `${ renderLabel } `,
        priceLabel: `${ priceLabel } ${ percentLabel }`
    };
};

/**
 * Converts bundle products options into select field options,
 * meaning into [uid:label] pair
 *
 * @param options
 * @namespace Util/Product/Transform/bundleOptionsToSelectTransform
 */
export const bundleOptionsToSelectTransform = (options, currencyCode = 'USD', quantity = {}) => (
    options.reduce((result = [], option) => {
        const {
            uid: sourceUid = '',
            quantity: defaultQuantity = 1,
            position
        } = option;

        const {
            priceLabel,
            baseLabel
        } = bundleOptionToLabel(option, currencyCode);

        const { [sourceUid]: currentQty = defaultQuantity } = quantity;
        const uid = getEncodedBundleUid(sourceUid, currentQty);

        result.push({
            id: sourceUid,
            name: sourceUid,
            value: uid,
            label: baseLabel,
            subLabel: priceLabel,
            sort_order: position
        });

        return result;
    }, [])
);

/**
 * Generates label for customizable option
 *
 * @param option
 * @param currencyCode
 * @returns {{baseLabel: string, priceLabel: string}}
 * @namespace Util/Product/Transform/customizableOptionToLabel
 */
export const customizableOptionToLabel = (option, currencyCode = 'USD') => {
    const {
        price,
        priceInclTax,
        price_type,
        title
    } = option || {};
    const noPrice = price === 0 && priceInclTax === 0;
    const priceLabel = noPrice ? '' : ` + ${ formatPrice(priceInclTax, currencyCode) }`;
    const percentLabel = (noPrice || price_type !== PRICE_TYPE_PERCENT) ? '' : ` (${ price }%)`;

    return {
        baseLabel: title,
        priceLabel: `${ priceLabel } ${ percentLabel }`
    };
};

/**
 * Converts customizable products options into select field options,
 * meaning into [uid:label] pair
 *
 * @param options
 * @namespace Util/Product/Transform/customizableOptionsToSelectTransform
 */
export const customizableOptionsToSelectTransform = (options, currencyCode = 'USD') => (
    options.reduce((result = [], option) => {
        const {
            uid,
            title,
            position
        } = option;

        const {
            priceLabel,
            baseLabel
        } = customizableOptionToLabel(option, currencyCode);

        result.push({
            id: uid,
            name: title,
            value: uid,
            label: baseLabel,
            subLabel: priceLabel,
            sort_order: position
        });

        return result;
    }, [])
);

/**
 * Generates Magento type product interface for performing
 * actions (add to cart, wishlist, exc.)
 * @param product
 * @param quantity
 * @param enteredOptions
 * @param selectedOptions
 * @returns {*[]}
 * @namespace Util/Product/Transform/magentoProductTransform
 */
export const magentoProductTransform = (
    action = ADD_TO_CART,
    product,
    quantity = 1,
    enteredOptions = [],
    selectedOptions = []
) => {
    const { sku, type_id: typeId } = product;

    const productData = [];

    if (typeId === PRODUCT_TYPE.grouped && action === ADD_TO_CART) {
        if (Object.keys(quantity).length === 0) {
            return productData;
        }

        const { items } = product;
        const groupedProducts = [];

        items.forEach(({ product: { id } }) => {
            const { [id]: groupedQuantity = 0 } = quantity;
            groupedProducts.push(btoa(`grouped/${id}/${groupedQuantity}`));
        });

        productData.push({
            sku,
            quantity: 1,
            selected_options: [...selectedOptions, ...groupedProducts],
            entered_options: enteredOptions
        });
    } else {
        const baseProductToAdd = {
            sku,
            quantity,
            selected_options: selectedOptions,
            entered_options: enteredOptions
        };

        productData.push(baseProductToAdd);
    }

    return productData;
};

export default bundleOptionsToSelectTransform;
