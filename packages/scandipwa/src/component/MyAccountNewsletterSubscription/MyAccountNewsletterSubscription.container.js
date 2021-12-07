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
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import Loader from 'Component/Loader';
import MyAccountQuery from 'Query/MyAccount.query';
import { updateCustomerDetails } from 'Store/MyAccount/MyAccount.action';
import { CUSTOMER } from 'Store/MyAccount/MyAccount.dispatcher';
import { showNotification } from 'Store/Notification/Notification.action';
import { CustomerType } from 'Type/Account.type';
import { isSignedIn } from 'Util/Auth';
import BrowserDatabase from 'Util/BrowserDatabase/BrowserDatabase';
import { fetchMutation, getErrorMessage } from 'Util/Request';
import { ONE_MONTH_IN_SECONDS } from 'Util/Request/QueryDispatcher';

import MyAccountNewsletterSubscription from './MyAccountNewsletterSubscription.component';

/** @namespace Component/MyAccountNewsletterSubscription/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    customer: state.MyAccountReducer.customer,
    newsletterConfirmStatus: state.ConfigReducer.newsletter_subscription_confirm
});

/** @namespace Component/MyAccountNewsletterSubscription/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    updateCustomer: (customer) => dispatch(updateCustomerDetails(customer)),
    showErrorNotification: (error) => dispatch(showNotification('error', getErrorMessage(error))),
    showSuccessNotification: (message) => dispatch(showNotification('success', message))
});

/** @namespace Component/MyAccountNewsletterSubscription/Container */
export class MyAccountNewsletterSubscriptionContainer extends PureComponent {
    static propTypes = {
        customer: CustomerType.isRequired,
        updateCustomer: PropTypes.func.isRequired,
        showErrorNotification: PropTypes.func.isRequired,
        showSuccessNotification: PropTypes.func.isRequired,
        newsletterConfirmStatus: PropTypes.bool.isRequired
    };

    containerFunctions = {
        onError: this.onError,
        setSubscriptionStatus: this.setSubscriptionStatus.bind(this),
        onCustomerSave: this.onCustomerSave.bind(this)
    };

    __construct(props) {
        const { customer: { is_subscribed } = {} } = props;

        super.__construct(props);
        this.state = {
            isLoading: false,
            isSubscriptionSelected: is_subscribed
        };
    }

    containerProps() {
        const { customer } = this.props;
        const { isSubscriptionSelected } = this.state;

        return { customer, isSubscriptionSelected };
    }

    setSubscriptionStatus() {
        this.setState((state) => ({ isSubscriptionSelected: !state.isSubscriptionSelected }));
    }

    showSubscriptionUpdateNotification(isSubscribed, wasSubscribed) {
        const {
            showSuccessNotification,
            newsletterConfirmStatus
        } = this.props;

        if (!isSubscribed && wasSubscribed) {
            showSuccessNotification(__('We have removed your newsletter subscription.'));
        } else if (isSubscribed && !newsletterConfirmStatus && !wasSubscribed) {
            showSuccessNotification(__('We have saved your subscription'));
        } else if (!isSubscribed && newsletterConfirmStatus) {
            showSuccessNotification(__('A subscription confirmation email has been sent!'));
        } else {
            showSuccessNotification(__('We have updated your subscription.'));
        }
    }

    onError() {
        const { showErrorNotification } = this.props;

        this.setState({ isLoading: false }, () => {
            showErrorNotification(__('We are experiencing issues, please try again later'));
        });
    }

    async onCustomerSave(form, fields) {
        const {
            updateCustomer,
            customer: {
                is_subscribed: wasSubscribed
            }
        } = this.props;

        const {
            isSubscribed: {
                value = false
            }
        } = fields;

        const customer = { is_subscribed: value };
        const mutation = MyAccountQuery.getUpdateInformationMutation(customer);

        if (!isSignedIn()) {
            return;
        }

        this.setState({ isLoading: true });

        try {
            const { updateCustomerV2: { customer } } = await fetchMutation(mutation);
            BrowserDatabase.setItem(customer, CUSTOMER, ONE_MONTH_IN_SECONDS);
            const { is_subscribed } = customer;

            this.setState({ isLoading: false }, () => {
                updateCustomer(customer);
                this.showSubscriptionUpdateNotification(is_subscribed, wasSubscribed);
            });
        } catch (e) {
            this.onError(e);
        }
    }

    render() {
        const { isLoading } = this.state;

        return (
            <>
                <Loader isLoading={ isLoading } />
                <MyAccountNewsletterSubscription
                  { ...this.containerProps() }
                  { ...this.containerFunctions }
                />
            </>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountNewsletterSubscriptionContainer);
