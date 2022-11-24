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

import NewsletterSubscriptionQuery from 'Query/NewsletterSubscription.query';
import { toggleBreadcrumbs } from 'Store/Breadcrumbs/Breadcrumbs.action';
import { updateMeta } from 'Store/Meta/Meta.action';
import { showNotification } from 'Store/Notification/Notification.action';
import { NotificationType } from 'Store/Notification/Notification.type';
import { NetworkError, ReactElement } from 'Type/Common.type';
import { fetchMutation, getErrorMessage } from 'Util/Request';

import ConfirmNewsletterPage from './ConfirmNewsletterPage.component';
import { NewsletterConfirmStatus } from './ConfirmNewsletterPage.config';
import {
    ConfirmNewsletterPageComponentProps,
    ConfirmNewsletterPageContainerMapDispatchProps,
    ConfirmNewsletterPageContainerProps,
    ConfirmNewsletterPageContainerPropsKeys,
    ConfirmNewsletterPageContainerState,
} from './ConfirmNewsletterPage.type';

/** @namespace Route/ConfirmNewsletterPage/Container/mapStateToProps */
export const mapStateToProps = () => ({});

/** @namespace Route/ConfirmNewsletterPage/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): ConfirmNewsletterPageContainerMapDispatchProps => ({
    showErrorNotification: (error) => dispatch(showNotification(NotificationType.ERROR, error)),
    toggleBreadcrumbs: (isVisible) => dispatch(toggleBreadcrumbs(isVisible)),
    updateMeta: (meta) => dispatch(updateMeta(meta)),
});

/** @namespace Route/ConfirmNewsletterPage/Container */
export class ConfirmNewsletterPageContainer extends PureComponent<
ConfirmNewsletterPageContainerProps,
ConfirmNewsletterPageContainerState
> {
    state: ConfirmNewsletterPageContainerState = {
        status: '',
        message: '',
    };

    componentDidMount(): void {
        const { updateMeta, toggleBreadcrumbs } = this.props;

        if (!this.shouldDisplayWarning()) {
            this.requestSubscriptionConfirmation();
        }

        updateMeta({ title: __('Confirm subscription') });
        toggleBreadcrumbs(false);
    }

    containerProps(): Pick<
    ConfirmNewsletterPageComponentProps,
    ConfirmNewsletterPageContainerPropsKeys
    > {
        const { status } = this.state;

        return {
            status,
            message: this.getErrorMessage(),
            shouldDisplayWarning: this.shouldDisplayWarning(),
        };
    }

    getErrorMessage(): string {
        const { message } = this.state;

        if (this.shouldDisplayWarning()) {
            return __('The URL is invalid. Some parameters are missing.');
        }

        return message;
    }

    shouldDisplayWarning(): boolean {
        const {
            match: {
                params: { id, code },
            },
        } = this.props;

        return !(id && code);
    }

    async requestSubscriptionConfirmation(): Promise<void> {
        const {
            showErrorNotification,
            match: {
                params: {
                    id = '',
                    code = '',
                },
            },
        } = this.props;

        try {
            const {
                confirmSubscribingToNewsletter: {
                    status,
                    message,
                },
            } = await fetchMutation(
                NewsletterSubscriptionQuery.confirmSubscribeToNewsletterMutation(id, code),
            );

            this.setState({ status, message });
        } catch (error) {
            showErrorNotification(__('Error subscribing to newsletter!'));

            this.setState({
                status: NewsletterConfirmStatus.FAILED,
                message: getErrorMessage(error as NetworkError),
            });
        }
    }

    render(): ReactElement {
        return (
            <ConfirmNewsletterPage
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmNewsletterPageContainer);
