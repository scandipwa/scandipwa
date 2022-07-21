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

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import NewsletterSubscriptionQuery from 'Query/NewsletterSubscription.query';
import { toggleBreadcrumbs } from 'Store/Breadcrumbs/Breadcrumbs.action';
import { updateMeta } from 'Store/Meta/Meta.action';
import { MatchType } from 'Type/Router.type';
import { fetchMutation } from 'Util/Request';

import ConfirmNewsletterPage from './ConfirmNewsletterPage.component';

/** @namespace Route/ConfirmNewsletterPage/Container/mapStateToProps */
export const mapStateToProps = () => ({});

/** @namespace Route/ConfirmNewsletterPage/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    toggleBreadcrumbs: (isVisible) => dispatch(toggleBreadcrumbs(isVisible)),
    updateMeta: (meta) => dispatch(updateMeta(meta))
});

/** @namespace Route/ConfirmNewsletterPage/Container */
export class ConfirmNewsletterPageContainer extends PureComponent {
    static propTypes = {
        match: MatchType.isRequired,
        updateMeta: PropTypes.func.isRequired,
        toggleBreadcrumbs: PropTypes.func.isRequired
    };

    state = {
        status: '',
        message: ''
    };

    componentDidMount() {
        const { updateMeta, toggleBreadcrumbs } = this.props;

        if (!this.shouldDisplayWarning()) {
            this.requestSubscriptionConfirmation();
        }

        updateMeta({ title: __('Confirm subscription') });
        toggleBreadcrumbs(false);
    }

    containerProps() {
        const { status, message } = this.state;

        return {
            status,
            message,
            shouldDisplayWarning: this.shouldDisplayWarning()
        };
    }

    shouldDisplayWarning() {
        const {
            match: {
                params: {
                    id,
                    code
                }
            }
        } = this.props;

        return !(id && code);
    }

    async requestSubscriptionConfirmation() {
        const { match: { params: { id, code } } } = this.props;

        const { confirmSubscribingToNewsletter: { status, message } } = await fetchMutation(
            NewsletterSubscriptionQuery.confirmSubscribeToNewsletterMutation(id, code)
        );

        this.setState({ status, message });
    }

    render() {
        return (
            <ConfirmNewsletterPage
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmNewsletterPageContainer);
