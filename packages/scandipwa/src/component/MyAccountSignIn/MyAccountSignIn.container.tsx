/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/scandipwa
 */

import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { CheckoutStepUrl } from 'Route/Checkout/Checkout.config';
import { showNotification } from 'Store/Notification/Notification.action';
import { NotificationType } from 'Store/Notification/Notification.type';
import { ReactElement } from 'Type/Common.type';
import { noopFn } from 'Util/Common';
import transformToNameValuePair from 'Util/Form/Transform';
import history from 'Util/History';
import { getErrorMessage } from 'Util/Request';
import { RootState } from 'Util/Store/Store.type';
import { appendWithStoreCode } from 'Util/Url';

import MyAccountSignIn from './MyAccountSignIn.component';
import {
    MyAccountSignInContainerMapDispatchProps,
    MyAccountSignInContainerMapStateProps,
    MyAccountSignInContainerProps,
    MyAccountSignInContainerState
} from './MyAccountSignIn.type';

export const MyAccountDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/MyAccount/MyAccount.dispatcher'
);

/** @namespace Component/MyAccountSignIn/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): MyAccountSignInContainerMapStateProps => ({
    isEmailAvailable: state.CheckoutReducer.isEmailAvailable,
    isLocked: state.MyAccountReducer.isLocked,
    totals: state.CartReducer.cartTotals
});

/** @namespace Component/MyAccountSignIn/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): MyAccountSignInContainerMapDispatchProps => ({
    signIn: (options) => MyAccountDispatcher.then(
        ({ default: dispatcher }) => dispatcher.signIn(options, dispatch)
    ),
    showNotification: (type, message) => dispatch(showNotification(type, message))
});

/** @namespace Component/MyAccountSignIn/Container */
export class MyAccountSignInContainer extends PureComponent<
MyAccountSignInContainerProps,
MyAccountSignInContainerState
> {
    static defaultProps = {
        emailValue: '',
        isEmailAvailable: true,
        setSignInState: noopFn,
        handleEmailInput: noopFn,
        isLoading: false
    };

    state = {
        isSignIn: false
    };

    containerFunctions = {
        onSignInSuccess: this.onSignInSuccess.bind(this)
    };

    componentDidUpdate(prevProps: MyAccountSignInContainerProps): void {
        const { isCheckout, isEmailAvailable, setSignInState } = this.props;
        const { isEmailAvailable: prevIsEmailAvailable } = prevProps;

        if (isCheckout && isEmailAvailable && !prevIsEmailAvailable) {
            setSignInState('');
        }
    }

    containerProps() {
        const {
            state,
            onFormError,
            handleForgotPassword,
            handleCreateAccount,
            isCheckout,
            setLoadingState,
            emailValue,
            handleEmailInput,
            isLoading
        } = this.props;

        return {
            state,
            onFormError,
            handleForgotPassword,
            handleCreateAccount,
            isCheckout,
            setLoadingState,
            emailValue,
            handleEmailInput,
            isLoading
        };
    }

    async onSignInSuccess(form, fields) {
        const {
            signIn,
            showNotification,
            onSignIn,
            setLoadingState,
            totals: { is_virtual },
            isCheckout
        } = this.props;

        const {
            isSignIn
        } = this.state;

        setLoadingState(true);
        const fieldPairs = transformToNameValuePair(fields);

        if (!isSignIn) {
            this.setState({ isSignIn: true });

            try {
                await signIn(fieldPairs);
                onSignIn();
            } catch (error) {
                showNotification(NotificationType.ERROR, getErrorMessage(error));
                this.setState({ isSignIn: false });
            } finally {
                setLoadingState(false);
            }
        }

        setLoadingState(false);

        if (is_virtual && isCheckout) {
            history.push({ pathname: appendWithStoreCode(CheckoutStepUrl.BILLING_URL) });
        } else if (!is_virtual && isCheckout) {
            history.push({ pathname: appendWithStoreCode(CheckoutStepUrl.SHIPPING_URL) });
        }
    }

    render(): ReactElement {
        return (
            <MyAccountSignIn
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountSignInContainer);
