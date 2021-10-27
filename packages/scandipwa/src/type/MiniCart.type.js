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

import PropTypes from 'prop-types';

import { MetaTitleType } from 'Type/Common.type';

import { ProductType } from './ProductList.type';

export const PageType = PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
    meta_title: MetaTitleType,
    meta_description: PropTypes.string,
    meta_keywords: PropTypes.string
});

export const QuantitySelectorType = PropTypes.shape({
    increase: PropTypes.func,
    decrease: PropTypes.func,
    quantity: PropTypes.number
});

export const TotalsType = PropTypes.shape({
    count: PropTypes.number,
    subTotalPrice: PropTypes.string,
    taxPrice: PropTypes.string,
    grandTotalPrice: PropTypes.string
});

export const CartItemType = PropTypes.shape({
    discount_amount: PropTypes.number,
    discount_percent: PropTypes.number,
    item_id: PropTypes.number,
    price: PropTypes.number,
    product: ProductType,
    qty: PropTypes.number,
    row_total: PropTypes.number,
    sku: PropTypes.string,
    tax_amount: PropTypes.number,
    tax_percent: PropTypes.number
});

export const CartDisplayType = PropTypes.shape({
    display_tax_in_price: PropTypes.string,
    display_tax_in_subtotal: PropTypes.string,
    display_tax_in_shipping_amount: PropTypes.string,
    include_tax_in_order_total: PropTypes.bool,
    display_full_tax_summary: PropTypes.bool,
    display_zero_tax_subtotal: PropTypes.bool
});
