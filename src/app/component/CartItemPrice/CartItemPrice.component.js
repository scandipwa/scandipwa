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
import { PureComponent } from 'react';

import { MixType } from 'Type/Common';
import { formatCurrency, roundPrice } from 'Util/Price';

/** @namespace Component/CartItemPrice/Component */
export class CartItemPrice extends PureComponent {
    static propTypes = {
        row_total: PropTypes.number.isRequired,
        currency_code: PropTypes.string.isRequired,
        mix: MixType.isRequired
    };

    render() {
        const { row_total, currency_code, mix } = this.props;
        const price = roundPrice(row_total);

        return (
            <p block="ProductPrice" aria-label={ __('Product Price') } mix={ mix }>
                <span aria-label={ __('Current product price') }>
                    <data value={ price }>{ `${formatCurrency(currency_code)}${price}` }</data>
                </span>
            </p>
        );
    }
}

export default CartItemPrice;
