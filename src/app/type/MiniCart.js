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

import { ProductType } from './ProductList';

export const PageType = PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
    meta_title: PropTypes.string,
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
