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

import PropTypes from 'prop-types';

import { DisplayCartTaxInPrice, DisplayCartTaxInShipping, DisplayCartTaxInSubTotal } from 'Util/Cart/Cart.type';

// Support for comtabilitiy

export const RegionType = PropTypes.shape({
    code: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.number,
});

export const CountriesType = PropTypes.arrayOf(
    PropTypes.shape({
        label: PropTypes.string,
        id: PropTypes.string,
        available_regions: PropTypes.arrayOf(RegionType),
    }),
);

export const CartConfigType = PropTypes.shape({
    display_tax_in_price: PropTypes.oneOf(Object.values(DisplayCartTaxInPrice)),
    display_tax_in_subtotal: PropTypes.oneOf(Object.values(DisplayCartTaxInSubTotal)),
    display_tax_in_shipping_amount: PropTypes.oneOf(Object.values(DisplayCartTaxInShipping)),
    include_tax_in_order_total: PropTypes.bool.isRequired,
    display_full_tax_summary: PropTypes.bool.isRequired,
    display_zero_tax_subtotal: PropTypes.bool.isRequired,
});

export const StoreItemType = PropTypes.shape({
    id: PropTypes.string,
    value: PropTypes.string,
    storeUrl: PropTypes.string,
    storeLinkUrl: PropTypes.string,
    label: PropTypes.string,
});
