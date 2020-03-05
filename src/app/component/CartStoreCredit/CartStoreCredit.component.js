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
import PropTypes from 'prop-types';
import './CartStoreCredit.style';

class CartCoupon extends PureComponent {
    static propTypes = {
        handleApplyStoreCreditToCart: PropTypes.func.isRequired,
        handleRemoveStoreCreditFromCart: PropTypes.func.isRequired,
        appliedStoreCredit: PropTypes.object.isRequired
    };

    handleApplyStoreCredit = (e) => {
        e.preventDefault();

        const { handleApplyStoreCreditToCart } = this.props;

        handleApplyStoreCreditToCart();
    };

    handleRemoveStoreCredit = (e) => {
        e.preventDefault();

        const { handleRemoveStoreCreditFromCart } = this.props;

        handleRemoveStoreCreditFromCart();
    };

    renderRemoveStoreCredit() {
        return (
            <button
              block="CartStoreCredit"
              elem="Button"
              type="button"
              mix={ { block: 'Button' } }
              onClick={ this.handleRemoveStoreCredit }
            >
                { __('Remove Store Credit from cart') }
            </button>
        );
    }

    renderApplyStoreCredit() {
        return (
            <button
              block="CartStoreCredit"
              elem="Button"
              type="button"
              mix={ { block: 'Button' } }
              onClick={ this.handleApplyStoreCredit }
            >
                { __('Apply Store Credit to cart') }
            </button>
        );
    }

    render() {
        const { appliedStoreCredit } = this.props;

        if (Object.keys(appliedStoreCredit).length < 2) return null;

        const {
            appliedStoreCredit:
            {
                applied_balance: { value },
                current_balance: { value: currentBalance }
            }
        } = this.props;

        return (
            <>
                { currentBalance !== 0 && (
                    value !== 0 ? this.renderRemoveStoreCredit() : this.renderApplyStoreCredit()
                ) }
            </>
        );
    }
}

export default CartCoupon;
