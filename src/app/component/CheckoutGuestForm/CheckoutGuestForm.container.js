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

import { SHIPPING_STEP } from 'Route/Checkout/Checkout.config';
import { showNotification } from 'Store/Notification/Notification.action';

import CheckoutGuestForm from './CheckoutGuestForm.component';

/** @namespace Component/CheckoutGuestForm/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    isSignedIn: state.MyAccountReducer.isSignedIn,
    isEmailConfirmationRequired: state.ConfigReducer.is_email_confirmation_required,
    emailValue: state.CheckoutReducer.email
});

/** @namespace Component/CheckoutGuestForm/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    showErrorNotification: (error) => dispatch(showNotification('error', error[0].message))
});

/** @namespace Component/CheckoutGuestForm/Container */
export class CheckoutGuestFormContainer extends PureComponent {
    static propTypes = {
        isCreateUser: PropTypes.bool.isRequired,
        isSignedIn: PropTypes.bool.isRequired,
        showErrorNotification: PropTypes.func.isRequired,
        onEmailChange: PropTypes.func.isRequired,
        onCreateUserChange: PropTypes.func.isRequired,
        onPasswordChange: PropTypes.func.isRequired,
        emailValue: PropTypes.string
    };

    static defaultProps = {
        emailValue: ''
    };

    containerFunctions = {
        handleEmailInput: this.handleEmailInput.bind(this),
        handleCreateUser: this.handleCreateUser.bind(this),
        handlePasswordInput: this.handlePasswordInput.bind(this)
    };

    containerProps = () => {
        const { emailValue } = this.props;
        return ({
            formId: SHIPPING_STEP,
            emailValue
        });
    };

    handleEmailInput(email) {
        const { onEmailChange } = this.props;
        onEmailChange(email);
    }

    handleCreateUser() {
        const { onCreateUserChange } = this.props;
        onCreateUserChange();
    }

    handlePasswordInput(password) {
        const { onPasswordChange } = this.props;
        onPasswordChange(password);
    }

    render() {
        const { isSignedIn } = this.props;
        if (isSignedIn) {
            return null;
        }

        return (
            <CheckoutGuestForm
              { ...this.props }
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutGuestFormContainer);
