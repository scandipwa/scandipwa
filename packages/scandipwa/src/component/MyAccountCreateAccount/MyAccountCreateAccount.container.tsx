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

import { ORDER_ID } from 'Component/MyAccountOrder/MyAccountOrder.config';
import { MyAccountPageState } from 'Component/MyAccountOverlay/MyAccountOverlay.config';
import { CreateAccountOptions } from 'Query/MyAccount.type';
import { showNotification } from 'Store/Notification/Notification.action';
import { NotificationType } from 'Store/Notification/Notification.type';
import { ReactElement } from 'Type/Common.type';
import { noopFn } from 'Util/Common';
import { FieldData } from 'Util/Form/Form.type';
import transformToNameValuePair from 'Util/Form/Transform';
import history from 'Util/History';
import { RootState } from 'Util/Store/Store.type';

import MyAccountCreateAccount from './MyAccountCreateAccount.component';
import { CONFIRMATION_REQUIRED, SHOW_VAT_NUMBER_REQUIRED } from './MyAccountCreateAccount.config';
import {
    MyAccountCreateAccountComponentProps,
    MyAccountCreateAccountContainerFunctions,
    MyAccountCreateAccountContainerMapDispatchProps,
    MyAccountCreateAccountContainerMapStateProps,
    MyAccountCreateAccountContainerProps,
    MyAccountCreateAccountContainerPropsKeys
} from './MyAccountCreateAccount.type';

export const MyAccountDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/MyAccount/MyAccount.dispatcher'
);

/** @namespace Component/MyAccountCreateAccount/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): MyAccountCreateAccountContainerMapStateProps => ({
    isLoading: state.MyAccountReducer.isLoading,
    showTaxVatNumber: state.ConfigReducer.show_tax_vat_number,
    newsletterActive: state.ConfigReducer.newsletter_general_active,
    isMobile: state.ConfigReducer.device.isMobile,
    minimunPasswordLength: state.ConfigReducer.minimun_password_length,
    minimunPasswordCharacter: state.ConfigReducer.required_character_classes_number
});

/** @namespace Component/MyAccountCreateAccount/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): MyAccountCreateAccountContainerMapDispatchProps => ({
    createAccount: (options) => MyAccountDispatcher.then(
        ({ default: dispatcher }) => dispatcher.createAccount(options, dispatch)
    ),
    showNotification: (type, message) => dispatch(showNotification(type, message))
});

/** @namespace Component/MyAccountCreateAccount/Container */
export class MyAccountCreateAccountContainer extends PureComponent<MyAccountCreateAccountContainerProps> {
    static defaultProps: Partial<MyAccountCreateAccountContainerProps> = {
        isLandingPage: false,
        onSignIn: noopFn
    };

    containerFunctions: MyAccountCreateAccountContainerFunctions = {
        onSuccess: this.onSuccess.bind(this),
        onError: this.onError.bind(this)
    };

    containerProps(): Pick<MyAccountCreateAccountComponentProps, MyAccountCreateAccountContainerPropsKeys> {
        const {
            state,
            handleSignIn,
            showTaxVatNumber,
            newsletterActive,
            minimunPasswordLength,
            minimunPasswordCharacter
        } = this.props;

        const range = { min: minimunPasswordLength, max: 64 };

        return {
            state,
            handleSignIn,
            showTaxVatNumber: !!showTaxVatNumber,
            newsletterActive,
            vatNumberRequired: this.getVatNumberRequired(),
            range,
            minimunPasswordCharacter
        };
    }

    getVatNumberRequired(): boolean {
        const { showTaxVatNumber } = this.props;

        return showTaxVatNumber === SHOW_VAT_NUMBER_REQUIRED;
    }

    onError(): void {
        const { showNotification } = this.props;

        showNotification(NotificationType.INFO, __('Incorrect data! Please resolve all field validation errors.'));
    }

    async onSuccess(form: HTMLFormElement, fields: FieldData[]): Promise<void> {
        const {
            createAccount,
            onSignIn,
            setSignInState,
            setLoadingState,
            isLoading,
            isLandingPage,
            showNotification,
            isMobile
        } = this.props;

        const {
            password,
            email,
            firstname,
            lastname,
            is_subscribed,
            taxvat
        } = transformToNameValuePair(fields);

        const customerData = {
            customer: {
                firstname,
                lastname,
                email,
                taxvat
            },
            password,
            orderID: sessionStorage.getItem(ORDER_ID)
        } as CreateAccountOptions;

        if (is_subscribed) {
            customerData.customer.is_subscribed = is_subscribed;
        }

        if (isLoading) {
            return;
        }

        try {
            const code = await createAccount(customerData).catch(
                /** @namespace Component/MyAccountCreateAccount/Container/MyAccountCreateAccountContainer/onSuccess/code/createAccount/catch */
                () => process.exit(1)
            );

            // if user needs confirmation
            if (code === CONFIRMATION_REQUIRED) {
                setSignInState(MyAccountPageState.STATE_CONFIRM_EMAIL);

                if (isLandingPage || isMobile) {
                    showNotification(
                        NotificationType.SUCCESS,
                        // eslint-disable-next-line max-len
                        __('The email confirmation link has been sent to your email. Please confirm your account to proceed.')
                    );
                    history.push('/default/customer/account/login');
                }
            } else if (code !== false) {
                onSignIn();
            }
        } finally {
            setLoadingState(false);
        }
    }

    render(): ReactElement {
        return (
            <MyAccountCreateAccount
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountCreateAccountContainer);
