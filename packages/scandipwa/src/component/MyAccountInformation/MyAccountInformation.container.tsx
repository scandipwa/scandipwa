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

import MyAccountQuery from 'Query/MyAccount.query';
import { ChangeCustomerPasswordOptions, SignInOptions } from 'Query/MyAccount.type';
import { AccountPageUrl } from 'Route/MyAccount/MyAccount.config';
import { updateCustomerDetails, updateIsLoading, updateIsLocked } from 'Store/MyAccount/MyAccount.action';
import { CUSTOMER } from 'Store/MyAccount/MyAccount.dispatcher';
import { showNotification } from 'Store/Notification/Notification.action';
import { NotificationType } from 'Store/Notification/Notification.type';
import { NetworkError, ReactElement } from 'Type/Common.type';
import { GQLCustomerUpdateInput } from 'Type/Graphql.type';
import { isSignedIn } from 'Util/Auth';
import BrowserDatabase from 'Util/BrowserDatabase';
import history from 'Util/History';
import { fetchMutation, getErrorMessage } from 'Util/Request';
import { ONE_MONTH_IN_SECONDS } from 'Util/Request/QueryDispatcher';
import { RootState } from 'Util/Store/Store.type';
import { appendWithStoreCode, replace } from 'Util/Url';

import MyAccountInformation from './MyAccountInformation.component';
import {
    MyAccountInformationComponentProps,
    MyAccountInformationContainerFunctions,
    MyAccountInformationContainerMapDispatchProps,
    MyAccountInformationContainerMapStateProps,
    MyAccountInformationContainerProps,
    MyAccountInformationContainerPropsKeys,
    MyAccountInformationContainerState,
} from './MyAccountInformation.type';

export const MyAccountDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/MyAccount/MyAccount.dispatcher'
);

/** @namespace Component/MyAccountInformation/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): MyAccountInformationContainerMapStateProps => ({
    isMobile: state.ConfigReducer.device.isMobile,
    customer: state.MyAccountReducer.customer,
    isLoading: state.MyAccountReducer.isLoading,
    isLocked: state.MyAccountReducer.isLocked,
    baseLinkUrl: state.ConfigReducer.base_link_url,
});

/** @namespace Component/MyAccountInformation/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): MyAccountInformationContainerMapDispatchProps => ({
    updateCustomer: (customer) => dispatch(updateCustomerDetails(customer)),
    showErrorNotification: (error) => dispatch(showNotification(
        NotificationType.ERROR,
        typeof error === 'string' ? error : getErrorMessage(error),
    )),
    showSuccessNotification: (message) => dispatch(showNotification(NotificationType.SUCCESS, message)),
    updateCustomerLoadingStatus: (status) => dispatch(updateIsLoading(status)),
    logout: () => MyAccountDispatcher.then(
        ({ default: dispatcher }) => dispatcher.logout(false, false, dispatch),
    ),
    updateIsLocked: (isLocked) => dispatch(updateIsLocked(isLocked)),
});

/** @namespace Component/MyAccountInformation/Container */
export class MyAccountInformationContainer extends PureComponent<
MyAccountInformationContainerProps,
MyAccountInformationContainerState
> {
    containerFunctions: MyAccountInformationContainerFunctions = {
        onCustomerSave: this.onCustomerSave.bind(this),
        handleChangeEmailCheckbox: this.handleChangeEmailCheckbox.bind(this),
        handleChangePasswordCheckbox: this.handleChangePasswordCheckbox.bind(this),
    };

    __construct(props: MyAccountInformationContainerProps): void {
        super.__construct?.(props);

        const {
            location: {
                state: {
                    editPassword = false,
                } = {},
            },
        } = history;

        this.state = {
            showEmailChangeField: false,
            showPasswordChangeField: editPassword,
            isErrorShow: false,
        };

        this.onError = this.onError.bind(this);
    }

    containerProps(): Pick<
    MyAccountInformationComponentProps,
    MyAccountInformationContainerPropsKeys
    > {
        const { customer, isLoading } = this.props;
        const { showEmailChangeField, showPasswordChangeField } = this.state;

        return {
            isLoading,
            customer,
            showEmailChangeField,
            showPasswordChangeField,
        };
    }

    onError(error: NetworkError | NetworkError[] | string): void {
        const { showErrorNotification } = this.props;

        showErrorNotification(error);
    }

    async onCustomerSave(fields:
    ChangeCustomerPasswordOptions
    & SignInOptions
    & GQLCustomerUpdateInput): Promise<void> {
        const { updateCustomerLoadingStatus } = this.props;
        const { showPasswordChangeField, showEmailChangeField } = this.state;
        const {
            firstname = '',
            lastname = '',
            taxvat = '',
            password = '',
            newPassword = '',
            email = '',
        } = fields;

        if (!isSignedIn()) {
            return;
        }

        updateCustomerLoadingStatus(true);
        try {
            if (showPasswordChangeField) {
                await this.handlePasswordChange({ password, newPassword });
            }

            if (showEmailChangeField) {
                await this.handleEmailChange({ email, password });
            }

            await this.handleInformationChange({ firstname, lastname, taxvat });

            this.handleSuccessChange();
        } catch (e) {
            this.handleLockAccount(e as NetworkError[]);
        }
    }

    handleSuccessChange(): void {
        const {
            showSuccessNotification, updateCustomerLoadingStatus,
        } = this.props;
        const {
            showEmailChangeField, showPasswordChangeField,
        } = this.state;

        updateCustomerLoadingStatus(false);

        if (showEmailChangeField || showPasswordChangeField) {
            this.handleLogout();
        } else {
            history.push({ pathname: appendWithStoreCode(AccountPageUrl.ACCOUNT_URL) });
        }

        showSuccessNotification(__('You saved the account information.'));
    }

    handleLogout(): void {
        const { baseLinkUrl, logout } = this.props;

        const path = baseLinkUrl
            ? appendWithStoreCode(AccountPageUrl.LOGIN_URL)
            : replace(/\/customer\/account\/.*/, AccountPageUrl.LOGIN_URL);

        history.push({
            pathname: path,
            state: { isFromEmailChange: true },
        });

        logout();
    }

    async handlePasswordChange(passwords: ChangeCustomerPasswordOptions): Promise<void> {
        const mutation = MyAccountQuery.getChangeCustomerPasswordMutation(passwords);

        await fetchMutation(mutation);
    }

    async handleInformationChange(options: GQLCustomerUpdateInput): Promise<void> {
        const {
            updateCustomer,
        } = this.props;

        const mutation = MyAccountQuery.getUpdateInformationMutation(options);

        const { updateCustomerV2: { customer } } = await fetchMutation(mutation);

        BrowserDatabase.setItem(customer, CUSTOMER, ONE_MONTH_IN_SECONDS);
        updateCustomer(customer);
    }

    async handleEmailChange(fields: SignInOptions): Promise<void> {
        const mutation = MyAccountQuery.getUpdateEmailMutation(fields);

        await fetchMutation(mutation);
    }

    handleLockAccount(e: NetworkError[]): void {
        const { updateIsLocked, updateCustomerLoadingStatus } = this.props;
        const { message } = e[ 0 ];

        updateCustomerLoadingStatus(false);

        if (message.includes('locked')) {
            updateIsLocked(true);

            return;
        }

        this.onError(e);
    }

    handleChangePasswordCheckbox(): void {
        this.setState(({ showPasswordChangeField }) => ({ showPasswordChangeField: !showPasswordChangeField }));
    }

    handleChangeEmailCheckbox(): void {
        this.setState(({ showEmailChangeField }) => ({ showEmailChangeField: !showEmailChangeField }));
    }

    render(): ReactElement {
        return (
            <MyAccountInformation
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountInformationContainer);
