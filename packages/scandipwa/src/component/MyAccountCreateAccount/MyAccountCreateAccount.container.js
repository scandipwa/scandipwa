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

import { STATE_CONFIRM_EMAIL } from 'Component/MyAccountOverlay/MyAccountOverlay.config';
import { showNotification } from 'Store/Notification/Notification.action';
import { SignInStateType } from 'Type/Account.type';
import { noopFn } from 'Util/Common';
import transformToNameValuePair from 'Util/Form/Transform';
import history from 'Util/History';

import MyAccountCreateAccount from './MyAccountCreateAccount.component';
import { CONFIRMATION_REQUIRED, SHOW_VAT_NUMBER_REQUIRED } from './MyAccountCreateAccount.config';

export const MyAccountDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/MyAccount/MyAccount.dispatcher'
);

/** @namespace Component/MyAccountCreateAccount/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    isLoading: state.MyAccountReducer.isLoading,
    showTaxVatNumber: !!state.ConfigReducer.show_tax_vat_number,
    newsletterActive: state.ConfigReducer.newsletter_general_active,
    isMobile: state.ConfigReducer.device.isMobile,
    minimunPasswordLength: state.ConfigReducer.minimun_password_length,
    minimunPasswordCharacter: state.ConfigReducer.required_character_classes_number
});

/** @namespace Component/MyAccountCreateAccount/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    createAccount: (options) => MyAccountDispatcher.then(
        ({ default: dispatcher }) => dispatcher.createAccount(options, dispatch)
    ),
    showNotification: (type, message) => dispatch(showNotification(type, message))
});

/** @namespace Component/MyAccountCreateAccount/Container */
export class MyAccountCreateAccountContainer extends PureComponent {
    static propTypes = {
        createAccount: PropTypes.func.isRequired,
        onSignIn: PropTypes.func,
        setSignInState: PropTypes.func.isRequired,
        setLoadingState: PropTypes.func.isRequired,
        showNotification: PropTypes.func.isRequired,
        isLoading: PropTypes.bool.isRequired,
        showTaxVatNumber: PropTypes.bool.isRequired,
        isLandingPage: PropTypes.bool,
        isMobile: PropTypes.bool.isRequired,
        handleSignIn: PropTypes.func.isRequired,
        state: SignInStateType.isRequired,
        newsletterActive: PropTypes.bool.isRequired,
        minimunPasswordLength: PropTypes.number.isRequired,
        minimunPasswordCharacter: PropTypes.string.isRequired
    };

    static defaultProps = {
        isLandingPage: false,
        onSignIn: noopFn
    };

    containerFunctions = {
        onSuccess: this.onSuccess.bind(this),
        onError: this.onError.bind(this)
    };

    containerProps() {
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
            showTaxVatNumber,
            newsletterActive,
            vatNumberRequired: this.getVatNumberRequired(),
            range,
            minimunPasswordCharacter
        };
    }

    getVatNumberRequired() {
        const { showTaxVatNumber } = this.props;

        return showTaxVatNumber === SHOW_VAT_NUMBER_REQUIRED;
    }

    onError() {
        const { showNotification } = this.props;
        showNotification('info', __('Incorrect data! Please resolve all field validation errors.'));
    }

    async onSuccess(form, fields) {
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
                is_subscribed,
                taxvat
            },
            password
        };

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
                setSignInState(STATE_CONFIRM_EMAIL);

                if (isLandingPage || isMobile) {
                    showNotification(
                        'success',
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

    render() {
        return (
            <MyAccountCreateAccount
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountCreateAccountContainer);
