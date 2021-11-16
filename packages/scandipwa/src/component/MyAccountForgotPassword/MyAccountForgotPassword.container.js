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

import { STATE_FORGOT_PASSWORD_SUCCESS } from 'Component/MyAccountOverlay/MyAccountOverlay.config';
import { SignInStateType } from 'Type/Account.type';
import transformToNameValuePair from 'Util/Form/Transform';

import MyAccountForgotPassword from './MyAccountForgotPassword.component';

export const MyAccountDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/MyAccount/MyAccount.dispatcher'
);

/** @namespace Component/MyAccountForgotPassword/Container/mapStateToProps */
export const mapStateToProps = () => ({});

/** @namespace Component/MyAccountForgotPassword/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    forgotPassword: (options) => MyAccountDispatcher.then(
        ({ default: dispatcher }) => dispatcher.forgotPassword(options, dispatch)
    )
});

/** @namespace Component/MyAccountForgotPassword/Container */
export class MyAccountForgotPasswordContainer extends PureComponent {
    static propTypes = {
        state: SignInStateType.isRequired,
        onFormError: PropTypes.func.isRequired,
        handleSignIn: PropTypes.func.isRequired,
        handleCreateAccount: PropTypes.func.isRequired,
        isCheckout: PropTypes.bool.isRequired,
        forgotPassword: PropTypes.func.isRequired,
        setLoadingState: PropTypes.func.isRequired,
        setSignInState: PropTypes.func.isRequired
    };

    containerFunctions = {
        onForgotPasswordSuccess: this.onForgotPasswordSuccess.bind(this)
    };

    containerProps() {
        const {
            state,
            onFormError,
            handleSignIn,
            handleCreateAccount,
            isCheckout
        } = this.props;

        return {
            state,
            onFormError,
            handleSignIn,
            handleCreateAccount,
            isCheckout
        };
    }

    async onForgotPasswordSuccess(form, fields) {
        const { forgotPassword, setSignInState, setLoadingState } = this.props;
        setLoadingState(true);

        try {
            await forgotPassword(transformToNameValuePair(fields));
            setSignInState(STATE_FORGOT_PASSWORD_SUCCESS);
            setLoadingState(false);
        } catch {
            setLoadingState(false);
        }
    }

    render() {
        return (
            <MyAccountForgotPassword
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountForgotPasswordContainer);
