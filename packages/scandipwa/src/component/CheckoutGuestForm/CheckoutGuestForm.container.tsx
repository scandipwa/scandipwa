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

import {
    ChangeEvent, createRef, MouseEvent, PureComponent
} from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { EventFieldData } from 'Component/Field/Field.type';
import {
    MyAccountPageState
} from 'Component/MyAccountOverlay/MyAccountOverlay.config';
import { CheckoutSteps, UPDATE_EMAIL_CHECK_FREQUENCY } from 'Route/Checkout/Checkout.config';
import { updateEmail, updateEmailAvailable } from 'Store/Checkout/Checkout.action';
import { showNotification } from 'Store/Notification/Notification.action';
import { NotificationType } from 'Store/Notification/Notification.type';
import { ReactElement } from 'Type/Common.type';
import { isSignedIn } from 'Util/Auth';
import { noopFn } from 'Util/Common';
import scrollToError from 'Util/Form/Form';
import { debounce, getErrorMessage } from 'Util/Request';
import { RootState } from 'Util/Store/Store.type';

import CheckoutGuestForm from './CheckoutGuestForm.component';
import {
    CheckoutGuestFormComponentProps,
    CheckoutGuestFormContainerFunctions,
    CheckoutGuestFormContainerMapDispatchProps,
    CheckoutGuestFormContainerMapStateProps,
    CheckoutGuestFormContainerProps,
    CheckoutGuestFormContainerPropsKeys,
    CheckoutGuestFormContainerState
} from './CheckoutGuestForm.type';

export const MyAccountDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/MyAccount/MyAccount.dispatcher'
);
export const CheckoutDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Checkout/Checkout.dispatcher'
);

/** @namespace Component/CheckoutGuestForm/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): CheckoutGuestFormContainerMapStateProps => ({
    isEmailConfirmationRequired: state.ConfigReducer.is_email_confirmation_required,
    emailValue: state.CheckoutReducer.email,
    isEmailAvailable: state.CheckoutReducer.isEmailAvailable,
    minimunPasswordLength: state.ConfigReducer.minimun_password_length,
    minimunPasswordCharacter: state.ConfigReducer.required_character_classes_number
});

/** @namespace Component/CheckoutGuestForm/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): CheckoutGuestFormContainerMapDispatchProps => ({
    signIn: (options) => MyAccountDispatcher.then(
        ({ default: dispatcher }) => dispatcher.signIn(options, dispatch)
    ),
    showNotification: (type, message) => dispatch(showNotification(type, message)),
    showErrorNotification: (error) => dispatch(showNotification(NotificationType.ERROR, getErrorMessage(error))),
    clearEmailStatus: () => dispatch(updateEmailAvailable(true)),
    checkEmailAvailability: (email) => CheckoutDispatcher.then(
        ({ default: dispatcher }) => dispatcher.handleData(dispatch, email)
    ),
    updateEmail: (email) => dispatch(updateEmail(email))
});

/** @namespace Component/CheckoutGuestForm/Container */
export class CheckoutGuestFormContainer extends PureComponent<
CheckoutGuestFormContainerProps,
CheckoutGuestFormContainerState
> {
    static defaultProps: Partial<CheckoutGuestFormContainerProps> = {
        emailValue: '',
        isGuestEmailSaved: false,
        onSignIn: noopFn
    };

    state: CheckoutGuestFormContainerState = {
        isLoading: false,
        signInState: ''
    };

    containerFunctions: CheckoutGuestFormContainerFunctions = {
        handleEmailInput: this.handleEmailInput.bind(this),
        handleCreateUser: this.handleCreateUser.bind(this),
        handlePasswordInput: this.handlePasswordInput.bind(this),
        handleForgotPassword: this.handleForgotPassword.bind(this),
        handleSignIn: this.handleSignIn.bind(this),
        handleCreateAccount: this.handleCreateAccount.bind(this),
        onFormError: this.onFormError.bind(this),
        setSignInState: this.setSignInState.bind(this),
        setLoadingState: this.setLoadingState.bind(this)
    };

    formRef = createRef();

    checkEmailAvailability = debounce((email: string) => {
        const { checkEmailAvailability } = this.props;

        checkEmailAvailability(email);
    }, UPDATE_EMAIL_CHECK_FREQUENCY);

    __construct(props: CheckoutGuestFormContainerProps): void {
        super.__construct?.(props);

        const { clearEmailStatus } = props;

        clearEmailStatus();
    }

    // componentDidMount(): void {
    //     setTimeout(
    //         () => {
    //             const field = document.getElementById(GUEST_EMAIL_FIELD_ID);

    //             if (field) {
    //                 this.handleEmailInput(field.value);
    //             }
    //         },
    //         AUTOFILL_CHECK_TIMER
    //     );
    // }

    componentDidUpdate(prevProps: CheckoutGuestFormContainerProps): void {
        const { isVisibleEmailRequired } = this.props;
        const { isVisibleEmailRequired: prevIsVisibleEmailRequired } = prevProps;

        if (isVisibleEmailRequired && isVisibleEmailRequired !== prevIsVisibleEmailRequired) {
            this.formRef.current.requestSubmit();
        }
    }

    containerProps(): Pick<CheckoutGuestFormComponentProps, CheckoutGuestFormContainerPropsKeys> {
        const {
            emailValue,
            isEmailAvailable,
            onSignIn,
            minimunPasswordLength,
            minimunPasswordCharacter
        } = this.props;
        const { isLoading, signInState } = this.state;

        const range = { min: minimunPasswordLength, max: 64 };

        return ({
            formId: CheckoutSteps.SHIPPING_STEP,
            emailValue,
            isEmailAvailable,
            isLoading,
            signInState,
            onSignIn,
            range,
            minimunPasswordCharacter,
            formRef: this.formRef
        });
    }

    onFormError(_, fields, validation) {
        this.setState({ isLoading: false });
        scrollToError(fields, validation);
    }

    handleForgotPassword(e: MouseEvent): void {
        e.preventDefault();
        e.nativeEvent.stopImmediatePropagation();
        this.setState({ signInState: MyAccountPageState.STATE_FORGOT_PASSWORD });
    }

    handleSignIn(e: MouseEvent): void {
        e.preventDefault();
        e.nativeEvent.stopImmediatePropagation();
        this.setState({ signInState: MyAccountPageState.STATE_SIGN_IN });
    }

    handleCreateAccount(e: MouseEvent): void {
        e.preventDefault();
        e.nativeEvent.stopImmediatePropagation();
        this.setState({ signInState: MyAccountPageState.STATE_CREATE_ACCOUNT });
    }

    setSignInState(signInState: MyAccountPageState | ''): void {
        this.setState({ signInState });
    }

    setLoadingState(isLoading: boolean): void {
        this.setState({ isLoading });
    }

    handleEmailInput(event: ChangeEvent<HTMLInputElement>, field?: EventFieldData): void {
        const { onEmailChange } = this.props;
        const { value: email = '' } = field || {};

        this.checkEmailAvailability(email);
        onEmailChange(email);

        const { updateEmail, isEmailAvailable } = this.props;

        if (isEmailAvailable) {
            updateEmail(email);
        }
    }

    handleCreateUser(): void {
        const { onCreateUserChange } = this.props;

        onCreateUserChange();
    }

    handlePasswordInput(password: string): void {
        const { onPasswordChange } = this.props;

        onPasswordChange(password);
    }

    render(): ReactElement {
        const { isGuestEmailSaved } = this.props;

        if (isSignedIn() || isGuestEmailSaved) {
            return null;
        }

        return (
            <CheckoutGuestForm
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutGuestFormContainer);
