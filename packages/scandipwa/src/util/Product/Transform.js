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

import { formatPrice } from 'Util/Price';

export const PRICE_TYPE_PERCENT = 'PERCENT';

/**
 * Generates correct UID for bundle with changed quantity
 * UID is encoded in base64, original value is bundle/option_id/item_id/quantity
 *
 * @param uid
 * @param quantity
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

export const bundleOptionToLabel = (option, currencyCode = 'USD') => {
    const {
        price,
        finalOptionPrice,
        price_type: priceType,
        can_change_quantity: canChangeQuantity,
        quantity,
        label
    } = option || {};

    const noPrice = price === 0 && finalOptionPrice === 0;
    const priceLabel = noPrice ? '' : `+ ${ formatPrice(finalOptionPrice, currencyCode) }`;
    const percentLabel = (noPrice || priceType !== PRICE_TYPE_PERCENT) ? '' : `(${ price }%)`;

    return {
        baseLabel: !canChangeQuantity ? `${ quantity } x ${ label } ` : `${ label } `,
        priceLabel: `${ priceLabel } ${ percentLabel }`
    };
};

/**
 * Converts bundle products options into select field options,
 * meaning into [uid:label] pair
 *
 * @param options
 */
export const bundleOptionsToSelectTransform = (options, currencyCode = 'USD', quantity = {}) => (
    options.reduce((result = [], option) => {
        const {
            uid: sourceUid,
            quantity: defaultQuantity,
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

export const customizableOptionToLabel = (option, currencyCode = 'USD') => {
    const {
        price,
        priceInclTax,
        price_type,
        title
    } = option || {};
    const noPrice = price === 0 && priceInclTax === 0;
    const priceLabel = noPrice ? '' : `+ ${ formatPrice(priceInclTax, currencyCode) }`;
    const percentLabel = (noPrice || price_type !== PRICE_TYPE_PERCENT) ? '' : `(${ price }%)`;

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

export default bundleOptionsToSelectTransform;
