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
import { signInStateType } from 'Type/Account';

import MyAccountCreateAccount from './MyAccountCreateAccount.component';
import { SHOW_VAT_NUMBER_REQUIRED } from './MyAccountCreateAccount.config';

export const MyAccountDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/MyAccount/MyAccount.dispatcher'
);

/** @namespace Component/MyAccountCreateAccount/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    isLoading: state.MyAccountReducer.isLoading,
    showTaxVatNumber: !!state.ConfigReducer.show_tax_vat_number,
    newsletterActive: state.ConfigReducer.newsletter_general_active,
    isMobile: state.ConfigReducer.device.isMobile
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
        onSignIn: PropTypes.func.isRequired,
        setSignInState: PropTypes.func.isRequired,
        setLoadingState: PropTypes.func.isRequired,
        showNotification: PropTypes.func.isRequired,
        isLoading: PropTypes.bool.isRequired,
        showTaxVatNumber: PropTypes.bool.isRequired,
        isLandingPage: PropTypes.bool,
        isMobile: PropTypes.bool.isRequired,
        handleSignIn: PropTypes.func.isRequired,
        state: signInStateType.isRequired,
        newsletterActive: PropTypes.bool.isRequired
    };

    static defaultProps = {
        isLandingPage: false
    };

    containerFunctions = {
        onCreateAccountSuccess: this.onCreateAccountSuccess.bind(this),
        onCreateAccountAttempt: this.onCreateAccountAttempt.bind(this),
        onSubscriptionChange: this.onSubscriptionChange.bind(this)
    };

    state = {
        isSubscriptionSelected: false,
        isSubmitted: false
    };

    containerProps() {
        const {
            state,
            handleSignIn,
            showTaxVatNumber,
            newsletterActive
        } = this.props;

        const { isSubscriptionSelected, isSubmitted } = this.state;

        return {
            state,
            handleSignIn,
            showTaxVatNumber,
            newsletterActive,
            vatNumberValidation: this.getVatNumberValidation(),
            isSubscriptionSelected,
            isSubmitted
        };
    }

    onSubscriptionChange() {
        this.setState((state) => ({ isSubscriptionSelected: !state.isSubscriptionSelected }));
    }

    getVatNumberValidation() {
        const { showTaxVatNumber } = this.props;

        if (showTaxVatNumber === SHOW_VAT_NUMBER_REQUIRED) {
            return ['notEmpty'];
        }

        return [];
    }

    onCreateAccountAttempt(_, invalidFields) {
        const { showNotification, setLoadingState } = this.props;

        if (invalidFields) {
            showNotification('info', __('Incorrect data! Please resolve all field validation errors.'));
        }

        setLoadingState(!invalidFields);
        this.setState({ isSubmitted: true });
    }

    async onCreateAccountSuccess(fields) {
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
        } = fields;

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
            const code = await createAccount(customerData);

            // if user needs confirmation
            if (code === 2) {
                setSignInState(STATE_CONFIRM_EMAIL);

                if (isLandingPage || isMobile) {
                    showNotification(
                        'success',
                        // eslint-disable-next-line max-len
                        __('The email confirmation link has been sent to your email. Please confirm your account to proceed.')
                    );
                }
            } else {
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
