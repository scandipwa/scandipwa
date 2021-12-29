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

import { CUSTOMER_ACCOUNT, CUSTOMER_SUB_ACCOUNT } from 'Component/Header/Header.config';
import { CHECKOUT_URL } from 'Route/Checkout/Checkout.config';
import {
    ACCOUNT_LOGIN_URL,
    ACCOUNT_URL
} from 'Route/MyAccount/MyAccount.config';
import { updateIsLoading } from 'Store/MyAccount/MyAccount.action';
import { changeNavigationState, goToPreviousNavigationState } from 'Store/Navigation/Navigation.action';
import { TOP_NAVIGATION_TYPE } from 'Store/Navigation/Navigation.reducer';
import { showNotification } from 'Store/Notification/Notification.action';
import { hideActiveOverlay, toggleOverlayByKey } from 'Store/Overlay/Overlay.action';
import { isSignedIn } from 'Util/Auth';
import { noopFn } from 'Util/Common';
import history from 'Util/History';
import { appendWithStoreCode } from 'Util/Url';

import MyAccountOverlay from './MyAccountOverlay.component';
import {
    CUSTOMER_ACCOUNT_OVERLAY_KEY,
    STATE_CREATE_ACCOUNT,
    STATE_FORGOT_PASSWORD,
    STATE_LOGGED_IN,
    STATE_SIGN_IN
} from './MyAccountOverlay.config';

/** @namespace Component/MyAccountOverlay/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    isSignedIn: state.MyAccountReducer.isSignedIn,
    customer: state.MyAccountReducer.customer,
    isMobile: state.ConfigReducer.device.isMobile,
    isPasswordForgotSend: state.MyAccountReducer.isPasswordForgotSend,
    isOverlayVisible: state.OverlayReducer.activeOverlay === CUSTOMER_ACCOUNT,
    redirectToDashboard: state.ConfigReducer.redirect_dashboard,
    isLoading: state.MyAccountReducer.isLoading,
    device: state.ConfigReducer.device
});

/** @namespace Component/MyAccountOverlay/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    hideActiveOverlay: () => dispatch(hideActiveOverlay()),
    showNotification: (type, message) => dispatch(showNotification(type, message)),
    showOverlay: (overlayKey) => dispatch(toggleOverlayByKey(overlayKey)),
    setHeaderState: (headerState) => dispatch(changeNavigationState(TOP_NAVIGATION_TYPE, headerState)),
    goToPreviousHeaderState: () => dispatch(goToPreviousNavigationState(TOP_NAVIGATION_TYPE)),
    updateCustomerLoadingStatus: (status) => dispatch(updateIsLoading(status))
});

/** @namespace Component/MyAccountOverlay/Container */
export class MyAccountOverlayContainer extends PureComponent {
    static propTypes = {
        isCheckout: PropTypes.bool,
        isLoading: PropTypes.bool,
        isMobile: PropTypes.bool.isRequired,
        isOverlayVisible: PropTypes.bool.isRequired,
        isPasswordForgotSend: PropTypes.bool.isRequired,
        isSignedIn: PropTypes.bool.isRequired,

        goToPreviousHeaderState: PropTypes.func,
        hideActiveOverlay: PropTypes.func.isRequired,
        onSignIn: PropTypes.func,
        redirectToDashboard: PropTypes.bool.isRequired,
        setHeaderState: PropTypes.func.isRequired,
        showNotification: PropTypes.func.isRequired,
        showOverlay: PropTypes.func.isRequired,
        updateCustomerLoadingStatus: PropTypes.func.isRequired
    };

    static defaultProps = {
        isCheckout: false,
        isLoading: false,
        onSignIn: noopFn,
        goToPreviousHeaderState: noopFn
    };

    containerFunctions = {
        onFormError: this.onFormError.bind(this),
        handleForgotPassword: this.handleForgotPassword.bind(this),
        handleSignIn: this.handleSignIn.bind(this),
        handleCreateAccount: this.handleCreateAccount.bind(this),
        onVisible: this.onVisible.bind(this),
        setSignInState: this.setSignInState.bind(this),
        setLoadingState: this.setLoadingState.bind(this)
    };

    __construct(props) {
        super.__construct(props);

        this.state = this.redirectOrGetState(props);
    }

    static getDerivedStateFromProps(props, state) {
        const {
            isPasswordForgotSend,
            showNotification,
            isOverlayVisible,
            isMobile
        } = props;

        const {
            isPasswordForgotSend: currentIsPasswordForgotSend,
            state: myAccountState
        } = state;

        const { location: { pathname, state: { isForgotPassword } = {} } } = history;

        const stateToBeUpdated = {};
        const customerIsSignedIn = isSignedIn();

        if (!isMobile) {
            if (!isOverlayVisible && !customerIsSignedIn) {
                if (pathname !== '/forgot-password' && !isForgotPassword) {
                    stateToBeUpdated.state = STATE_SIGN_IN;
                }
            } else if (!isOverlayVisible && customerIsSignedIn) {
                stateToBeUpdated.state = STATE_LOGGED_IN;
            }
        }

        if (myAccountState !== STATE_LOGGED_IN && customerIsSignedIn) {
            stateToBeUpdated.state = STATE_LOGGED_IN;
        }

        if (myAccountState === STATE_LOGGED_IN && !customerIsSignedIn) {
            stateToBeUpdated.state = STATE_SIGN_IN;
        }

        if (isPasswordForgotSend !== currentIsPasswordForgotSend) {
            stateToBeUpdated.isPasswordForgotSend = isPasswordForgotSend;
            // eslint-disable-next-line max-len
            showNotification('success', __('If there is an account associated with the provided address you will receive an email with a link to reset your password.'));
            stateToBeUpdated.state = STATE_SIGN_IN;
        }

        return Object.keys(stateToBeUpdated).length ? stateToBeUpdated : null;
    }

    componentDidUpdate(prevProps, prevState) {
        const { isSignedIn: prevIsSignedIn } = prevProps;
        const { state: oldMyAccountState } = prevState;
        const { state: newMyAccountState } = this.state;
        const { isOverlayVisible } = this.props;
        const { location: { pathname } } = history;

        const {
            isSignedIn,
            hideActiveOverlay,
            isCheckout,
            goToPreviousHeaderState,
            redirectToDashboard
        } = this.props;

        if (oldMyAccountState === newMyAccountState) {
            return;
        }

        if (isSignedIn !== prevIsSignedIn) {
            hideActiveOverlay();

            if (isCheckout) {
                goToPreviousHeaderState();
            }
        }

        if (
            newMyAccountState !== STATE_LOGGED_IN
            && pathname.includes(ACCOUNT_URL)
            && !isOverlayVisible
        ) {
            history.push({ pathname: appendWithStoreCode(ACCOUNT_LOGIN_URL) });
        }

        if (newMyAccountState === STATE_LOGGED_IN) {
            if (pathname.includes(ACCOUNT_URL)) {
                history.push({ pathname: appendWithStoreCode('/') });
            } else if (!pathname.includes(CHECKOUT_URL) && redirectToDashboard) {
                history.push({ pathname: appendWithStoreCode(ACCOUNT_URL) });
            }
        }
    }

    containerProps() {
        const {
            isOverlayVisible,
            isMobile,
            isLoading: propIsLoading,
            onSignIn
        } = this.props;
        const {
            state,
            isCheckout
        } = this.state;

        return {
            isCheckout,
            isLoading: propIsLoading,
            isMobile,
            isOverlayVisible,
            onSignIn,
            state
        };
    }

    setSignInState(state) {
        this.setState({ state });
    }

    setLoadingState(isLoading) {
        const { updateCustomerLoadingStatus } = this.props;

        updateCustomerLoadingStatus(isLoading);
    }

    redirectOrGetState(props) {
        const {
            showOverlay,
            setHeaderState,
            isPasswordForgotSend,
            isMobile
        } = props;

        const { location: { pathname, state: { isForgotPassword } = {} } } = history;

        const state = {
            state: isSignedIn() ? STATE_LOGGED_IN : STATE_SIGN_IN,
            // eslint-disable-next-line react/no-unused-state
            isPasswordForgotSend,
            isLoading: false
        };

        // if customer got here from forgot-password
        if (pathname !== '/forgot-password' && !isForgotPassword) {
            return state;
        }

        state.state = STATE_FORGOT_PASSWORD;

        setHeaderState({
            name: CUSTOMER_SUB_ACCOUNT,
            title: 'Forgot password',
            onBackClick: (e) => {
                history.push({ pathname: appendWithStoreCode(ACCOUNT_URL) });
                this.handleSignIn(e);
            }
        });

        if (isMobile) {
            history.push({ pathname: appendWithStoreCode(ACCOUNT_URL), state: { isForgotPassword: true } });

            return state;
        }

        showOverlay(CUSTOMER_ACCOUNT_OVERLAY_KEY);

        return state;
    }

    onVisible() {
        const { setHeaderState, isCheckout, isMobile } = this.props;

        if (isMobile && !isCheckout) {
            setHeaderState({ name: CUSTOMER_ACCOUNT, title: __('Sign in') });
        }
    }

    onFormError() {
        const { updateCustomerLoadingStatus } = this.props;

        updateCustomerLoadingStatus(false);
    }

    stopLoadingAndHideOverlay() {
        const { hideActiveOverlay, updateCustomerLoadingStatus } = this.props;
        updateCustomerLoadingStatus(false);
        hideActiveOverlay();
    }

    handleForgotPassword(e) {
        const { setHeaderState } = this.props;
        e.preventDefault();
        e.nativeEvent.stopImmediatePropagation();
        this.setState({ state: STATE_FORGOT_PASSWORD });

        setHeaderState({
            name: CUSTOMER_SUB_ACCOUNT,
            title: __('Forgot password'),
            onBackClick: () => this.handleSignIn(e)
        });
    }

    handleSignIn(e) {
        const { setHeaderState } = this.props;
        e.preventDefault();
        e.nativeEvent.stopImmediatePropagation();
        this.setState({ state: STATE_SIGN_IN });

        setHeaderState({
            name: CUSTOMER_ACCOUNT,
            title: __('Sign in')
        });
    }

    handleCreateAccount(e) {
        const { setHeaderState } = this.props;
        e.preventDefault();
        e.nativeEvent.stopImmediatePropagation();
        this.setState({ state: STATE_CREATE_ACCOUNT });

        setHeaderState({
            name: CUSTOMER_SUB_ACCOUNT,
            title: __('Create account'),
            onBackClick: () => this.handleSignIn(e)
        });
    }

    render() {
        return (
            <MyAccountOverlay
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountOverlayContainer);
