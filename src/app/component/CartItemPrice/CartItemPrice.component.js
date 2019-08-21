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

import React, { Component } from 'react';
import ProductPrice from 'Component/ProductPrice';
import { formatCurrency } from 'Util/Price';
import PropTypes from 'prop-types';

class CartItemPrice extends Component {
    render() {
        const { row_total, currency_code } = this.props;
        const priceString = formatCurrency(ProductPrice.roundPrice(row_total), currency_code);

        return (
        <p block="ProductPrice" aria-label={ __('Product Price') }>
            <span aria-label={ __('Current product price') }>
                <data value={ ProductPrice.roundPrice(row_total) }>{ priceString }</data>
            </span>
        </p>
        );
    }
}

CartItemPrice.propTypes = {
    row_total: PropTypes.number.isRequired,
    currency_code: PropTypes.string.isRequired
};

export default CartItemPrice;
