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
import PropTypes from 'prop-types';
import { CartDispatcher } from 'Store/Cart';
import CartGiftCard from './CartGiftCard.component';

export const mapDispatchToProps = dispatch => ({
    applyGiftCardToCart: giftCardCode => CartDispatcher.applyGiftCardToCart(dispatch, giftCardCode),
    removeGiftCardFromCart: giftCardCode => CartDispatcher.removeGiftCardFromCart(dispatch, giftCardCode)
});

export class CartGiftCardContainer extends PureComponent {
    static propTypes = {
        applyGiftCardToCart: PropTypes.func.isRequired,
        removeGiftCardFromCart: PropTypes.func.isRequired,
        handleIsLoading: PropTypes.func.isRequired
    };

    containerFunctions = {
        handleApplyGiftCardToCart: this.handleApplyGiftCardToCart.bind(this),
        handleRemoveGiftCardFromCart: this.handleRemoveGiftCardFromCart.bind(this)
    };

    async handleApplyGiftCardToCart(giftCardCode) {
        const { applyGiftCardToCart, handleIsLoading } = this.props;

        handleIsLoading(true);
        await applyGiftCardToCart(giftCardCode);
        handleIsLoading(false);
    }

    async handleRemoveGiftCardFromCart(giftCardCode) {
        const { removeGiftCardFromCart, handleIsLoading } = this.props;

        handleIsLoading(true);
        await removeGiftCardFromCart(giftCardCode);
        handleIsLoading(false);
    }

    render() {
        return (
            <CartGiftCard
              { ...this.props }
              { ...this.state }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(null, mapDispatchToProps)(CartGiftCardContainer);
