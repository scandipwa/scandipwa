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

import { Component } from 'react';
import { roundPrice } from 'Util/Price';
import { MixType } from 'Type/Common';
import PropTypes from 'prop-types';
import Price from 'Component/Price';

class CartItemPrice extends Component {
    static propTypes = {
        row_total: PropTypes.number.isRequired,
        regular_total: PropTypes.number.isRequired,
        currency_code: PropTypes.string.isRequired,
        mix: MixType.isRequired
    };

    render() {
        const {
            row_total, regular_total, currency_code, mix
        } = this.props;
        const price = roundPrice(row_total);

        return (
            <p block="ProductPrice" aria-label={ __('Product Price') } mix={ mix }>
                <span aria-label={ __('Current product price') }>
                    <Price currency={ currency_code } finalPrice={ price } oldPrice={ regular_total } />
                </span>
            </p>
        );
    }
}

export default CartItemPrice;
