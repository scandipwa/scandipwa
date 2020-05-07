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
import { connect } from 'react-redux';
import { PureComponent } from 'react';

import { changeNavigationState, goToPreviousNavigationState } from 'Store/Navigation';
import { TOP_NAVIGATION_TYPE } from 'Store/Navigation/Navigation.reducer';
import { CART, CART_EDITING, CUSTOMER_ACCOUNT } from 'Component/Header';
import { CUSTOMER_ACCOUNT_OVERLAY_KEY } from 'Component/MyAccountOverlay/MyAccountOverlay.component';
import { hideActiveOverlay, toggleOverlayByKey } from 'Store/Overlay';
import { CartDispatcher } from 'Store/Cart';
import { TotalsType } from 'Type/MiniCart';
import isMobile from 'Util/Mobile';
import { isSignedIn } from 'Util/Auth';
import { history } from 'Route';

import CartOverlay from './CartOverlay.component';

export const mapStateToProps = state => ({
    totals: state.CartReducer.cartTotals,
    guest_checkout: state.ConfigReducer.guest_checkout,
    navigationState: state.NavigationReducer[TOP_NAVIGATION_TYPE].navigationState
});

export const mapDispatchToProps = dispatch => ({
    hideActiveOverlay: () => dispatch(hideActiveOverlay()),
    setNavigationState: stateName => dispatch(changeNavigationState(TOP_NAVIGATION_TYPE, stateName)),
    changeHeaderState: state => dispatch(changeNavigationState(TOP_NAVIGATION_TYPE, state)),
    updateTotals: options => CartDispatcher.updateTotals(dispatch, options),
    showOverlay: overlayKey => dispatch(toggleOverlayByKey(overlayKey))

});

export class CartOverlayContainer extends PureComponent {
    static propTypes = {
        totals: TotalsType.isRequired,
        guest_checkout: PropTypes.bool.isRequired,
        changeHeaderState: PropTypes.func.isRequired,
        hideActiveOverlay: PropTypes.func.isRequired,
        showOverlay: PropTypes.func.isRequired
    };

    state = { isEditing: false };

    containerFunctions = {
        changeHeaderState: this.changeHeaderState.bind(this),
        handleCheckoutClick: this.handleCheckoutClick.bind(this)
    };

    handleCheckoutClick() {
        const { guest_checkout, hideActiveOverlay, showOverlay, setNavigationState, navigationState: { name } } = this.props;
        if (guest_checkout) {
            window.location.href = "/checkout";
        } else if (!guest_checkout) {
            if (isSignedIn()) {
                history.push({ pathname: '/checkout' });
                return;
            }

            hideActiveOverlay();

            if (!isMobile.any() && name !== CUSTOMER_ACCOUNT) {
                showOverlay(CUSTOMER_ACCOUNT_OVERLAY_KEY);
                setNavigationState({ name: CUSTOMER_ACCOUNT, title: 'Sign in' });
            }
        }
    }

    changeHeaderState() {
        const { changeHeaderState, totals: { count = 0 } } = this.props;
        const title = __('%s Items', count || 0);

        changeHeaderState({
            name: CART,
            title,
            onEditClick: () => {
                this.setState({ isEditing: true });
                changeHeaderState({
                    name: CART_EDITING,
                    title,
                    onOkClick: () => this.setState({ isEditing: false }),
                    onCancelClick: () => this.setState({ isEditing: false })
                });
            },
            onCloseClick: () => this.setState({ isEditing: false })
        });
    }

    render() {
        return (
            <CartOverlay
              { ...this.props }
              { ...this.state }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartOverlayContainer);
