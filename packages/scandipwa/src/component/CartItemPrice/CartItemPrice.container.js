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
import { connect } from 'react-redux';

import { getCartItemPrice, getCartItemSubPrice } from 'Util/Cart';

import CartItemPrice from './CartItemPrice.component';

/** @namespace Component/CartItemPrice/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    getCartItemPrice: getCartItemPrice(state),
    getCartItemSubPrice: getCartItemSubPrice(state)
});

/** @namespace Component/CartItemPrice/Container/mapDispatchToProps */
export const mapDispatchToProps = () => ({});

/** @namespace Component/CartItemPrice/Container */
export class CartItemPriceContainer extends PureComponent {
    static propTypes = {
        getCartItemPrice: PropTypes.func.isRequired,
        getCartItemSubPrice: PropTypes.func.isRequired
    };

    containerProps = () => {
        const {
            getCartItemPrice,
            getCartItemSubPrice,
            ...rest
        } = this.props;

        return {
            price: getCartItemPrice(rest),
            subPrice: getCartItemSubPrice(rest)
        };
    };

    render() {
        return (
            <CartItemPrice
              { ...this.props }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartItemPriceContainer);
