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
import { customerType } from 'Type/Account';
import BrowserDatabase from 'Util/BrowserDatabase/BrowserDatabase';
import { fetchMutation } from 'Util/Request';
import { ONE_MONTH_IN_SECONDS } from 'Util/Request/QueryDispatcher';

import MyAccountNewsletterSubscription from './MyAccountNewsletterSubscription.component';

export const mapStateToProps = (state) => ({
    customer: state.MyAccountReducer.customer
});

export const mapDispatchToProps = (dispatch) => ({
    updateCustomer: (customer) => dispatch(updateCustomerDetails(customer)),
    showErrorNotification: (error) => dispatch(showNotification('error', error[0].message)),
    showSuccessNotification: (message) => dispatch(showNotification('success', message))
});

export class MyAccountNewsletterSubscriptionContainer extends PureComponent {
    static propTypes = {
        customer: customerType.isRequired,
        updateCustomer: PropTypes.func.isRequired,
        showErrorNotification: PropTypes.func.isRequired,
        showSuccessNotification: PropTypes.func.isRequired
    };

    containerFunctions = {
        onCustomerSave: this.onCustomerSave.bind(this)
    };

    state = {
        isLoading: false
    };

    onError = () => {
        const { showErrorNotification } = this.props;

        this.setState({ isLoading: false }, () => {
            showErrorNotification(__('We are experiencing issues, please try again later'));
        });
    };

    onCustomerSave(customer) {
        const { updateCustomer, showSuccessNotification } = this.props;
        const mutation = MyAccountQuery.getUpdateInformationMutation(customer);

        this.setState({ isLoading: true });

        return fetchMutation(mutation).then(
            ({ updateCustomer: { customer } }) => {
                BrowserDatabase.setItem(customer, CUSTOMER, ONE_MONTH_IN_SECONDS);

                this.setState({ isLoading: false }, () => {
                    updateCustomer(customer);
                    showSuccessNotification(__('Subscription settings successfully updated'));
                });
            },
            this.onError
        );
    }

    render() {
        const { isLoading } = this.state;

        return (
            <>
                <Loader isLoading={ isLoading } />
                <MyAccountNewsletterSubscription
                  { ...this.props }
                  { ...this.containerFunctions }
                />
            </>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountNewsletterSubscriptionContainer);
