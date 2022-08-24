/* eslint-disable @typescript-eslint/default-param-last */
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

import { FieldType } from 'Component/Field/Field.config';
import { ProductType } from 'Component/Product/Product.config';
import { ProductOption } from 'Component/Product/Product.type';
import { NONE_RADIO_OPTION } from 'Component/ProductCustomizableOption/ProductCustomizableOption.config';
import { CustomizableSelectionValue, GroupedProductItem } from 'Query/ProductList.type';
import { GQLCurrencyEnum } from 'Type/Graphql.type';
import { decodeBase64, encodeBase64 } from 'Util/Base64';
import { formatPrice } from 'Util/Price';

import { getProductInStock } from './Extract';
import { ADD_TO_CART } from './Product';
import {
    BuyRequestBundleOptions,
    BuyRequestCustomizableOptions,
    BuyRequestDownloadableOptions,
    IndexedAttributeWithValue,
    IndexedBundleOption,
    IndexedProduct,
    NoneRadioOption,
    PriceLabels,
    ProductTransformData,
    StockCheckProduct,
    TransformedBundleOption,
    TransformedCustomizableOptions
} from './Product.type';

export const PRICE_TYPE_PERCENT = 'PERCENT';

/**
 * Generates correct UID for bundle with changed quantity
 * UID is encoded in base64, original value is bundle/option_id/item_id/quantity
 *
 * @param uid
 * @param quantity
 * @namespace Util/Product/Transform/getEncodedBundleUid
 */
export const getEncodedBundleUid = (uid: string, quantity: number): string => {
    const decoded = decodeBase64(uid);
    const parts = decoded.split('/');
    // eslint-disable-next-line no-magic-numbers
    const newUid = parts.length === 3
        ? `bundle/${parts[1]}/${quantity}`
        : `bundle/${parts[1]}/${parts[2]}/${quantity}`;

    return encodeBase64(newUid);
};

/** @namespace Util/Product/Transform/getBundleOptions */
export const getBundleOptions = (buyRequest: string): string[] => {
    const { bundle_option = {}, bundle_option_qty = {} }: BuyRequestBundleOptions = JSON.parse(buyRequest);

    if (!bundle_option) {
        return [];
    }

    return Object.entries(bundle_option).reduce((prev: string[], [option, variant]) => {
        const qty = bundle_option_qty[option] || 1;

        if (Array.isArray(variant) && variant.every((val) => typeof (val) === 'string')) {
            return [...prev, ...variant.map((val) => encodeBase64(`bundle/${option}/${val}/${qty}`))];
        }

        return [...prev, ...Object.keys(variant).map((id) => encodeBase64(`bundle/${option}/${id}/${qty}`))];
    }, []);
};

/** @namespace Util/Product/Transform/getCustomizableOptions */
export const getCustomizableOptions = (buyRequest: string): string[] => {
    const { options = {} }: BuyRequestCustomizableOptions = JSON.parse(buyRequest);

    // handle null
    if (!options) {
        return [];
    }

    return Object.entries(options).reduce<string[]>((prev, [option, variant]) => {
        if (typeof variant === 'string') {
            return [...prev, encodeBase64(`custom-option/${option}/${variant}`)];
        }

        if (Array.isArray(variant)) {
            return [...prev, ...variant.map((id) => encodeBase64(`custom-option/${option}/${id}`))];
        }

        if (typeof variant === 'object' && (variant.date_internal || variant.date)) {
            const { date_internal, date } = variant;

            return [...prev, encodeBase64(`custom-option/${option}/${date_internal || date}`)];
        }

        // Handle case when we need to pass previously uploaded file as selected option
        // Normally files are passed via entered_options, but when customer adds product with attachment from wishlist,
        // we need to reference data of the already uploaded file
        if (typeof variant === 'object' && variant.type === 'application/octet-stream') {
            return [...prev, encodeBase64(`custom-option/${option}/file-${encodeBase64(JSON.stringify(variant))}`)];
        }

        return prev;
    },
    []);
};

/** @namespace Util/Product/Transform/getDownloadableOptions */
export const getDownloadableOptions = (buyRequest: string): string[] => {
    const { links }: BuyRequestDownloadableOptions = JSON.parse(buyRequest);

    if (!links) {
        return [];
    }

    return links.map((link) => encodeBase64(`downloadable/${link}`));
};

/** @namespace Util/Product/Transform/getConfigurableOptions */
export const getConfigurableOptions = (buyRequest: string): string[] => {
    const { super_attribute } = JSON.parse(buyRequest);

    if (!super_attribute) {
        return [];
    }

    return Object.entries(super_attribute).map(([attr, value]) => encodeBase64(`configurable/${attr}/${value}`));
};

/** @namespace Util/Product/Transform/getSelectedOptions */
export const getSelectedOptions = (buyRequest: string): string[] => [
    ...getBundleOptions(buyRequest),
    ...getCustomizableOptions(buyRequest),
    ...getDownloadableOptions(buyRequest),
    ...getConfigurableOptions(buyRequest)
];

/** @namespace Util/Product/Transform/transformParameters */
export const transformParameters = (
    parameters: Record<string, string>,
    attributes: Record<string, IndexedAttributeWithValue>
): string[] => Object.entries(parameters)
    .map(([attrCode, selectedValue]) => {
        const attrId = attributes[attrCode]?.attribute_id;

        return encodeBase64(`configurable/${attrId}/${selectedValue}`);
    });

/**
 * Generates label for bundle option
 *
 * @param option
 * @param currencyCode
 * @returns {{baseLabel: string, priceLabel: string}}
 * @namespace Util/Product/Transform/bundleOptionToLabel
 */
export const bundleOptionToLabel = (
    option: Partial<IndexedBundleOption>,
    currencyCode = GQLCurrencyEnum.USD
): PriceLabels => {
    const {
        price,
        finalOptionPrice = 0,
        price_type: priceType,
        can_change_quantity: canChangeQuantity,
        quantity = 0,
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
        baseLabel: !canChangeQuantity && quantity >= 0 ? `${ quantity } x ${ renderLabel } ` : `${ renderLabel } `,
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
export const bundleOptionsToSelectTransform = (
    options: IndexedBundleOption[],
    currencyCode = GQLCurrencyEnum.USD,
    quantity: Record<string, number> = {}
): TransformedBundleOption[] => (
    options.reduce((result: TransformedBundleOption[] = [], option) => {
        const {
            uid: sourceUid = '',
            quantity: defaultQuantity = 1,
            position,
            product,
            is_default
        } = option;

        const isAvailable = getProductInStock(product);

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
            sort_order: position,
            isAvailable,
            isDefault: is_default
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
export const customizableOptionToLabel = (
    option: Partial<CustomizableSelectionValue>, currencyCode = GQLCurrencyEnum.USD
): PriceLabels => {
    const {
        price,
        priceInclTax = 0,
        price_type,
        title
    } = option || {};
    const noPrice = price === 0 && priceInclTax === 0;
    const priceLabel = noPrice ? '' : `+ ${ formatPrice(priceInclTax, currencyCode) }`;
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
export const customizableOptionsToSelectTransform = (
    options: CustomizableSelectionValue[],
    currencyCode = GQLCurrencyEnum.USD
): TransformedCustomizableOptions[] => (
    options.reduce((result: TransformedCustomizableOptions[] = [], option) => {
        const {
            uid,
            title,
            sort_order = 0
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
            sort_order
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
    action: string = ADD_TO_CART,
    product: IndexedProduct,
    quantity: number | Record<string, number> = 1,
    enteredOptions: ProductOption[] = [],
    selectedOptions: string[] = []
): ProductTransformData[] => {
    const { sku = '', type_id: typeId } = product;

    const productData: ProductTransformData[] = [];

    if (typeId === ProductType.GROUPED && action === ADD_TO_CART) {

        const { items = [] } = product;
        const groupedProducts: string[] = [];

        (items as GroupedProductItem[]).forEach(({ product: { id } }) => {
            const { [String(id)]: groupedQuantity = 0 } = quantity as Record<string, number>;
            groupedProducts.push(encodeBase64(`grouped/${id}/${groupedQuantity}`));
        });

        productData.push({
            sku,
            quantity: 1,
            selected_options: [...selectedOptions, ...groupedProducts],
            entered_options: enteredOptions
        });
    } else {
        const baseProductToAdd: ProductTransformData = {
            sku,
            quantity: quantity as number,
            selected_options: selectedOptions,
            entered_options: enteredOptions
        };

        productData.push(baseProductToAdd);
    }

    return productData;
};

/**
 *
 * @param options
 * @param isRequired
 * @param type
 * @returns {[{uid: string, price: number, priceInclTax: number, title: *, is_default: boolean},...*]|*}
 * @namespace Util/Product/Transform/nonRequiredRadioOptions
 */
export const nonRequiredRadioOptions = <T>(
    options: T | T[],
    isRequired = false,
    type: string = FieldType.RADIO
): T | Array<T | NoneRadioOption> => {
    if (isRequired || type !== FieldType.RADIO) {
        return options;
    }

    const hasDefault = (options as Array<{ is_default?: boolean, product: StockCheckProduct }>).find(({ is_default }) => is_default && getProductInStock(product));

    return [
        {
            ...NONE_RADIO_OPTION,
            is_default: !hasDefault
        },
        ...(options as T[])
    ];
};

export default bundleOptionsToSelectTransform;
