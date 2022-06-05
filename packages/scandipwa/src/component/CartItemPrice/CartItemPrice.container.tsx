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

import { PureComponent } from 'react';
import { connect } from 'react-redux';

import { ReactElement } from 'Type/Common.type';
import { getCartItemPrice, getCartItemSubPrice } from 'Util/Cart';
import { CartItemPriceProps } from 'Util/Cart/Cart.type';
import { RootState } from 'Util/Store/Store.type';

import CartItemPrice from './CartItemPrice.component';
import {
    CartItemPriceComponentContainerPropKeys,
    CartItemPriceComponentProps,
    CartItemPriceContainerMapDispatchProps,
    CartItemPriceContainerMapStateProps,
    CartItemPriceContainerProps
} from './CartItemPrice.type';

/** @namespace Component/CartItemPrice/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): CartItemPriceContainerMapStateProps => ({
    getCartItemPrice: getCartItemPrice(state),
    getCartItemSubPrice: getCartItemSubPrice(state)
});

/** @namespace Component/CartItemPrice/Container/mapDispatchToProps */
export const mapDispatchToProps = (): CartItemPriceContainerMapDispatchProps => ({});

/** @namespace Component/CartItemPrice/Container */
export class CartItemPriceContainer extends PureComponent<CartItemPriceContainerProps> {
    containerProps(): Pick<CartItemPriceComponentProps, CartItemPriceComponentContainerPropKeys> {
        const {
            getCartItemPrice,
            getCartItemSubPrice,
            currency_code,
            mix,
            ...rest
        } = this.props;

        return {
            currency_code,
            mix,
            price: getCartItemPrice(rest as CartItemPriceProps),
            subPrice: getCartItemSubPrice(rest as CartItemPriceProps)
        };
    }

    render(): ReactElement {
        return (
            <CartItemPrice
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartItemPriceContainer);
