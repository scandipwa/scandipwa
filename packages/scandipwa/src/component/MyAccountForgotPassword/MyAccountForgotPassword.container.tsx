/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { MyAccountPageState } from 'Component/MyAccountOverlay/MyAccountOverlay.config';
import { updateCustomerPasswordForgotEmail } from 'Store/MyAccount/MyAccount.action';
import { showNotification } from 'Store/Notification/Notification.action';
import { NotificationType } from 'Store/Notification/Notification.type';
import { ReactElement } from 'Type/Common.type';

import MyAccountForgotPassword from './MyAccountForgotPassword.component';
import {
    MyAccountForgotPasswordComponentProps,
    MyAccountForgotPasswordContainerFunctions,
    MyAccountForgotPasswordContainerMapDispatchProps,
    MyAccountForgotPasswordContainerMapStateProps,
    MyAccountForgotPasswordContainerProps,
    MyAccountForgotPasswordContainerPropsKeys
} from './MyAccountForgotPassword.type';

export const MyAccountDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/MyAccount/MyAccount.dispatcher'
);

/** @namespace Component/MyAccountForgotPassword/Container/mapStateToProps */
export const mapStateToProps = (): MyAccountForgotPasswordContainerMapStateProps => ({});

/** @namespace Component/MyAccountForgotPassword/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): MyAccountForgotPasswordContainerMapDispatchProps => ({
    forgotPassword: (options) => MyAccountDispatcher.then(
        ({ default: dispatcher }) => dispatcher.forgotPassword(options, dispatch)
    ),
    forgotPasswordEmail: (email) => dispatch(updateCustomerPasswordForgotEmail(email)),
    showNotification: (type, message) => dispatch(showNotification(type, message))

});

/** @namespace Component/MyAccountForgotPassword/Container */
export class MyAccountForgotPasswordContainer extends PureComponent<MyAccountForgotPasswordContainerProps> {
    containerFunctions: MyAccountForgotPasswordContainerFunctions = {
        onForgotPasswordSuccess: this.onForgotPasswordSuccess.bind(this)
    };

    containerProps(): Pick<
    MyAccountForgotPasswordComponentProps,
    MyAccountForgotPasswordContainerPropsKeys
    > {
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

    async onForgotPasswordSuccess(form: HTMLFormElement): Promise<void> {
        const {
            forgotPassword, setSignInState, setLoadingState, forgotPasswordEmail, isOverlayVisible
        } = this.props;
        const submittedEmail = (form[0] as HTMLInputElement).value as string;

        setLoadingState(true);

        try {
            await forgotPassword({ email: submittedEmail });
            setSignInState(MyAccountPageState.STATE_FORGOT_PASSWORD_SUCCESS);
            forgotPasswordEmail(submittedEmail);

            // if on route /forgotpassword
            if (!isOverlayVisible) {
                this.showSuccessNotification(submittedEmail);
            }
            setLoadingState(false);
        } catch {
            setLoadingState(false);
        }
    }

    showSuccessNotification(submittedEmail: string): void {
        const { showNotification } = this.props;
        // eslint-disable-next-line max-len
        const message = __('If there is an account associated with %s you will receive an email with a link to reset your password', submittedEmail).toString();

        showNotification(NotificationType.SUCCESS, message);
    }

    render(): ReactElement {
        return (
            <MyAccountForgotPassword
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountForgotPasswordContainer);
