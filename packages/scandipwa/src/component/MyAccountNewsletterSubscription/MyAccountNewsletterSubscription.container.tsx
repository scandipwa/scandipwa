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

import Loader from 'Component/Loader';
import MyAccountQuery from 'Query/MyAccount.query';
import { CUSTOMER } from 'Route/MyAccount/MyAccount.config';
import { updateCustomerDetails } from 'Store/MyAccount/MyAccount.action';
import { showNotification } from 'Store/Notification/Notification.action';
import { NotificationType } from 'Store/Notification/Notification.type';
import { ReactElement } from 'Type/Common.type';
import { isSignedIn } from 'Util/Auth';
import BrowserDatabase from 'Util/BrowserDatabase/BrowserDatabase';
import { fetchMutation, getErrorMessage } from 'Util/Request';
import { ONE_MONTH_IN_SECONDS } from 'Util/Request/QueryDispatcher';
import { RootState } from 'Util/Store/Store.type';

import MyAccountNewsletterSubscription from './MyAccountNewsletterSubscription.component';
import {
    MyAccountNewsletterSubscriptionComponentProps,
    MyAccountNewsletterSubscriptionContainerFunctions,
    MyAccountNewsletterSubscriptionContainerMapDispatchProps,
    MyAccountNewsletterSubscriptionContainerMapStateProps,
    MyAccountNewsletterSubscriptionContainerProps,
    MyAccountNewsletterSubscriptionContainerPropsKeys,
    MyAccountNewsletterSubscriptionContainerState,
} from './MyAccountNewsletterSubscription.type';

/** @namespace Component/MyAccountNewsletterSubscription/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): MyAccountNewsletterSubscriptionContainerMapStateProps => ({
    customer: state.MyAccountReducer.customer,
    newsletterConfirmStatus: state.ConfigReducer.newsletter_subscription_confirm,
});

/** @namespace Component/MyAccountNewsletterSubscription/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): MyAccountNewsletterSubscriptionContainerMapDispatchProps => ({
    updateCustomer: (customer) => dispatch(updateCustomerDetails(customer)),
    showErrorNotification: (error) => dispatch(showNotification(NotificationType.ERROR, getErrorMessage(error))),
    showSuccessNotification: (message) => dispatch(showNotification(NotificationType.SUCCESS, message)),
});

/** @namespace Component/MyAccountNewsletterSubscription/Container */
export class MyAccountNewsletterSubscriptionContainer extends PureComponent<
MyAccountNewsletterSubscriptionContainerProps,
MyAccountNewsletterSubscriptionContainerState
> {
    containerFunctions: MyAccountNewsletterSubscriptionContainerFunctions = {
        onError: this.onError,
        setSubscriptionStatus: this.setSubscriptionStatus.bind(this),
        onCustomerSave: this.onCustomerSave.bind(this),
    };

    __construct(props: MyAccountNewsletterSubscriptionContainerProps): void {
        const { customer, customer: { is_subscribed } = {} } = props;

        super.__construct?.(props);
        this.state = {
            isLoading: Object.keys(customer).length === 0,
            isSubscriptionSelected: is_subscribed || false,
        };
    }

    componentDidUpdate(prevProps: MyAccountNewsletterSubscriptionContainerProps): void {
        const {
            customer: prevCustomer,
        } = prevProps;

        const {
            customer,
            customer: { is_subscribed } = {},
        } = this.props;

        if (Object.keys(prevCustomer).length === 0 && Object.keys(customer).length !== 0) {
            this.setState({
                isSubscriptionSelected: is_subscribed || false,
                isLoading: false,
            });
        }
    }

    containerProps(): Pick<
    MyAccountNewsletterSubscriptionComponentProps,
    MyAccountNewsletterSubscriptionContainerPropsKeys
    > {
        const { customer } = this.props;
        const { isSubscriptionSelected } = this.state;

        return { customer, isSubscriptionSelected };
    }

    setSubscriptionStatus(): void {
        this.setState((state) => ({ isSubscriptionSelected: !state.isSubscriptionSelected }));
    }

    showSubscriptionUpdateNotification(isSubscribed: boolean, wasSubscribed?: boolean): void {
        const {
            showSuccessNotification,
            newsletterConfirmStatus,
        } = this.props;
        const { isSubscriptionSelected } = this.state;

        if (!isSubscribed && wasSubscribed) {
            showSuccessNotification(__('We have removed your newsletter subscription.'));
        } else if (isSubscribed && !newsletterConfirmStatus && !wasSubscribed) {
            showSuccessNotification(__('We have saved your subscription'));
        } else if (!isSubscribed && newsletterConfirmStatus && isSubscriptionSelected) {
            showSuccessNotification(__('A subscription confirmation email has been sent!'));
        } else {
            showSuccessNotification(__('We have updated your subscription.'));
        }
    }

    onError(): void {
        const { showErrorNotification } = this.props;

        this.setState({ isLoading: false }, () => {
            showErrorNotification({ message: __('We are experiencing issues, please try again later') });
        });
    }

    async onCustomerSave(form: unknown, fields: { isSubscribed: { value: boolean } }): Promise<void> {
        const {
            updateCustomer,
            customer: {
                is_subscribed: wasSubscribed,
            },
        } = this.props;

        const {
            isSubscribed: {
                value = false,
            },
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
            this.onError();
        }
    }

    render(): ReactElement {
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
