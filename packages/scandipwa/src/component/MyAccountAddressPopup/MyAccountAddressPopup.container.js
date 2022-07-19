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

import MyAccountQuery from 'Query/MyAccount.query';
import { goToPreviousNavigationState } from 'Store/Navigation/Navigation.action';
import { TOP_NAVIGATION_TYPE } from 'Store/Navigation/Navigation.reducer';
import { showNotification } from 'Store/Notification/Notification.action';
import { hideActiveOverlay } from 'Store/Overlay/Overlay.action';
import { Addresstype } from 'Type/Account.type';
import { isSignedIn } from 'Util/Auth';
import { fetchMutation, getErrorMessage } from 'Util/Request';

import MyAccountAddressPopup from './MyAccountAddressPopup.component';
import { ADDRESS_POPUP_ID } from './MyAccountAddressPopup.config';

export const MyAccountDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/MyAccount/MyAccount.dispatcher'
);

/** @namespace Component/MyAccountAddressPopup/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    payload: state.PopupReducer.popupPayload[ADDRESS_POPUP_ID] || {}
});

/** @namespace Component/MyAccountAddressPopup/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    hideActiveOverlay: () => dispatch(hideActiveOverlay()),
    showErrorNotification: (error) => dispatch(showNotification('error', getErrorMessage(error))),
    showSuccessNotification: (message) => dispatch(showNotification('success', message)),
    updateCustomerDetails: () => MyAccountDispatcher.then(
        ({ default: dispatcher }) => dispatcher.requestCustomerData(dispatch)
    ),
    goToPreviousHeaderState: () => dispatch(goToPreviousNavigationState(TOP_NAVIGATION_TYPE))
});

/** @namespace Component/MyAccountAddressPopup/Container */
export class MyAccountAddressPopupContainer extends PureComponent {
    static propTypes = {
        showErrorNotification: PropTypes.func.isRequired,
        showSuccessNotification: PropTypes.func.isRequired,
        updateCustomerDetails: PropTypes.func.isRequired,
        hideActiveOverlay: PropTypes.func.isRequired,
        goToPreviousHeaderState: PropTypes.func.isRequired,
        payload: PropTypes.shape({
            address: Addresstype
        }).isRequired
    };

    state = {
        isLoading: false
    };

    handleAfterAction = this.handleAfterAction.bind(this);

    containerFunctions = {
        handleAddress: this.handleAddress.bind(this),
        handleDeleteAddress: this.handleDeleteAddress.bind(this)
    };

    containerProps() {
        const { payload } = this.props;
        const { isLoading } = this.state;

        return { isLoading, payload };
    }

    async handleAfterAction(status, operation) {
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
            this.showAddressNotification(status, operation);
        } catch (e) {
            showErrorNotification(e);
        }
    }

    handleError(error) {
        const { showErrorNotification } = this.props;

        showErrorNotification(error);
        this.setState({ isLoading: false });
    }

    handleAddress(address) {
        const { payload: { address: { id } } } = this.props;

        this.setState({ isLoading: true });

        if (id) {
            return this.handleEditAddress(address);
        }

        return this.handleCreateAddress(address);
    }

    showAddressNotification(status, operation) {
        const { showSuccessNotification, showErrorNotification } = this.props;
        const message = __('You %s the address', operation).toString();

        switch (status) {
        case 'success':
            showSuccessNotification(message);
            break;
        case 'error':
            showErrorNotification(message);
            break;
        default:
            break;
        }
    }

    async handleEditAddress(address) {
        const { payload: { address: { id } } } = this.props;

        const query = MyAccountQuery.getUpdateAddressMutation(id, address);

        if (!isSignedIn()) {
            return;
        }

        try {
            await fetchMutation(query);
            this.handleAfterAction('success', 'edited');
        } catch (e) {
            this.handleError(e);
        }
    }

    async handleDeleteAddress() {
        const { payload: { address: { id } } } = this.props;

        if (!isSignedIn()) {
            return;
        }

        this.setState({ isLoading: true });
        const query = MyAccountQuery.getDeleteAddressMutation(id);

        try {
            await fetchMutation(query);
            this.handleAfterAction('success', 'deleted');
        } catch (e) {
            this.handleError(e);
        }
    }

    async handleCreateAddress(address) {
        if (!isSignedIn()) {
            return;
        }

        const query = MyAccountQuery.getCreateAddressMutation(address);

        try {
            await fetchMutation(query);
            this.handleAfterAction('success', 'saved');
        } catch (e) {
            this.handleError(e);
        }
    }

    render() {
        return (
            <MyAccountAddressPopup
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountAddressPopupContainer);
