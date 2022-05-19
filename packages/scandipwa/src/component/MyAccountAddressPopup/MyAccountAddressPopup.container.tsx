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

import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import MyAccountQuery from 'Query/MyAccount.query';
import { goToPreviousNavigationState } from 'Store/Navigation/Navigation.action';
import { NavigationType } from 'Store/Navigation/Navigation.type';
import { showNotification } from 'Store/Notification/Notification.action';
import { NotificationType } from 'Store/Notification/Notification.type';
import { hideActiveOverlay } from 'Store/Overlay/Overlay.action';
import { NetworkError, ReactElement } from 'Type/Common.type';
import { GQLCustomerAddressInput } from 'Type/Graphql.type';
import { isSignedIn } from 'Util/Auth';
import { fetchMutation, getErrorMessage } from 'Util/Request';
import { RootState } from 'Util/Store/Store.type';

import MyAccountAddressPopup from './MyAccountAddressPopup.component';
import { MyAccountAddressPopupAction } from './MyAccountAddressPopup.config';
import {
    MyAccountAddressPopupComponentProps,
    MyAccountAddressPopupContainerMapDispatchProps,
    MyAccountAddressPopupContainerMapStateProps,
    MyAccountAddressPopupContainerProps,
    MyAccountAddressPopupContainerState
} from './MyAccountAddressPopup.type';

export const MyAccountDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/MyAccount/MyAccount.dispatcher'
);

/** @namespace Component/MyAccountAddressPopup/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): MyAccountAddressPopupContainerMapStateProps => ({
    payload: state.PopupReducer.popupPayload[ MyAccountAddressPopupAction.ADDRESS_POPUP_ID ]
});

/** @namespace Component/MyAccountAddressPopup/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): MyAccountAddressPopupContainerMapDispatchProps => ({
    hideActiveOverlay: () => dispatch(hideActiveOverlay()),
    showErrorNotification: (error) => dispatch(showNotification(NotificationType.ERROR, getErrorMessage(error))),
    showSuccessNotification: (message) => dispatch(showNotification(NotificationType.SUCCESS, message)),
    updateCustomerDetails: () => MyAccountDispatcher.then(
        ({ default: dispatcher }) => dispatcher.requestCustomerData(dispatch)
    ),
    goToPreviousHeaderState: () => dispatch(goToPreviousNavigationState(NavigationType.TOP_NAVIGATION_TYPE))
});

/** @namespace Component/MyAccountAddressPopup/Container */
export class MyAccountAddressPopupContainer extends PureComponent<
MyAccountAddressPopupContainerProps, MyAccountAddressPopupContainerState
> {
    state = {
        isLoading: false
    };

    containerFunctions = {
        handleAddress: this.handleAddress.bind(this),
        handleDeleteAddress: this.handleDeleteAddress.bind(this)
    };

    __construct(props: MyAccountAddressPopupContainerProps): void {
        super.__construct?.(props);

        this.handleAfterAction = this.handleAfterAction.bind(this);
    }

    containerProps(): Pick<MyAccountAddressPopupComponentProps, 'payload' | 'isLoading'> {
        const { payload } = this.props;
        const { isLoading } = this.state;

        return { isLoading, payload };
    }

    async handleAfterAction(): Promise<void> {
        const {
            hideActiveOverlay,
            updateCustomerDetails,
            showErrorNotification,
            goToPreviousHeaderState
        } = this.props;

        try {
            await updateCustomerDetails();
            this.setState({ isLoading: false }, () => {
                hideActiveOverlay();
                goToPreviousHeaderState();
            });
        } catch (e) {
            showErrorNotification(e as NetworkError | NetworkError[]);
        }
    }

    handleError(error: NetworkError | NetworkError[]): void {
        const { showErrorNotification } = this.props;
        showErrorNotification(error);
        this.setState({ isLoading: false });
    }

    handleAddress(address: GQLCustomerAddressInput): Promise<void> {
        const { payload: { address: { id } } } = this.props;
        this.setState({ isLoading: true });

        if (id) {
            return this.handleEditAddress(address);
        }

        return this.handleCreateAddress(address);
    }

    async handleEditAddress(address: GQLCustomerAddressInput): Promise<void> {
        const { payload: { address: { id } } } = this.props;
        const query = MyAccountQuery.getUpdateAddressMutation(id, address);

        if (!isSignedIn()) {
            return;
        }

        try {
            await fetchMutation(query);
            this.handleAfterAction();
        } catch (e) {
            this.handleError(e as NetworkError | NetworkError[]);
        }
    }

    async handleDeleteAddress(): Promise<void> {
        const { payload: { address: { id } } } = this.props;

        if (!isSignedIn()) {
            return;
        }

        this.setState({ isLoading: true });
        const query = MyAccountQuery.getDeleteAddressMutation(id);

        try {
            await fetchMutation(query);
            this.handleAfterAction();
        } catch (e) {
            this.handleError(e as NetworkError | NetworkError[]);
        }
    }

    async handleCreateAddress(address: GQLCustomerAddressInput): Promise<void> {
        if (!isSignedIn()) {
            return;
        }

        const query = MyAccountQuery.getCreateAddressMutation(address);

        try {
            await fetchMutation(query);
            this.handleAfterAction();
        } catch (e) {
            this.handleError(e as NetworkError | NetworkError[]);
        }
    }

    render(): ReactElement {
        return (
            <MyAccountAddressPopup
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountAddressPopupContainer);
