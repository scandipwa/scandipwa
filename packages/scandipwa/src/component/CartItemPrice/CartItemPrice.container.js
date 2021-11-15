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

import { MixType } from 'Type/Common.type';
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
        getCartItemSubPrice: PropTypes.func.isRequired,
        currency_code: PropTypes.string.isRequired,
        mix: MixType.isRequired
    };

    containerProps() {
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
            price: getCartItemPrice(rest),
            subPrice: getCartItemSubPrice(rest)
        };
    }

    render() {
        return (
            <CartItemPrice
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartItemPriceContainer);
