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

import { BILLING_URL } from 'Route/Checkout/Checkout.config';
import { showNotification } from 'Store/Notification/Notification.action';
import { TotalsType } from 'Type/MiniCart.type';
import { noopFn } from 'Util/Common';
import transformToNameValuePair from 'Util/Form/Transform';
import history from 'Util/History';
import { getErrorMessage } from 'Util/Request';
import { appendWithStoreCode } from 'Util/Url';

import { SHIPPING_URL } from '../../route/Checkout/Checkout.config';
import MyAccountSignIn from './MyAccountSignIn.component';

export const MyAccountDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/MyAccount/MyAccount.dispatcher'
);

/** @namespace Component/MyAccountSignIn/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    isEmailAvailable: state.CheckoutReducer.isEmailAvailable,
    isLocked: state.MyAccountReducer.isLocked,
    totals: state.CartReducer.cartTotals
    isEmailAvailable: state.CheckoutReducer.isEmailAvailable
});

/** @namespace Component/MyAccountSignIn/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    signIn: (options) => MyAccountDispatcher.then(
        ({ default: dispatcher }) => dispatcher.signIn(options, dispatch)
    ),
    showNotification: (type, message) => dispatch(showNotification(type, message))
});

/** @namespace Component/MyAccountSignIn/Container */
export class MyAccountSignInContainer extends PureComponent {
    static propTypes = {
        state: PropTypes.string.isRequired,
        onFormError: PropTypes.func.isRequired,
        handleForgotPassword: PropTypes.func.isRequired,
        handleCreateAccount: PropTypes.func.isRequired,
        isCheckout: PropTypes.bool.isRequired,
        signIn: PropTypes.func.isRequired,
        showNotification: PropTypes.func.isRequired,
        onSignIn: PropTypes.func.isRequired,
        setLoadingState: PropTypes.func.isRequired,
        emailValue: PropTypes.string,
        isEmailAvailable: PropTypes.bool,
        setSignInState: PropTypes.func,
        handleEmailInput: PropTypes.func,
        isLocked: PropTypes.string.isRequired,
        updateCustomerLockedStatus: PropTypes.func.isRequired,
        totals: TotalsType.isRequired
        isLoading: PropTypes.bool
    };

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

    componentDidUpdate(prevProps) {
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
                showNotification('error', getErrorMessage(error));
                this.setState({ isSignIn: false });
            } finally {
                setLoadingState(false);
            }
        }

        setLoadingState(false);

        if (is_virtual && isCheckout) {
            history.push({ pathname: appendWithStoreCode(BILLING_URL) });
        } else if (!is_virtual && isCheckout) {
            history.push({ pathname: appendWithStoreCode(SHIPPING_URL) });
        }
    }

    render() {
        return (
            <MyAccountSignIn
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountSignInContainer);
