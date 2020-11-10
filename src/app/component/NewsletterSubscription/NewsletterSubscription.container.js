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

import NewsletterSubscription from './NewsletterSubscription.component';

export const NewsletterSubscriptionDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/NewsletterSubscription/NewsletterSubscription.dispatcher'
);

/** @namespace Component/NewsletterSubscribtion/Container/mapStateToProps */
export const mapStateToProps = () => ({});

/** @namespace Component/NewsletterSubscription/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    subscribeToNewsletter: (email) => NewsletterSubscriptionDispatcher.then(
        ({ default: dispatcher }) => dispatcher.subscribeToNewsletter(dispatch, email)
    )
});

/** @namespace Component/NewsletterSubscription/Container */
export class NewsletterSubscriptionContainer extends PureComponent {
    static propTypes = {
        subscribeToNewsletter: PropTypes.func.isRequired
    };

    containerFunctions = {
        onFormSubmit: this.onFormSubmit.bind(this)
    };

    state = {
        isLoading: false
    };

    onFormSubmitSuccess = this.onFormSubmitSuccess.bind(this);

    onFormSubmitError = this.onFormSubmitError.bind(this);

    onFormSubmit(fields) {
        const { subscribeToNewsletter } = this.props;
        const { email } = fields;

        this.setState({ isLoading: true });

        subscribeToNewsletter(email)
            .then(this.onFormSubmitSuccess)
            .catch(this.onFormSubmitError);
    }

    onFormSubmitSuccess() {
        this.setState({ isLoading: false });
    }

    onFormSubmitError() {
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
