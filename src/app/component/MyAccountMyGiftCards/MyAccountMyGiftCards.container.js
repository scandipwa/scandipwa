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
import { GiftCardQuery } from 'Query';
import { fetchMutation, fetchQuery } from 'Util/Request';
import { showNotification } from 'Store/Notification';
import { MyAccountDispatcher } from 'Store/MyAccount';
import { CartDispatcher } from 'Store/Cart';
import { TotalsType } from 'Type/MiniCart';
import PropTypes from 'prop-types';
import MyAccountMyGiftCards from './MyAccountMyGiftCards.component';

export const mapStateToProps = state => ({
    isLoading: state.OrderReducer.isLoading,
    totals: state.CartReducer.cartTotals
});

export const mapDispatchToProps = dispatch => ({
    showNotification: (type, message) => dispatch(showNotification(type, message)),
    requestCustomerData: () => MyAccountDispatcher.requestCustomerData(dispatch),
    removeGiftCardFromCart: giftCardCode => CartDispatcher.removeGiftCardFromCart(dispatch, giftCardCode, false)
});

class MyAccountMyGiftCardsContainer extends PureComponent {
    static propTypes = {
        showNotification: PropTypes.func.isRequired,
        requestCustomerData: PropTypes.func.isRequired,
        removeGiftCardFromCart: PropTypes.func.isRequired,
        totals: TotalsType.isRequired
    };

    containerFunctions = {
        getGiftCardData: this.getGiftCardData.bind(this),
        redeemGiftCardBalanceAsStoreCredit: this.redeemGiftCardBalanceAsStoreCredit.bind(this)
    };

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            giftCardData: {}
        };
    }

    async getGiftCardData(value) {
        const { showNotification } = this.props;
        const giftCardCode = { gift_card_code: value };

        this.setState({ isLoading: true });

        try {
            const result = await fetchQuery(GiftCardQuery.getGiftCardBalance(giftCardCode));

            this.setState({ giftCardData: result });
        } catch (error) {
            if (error.length) {
                showNotification('error', error[0].message);
            }
        }

        this.setState({ isLoading: false });
    }

    async redeemGiftCardBalanceAsStoreCredit(value) {
        const {
            showNotification,
            requestCustomerData,
            removeGiftCardFromCart,
            totals: { applied_gift_cards }
        } = this.props;
        const giftCardCode = { gift_card_code: value };

        this.setState({ isLoading: true });

        try {
            const giftCode = JSON.stringify(giftCardCode);
            const checkIfAppliedToCart = applied_gift_cards.filter(({ code }) => giftCode.includes(code));

            if (checkIfAppliedToCart.length) {
                await removeGiftCardFromCart(giftCardCode.gift_card_code);
            }

            await fetchMutation(GiftCardQuery.redeemGiftCardBalanceAsStoreCredit(giftCardCode));

            requestCustomerData();
            showNotification('success', __('Successfully redeemed as store credit!'));
        } catch (error) {
            if (error.length) {
                showNotification('error', error[0].message);
            }
        }

        this.setState({ isLoading: false });
    }

    render() {
        return (
            <MyAccountMyGiftCards
              { ...this.props }
              { ...this.state }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountMyGiftCardsContainer);
