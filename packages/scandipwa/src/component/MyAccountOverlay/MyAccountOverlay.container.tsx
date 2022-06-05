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

import {
    ComponentType,
    MouseEvent,
    PureComponent
} from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Page } from 'Component/Header/Header.config';
import { CheckoutStepUrl } from 'Route/Checkout/Checkout.config';
import { AccountPageUrl } from 'Route/MyAccount/MyAccount.config';
import { updateIsLoading } from 'Store/MyAccount/MyAccount.action';
import { changeNavigationState, goToPreviousNavigationState } from 'Store/Navigation/Navigation.action';
import { NavigationType } from 'Store/Navigation/Navigation.type';
import { hideActiveOverlay, toggleOverlayByKey } from 'Store/Overlay/Overlay.action';
import { ReactElement } from 'Type/Common.type';
import { isSignedIn } from 'Util/Auth';
import { noopFn } from 'Util/Common';
import history from 'Util/History';
import { RootState } from 'Util/Store/Store.type';
import { appendWithStoreCode } from 'Util/Url';

import MyAccountOverlay from './MyAccountOverlay.component';
import {
    CUSTOMER_ACCOUNT_OVERLAY_KEY,
    MyAccountPageState
} from './MyAccountOverlay.config';
import {
    MyAccountOverlayComponentProps,
    MyAccountOverlayContainerMapDispatchProps,
    MyAccountOverlayContainerMapStateProps,
    MyAccountOverlayContainerProps,
    MyAccountOverlayContainerPropsKeys,
    MyAccountOverlayContainerState
} from './MyAccountOverlay.type';

/** @namespace Component/MyAccountOverlay/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): MyAccountOverlayContainerMapStateProps => ({
    isSignedIn: state.MyAccountReducer.isSignedIn,
    customer: state.MyAccountReducer.customer,
    isMobile: state.ConfigReducer.device.isMobile,
    isPasswordForgotSend: state.MyAccountReducer.isPasswordForgotSend,
    isOverlayVisible: state.OverlayReducer.activeOverlay === Page.CUSTOMER_ACCOUNT,
    redirectToDashboard: state.ConfigReducer.redirect_dashboard,
    isLoading: state.MyAccountReducer.isLoading,
    device: state.ConfigReducer.device
});

/** @namespace Component/MyAccountOverlay/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): MyAccountOverlayContainerMapDispatchProps => ({
    hideActiveOverlay: () => dispatch(hideActiveOverlay()),
    showOverlay: (overlayKey) => dispatch(toggleOverlayByKey(overlayKey)),
    setHeaderState: (headerState) => dispatch(changeNavigationState(NavigationType.TOP_NAVIGATION_TYPE, headerState)),
    goToPreviousHeaderState: () => dispatch(goToPreviousNavigationState(NavigationType.TOP_NAVIGATION_TYPE)),
    updateCustomerLoadingStatus: (status) => dispatch(updateIsLoading(status))
});

/** @namespace Component/MyAccountOverlay/Container */
export class MyAccountOverlayContainer<
Props extends MyAccountOverlayContainerProps = MyAccountOverlayContainerProps,
State extends MyAccountOverlayContainerState = MyAccountOverlayContainerState
> extends PureComponent<Props, State> {
    static defaultProps: Partial<MyAccountOverlayContainerProps> = {
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

    __construct(props: MyAccountOverlayContainerProps): void {
        super.__construct?.(props);

        this.state = this.redirectOrGetState(props) as State;
    }

    static getDerivedStateFromProps(
        props: MyAccountOverlayContainerProps,
        state: MyAccountOverlayContainerState
    ): Partial<MyAccountOverlayContainerState> | null {
        const {
            isPasswordForgotSend,
            isOverlayVisible,
            isMobile,
            goToPreviousHeaderState
        } = props;

        const {
            isPasswordForgotSend: currentIsPasswordForgotSend,
            state: myAccountState
        } = state;

        const { location: { pathname, state: { isForgotPassword } = {} } } = history;

        const stateToBeUpdated: Partial<MyAccountOverlayContainerState> = {};

        const customerIsSignedIn = isSignedIn();

        if (!isMobile) {
            if (!isOverlayVisible && !customerIsSignedIn) {
                if (pathname !== '/forgot-password' && !isForgotPassword) {
                    stateToBeUpdated.state = MyAccountPageState.STATE_SIGN_IN;
                }
            } else if (!isOverlayVisible && customerIsSignedIn) {
                stateToBeUpdated.state = MyAccountPageState.STATE_LOGGED_IN;
            }
        }

        if (myAccountState !== MyAccountPageState.STATE_LOGGED_IN && customerIsSignedIn) {
            stateToBeUpdated.state = MyAccountPageState.STATE_LOGGED_IN;

            if (pathname.includes(CheckoutStepUrl.CHECKOUT_URL)) {
                goToPreviousHeaderState();
            }
        }

        if (myAccountState === MyAccountPageState.STATE_LOGGED_IN && !customerIsSignedIn) {
            stateToBeUpdated.state = MyAccountPageState.STATE_SIGN_IN;
        }

        if (isPasswordForgotSend !== currentIsPasswordForgotSend) {
            stateToBeUpdated.isPasswordForgotSend = isPasswordForgotSend;

            if (!isOverlayVisible) {
                history.push({ pathname: appendWithStoreCode(AccountPageUrl.LOGIN_URL) });
            }
            stateToBeUpdated.state = MyAccountPageState.STATE_SIGN_IN;
        }

        return Object.keys(stateToBeUpdated).length ? stateToBeUpdated : null;
    }

    componentDidUpdate(prevProps: MyAccountOverlayContainerProps, prevState: MyAccountOverlayContainerState): void {
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
            newMyAccountState !== MyAccountPageState.STATE_LOGGED_IN
            && pathname.includes(AccountPageUrl.ACCOUNT_URL)
            && !isOverlayVisible
        ) {
            history.push({ pathname: appendWithStoreCode(AccountPageUrl.LOGIN_URL) });
        }

        if (newMyAccountState === MyAccountPageState.STATE_LOGGED_IN) {
            if (pathname.includes(AccountPageUrl.ACCOUNT_URL)) {
                history.push({ pathname: appendWithStoreCode('/') });
            } else if (!pathname.includes(CheckoutStepUrl.CHECKOUT_URL) && redirectToDashboard) {
                history.push({ pathname: appendWithStoreCode(AccountPageUrl.ACCOUNT_URL) });
            }
        }
    }

    containerProps(): Pick<
    MyAccountOverlayComponentProps,
    MyAccountOverlayContainerPropsKeys
    > {
        const {
            isOverlayVisible,
            isMobile,
            isLoading: propIsLoading,
            onSignIn,
            isCheckout,
            device
        } = this.props;
        const {
            state
        } = this.state;

        return {
            isCheckout,
            isLoading: propIsLoading,
            isMobile,
            isOverlayVisible,
            onSignIn,
            state,
            device
        };
    }

    setSignInState(state: MyAccountPageState): void {
        this.setState({ state });
    }

    setLoadingState(isLoading: boolean): void {
        const { updateCustomerLoadingStatus } = this.props;

        updateCustomerLoadingStatus(isLoading);
    }

    redirectOrGetState(props: MyAccountOverlayContainerProps): MyAccountOverlayContainerState {
        const {
            showOverlay,
            setHeaderState,
            isPasswordForgotSend,
            isMobile
        } = props;

        const { location: { pathname, state: { isForgotPassword } = {} } } = history;

        const state = {
            state: isSignedIn() ? MyAccountPageState.STATE_LOGGED_IN : MyAccountPageState.STATE_SIGN_IN,
            // eslint-disable-next-line react/no-unused-state
            isPasswordForgotSend,
            isLoading: false
        };

        if (pathname !== '/forgot-password' && !isForgotPassword) {
            return state;
        }

        // if customer got here from forgot-password
        state.state = MyAccountPageState.STATE_FORGOT_PASSWORD;

        setHeaderState({
            name: Page.CUSTOMER_SUB_ACCOUNT,
            title: 'Forgot password',
            onBackClick: (e: MouseEvent) => {
                history.push({ pathname: appendWithStoreCode(AccountPageUrl.ACCOUNT_URL) });
                this.handleSignIn(e);
            }
        });

        if (isMobile) {
            history.push(
                { pathname: appendWithStoreCode(AccountPageUrl.ACCOUNT_URL), state: { isForgotPassword: true } }
            );

            return state;
        }

        showOverlay(CUSTOMER_ACCOUNT_OVERLAY_KEY);

        return state;
    }

    onVisible(): void {
        const { setHeaderState, isCheckout, isMobile } = this.props;

        if (isMobile && !isCheckout) {
            setHeaderState({ name: Page.CUSTOMER_ACCOUNT, title: __('Sign in') });
        }
    }

    onFormError(): void {
        const { updateCustomerLoadingStatus } = this.props;

        updateCustomerLoadingStatus(false);
    }

    stopLoadingAndHideOverlay(): void {
        const { hideActiveOverlay, updateCustomerLoadingStatus } = this.props;
        updateCustomerLoadingStatus(false);
        hideActiveOverlay();
    }

    handleForgotPassword(e: MouseEvent): void {
        const { setHeaderState } = this.props;
        e.preventDefault();
        e.nativeEvent.stopImmediatePropagation();
        this.setState({ state: MyAccountPageState.STATE_FORGOT_PASSWORD });

        setHeaderState({
            name: Page.CUSTOMER_SUB_ACCOUNT,
            title: __('Forgot password'),
            onBackClick: () => this.handleSignIn(e)
        });
    }

    handleSignIn(e: MouseEvent): void {
        const { setHeaderState } = this.props;
        e.preventDefault();
        e.nativeEvent.stopImmediatePropagation();
        this.setState({ state: MyAccountPageState.STATE_SIGN_IN });

        setHeaderState({
            name: Page.CUSTOMER_ACCOUNT,
            title: __('Sign in')
        });
    }

    handleCreateAccount(e: MouseEvent): void {
        const { setHeaderState } = this.props;
        e.preventDefault();
        e.nativeEvent.stopImmediatePropagation();
        this.setState({ state: MyAccountPageState.STATE_CREATE_ACCOUNT });

        setHeaderState({
            name: Page.CUSTOMER_SUB_ACCOUNT,
            title: __('Create account'),
            onBackClick: () => this.handleSignIn(e)
        });
    }

    render(): ReactElement {
        return (
            <MyAccountOverlay
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(
    MyAccountOverlayContainer as unknown as ComponentType<MyAccountOverlayContainerProps>
);
