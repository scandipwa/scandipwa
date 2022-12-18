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

import { updateBreadcrumbsStore } from 'Store/Breadcrumbs/Breadcrumbs.action';
import { updateMetaStore } from 'Store/Meta/Meta.action';
import { NotificationType } from 'Store/Notification/Notification.type';
import { NetworkError, ReactElement } from 'Type/Common.type';
import { FieldData } from 'Util/Form/Form.type';
import transformToNameValuePair from 'Util/Form/Transform';
import history from 'Util/History';
import { convertQueryStringToKeyValuePairs } from 'Util/Url';

import SendConfirmationPage from './SendConfirmationPage.component';
import {
    SendConfirmationPageComponentProps,
    SendConfirmationPageContainerFunctions,
    SendConfirmationPageContainerMapDispatchProps,
    SendConfirmationPageContainerMapStateProps,
    SendConfirmationPageContainerProps,
    SendConfirmationPageContainerPropsKeys,
    SendConfirmationPageContainerState,
} from './SendConfirmationPage.type';

export const NotificationDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Notification/Notification.dispatcher'
);

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
    updateBreadcrumbsStore: (state) => dispatch(updateBreadcrumbsStore(state)),
    updateMetaStore: (state) => dispatch(updateMetaStore(state)),
    resendConfirmation: (options) => MyAccountDispatcher.then(
        ({ default: dispatcher }) => dispatcher.resendConfirmation(options),
    ),
    showNotification: (type, message) => NotificationDispatcher.then(
        ({ default: dispatcher }) => dispatcher.showNotification(type, message),
    ),
});

/** @namespace Route/SendConfirmationPage/Container */
export class SendConfirmationPageContainer extends PureComponent<
SendConfirmationPageContainerProps,
SendConfirmationPageContainerState
> {
    containerFunctions: SendConfirmationPageContainerFunctions = {
        onConfirmSuccess: this.onConfirmSuccess.bind(this),
        onFormError: this.onFormError.bind(this),
    };

    __construct(props: SendConfirmationPageContainerProps): void {
        super.__construct?.(props);

        this.state = {
            email: '',
            redirect: false,
            isLoading: false,
        };
    }

    componentDidMount(): void {
        const { updateMetaStore, updateBreadcrumbsStore } = this.props;

        updateMetaStore({ title: __('Send confirmation link') });
        updateBreadcrumbsStore({ areBreadcrumbsVisible: false });
    }

    containerProps(): Pick<SendConfirmationPageComponentProps, SendConfirmationPageContainerPropsKeys> {
        const { email, redirect, isLoading } = this.state;

        return {
            email,
            redirect,
            isLoading,
            shouldDisplayWarning: this.shouldDisplayWarning(),
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

    async onConfirmSuccess(form: HTMLFormElement, fields: FieldData[]): Promise<boolean> {
        const {
            showNotification,
            resendConfirmation,
        } = this.props;

        this.setState({ isLoading: true });

        const { email } = transformToNameValuePair<Record<string, string>>(fields);

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
