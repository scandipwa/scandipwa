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

import MyAccountQuery from 'Query/MyAccount.query';
import { updateCustomerDetails } from 'Store/MyAccount/MyAccount.action';
import { CUSTOMER } from 'Store/MyAccount/MyAccount.dispatcher';
import { goToPreviousNavigationState } from 'Store/Navigation/Navigation.action';
import { TOP_NAVIGATION_TYPE } from 'Store/Navigation/Navigation.reducer';
import { showNotification } from 'Store/Notification/Notification.action';
import { hideActiveOverlay } from 'Store/Overlay/Overlay.action';
import { CustomerType } from 'Type/Account.type';
import { isSignedIn } from 'Util/Auth';
import BrowserDatabase from 'Util/BrowserDatabase';
import { fetchMutation, getErrorMessage } from 'Util/Request';
import { ONE_MONTH_IN_SECONDS } from 'Util/Request/QueryDispatcher';

import MyAccountCustomerPopup from './MyAccountCustomerPopup.component';
import { CHANGE_PASSWORD, CUSTOMER_POPUP_ID, EDIT_CUSTOMER } from './MyAccountCustomerPopup.config';

/** @namespace Component/MyAccountCustomerPopup/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    payload: state.PopupReducer.popupPayload[CUSTOMER_POPUP_ID] || {}
});

/** @namespace Component/MyAccountCustomerPopup/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    updateCustomer: (customer) => dispatch(updateCustomerDetails(customer)),
    goToPreviousHeaderState: () => dispatch(goToPreviousNavigationState(TOP_NAVIGATION_TYPE)),
    showErrorNotification: (error) => dispatch(showNotification('error', getErrorMessage(error))),
    showSuccessNotification: (message) => dispatch(showNotification('success', message)),
    hideActiveOverlay: () => dispatch(hideActiveOverlay())
});

/** @namespace Component/MyAccountCustomerPopup/Container */
export class MyAccountCustomerPopupContainer extends PureComponent {
    static propTypes = {
        updateCustomer: PropTypes.func.isRequired,
        showErrorNotification: PropTypes.func.isRequired,
        goToPreviousHeaderState: PropTypes.func.isRequired,
        hideActiveOverlay: PropTypes.func.isRequired,
        showSuccessNotification: PropTypes.func.isRequired,
        payload: PropTypes.shape({
            action: PropTypes.oneOf([
                CHANGE_PASSWORD,
                EDIT_CUSTOMER
            ]),
            customer: CustomerType
        }).isRequired
    };

    state = {
        isLoading: false
    };

    containerFunctions = {
        onCustomerSave: this.onCustomerSave.bind(this),
        onPasswordChange: this.onPasswordChange.bind(this)
    };

    containerProps() {
        const { payload } = this.props;
        const { isLoading } = this.state;

        return {
            payload,
            isLoading
        };
    }

    onError(error) {
        const { showErrorNotification } = this.props;
        this.setState({ isLoading: false });
        showErrorNotification(error);
    }

    onCustomerSave(customer) {
        const {
            updateCustomer,
            hideActiveOverlay,
            goToPreviousHeaderState
        } = this.props;

        if (!isSignedIn()) {
            return null;
        }

        const mutation = MyAccountQuery.getUpdateInformationMutation(customer);
        this.setState({ isLoading: true });

        return fetchMutation(mutation).then(
            /** @namespace Component/MyAccountCustomerPopup/Container/MyAccountCustomerPopupContainer/onCustomerSave/fetchMutation/then */
            ({ updateCustomer: { customer } }) => {
                BrowserDatabase.setItem(customer, CUSTOMER, ONE_MONTH_IN_SECONDS);
                updateCustomer(customer);
                this.setState({ isLoading: false }, () => {
                    hideActiveOverlay();
                    goToPreviousHeaderState();
                });
            },
            this.onError
        );
    }

    onPasswordChange(passwords) {
        const {
            showSuccessNotification,
            hideActiveOverlay,
            goToPreviousHeaderState
        } = this.props;

        if (!isSignedIn()) {
            return null;
        }

        const mutation = MyAccountQuery.getChangeCustomerPasswordMutation(passwords);
        this.setState({ isLoading: true });

        return fetchMutation(mutation).then(
            /** @namespace Component/MyAccountCustomerPopup/Container/MyAccountCustomerPopupContainer/onPasswordChange/fetchMutation/then */
            () => {
                showSuccessNotification(__('Your password was successfully updated!'));
                this.setState({ isLoading: false }, () => {
                    hideActiveOverlay();
                    goToPreviousHeaderState();
                });
            },
            this.onError
        );
    }

    render() {
        return (
            <MyAccountCustomerPopup
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountCustomerPopupContainer);
