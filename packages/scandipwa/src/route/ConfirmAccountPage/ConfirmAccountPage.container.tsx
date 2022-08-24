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

import { ERROR_TYPE } from 'Component/Notification/Notification.config';
import { AccountPageUrl } from 'Route/MyAccount/MyAccount.config';
import { toggleBreadcrumbs } from 'Store/Breadcrumbs/Breadcrumbs.action';
import { updateMeta } from 'Store/Meta/Meta.action';
import { showNotification } from 'Store/Notification/Notification.action';
import { ReactElement } from 'Type/Common.type';
import { isSignedIn } from 'Util/Auth';
import { FieldData } from 'Util/Form/Form.type';
import transformToNameValuePair from 'Util/Form/Transform';
import history from 'Util/History';
import { appendWithStoreCode, convertQueryStringToKeyValuePairs } from 'Util/Url';

import ConfirmAccountPage from './ConfirmAccountPage.component';
import {
    ConfirmAccountPageComponentProps,
    ConfirmAccountPageContainerFunctions,
    ConfirmAccountPageContainerMapDispatchProps,
    ConfirmAccountPageContainerMapStateProps,
    ConfirmAccountPageContainerProps,
    ConfirmAccountPageContainerPropsKeys,
    ConfirmAccountPageContainerState
} from './ConfirmAccountPage.type';

export const BreadcrumbsDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Breadcrumbs/Breadcrumbs.dispatcher'
);
export const MyAccountDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/MyAccount/MyAccount.dispatcher'
);

/** @namespace Route/ConfirmAccountPage/Container/mapStateToProps */
export const mapStateToProps = (): ConfirmAccountPageContainerMapStateProps => ({});

/** @namespace Route/ConfirmAccountPage/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): ConfirmAccountPageContainerMapDispatchProps => ({
    toggleBreadcrumbs: (isVisible) => dispatch(toggleBreadcrumbs(isVisible)),
    updateMeta: (meta) => dispatch(updateMeta(meta)),
    confirmAccount: (options) => MyAccountDispatcher.then(
        ({ default: dispatcher }) => dispatcher.confirmAccount(options, dispatch)
    ),
    showNotification: (type, message) => dispatch(showNotification(type, message)),
    signIn: (options) => MyAccountDispatcher.then(
        ({ default: dispatcher }) => dispatcher.signIn(options, dispatch)
    )
});

/** @namespace Route/ConfirmAccountPage/Container */
export class ConfirmAccountPageContainer extends PureComponent<
ConfirmAccountPageContainerProps,
ConfirmAccountPageContainerState
> {
    containerFunctions: ConfirmAccountPageContainerFunctions = {
        onConfirmSuccess: this.onConfirmSuccess.bind(this),
        onFormError: this.onFormError.bind(this)
    };

    __construct(props: ConfirmAccountPageContainerProps): void {
        super.__construct?.(props);

        this.state = {
            redirect: false,
            isLoading: false
        };
    }

    componentDidMount(): void {
        const { updateMeta, toggleBreadcrumbs } = this.props;

        if (isSignedIn()) {
            history.replace({ pathname: appendWithStoreCode(AccountPageUrl.ACCOUNT_URL) });
        }

        updateMeta({ title: __('Confirm account') });
        toggleBreadcrumbs(false);
    }

    containerProps(): Pick<ConfirmAccountPageComponentProps, ConfirmAccountPageContainerPropsKeys> {
        const { redirect, isLoading } = this.state;

        return {
            redirect,
            isLoading,
            shouldDisplayWarning: this.shouldDisplayWarning()
        };
    }

    shouldDisplayWarning(): boolean {
        const {
            location: {
                search
            }
        } = history;
        const { email, key } = convertQueryStringToKeyValuePairs(search);

        return !(email && key);
    }

    onConfirmSuccess(form: HTMLFormElement, fields: FieldData[]): void {
        const {
            confirmAccount,
            signIn
        } = this.props;
        const { location: { search } } = history;

        this.setState({ isLoading: true });

        const { password } = transformToNameValuePair<{ email: string; password: string }>(fields);

        const options = convertQueryStringToKeyValuePairs(search);
        const { email, key } = options;

        confirmAccount({ email, password, key })
            .then(
                /** @namespace Route/ConfirmAccountPage/Container/ConfirmAccountPageContainer/onConfirmSuccess/then/catch/then/then/confirmAccount/then */
                (data) => {
                    const { msgType } = data || {};

                    if (msgType === ERROR_TYPE) {
                        // error message is handled in the dispatcher
                        // just abort the chain
                        return Promise.reject();
                    }

                    return signIn({ email, password });
                }
            )
            .then(
                /** @namespace Route/ConfirmAccountPage/Container/ConfirmAccountPageContainer/onConfirmSuccess/then/catch/then/then */
                () => this.setState({ redirect: true })
            )
            .catch(
                /** @namespace Route/ConfirmAccountPage/Container/ConfirmAccountPageContainer/onConfirmSuccess/then/catch */
                () => this.setState({ isLoading: false })
            );
    }

    onFormError(): void {
        this.setState({ isLoading: false });
    }

    render(): ReactElement {
        return (
            <ConfirmAccountPage
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmAccountPageContainer);
