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
import BrowserDatabase from 'Util/BrowserDatabase';
import CheckoutQuery from 'Query/Checkout.query';
import { GUEST_QUOTE_ID } from 'Store/Cart';
import { fetchMutation } from 'Util/Request';

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
        isSignedIn: PropTypes.bool.isRequired,
        showErrorNotification: PropTypes.func.isRequired
    };

    static defaultProps = {
        isBilling: false
    };

    state = {
        email: '',
        isSubmitted: false
    };

    containerFunctions = {
        handleEmailInput: this.handleEmailInput.bind(this)
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
        this.saveGuestEmail();
        return {};
    };

    _setEmailAsSubmitted = () => {
        this.setState({ isSubmitted: true }, this.unsubscribeFromForm);
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
        this.setState({ email });
    }

    saveGuestEmail() {
        const { email } = this.state;

        if (!email) return Promise.resolve();

        const guestCartId = BrowserDatabase.getItem(GUEST_QUOTE_ID);
        const mutation = CheckoutQuery.getSaveGuestEmailMutation(email, guestCartId);

        return fetchMutation(mutation).then(
            this._setEmailAsSubmitted,
            () => this.setState({ isSubmitted: false })
        );
    }

    _getFormPortalId() {
        const { isBilling } = this.props;
        return isBilling ? BILLING_STEP : SHIPPING_STEP;
    }

    render() {
        const { isSubmitted } = this.state;
        const { isSignedIn } = this.props;

        if (isSignedIn || isSubmitted) return null;

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
