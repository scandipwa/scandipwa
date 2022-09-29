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

import { PureComponent } from 'react';

import { ReactElement } from 'Type/Common.type';
import { GQLCurrencyEnum } from 'Type/Graphql.type';
import { formatPrice, roundPrice } from 'Util/Price';

import { CartItemPriceComponentProps } from './CartItemPrice.type';

/** @namespace Component/CartItemPrice/Component */
export class CartItemPrice extends PureComponent<CartItemPriceComponentProps> {
    static defaultProps: Partial<CartItemPriceComponentProps> = {
        subPrice: null,
    };

    renderPrice(): ReactElement {
        const { price, currency_code } = this.props;
        const value = roundPrice(price);

        return (
            <span aria-label={ __('Current product price') }>
                <data value={ value }>{ formatPrice(price, currency_code as GQLCurrencyEnum) }</data>
            </span>
        );
    }

    renderSubPrice(): ReactElement {
        const { subPrice, currency_code } = this.props;

        if (!subPrice) {
            return null;
        }

        return (
            <span
              aria-label={ __('Current product price excl. tax') }
              block="ProductPrice"
              elem="SubPrice"
            >
                { __('Excl. tax: %s', formatPrice(subPrice, currency_code as GQLCurrencyEnum)) }
            </span>
        );
    }

    render(): ReactElement {
        const { mix } = this.props;

        return (
            <p block="ProductPrice" aria-label={ __('Product Price') } mix={ mix }>
                { this.renderPrice() }
                { this.renderSubPrice() }
            </p>
        );
    }
}

export default CartItemPrice;
