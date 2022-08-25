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
import { Dispatch } from 'redux';

import { toggleBreadcrumbs } from 'Store/Breadcrumbs/Breadcrumbs.action';
import { updateMeta } from 'Store/Meta/Meta.action';
import { showNotification } from 'Store/Notification/Notification.action';
import { NotificationType } from 'Store/Notification/Notification.type';
import { NetworkError, ReactElement } from 'Type/Common.type';
import transformToNameValuePair from 'Util/Form/Transform';
import history from 'Util/History';
import { convertQueryStringToKeyValuePairs } from 'Util/Url';

import SendConfirmationPage from './SendConfirmationPage.component';
import {
    SendConfirmationPageContainerMapDispatchProps,
    SendConfirmationPageContainerMapStateProps,
    SendConfirmationPageContainerProps,
    SendConfirmationPageContainerState
} from './SendConfirmationPage.type';

export const BreadcrumbsDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Breadcrumbs/Breadcrumbs.dispatcher'
);
export const MyAccountDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/MyAccount/MyAccount.dispatcher'
);

/** @namespace Route/SendConfirmationPage/Container/mapStateToProps */
export const mapStateToProps = (): SendConfirmationPageContainerMapStateProps => ({});

/** @namespace Route/SendConfirmationPage/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): SendConfirmationPageContainerMapDispatchProps => ({
    toggleBreadcrumbs: (isVisible) => dispatch(toggleBreadcrumbs(isVisible)),
    updateMeta: (meta) => dispatch(updateMeta(meta)),
    resendConfirmation: (options) => MyAccountDispatcher.then(
        ({ default: dispatcher }) => dispatcher.resendConfirmation(options, dispatch)
    ),
    showNotification: (type, message) => dispatch(showNotification(type, message))
});

/** @namespace Route/SendConfirmationPage/Container */
export class SendConfirmationPageContainer extends PureComponent<
SendConfirmationPageContainerProps,
SendConfirmationPageContainerState
> {
    static propTypes = {
        updateMeta: PropTypes.func.isRequired,
        resendConfirmation: PropTypes.func.isRequired,
        showNotification: PropTypes.func.isRequired,
        toggleBreadcrumbs: PropTypes.func.isRequired
    };

    containerFunctions = {
        onConfirmSuccess: this.onConfirmSuccess.bind(this),
        onFormError: this.onFormError.bind(this)
    };

    __construct(props: SendConfirmationPageContainerProps): void {
        super.__construct?.(props);

        this.state = {
            email: '',
            redirect: false,
            isLoading: false
        };
    }

    componentDidMount(): void {
        const { updateMeta, toggleBreadcrumbs } = this.props;

        updateMeta({ title: __('Send confirmation link') });
        toggleBreadcrumbs(false);
    }

    containerProps() {
        const { email, redirect, isLoading } = this.state;

        return {
            email,
            redirect,
            isLoading,
            shouldDisplayWarning: this.shouldDisplayWarning()
        };
    }

    shouldDisplayWarning(): boolean {
        const { location: { search } } = history;
        const { email } = convertQueryStringToKeyValuePairs(search);

        if (email) {
            this.setState({ email });
        }

        return !email;
    }

    async onConfirmSuccess(form, fields): Promise<boolean> {
        const {
            showNotification,
            resendConfirmation
        } = this.props;

        this.setState({ isLoading: true });

        const { email } = transformToNameValuePair(fields);

        try {
            const data = await resendConfirmation({ email });

            this.setState({ redirect: data });
        } catch (error) {
            showNotification(NotificationType.ERROR, (error as NetworkError).message);

            return false;
        } finally {
            this.setState({ isLoading: false });
        }

        return true;
    }

    onFormError(): void {
        this.setState({ isLoading: false });
    }

    render(): ReactElement {
        return (
            <SendConfirmationPage
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SendConfirmationPageContainer);
