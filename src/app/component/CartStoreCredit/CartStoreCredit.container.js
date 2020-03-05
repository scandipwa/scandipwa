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
import CartStoreCredit from './CartStoreCredit.component';

export const mapDispatchToProps = dispatch => ({
    applyStoreCreditToCart: () => CartDispatcher.applyStoreCreditToCart(dispatch),
    removeStoreCreditFromCart: () => CartDispatcher.removeStoreCreditFromCart(dispatch)
});

export class CartStoreCreditContainer extends PureComponent {
    static propTypes = {
        applyStoreCreditToCart: PropTypes.func.isRequired,
        removeStoreCreditFromCart: PropTypes.func.isRequired,
        handleIsLoading: PropTypes.func.isRequired
    };

    containerFunctions = {
        handleApplyStoreCreditToCart: this.handleApplyStoreCreditToCart.bind(this),
        handleRemoveStoreCreditFromCart: this.handleRemoveStoreCreditFromCart.bind(this)
    };

    async handleApplyStoreCreditToCart() {
        const { applyStoreCreditToCart, handleIsLoading } = this.props;

        handleIsLoading(true);
        await applyStoreCreditToCart();
        handleIsLoading(false);
    }

    async handleRemoveStoreCreditFromCart() {
        const { removeStoreCreditFromCart, handleIsLoading } = this.props;

        handleIsLoading(true);
        await removeStoreCreditFromCart();
        handleIsLoading(false);
    }

    render() {
        return (
            <CartStoreCredit
              { ...this.props }
              { ...this.state }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(null, mapDispatchToProps)(CartStoreCreditContainer);
