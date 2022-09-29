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

import { FieldContainerProps } from 'Component/Field/Field.type';
import FieldForm from 'Component/FieldForm';
import { FormContainerProps } from 'Component/Form/Form.type';
import MyAccountConfirmEmail from 'Component/MyAccountConfirmEmail';
import MyAccountForgotPassword from 'Component/MyAccountForgotPassword';
import MyAccountForgotPasswordSuccess from 'Component/MyAccountForgotPasswordSuccess';
import {
    MyAccountPageState,
} from 'Component/MyAccountOverlay/MyAccountOverlay.config';
import MyAccountSignIn from 'Component/MyAccountSignIn';
import { ReactElement } from 'Type/Common.type';

import checkoutGuestForm from './CheckoutGuestForm.form';
import { CheckoutGuestFormComponentProps, CheckoutGuestFormRenderMapItem } from './CheckoutGuestForm.type';

import './CheckoutGuestForm.style';

/** @namespace Component/CheckoutGuestForm/Component */
export class CheckoutGuestForm extends FieldForm<CheckoutGuestFormComponentProps> {
    componentDidUpdate(prevProps: CheckoutGuestFormComponentProps): void {
        const { isEmailAvailable, setSignInState, signInState } = this.props;
        const { isEmailAvailable: prevIsEmailAvailable } = prevProps;

        if (!isEmailAvailable && prevIsEmailAvailable && signInState !== MyAccountPageState.STATE_SIGN_IN) {
            setSignInState(MyAccountPageState.STATE_SIGN_IN);
        }
    }

    renderMap: Record<MyAccountPageState | '', CheckoutGuestFormRenderMapItem> = {
        [MyAccountPageState.STATE_SIGN_IN]: {
            render: (): ReactElement => this.renderSignIn(),
            title: __('Sign in to your account'),
        },
        [MyAccountPageState.STATE_FORGOT_PASSWORD]: {
            render: (): ReactElement => this.renderForgotPassword(),
            title: __('Get password link'),
        },
        [MyAccountPageState.STATE_FORGOT_PASSWORD_SUCCESS]: {
            render: (): ReactElement => this.renderForgotPasswordSuccess(),
        },
        [MyAccountPageState.STATE_LOGGED_IN]: {
            render: () => null,
        },
        [MyAccountPageState.STATE_CONFIRM_EMAIL]: {
            render: (): ReactElement => this.renderConfirmEmail(),
            title: __('Confirm the email'),
        },
        [MyAccountPageState.STATE_CREATE_ACCOUNT]: {
            render: () => null,
        },
        '': {
            title: __('Enter personal information'),
        },
    };

    fieldMap(): Partial<FieldContainerProps>[] {
        const {
            handleEmailInput,
            handlePasswordInput,
            isCreateUser,
            emailValue,
            range,
            minimumPasswordCharacter,
        } = this.props;

        return checkoutGuestForm({
            isCreateUser,
            emailValue,
            range,
            minimumPasswordCharacter,
        }, {
            handleEmailInput,
            handlePasswordInput,
            range,
            minimumPasswordCharacter,
        });
    }

    getFormProps(): Partial<FormContainerProps> {
        const { formRef, onFormError } = this.props;

        return {
            elemRef: formRef,
            onError: onFormError,
        };
    }

    renderHeading(): ReactElement {
        return (
            <h2 block="Checkout" elem="Heading">
                { __('Enter personal information') }
            </h2>
        );
    }

    renderSignIn(): ReactElement {
        const {
            signInState,
            onFormError,
            handleForgotPassword,
            handleCreateAccount,
            setLoadingState,
            onSignIn,
            emailValue,
            handleEmailInput,
            setSignInState,
            isLoading,
        } = this.props;

        return (
            <MyAccountSignIn
              state={ signInState }
              onFormError={ onFormError }
              handleForgotPassword={ handleForgotPassword }
              handleCreateAccount={ handleCreateAccount }
              isCheckout
              handleEmailInput={ handleEmailInput }
              setSignInState={ setSignInState }
              emailValue={ emailValue }
              setLoadingState={ setLoadingState }
              onSignIn={ onSignIn }
              isLoading={ isLoading }
            />
        );
    }

    renderConfirmEmail(): ReactElement {
        const { signInState, handleSignIn } = this.props;

        return (
            <MyAccountConfirmEmail
              state={ signInState }
              handleSignIn={ handleSignIn }
            />
        );
    }

    renderForgotPassword(): ReactElement {
        const {
            signInState,
            onFormError,
            handleSignIn,
            handleCreateAccount,
            setSignInState,
            setLoadingState,
        } = this.props;

        return (
            <MyAccountForgotPassword
              state={ signInState }
              onFormError={ onFormError }
              handleSignIn={ handleSignIn }
              handleCreateAccount={ handleCreateAccount }
              setLoadingState={ setLoadingState }
              setSignInState={ setSignInState }
              isCheckout
              isOverlayVisible={ false }
            />
        );
    }

    renderForgotPasswordSuccess(): ReactElement {
        const { signInState, handleSignIn } = this.props;

        return (
            <MyAccountForgotPasswordSuccess
              state={ signInState }
              handleSignIn={ handleSignIn }
            />
        );
    }

    renderSignInForm(): ReactElement {
        const {
            signInState,
            onFormError,
            handleForgotPassword,
            handleCreateAccount,
            setLoadingState,
            onSignIn,
        } = this.props;

        return (
            <MyAccountSignIn
              state={ signInState }
              onFormError={ onFormError }
              handleForgotPassword={ handleForgotPassword }
              handleCreateAccount={ handleCreateAccount }
              isCheckout
              setLoadingState={ setLoadingState }
              onSignIn={ onSignIn }
            />
        );
    }

    renderFormBody(): ReactElement {
        return (
            <>
                { super.renderFormBody() }
                <span>{ __('You can create an account after checkout') }</span>
            </>
        );
    }

    renderForm(): ReactElement {
        const { signInState } = this.props;
        const { render } = this.renderMap[signInState] || {};

        return typeof render === 'function' ? render() : super.render();
    }

    render(): ReactElement {
        return (
            <div
              block="CheckoutGuestForm"
              mix={ { block: 'FieldForm' } }
            >
                { this.renderForm() }
            </div>
        );
    }
}

export default CheckoutGuestForm;
