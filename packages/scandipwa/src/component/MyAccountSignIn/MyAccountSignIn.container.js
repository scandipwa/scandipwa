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

import { showNotification } from 'Store/Notification/Notification.action';
import { getErrorMessage } from 'Util/Request';

import MyAccountSignIn from './MyAccountSignIn.component';

export const MyAccountDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/MyAccount/MyAccount.dispatcher'
);

/** @namespace Component/MyAccountSignIn/Container/mapStateToProps */
// eslint-disable-next-line no-unused-vars
export const mapStateToProps = (state) => ({
    isEmailAvailable: state.CheckoutReducer.isEmailAvailable
});

/** @namespace Component/MyAccountSignIn/Container/mapDispatchtoProps */
// eslint-disable-next-line no-unused-vars
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
        handleEmailInput: PropTypes.func
    };

    static defaultProps = {
        emailValue: '',
        isEmailAvailable: true,
        setSignInState: () => {},
        handleEmailInput: () => {}
    };

    containerFunctions = {
        onSignInSuccess: this.onSignInSuccess.bind(this),
        onSignInAttempt: this.onSignInAttempt.bind(this)
    };

    componentDidUpdate(prevProps) {
        const { isCheckout, isEmailAvailable, setSignInState } = this.props;
        const { isEmailAvailable: prevIsEmailAvailable } = prevProps;

        if (isCheckout && isEmailAvailable && !prevIsEmailAvailable) {
            setSignInState('');
        }
    }

    containerProps = () => {
        const {
            state,
            onFormError,
            handleForgotPassword,
            handleCreateAccount,
            isCheckout,
            setLoadingState,
            emailValue,
            handleEmailInput
        } = this.props;

        return {
            state,
            onFormError,
            handleForgotPassword,
            handleCreateAccount,
            isCheckout,
            setLoadingState,
            emailValue,
            handleEmailInput
        };
    };

    async onSignInSuccess(fields) {
        const {
            signIn,
            showNotification,
            onSignIn,
            setLoadingState
        } = this.props;

        try {
            await signIn(fields);
            onSignIn();
        } catch (error) {
            showNotification('error', getErrorMessage(error));
        }

        setLoadingState(false);
    }

    onSignInAttempt() {
        const { setLoadingState } = this.props;
        setLoadingState(true);
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
