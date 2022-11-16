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
import { Redirect } from 'react-router';
import { Dispatch } from 'redux';

import { Page } from 'Component/Header/Header.config';
import { AccountPageUrl } from 'Route/MyAccount/MyAccount.config';
import { updateBreadcrumbsStore } from 'Store/Breadcrumbs/Breadcrumbs.action';
import { updateMetaStore } from 'Store/Meta/Meta.action';
import { changeNavigationState } from 'Store/Navigation/Navigation.action';
import { NavigationType } from 'Store/Navigation/Navigation.type';
import { showNotification } from 'Store/Notification/Notification.action';
import { NotificationType } from 'Store/Notification/Notification.type';
import { ReactElement } from 'Type/Common.type';
import { isSignedIn } from 'Util/Auth';
import { FieldData } from 'Util/Form/Form.type';
import transformToNameValuePair from 'Util/Form/Transform';
import history from 'Util/History';
import { RootState } from 'Util/Store/Store.type';
import { appendWithStoreCode, getQueryParam } from 'Util/Url';

import PasswordChangePage from './PasswordChangePage.component';
import { PasswordPageStatus } from './PasswordChangePage.config';
import {
    PasswordChangePageComponentProps,
    PasswordChangePageContainerMapDispatchProps,
    PasswordChangePageContainerMapStateProps,
    PasswordChangePageContainerProps,
    PasswordChangePageContainerPropsKeys,
    PasswordChangePageContainerState,
} from './PasswordChangePage.type';

export const MyAccountDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/MyAccount/MyAccount.dispatcher'
);

/** @namespace Route/PasswordChangePage/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): PasswordChangePageContainerMapStateProps => ({
    passwordResetStatus: state.MyAccountReducer.passwordResetStatus,
    passwordResetMessage: state.MyAccountReducer.passwordResetMessage,
    isMobile: state.ConfigReducer.device.isMobile,
    minimunPasswordLength: state.ConfigReducer.minimun_password_length,
    minimunPasswordCharacter: state.ConfigReducer.required_character_classes_number,
});

/** @namespace Route/PasswordChangePage/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): PasswordChangePageContainerMapDispatchProps => ({
    updateMetaStore: (state) => dispatch(updateMetaStore(state)),
    updateBreadcrumbsStore: (state) => dispatch(updateBreadcrumbsStore(state)),
    setHeaderState: (headerState) => dispatch(changeNavigationState(NavigationType.TOP_NAVIGATION_TYPE, headerState)),
    resetPassword(options) {
        MyAccountDispatcher.then(
            ({ default: dispatcher }) => dispatcher.resetPassword(options),
        );
    },
    showNotification(type, message) {
        dispatch(showNotification(type, message));
    },
});

/** @namespace Route/PasswordChangePage/Container */
export class PasswordChangePageContainer extends PureComponent<
PasswordChangePageContainerProps,
PasswordChangePageContainerState
> {
    state: PasswordChangePageContainerState = {
        passwordResetStatus: '',
        isLoading: false,
    };

    static getDerivedStateFromProps(
        props: PasswordChangePageContainerProps,
    ): Partial<PasswordChangePageContainerState> | null {
        const {
            passwordResetStatus,
            passwordResetMessage,
            showNotification,
        } = props;
        const stateToBeUpdated: Partial<PasswordChangePageContainerState> = {};

        if (passwordResetStatus) {
            stateToBeUpdated.isLoading = false;
            stateToBeUpdated.passwordResetStatus = passwordResetStatus;

            switch (passwordResetStatus) {
            case PasswordPageStatus.UPDATED:
                showNotification(NotificationType.SUCCESS, __('Password has been successfully updated!'));
                break;
            case PasswordPageStatus.MISS_MATCH:
                showNotification(NotificationType.INFO, __('Your password and confirmation password do not match.'));
                break;
            default:
                showNotification(NotificationType.ERROR, passwordResetMessage);
            }
        }

        return Object.keys(stateToBeUpdated).length ? stateToBeUpdated : null;
    }

    containerFunctions = {
        onPasswordSuccess: this.onPasswordSuccess.bind(this),
        onError: this.onError.bind(this),
    };

    componentDidMount(): void {
        const { setHeaderState, updateBreadcrumbsStore } = this.props;

        this.updateMeta();
        updateBreadcrumbsStore({ areBreadcrumbsVisible: false });

        if (isSignedIn()) {
            history.replace({ pathname: appendWithStoreCode(AccountPageUrl.ACCOUNT_URL) });
        }

        setHeaderState({
            name: Page.CUSTOMER_SUB_ACCOUNT,
            title: __('Change My Password'),
            onBackClick: () => {
                history.push({ pathname: appendWithStoreCode('/') });
            },
        });
    }

    containerProps(): Pick<PasswordChangePageComponentProps, PasswordChangePageContainerPropsKeys> {
        const { isLoading } = this.state;
        const { isMobile, minimunPasswordLength, minimunPasswordCharacter } = this.props;

        const range = {
            min: minimunPasswordLength,
            max: 64,
        };

        return {
            range,
            isLoading,
            isMobile,
            minimunPasswordCharacter,
            shouldDisplayWarning: this.shouldDisplayWarning(),
        };
    }

    shouldDisplayWarning(): boolean {
        const { location } = history;
        const token = getQueryParam('token', location);

        return !token;
    }

    onPasswordSuccess(form: HTMLFormElement, fields: FieldData[]): void {
        this.setState({ isLoading: true }, () => {
            const { resetPassword } = this.props;
            const { location } = history;
            const { password, password_confirmation } = transformToNameValuePair<Record<string, string>>(fields);
            const token = getQueryParam('token', location);
            const customer_id = getQueryParam('id', location);

            if (token) {
                resetPassword({
                    customer_id: Number(customer_id), token, password, password_confirmation,
                });
            }
        });
    }

    onError(): void {
        this.setState({ isLoading: false });
    }

    updateMeta(): void {
        const { updateMetaStore } = this.props;

        updateMetaStore({ title: __('Password Change Page') });
    }

    render(): ReactElement {
        const { passwordResetStatus } = this.state;

        if (passwordResetStatus === PasswordPageStatus.UPDATED) {
            return <Redirect to="/" />;
        }

        return (
            <PasswordChangePage
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PasswordChangePageContainer);
