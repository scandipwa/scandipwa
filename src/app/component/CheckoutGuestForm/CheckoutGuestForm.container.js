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

import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { BILLING_STEP, SHIPPING_STEP } from 'Route/Checkout/Checkout.component';
import { showNotification } from 'Store/Notification';

import CheckoutGuestForm from './CheckoutGuestForm.component';

export const mapStateToProps = state => ({
    isSignedIn: state.MyAccountReducer.isSignedIn
});

export const mapDispatchToProps = dispatch => ({
    showErrorNotification: error => dispatch(showNotification('error', error[0].message))
});

export class CheckoutGuestFormContainer extends PureComponent {
    static propTypes = {
        isBilling: PropTypes.bool,
        isCreateUser: PropTypes.bool.isRequired,
        isGuestEmailSaved: PropTypes.bool,
        isSignedIn: PropTypes.bool.isRequired,
        showErrorNotification: PropTypes.func.isRequired,
        onEmailChange: PropTypes.func.isRequired,
        onCreateUserChange: PropTypes.func.isRequired,
        onPasswordChange: PropTypes.func.isRequired
    };

    static defaultProps = {
        isBilling: false,
        isGuestEmailSaved: false
    };

    containerFunctions = {
        handleEmailInput: this.handleEmailInput.bind(this),
        handleCreateUser: this.handleCreateUser.bind(this),
        handlePasswordInput: this.handlePasswordInput.bind(this)
    };

    componentDidMount() {
        const { isSignedIn } = this.props;

        if (window.formPortalCollector && !isSignedIn) {
            window.formPortalCollector.subscribe(
                this._getFormPortalId(),
                this.applyEmailTyped,
                'CheckoutGuestFormContainer'
            );
        }
    }

    componentWillUnmount() {
        this.unsubscribeFromForm();
    }

    containerProps = () => ({
        formId: this._getFormPortalId()
    });

    applyEmailTyped = () => {
        const { isGuestEmailSaved } = this.props;

        if (isGuestEmailSaved) {
            this.unsubscribeFromForm();
        }

        return {};
    };

    unsubscribeFromForm = () => {
        if (window.formPortalCollector) {
            window.formPortalCollector.unsubscribe(
                this._getFormPortalId(),
                'CheckoutGuestFormContainer'
            );
        }
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

    _getFormPortalId() {
        const { isBilling } = this.props;
        return isBilling ? BILLING_STEP : SHIPPING_STEP;
    }

    render() {
        const { isSignedIn, isGuestEmailSaved } = this.props;
        if (isSignedIn || isGuestEmailSaved) return null;

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
