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

import { showNotification } from 'Store/Notification/Notification.action';

import NewsletterSubscription from './NewsletterSubscription.component';

export const NewsletterSubscriptionDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/NewsletterSubscription/NewsletterSubscription.dispatcher'
);

/** @namespace Component/NewsletterSubscribtion/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    allowGuestSubscribe: state.ConfigReducer.newsletter_subscription_allow_guest_subscribe,
    isSignedIn: state.MyAccountReducer.isSignedIn
});

/** @namespace Component/NewsletterSubscription/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    subscribeToNewsletter: (email) => NewsletterSubscriptionDispatcher.then(
        ({ default: dispatcher }) => dispatcher.subscribeToNewsletter(dispatch, email)
    ),
    showErrorNotification: (message) => dispatch(showNotification('error', message))
});

/** @namespace Component/NewsletterSubscription/Container */
export class NewsletterSubscriptionContainer extends PureComponent {
    static propTypes = {
        subscribeToNewsletter: PropTypes.func.isRequired,
        showErrorNotification: PropTypes.func.isRequired,
        allowGuestSubscribe: PropTypes.bool.isRequired,
        isSignedIn: PropTypes.bool.isRequired
    };

    containerFunctions = {
        onFormSubmit: this.onFormSubmit.bind(this)
    };

    state = {
        isLoading: false
    };

    onFormSubmitDone = this.onFormSubmitDone.bind(this);

    onFormSubmit(fields) {
        const {
            subscribeToNewsletter,
            allowGuestSubscribe,
            isSignedIn,
            showErrorNotification
        } = this.props;
        const { newsletterEmail: email } = fields;

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

    onFormSubmitDone() {
        this.setState({ isLoading: false });
    }

    render() {
        return (
            <NewsletterSubscription
              { ...this.props }
              { ...this.state }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewsletterSubscriptionContainer);
