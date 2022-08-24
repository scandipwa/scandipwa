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

import { showNotification } from 'Store/Notification/Notification.action';
import { NotificationType } from 'Store/Notification/Notification.type';
import { ReactElement } from 'Type/Common.type';
import { FieldData } from 'Util/Form/Form.type';
import history from 'Util/History';
import { RootState } from 'Util/Store/Store.type';

import NewsletterSubscription from './NewsletterSubscription.component';
import {
    NewsletterSubscriptionContainerFunctions,
    NewsletterSubscriptionContainerProps,
    NewsletterSubscriptionContainerState,
    NewsletterSubscriptionMapDispatchProps,
    NewsletterSubscriptionMapStateProps
} from './NewsletterSubscription.type';

export const NewsletterSubscriptionDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/NewsletterSubscription/NewsletterSubscription.dispatcher'
);

/** @namespace Component/NewsletterSubscription/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): NewsletterSubscriptionMapStateProps => ({
    allowGuestSubscribe: state.ConfigReducer.newsletter_subscription_allow_guest_subscribe,
    isSignedIn: state.MyAccountReducer.isSignedIn
});

/** @namespace Component/NewsletterSubscription/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): NewsletterSubscriptionMapDispatchProps => ({
    subscribeToNewsletter: (email) => NewsletterSubscriptionDispatcher.then(
        ({ default: dispatcher }) => dispatcher.subscribeToNewsletter(dispatch, email)
    ),
    showErrorNotification: (message) => dispatch(showNotification(NotificationType.ERROR, message))
});

/** @namespace Component/NewsletterSubscription/Container */
export class NewsletterSubscriptionContainer extends PureComponent<
NewsletterSubscriptionContainerProps,
NewsletterSubscriptionContainerState
> {
    containerFunctions: NewsletterSubscriptionContainerFunctions = {
        onFormSubmit: this.onFormSubmit.bind(this)
    };

    state: NewsletterSubscriptionContainerState = {
        isLoading: false
    };

    __construct(props: NewsletterSubscriptionContainerProps): void {
        super.__construct?.(props);

        this.onFormSubmitDone = this.onFormSubmitDone.bind(this);
    }

    containerProps(): { isLoading: boolean } {
        const { isLoading } = this.state;

        return { isLoading };
    }

    onFormSubmit(form: HTMLFormElement, fields: FieldData[]): void {
        const {
            subscribeToNewsletter,
            allowGuestSubscribe,
            isSignedIn,
            showErrorNotification
        } = this.props;

        const {
            value: email
        } = fields.find(({ name }) => name === 'newsletterEmail') || {};

        if (!email) {
            return;
        }

        if (!allowGuestSubscribe && !isSignedIn) {
            showErrorNotification(
                __('Guests can not subscribe to the newsletter. You must create an account or login to subscribe.')
            );

            return;
        }

        this.setState({ isLoading: true });

        subscribeToNewsletter(email as string)
            .then(this.onFormSubmitDone)
            .catch(this.onFormSubmitDone);
    }

    onFormSubmitDone(): void {
        this.setState({ isLoading: false });
    }

    render(): ReactElement {
        const { location: { pathname = '' } = {} } = history || {};

        return (
            <NewsletterSubscription
              { ...this.containerProps() }
              { ...this.containerFunctions }
              key={ pathname }
            />
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewsletterSubscriptionContainer);
