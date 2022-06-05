/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/scandipwa
 */

import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Dispatch } from 'redux';

import { showNotification } from 'Store/Notification/Notification.action';
import { NotificationType } from 'Store/Notification/Notification.type';
import { ReactElement } from 'Type/Common.type';
import { RootState } from 'Util/Store/Store.type';

import NewsletterSubscription from './NewsletterSubscription.component';
import {
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
    containerFunctions = {
        onFormSubmit: this.onFormSubmit.bind(this)
    };

    state: NewsletterSubscriptionContainerState = {
        isLoading: false
    };

    __construct(props: NewsletterSubscriptionContainerProps): void {
        super.__construct?.(props);

        this.onFormSubmitDone = this.onFormSubmitDone.bind(this);
    }

    containerProps() {
        const { isLoading } = this.state;

        return { isLoading };
    }

    onFormSubmit(form: HTMLFormElement, fields): void {
        const {
            subscribeToNewsletter,
            allowGuestSubscribe,
            isSignedIn,
            showErrorNotification
        } = this.props;

        const {
            value: email
        } = fields.find(({ name }) => name === 'newsletterEmail') || {};

        if (!allowGuestSubscribe && !isSignedIn) {
            showErrorNotification(
                __('Guests can not subscribe to the newsletter. You must create an account or login to subscribe.')
            );

            return;
        }

        this.setState({ isLoading: true });

        subscribeToNewsletter(email)
            .then(this.onFormSubmitDone)
            .catch(this.onFormSubmitDone);
    }

    onFormSubmitDone(): void {
        this.setState({ isLoading: false });
    }

    render(): ReactElement {
        const { location: { pathname } } = this.props;

        return (
            <NewsletterSubscription
              { ...this.containerProps() }
              { ...this.containerFunctions }
              key={ pathname }
            />
        );
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(NewsletterSubscriptionContainer));
